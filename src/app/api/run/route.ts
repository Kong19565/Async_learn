import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";

// Define paths relative or absolute
const PYTHON_PATH = "D:\\My_server\\University\\3rd year\\Term_1\\Asynchronous\\async-2026\\.venv\\Scripts\\python.exe";
const BASE_SCRIPTS_DIR = "D:\\My_server\\University\\3rd year\\Term_1\\Asynchronous\\async-2026";

// High-fidelity mock responses for Vercel / non-Python environments
function getMockLogs(folder: string, script: string): string[] {
  const now = new Date().toLocaleTimeString();
  const logs: string[] = [
    `[SERVER INFO] Cloud Sandbox Environment Detected (Vercel). Running in high-fidelity simulated mode.`,
    `[COMMAND] python -u ${script}`
  ];

  if (script.startsWith("coffee")) {
    if (script.includes("synchronous")) {
      logs.push(
        `${now} === เริ่มระบบจำลองตู้กาแฟ Synchronous ===`,
        `${now} กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า 3 คน ใช้เวลา: 3.01 วินาที`
      );
    } else if (script.includes("thread")) {
      logs.push(
        `${now} === เริ่มระบบจำลองตู้กาแฟแบบ Multi-Threading ===`,
        `${now} กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า 3 คน ได้รับกาแฟครบแล้ว! ใช้เวลารวมทั้งหมด: 1.02 วินาที`
      );
    } else if (script.includes("multiprocess")) {
      logs.push(
        `${now} === เริ่มระบบจำลองตู้กาแฟแบบ Multi-Processing ===`,
        `${now} กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า 3 คน ได้รับกาแฟครบแล้ว! ใช้เวลารวมทั้งหมด: 1.05 วินาที`
      );
    } else {
      // asyncio
      logs.push(
        `${now} === เริ่มระบบจำลองตู้กาแฟแบบ asyncio ===`,
        `${now} กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} ลูกค้า 3 คน ได้รับกาแฟครบแล้ว! ใช้เวลารวมทั้งหมด: 1.01 วินาที`
      );
    }
  } else if (script.startsWith("pid")) {
    if (script.includes("synchronous")) {
      logs.push(
        `${now} | [Main PID: 4012] [Main TID: 4012] === เริ่มระบบจำลองตู้กาแฟแบบ Synchronous ===`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} | ใช้เวลารวมทั้งหมด: 15.02 วินาที`
      );
    } else if (script.includes("thread")) {
      logs.push(
        `${now} | [Main PID: 4012] [Main TID: 4012] === เริ่มระบบจำลองตู้กาแฟแบบ Threads ===`,
        `${now} | [PID: 4012] [TID: 8011] [Thread Name: Thread-A] กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} | [PID: 4012] [TID: 8012] [Thread Name: Thread-B] กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} | [PID: 4012] [TID: 8013] [Thread Name: Thread-C] กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} | [PID: 4012] [TID: 8011] [Thread Name: Thread-A] ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4012] [TID: 8012] [Thread Name: Thread-B] ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4012] [TID: 8013] [Thread Name: Thread-C] ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} | ใช้เวลารวมทั้งหมด: 5.01 วินาที`
      );
    } else if (script.includes("multiprocess")) {
      logs.push(
        `${now} | [Main PID: 4012] [Main TID: 4012] === เริ่มระบบจำลองตู้กาแฟแบบ Multiprocessing ===`,
        `${now} | [PID: 4015] [TID: 4015] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} | [PID: 4016] [TID: 4016] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} | [PID: 4017] [TID: 4017] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} | [PID: 4015] [TID: 4015] [Thread Name: MainThread] ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4016] [TID: 4016] [Thread Name: MainThread] ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4017] [TID: 4017] [Thread Name: MainThread] ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} | ใช้เวลารวมทั้งหมด: 5.05 วินาที`
      );
    } else {
      // asyncio
      logs.push(
        `${now} | [Main PID: 4012] [Main TID: 4012] === เริ่มระบบจำลองตู้กาแฟแบบ asyncio ===`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า A...`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า B...`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] กำลังชงกาแฟให้ ลูกค้า C...`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] ลูกค้า A: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] ลูกค้า B: ได้รับกาแฟแล้ว!`,
        `${now} | [PID: 4012] [TID: 4012] [Thread Name: MainThread] ลูกค้า C: ได้รับกาแฟแล้ว!`,
        `${now} | ใช้เวลารวมทั้งหมด: 5.01 วินาที`
      );
    }
  } else if (script.startsWith("ps")) {
    const isSync = script.includes("synchronous");
    const isThread = script.includes("thread");
    const isMp = script.includes("multiprocess");
    const isAsync = script.includes("asyncio");

    logs.push(
      `${now} | === เริ่มระบบจำลองตู้กาแฟแบบ Resource Analysis ===`,
      `${now} กำลังชงกาแฟให้ ลูกค้า A...`,
      `${now} กำลังชงกาแฟให้ ลูกค้า B...`,
      `${now} กำลังชงกาแฟให้ ลูกค้า C...`,
      `${now} ลูกค้า A: ได้รับกาแฟแล้ว!`,
      `${now} ลูกค้า B: ได้รับกาแฟแล้ว!`,
      `${now} ลูกค้า C: ได้รับกาแฟแล้ว!`,
      `[สรุปผล ${isSync ? "Synchronous" : isThread ? "Threading" : isMp ? "Multiprocessing" : "Asyncio"}]`,
      `เวลาที่ใช้จริง (Wall Time): ${isSync ? "15.01" : isAsync ? "5.02" : "5.03"} วินาที`,
      `เวลาที่ CPU ใช้ประมวลผลจริง (CPU Time): ${isSync ? "0.0812" : isThread ? "0.0954" : isMp ? "0.4120" : "0.0652"} วินาที`,
      `ทรัพยากร Memory (RAM) ที่ใช้: ${isSync ? "18.22" : isThread ? "22.45" : isMp ? "68.90" : "19.82"} MB`
    );
  } else if (script.startsWith("up")) {
    if (script.includes("synchronous")) {
      logs.push(
        `${now} | === Synchronous Coffee Machine ===`,
        `${now} | Making coffee for A...`,
        `${now} | Coffee ready for A!`,
        `${now} | LCD: Processing for customer A...`,
        `${now} | LCD: Done for customer A.`,
        `${now} | Making coffee for B...`,
        `${now} | Coffee ready for B!`,
        `${now} | LCD: Processing for customer B...`,
        `${now} | LCD: Done for customer B.`,
        `${now} | Total time: 6.01 seconds`
      );
    } else {
      logs.push(
        `${now} | === Concurrent Coffee Machine ===`,
        `${now} | Making coffee for A...`,
        `${now} | Making coffee for B...`,
        `${now} | Making coffee for C...`,
        `${now} | Coffee ready for A!`,
        `${now} | LCD: Processing for customer A...`,
        `${now} | Coffee ready for B!`,
        `${now} | LCD: Processing for customer B...`,
        `${now} | LCD: Done for customer A.`,
        `${now} | LCD: Done for customer B.`,
        `${now} | Total time: 2.02 seconds`
      );
    }
  } else if (script.startsWith("asyncio")) {
    // asyncio01 to asyncio10 mock outputs
    const num = script.match(/\d+/)?.[0] || "01";
    logs.push(`${now} -> [EventLoop] Executing ${script}...`);
    if (num === "01") {
      logs.push(
        `${now} -> type(cook_spaghetti): <class 'function'>`,
        `${now} -> type(serve_customer): <class 'function'>`,
        `${now} -> inspect.iscoroutinefunction(cook_spaghetti): False`,
        `${now} -> inspect.iscoroutinefunction(serve_customer): True`
      );
    } else if (num === "02") {
      logs.push(
        `${now} -> Calling serve_customer('A')...`,
        `${now} -> Coroutine object created: <coroutine object serve_customer at 0x00000294FC1C5B60>`,
        `${now} -> Note that 'Cooking for A...' was not printed yet because it has not run.`,
        `RuntimeWarning: coroutine 'serve_customer' was never awaited`
      );
    } else if (num === "03") {
      logs.push(
        `${now} -> Creating coroutine object...`,
        `${now} -> Running the coroutine object using asyncio.run()...`,
        `${now} -> Cooking for A...`,
        `${now} -> Served A!`,
        `${now} -> Coroutine finished. Returned value: Spaghetti for A`,
        `Total Operation Time: 1.02 seconds`
      );
    } else if (num === "04") {
      logs.push(
        `${now} -> Main: Starting to serve Customer A`,
        `${now} -> Cooking for A...`,
        `${now} -> Served A!`,
        `Total Operation Time: 1.01 seconds`
      );
    } else if (num === "05") {
      logs.push(
        `${now} -> Cooking for A...`,
        `${now} -> Served A!`,
        `${now} -> Cooking for B...`,
        `${now} -> Served B!`,
        `Total Time: 2.02 seconds`
      );
    } else if (num === "06") {
      logs.push(
        `${now} -> Main program can do other things while Task A runs in background.`,
        `${now} -> Starting cooking for Customer A...`,
        `${now} -> Finished cooking for Customer A!`,
        `Total Operation Time: 1.00 seconds`
      );
    } else if (num === "07") {
      logs.push(
        `${now} -> Starting cooking for Customer A...`,
        `${now} -> Starting cooking for Customer B...`,
        `${now} -> Finished cooking for Customer A!`,
        `${now} -> Finished cooking for Customer B!`,
        `Total Operation Time: 1.00 seconds`
      );
    } else if (num === "08") {
      logs.push(
        `${now} -> [Chef] puts noodle in boiling water...`,
        `${now} -> [Bar] starts grinding coffee bean...`,
        `${now} -> [Chef] strains the noodle!`,
        `${now} -> [Bar] pours espresso shot!`
      );
    } else if (num === "09") {
      logs.push(
        `${now} -> Handling customer A`,
        `${now} -> Handling customer B`,
        `${now} -> Handling customer C`,
        `${now} -> Handling customer D`,
        `${now} -> Done customer A`,
        `${now} -> Done customer B`,
        `${now} -> Done customer C`,
        `${now} -> Done customer D`,
        `Served all 4 customers in 1.01 seconds.`
      );
    } else {
      logs.push(
        `Calculating receipt for Customer A...`,
        `Calculating receipt for Customer B...`,
        `Final Bill A: 107.00`,
        `Final Bill B: 214.00`,
        `Combined Total Revenue: 321.00`
      );
    }
  } else if (script.startsWith("restaurant")) {
    if (script.includes("simple")) {
      logs.push(
        `${now} Greeting for Customer-A ...`,
        `${now} Greeting for Customer-A ...Done!`,
        `${now} Taking Order for Customer-A ...`,
        `${now} Taking Order for Customer-A ...Done!`,
        `${now} Cooking for Customer-A ...`,
        `${now} Cooking for Customer-A ...Done!`,
        `${now} Mini Bar for Customer-A ...`,
        `${now} Mini Bar for Customer-A ...Done!`,
        `${now} Greeting for Customer-B ...`,
        `${now} Greeting for Customer-B ...Done!`,
        `${now} Finished Cooking in 12.00 seconds.`
      );
    } else if (script.includes("thread")) {
      logs.push(
        `${now} Greeting for Customer-A ...`,
        `${now} Greeting for Customer-A ...Done!`,
        `${now} Greeting for Customer-B ...`,
        `${now} Greeting for Customer-B ...Done!`,
        `${now} Greeting for Customer-C ...`,
        `${now} Greeting for Customer-C ...Done!`,
        `${now} --- All customers greeted. Scheduling independent Threads! ---`,
        `${now}  [Thread-A] Taking Order ...`,
        `${now}  [Thread-B] Taking Order ...`,
        `${now}  [Thread-C] Taking Order ...`,
        `${now}  [Thread-A] Taking Order ...Done!`,
        `${now}  [Thread-A] Cooking Spaghetti ...`,
        `${now}  [Thread-B] Taking Order ...Done!`,
        `${now}  [Thread-B] Cooking Spaghetti ...`,
        `${now}  [Thread-C] Taking Order ...Done!`,
        `${now}  [Thread-C] Cooking Spaghetti ...`,
        `${now}  [Thread-A] Cooking Spaghetti ...Done!`,
        `${now}  [Thread-A] Manage Bar for Drink ...`,
        `${now}  [Thread-B] Cooking Spaghetti ...Done!`,
        `${now}  [Thread-B] Manage Bar for Drink ...`,
        `${now}  [Thread-C] Cooking Spaghetti ...Done!`,
        `${now}  [Thread-C] Manage Bar for Drink ...`,
        `${now}  [Thread-A] Manage Bar for Drink ...Done!`,
        `${now}  [Thread-A] All served!`,
        `${now}  [Thread-B] Manage Bar for Drink ...Done!`,
        `${now}  [Thread-B] All served!`,
        `${now}  [Thread-C] Manage Bar for Drink ...Done!`,
        `${now}  [Thread-C] All served!`,
        `${now} Finished Cooking in 4.02 seconds.`
      );
    } else {
      // multiprocess / asyncio restaurant
      logs.push(
        `${now} Greeting for Customer-A ...`,
        `${now} Greeting for Customer-A ...Done!`,
        `${now} Greeting for Customer-B ...`,
        `${now} Greeting for Customer-B ...Done!`,
        `${now} Greeting for Customer-C ...`,
        `${now} Greeting for Customer-C ...Done!`,
        `${now} --- Greeted all customers. Handling orders concurrently ---`,
        `${now} Taking Order for Customer-A ...`,
        `${now} Taking Order for Customer-B ...`,
        `${now} Taking Order for Customer-C ...`,
        `${now} Taking Order for Customer-A ...Done!`,
        `${now} Cooking for Customer-A ...`,
        `${now} Taking Order for Customer-B ...Done!`,
        `${now} Cooking for Customer-B ...`,
        `${now} Taking Order for Customer-C ...Done!`,
        `${now} Cooking for Customer-C ...`,
        `${now} Cooking for Customer-A ...Done!`,
        `${now} Mini Bar for Customer-A ...`,
        `${now} Cooking for Customer-B ...Done!`,
        `${now} Mini Bar for Customer-B ...`,
        `${now} Cooking for Customer-C ...Done!`,
        `${now} Mini Bar for Customer-C ...`,
        `${now} Mini Bar for Customer-A ...Done!`,
        `${now} Mini Bar for Customer-B ...Done!`,
        `${now} Mini Bar for Customer-C ...Done!`,
        `${now} Finished Cooking in 4.01 seconds.`
      );
    }
  }

  logs.push(`[Process exited with code 0]`);
  return logs;
}

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
    const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        if (isVercel) {
          // Stream mock logs with slight delays to simulate progress
          const mockLogs = getMockLogs(folder, script);
          for (const log of mockLogs) {
            const payload = JSON.stringify({ type: "stdout", data: log }) + "\n";
            controller.enqueue(encoder.encode(payload));
            // Add a small 250ms delay between lines to animate nicely
            await new Promise((resolve) => setTimeout(resolve, 250));
          }
          controller.close();
          return;
        }

        try {
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

          pyProcess.on("error", async (err) => {
            // If spawning fails (e.g. Python not installed/configured in system), fallback to mock logs
            const mockLogs = getMockLogs(folder, script);
            const warningMsg = `[SERVER WARNING] Failed to execute Python: ${err.message}. Switched to simulated fallback.`;
            controller.enqueue(encoder.encode(JSON.stringify({ type: "stdout", data: warningMsg }) + "\n"));
            
            for (const log of mockLogs) {
              const payload = JSON.stringify({ type: "stdout", data: log }) + "\n";
              controller.enqueue(encoder.encode(payload));
              await new Promise((resolve) => setTimeout(resolve, 250));
            }
            controller.close();
          });
        } catch (spawnErr: any) {
          // Catch any sync spawning errors and fallback
          const mockLogs = getMockLogs(folder, script);
          for (const log of mockLogs) {
            const payload = JSON.stringify({ type: "stdout", data: log }) + "\n";
            controller.enqueue(encoder.encode(payload));
            await new Promise((resolve) => setTimeout(resolve, 250));
          }
          controller.close();
        }
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
