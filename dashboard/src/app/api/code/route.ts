import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

const BASE_SCRIPTS_DIR = "D:\\My_server\\University\\3rd year\\Term_1\\Asynchronous\\async-2026";

export async function POST(req: NextRequest) {
  try {
    const { folder, script } = await req.json();

    // Safety checks
    if (!["Week1", "Week2", "WX"].includes(folder)) {
      return new Response(JSON.stringify({ error: "Invalid folder" }), { status: 400 });
    }

    if (!/^[a-zA-Z0-9_\-\.]+\.py$/.test(script)) {
      return new Response(JSON.stringify({ error: "Invalid script name" }), { status: 400 });
    }

    const filePath = path.join(BASE_SCRIPTS_DIR, folder, script);
    
    try {
      const content = await fs.readFile(filePath, "utf-8");
      return new Response(JSON.stringify({ content }), { status: 200 });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: `File not found: ${script}` }), { status: 404 });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
