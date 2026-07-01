import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";

// Define paths relative or absolute
const PYTHON_PATH = "D:\\My_server\\University\\3rd year\\Term_1\\Asynchronous\\async-2026\\.venv\\Scripts\\python.exe";
const BASE_SCRIPTS_DIR = "D:\\My_server\\University\\3rd year\\Term_1\\Asynchronous\\async-2026";

export async function POST(req: NextRequest) {
  try {
    const { folder, script, args = [] } = await req.json();

    // Safety checks
    if (!["Week1", "Week2", "WX"].includes(folder)) {
      return new Response(JSON.stringify({ error: "Invalid folder" }), { status: 400 });
    }

    // Basic script validation: alphanumeric + underscores/hyphens + .py
    if (!/^[a-zA-Z0-9_\-\.]+\.py$/.test(script)) {
      return new Response(JSON.stringify({ error: "Invalid script name" }), { status: 400 });
    }

    const scriptPath = path.join(BASE_SCRIPTS_DIR, folder, script);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Spawn Python process with unbuffered output (-u)
        const pyProcess = spawn(PYTHON_PATH, ["-u", scriptPath, ...args], {
          cwd: path.join(BASE_SCRIPTS_DIR, folder),
        });

        let stdoutBuffer = "";
        let stderrBuffer = "";

        const pushLine = (type: "stdout" | "stderr", line: string) => {
          const payload = JSON.stringify({ type, data: line }) + "\n";
          controller.enqueue(encoder.encode(payload));
        };

        const processData = (type: "stdout" | "stderr", chunk: Buffer, bufferRef: { val: string }) => {
          bufferRef.val += chunk.toString("utf8");
          const lines = bufferRef.val.split(/\r?\n/);
          // Keep the last partial line in the buffer
          bufferRef.val = lines.pop() || "";
          for (const line of lines) {
            pushLine(type, line);
          }
        };

        const stdoutRef = { val: stdoutBuffer };
        pyProcess.stdout.on("data", (chunk) => {
          processData("stdout", chunk, stdoutRef);
        });

        const stderrRef = { val: stderrBuffer };
        pyProcess.stderr.on("data", (chunk) => {
          processData("stderr", chunk, stderrRef);
        });

        pyProcess.on("close", (code) => {
          // Push any remaining buffer
          if (stdoutRef.val.trim()) {
            pushLine("stdout", stdoutRef.val);
          }
          if (stderrRef.val.trim()) {
            pushLine("stderr", stderrRef.val);
          }
          const exitPayload = JSON.stringify({ type: "exit", code: code ?? 0 }) + "\n";
          controller.enqueue(encoder.encode(exitPayload));
          controller.close();
        });

        pyProcess.on("error", (err) => {
          const errPayload = JSON.stringify({ type: "error", message: err.message }) + "\n";
          controller.enqueue(encoder.encode(errPayload));
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
