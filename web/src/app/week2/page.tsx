"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, RotateCcw, Cpu, Clock, Terminal as TermIcon, FileCode, CheckCircle, ArrowLeft, Coffee, ChefHat, HelpCircle, Utensils } from "lucide-react";

type ProgramId = 
  | "asyncio01" | "asyncio02" | "asyncio03" | "asyncio04" | "asyncio05"
  | "asyncio06" | "asyncio07" | "asyncio08" | "asyncio09" | "asyncio10"
  | "restaurant_simple" | "restaurant_thread" | "restaurant_multiprocess" | "restaurant_asyncio";

interface CustomerState {
  name: string;
  status: "idle" | "greeting" | "ordering" | "cooking" | "bar" | "done";
  stepText: string;
}

interface ConceptInfo {
  title: string;
  thaiTitle: string;
  description: string;
  thaiDescription: string;
  keyPoints: string[];
}

const CONCEPTS: Record<string, ConceptInfo> = {
  asyncio01: {
    title: "1. The First Coroutine Function",
    thaiTitle: "1. ฟังก์ชันคอรูทีนแรก",
    description: "Understanding async def and how it differs from a normal function.",
    thaiDescription: "เรียนรู้การประกาศฟังก์ชันแบบไม่ประสานเวลาด้วยคีย์เวิร์ด async def และความต่างจากฟังก์ชันธรรมดา",
    keyPoints: [
      "ฟังก์ชันธรรมดาใช้ def, ฟังก์ชันแบบอะซิงโครนัสใช้ async def",
      "inspect.iscoroutinefunction() จะระบุว่าฟังก์ชันนี้เป็นคอรูทีนฟังก์ชัน",
      "การเรียกใช้คอรูทีนจะไม่รันโค้ดทันที แต่จะคืนค่าเป็น Coroutine Object",
    ]
  },
  asyncio02: {
    title: "2. Coroutine Object",
    thaiTitle: "2. อ็อบเจกต์คอรูทีน",
    description: "Calling an async def function returns a coroutine object, it doesn't run the function yet.",
    thaiDescription: "การเรียกฟังก์ชัน async จะส่งกลับอ็อบเจกต์คอรูทีน แต่ยังไม่ได้รันตัวฟังก์ชันจริง",
    keyPoints: [
      "หากรันโค้ดโดยไม่รอ (await) จะเกิด RuntimeWarning: coroutine was never awaited",
      "inspect.iscoroutine() ใช้ตรวจสอบว่าอ็อบเจกต์ที่ส่งกลับมานั้นเป็นคอรูทีนหรือไม่",
      "ตัวโค้ดด้านในจะยังไม่ถูกประมวลผลจนกว่าจะนำเข้าไปรันใน Event Loop",
    ]
  },
  asyncio03: {
    title: "3. Event Loop (asyncio.run)",
    thaiTitle: "3. ลูปเหตุการณ์ (Event Loop)",
    description: "Using the event loop to execute a coroutine object to completion.",
    thaiDescription: "การใช้งาน Event Loop ผ่านคำสั่ง asyncio.run() เพื่อสั่งรันคอรูทีนให้จบกระบวนการ",
    keyPoints: [
      "asyncio.run(coro) เป็นจุดเริ่มต้นหลักในการเปิด Event Loop เพื่อรันคอรูทีนหลัก",
      "ลูปจะบริหารคิวงานและจัดการประมวลผลคำสั่งจนกว่าจะเสร็จสิ้น",
      "ใช้สำหรับรันจุดเริ่มต้นของโปรแกรม Async เท่านั้น (หลีกเลี่ยงการเรียกซ้อนกัน)",
    ]
  },
  asyncio04: {
    title: "4. The await keyword",
    thaiTitle: "4. คีย์เวิร์ด await",
    description: "Pausing execution of a coroutine to let other tasks run, using await.",
    thaiDescription: "การใช้ await เพื่อหยุดการทำงานของคอรูทีนชั่วคราวและเปิดโอกาสให้คอรูทีนอื่นทำงาน",
    keyPoints: [
      "await ใช้ได้เฉพาะภายในฟังก์ชัน async def เท่านั้น",
      "เมื่อเจอคำสั่ง await ลูปจะสามารถสลับไปรันคอรูทีนอื่นที่รอคิวอยู่ได้",
      "คำสั่ง asyncio.sleep(1) จำลองการรอทำงานโดยไม่มีการบล็อกเธรด",
    ]
  },
  asyncio05: {
    title: "5. Sequential Execution (The Wrong Way)",
    thaiTitle: "5. การรันแบบเรียงลำดับ (วิธีที่ไม่เต็มประสิทธิภาพ)",
    description: "Awaiting coroutines sequentially is still synchronous.",
    thaiDescription: "การใช้ await ทีละบรรทัดต่อกันตรงๆ จะทำให้ทำงานแบบทีละตัว (Synchronous) อยู่ดี",
    keyPoints: [
      "หากเขียน await Task1 แล้วต่อด้วย await Task2 ระบบจะรอ Task1 เสร็จก่อนจึงเริ่ม Task2",
      "วิธีนี้ไม่ได้ช่วยให้เกิดการทำงานแบบพร้อมกัน (Concurrency)",
      "เหมาะสำหรับงานที่ต้องทำตามลำดับขั้นตอนและผลลัพธ์ของ 1 ต้องใช้ต่อใน 2",
    ]
  },
  asyncio06: {
    title: "6. Concurrent Task Creation",
    thaiTitle: "6. การสร้างงานแบบทำงานร่วมกัน (Create Task)",
    description: "Wrapping a coroutine in asyncio.create_task() registers it on the event loop to run concurrently.",
    thaiDescription: "การห่อหุ้มคอรูทีนด้วยคำสั่ง asyncio.create_task() เพื่อจดทะเบียนงานลงใน Event Loop",
    keyPoints: [
      "asyncio.create_task(coro) จะจัดตารางงานให้เริ่มรันในเบื้องหลังทันที",
      "โปรแกรมหลักสามารถทำงานบรรทัดต่อไปได้ทันทีโดยไม่ต้องรอให้ Task นั้นเสร็จก่อน",
      "ต้องระวังการหลุดการดักจับข้อยกเว้นหากไม่ await ปิดท้ายงาน",
    ]
  },
  asyncio07: {
    title: "7. Concurrent Tasks (Dual Tasks)",
    thaiTitle: "7. การประมวลผลงานคู่ขนานสองงาน",
    description: "Scheduling multiple concurrent tasks and awaiting them.",
    thaiDescription: "การกำหนดตารางงานหลายงานให้รันไปพร้อมๆ กันและใช้คำสั่ง await รอผลลัพธ์ทั้งหมด",
    keyPoints: [
      "การสร้าง 2 Tasks แล้วจึง await ภายหลัง จะทำให้งานทั้งสองเริ่มทำงานพร้อมกัน",
      "เวลาทำงานรวมจะเท่ากับเวลางานที่นานที่สุด แทนที่จะนำมารวมกัน",
      "สามารถนำไปประยุกต์ใช้เพื่อดึงข้อมูลจากสองแหล่งพร้อมกันได้",
    ]
  },
  asyncio08: {
    title: "8. Interleaving Tasks (Context Switching)",
    thaiTitle: "8. การสลับลำดับงาน (Context Switching)",
    description: "Demonstrating how single-threaded event loop switches execution context between tasks.",
    thaiDescription: "แสดงการสลับตารางงานบน Thread เดียว เมื่อคอรูทีนหนึ่งเกิดการรอก็จะส่งต่อให้งานถัดไป",
    keyPoints: [
      "Event loop ทำงานบนเธรดหลักตัวเดียวเท่านั้น ไม่ได้มีหลายคอร์ทำงานขนานจริง",
      "การสลับงานเกิดขึ้นเมื่อเจอคำสั่ง await ที่มีลักษณะเป็น Non-blocking I/O",
      "ช่วยลดจำนวนทรัพยากรการสร้าง Thread เมื่อต้องการรันสเกลใหญ่",
    ]
  },
  asyncio09: {
    title: "9. Dynamic Task List",
    thaiTitle: "9. รายการตารางงานแบบไดนามิก",
    description: "Managing multiple tasks in a list and awaiting them.",
    thaiDescription: "การรวบรวมงานจำนวนมากไว้ในอาเรย์/ลิสต์ แล้ววนลูปทำงานพร้อมกันแบบรวดเร็ว",
    keyPoints: [
      "สามารถวนลูปสร้างคิวงานตามความยาวข้อมูลที่ได้รับในขณะนั้น",
      "ใช้สำหรับงานสเกลที่ยืดหยุ่น เช่น การยิง HTTP request หาไอดีลูกค้า 100 คนพร้อมกัน",
      "ช่วยปรับโครงสร้างโค้ดให้อ่านง่ายและขยายขนาดแอปพลิเคชันได้ง่ายขึ้น",
    ]
  },
  asyncio10: {
    title: "10. Retrieving Task Return Value",
    thaiTitle: "10. การดึงค่าส่งกลับคืนจาก Task",
    description: "Accessing the return value of completed tasks.",
    thaiDescription: "วิธีการดึงค่า Return Value ของฟังก์ชันคอรูทีนหลังจากงานสิ้นสุดลง",
    keyPoints: [
      "การใช้ await task จะส่งคืนค่าที่คุณ return มาจากคอรูทีนโดยอัตโนมัติ",
      "สามารถใช้คำสั่ง task.result() ดึงข้อมูลภายหลังเมื่อมั่นใจว่างานเสร็จแล้ว",
      "ช่วยให้คำนวณงานที่รันคู่ขนานกันแล้วนำมารวมยอดสรุปในตอนท้ายได้",
    ]
  },
  restaurant: {
    title: "Restaurant Workflow Simulator",
    thaiTitle: "ระบบจำลองครัวภัตตาคาร",
    description: "Comparing synchronous, threading, multiprocessing, and asyncio in restaurant customer service.",
    thaiDescription: "เปรียบเทียบการจัดคิวรับรองลูกค้าในร้านอาหารด้วยโหมดการประมวลผลรูปแบบต่างๆ",
    keyPoints: [
      "Synchronous: ลูกค้า 1 คน ต้องผ่านการต้อนรับ สั่งอาหาร ชงเครื่องดื่ม และทำอาหารทีละขั้นตอนจนจบ ร้านถึงจะรับลูกค้าคนถัดไป",
      "Threading: ลูกค้าแต่ละคนได้รับบริการโดยบริกรคนละคน (Threads) รันขนานกัน",
      "Multiprocessing: เหมือนมีร้านแยกย่อย 3 ร้านช่วยกันทำอาหาร (PIDs ต่างกัน)",
      "Asyncio: บริกรคนเดียวสลับการบริการอย่างชาญฉลาด เมื่อเอาอาหารไปต้มก็สลับไปรับออเดอร์อีกคน",
    ]
  }
};

export default function Week2() {
  const [activeTab, setActiveTab] = useState<ProgramId>("asyncio01");
  const [code, setCode] = useState<string>("");
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [terminalText, setTerminalText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  // Restaurant animation state
  const [restaurantClients, setRestaurantClients] = useState<CustomerState[]>([
    { name: "A", status: "idle", stepText: "Waiting" },
    { name: "B", status: "idle", stepText: "Waiting" },
    { name: "C", status: "idle", stepText: "Waiting" },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const isRestaurant = activeTab.startsWith("restaurant");

  // Get python filename based on tab
  const getScriptPath = (tab: ProgramId): { folder: string; file: string } => {
    if (tab.startsWith("restaurant")) {
      const mode = tab.replace("restaurant_", "");
      return { folder: "Week2", file: `restaurant_01_${mode}.py` };
    }
    return { folder: "Week2", file: `${tab}.py` };
  };

  // Load code on tab change
  useEffect(() => {
    async function loadCode() {
      setIsLoadingCode(true);
      setErrorText("");
      const { folder, file } = getScriptPath(activeTab);
      try {
        const response = await fetch("/api/code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder, script: file }),
        });
        const data = await response.json();
        if (data.content) {
          setCode(data.content);
        } else {
          setCode("Error: " + (data.error || "Failed to load code"));
        }
      } catch (err: any) {
        setCode("Failed to load script: " + err.message);
      } finally {
        setIsLoadingCode(false);
      }
    }

    loadCode();
    resetAnimation();
  }, [activeTab]);

  // Scroll terminal to bottom when logs update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const resetAnimation = () => {
    setRestaurantClients([
      { name: "A", status: "idle", stepText: "Waiting" },
      { name: "B", status: "idle", stepText: "Waiting" },
      { name: "C", status: "idle", stepText: "Waiting" },
    ]);
  };

  // Parse stdout lines for restaurant animations
  const parseRestaurantLine = (line: string) => {
    // Standard format: "Wed Jul  1 11:27:32 2026 Greeting for Customer-A ..."
    // Thread format: "Wed Jul  1 11:27:32 2026  [Thread-A] Cooking Spaghetti ..."
    
    // Extract customer identifier (A, B, C)
    const customerMatch = line.match(/(?:Customer-|\[Thread-|for Customer-|Customer\s+)([A-C])/i);
    if (!customerMatch) return;
    const clientName = customerMatch[1].toUpperCase();

    // Map step type
    if (line.includes("Greeting") && line.includes("Done")) {
      updateClient(clientName, "ordering", "Greeted / Ordering");
    } else if (line.includes("Greeting")) {
      updateClient(clientName, "greeting", "Greeting Host...");
    } else if (line.includes("Taking Order") && line.includes("Done")) {
      updateClient(clientName, "cooking", "Order taken / Cooking");
    } else if (line.includes("Taking Order")) {
      updateClient(clientName, "ordering", "Taking Order...");
    } else if (line.includes("Cooking") && line.includes("Done")) {
      updateClient(clientName, "bar", "Food cooked / Waiting drink");
    } else if (line.includes("Cooking")) {
      updateClient(clientName, "cooking", "Chef Cooking...");
    } else if (line.includes("Mini Bar") && line.includes("Done")) {
      updateClient(clientName, "done", "Served Drink / Complete!");
    } else if (line.includes("Mini Bar") || line.includes("Manage Bar")) {
      updateClient(clientName, "bar", "Bartender preparing...");
    } else if (line.includes("All served")) {
      updateClient(clientName, "done", "All served!");
    }
  };

  const updateClient = (name: string, status: CustomerState["status"], stepText: string) => {
    setRestaurantClients(prev => prev.map(c => c.name === name ? { ...c, status, stepText } : c));
  };

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setTerminalText("");
    setErrorText("");
    resetAnimation();

    const { folder, file } = getScriptPath(activeTab);

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, script: file }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("ReadableStream not supported by browser");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const rawLine of lines) {
          if (!rawLine.trim()) continue;
          try {
            const parsed = JSON.parse(rawLine);
            if (parsed.type === "stdout" || parsed.type === "stderr") {
              setLogs(prev => [...prev, parsed.data]);
              setTerminalText(prev => prev + parsed.data + "\n");
              if (isRestaurant) {
                parseRestaurantLine(parsed.data);
              }
            } else if (parsed.type === "exit") {
              setLogs(prev => [...prev, `[Process exited with code ${parsed.code}]`]);
            } else if (parsed.type === "error") {
              setErrorText(parsed.message);
            }
          } catch (e) {
            setLogs(prev => [...prev, rawLine]);
            setTerminalText(prev => prev + rawLine + "\n");
          }
        }
      }
    } catch (err: any) {
      setErrorText(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const currentConcept = isRestaurant ? CONCEPTS.restaurant : CONCEPTS[activeTab];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-purple-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <span className="font-mono text-xs text-purple-500 tracking-wider">MODULE // 02</span>
              <h1 className="text-md font-bold tracking-tight text-white">ASYNCIO DEEP DIVE</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-full text-[10px] font-mono bg-purple-950 border border-purple-500/20 text-purple-400">
              Event Loop Diagnostics
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow w-full">
        
        {/* Left Column: Tabs list */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/10">
            <h2 className="text-[10px] font-bold tracking-wider text-zinc-500 font-mono mb-3 uppercase">
              Exercises (asyncio01-10)
            </h2>
            <div className="flex flex-col gap-1.5 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin">
              {Array.from({ length: 10 }, (_, i) => {
                const id = `asyncio${String(i + 1).padStart(2, "0")}` as ProgramId;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-3 py-2 rounded-xl text-left font-mono text-xs border transition-all ${
                      activeTab === id
                        ? "bg-purple-950/30 border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.08)]"
                        : "bg-zinc-900/40 border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    {id}.py
                  </button>
                );
              })}
            </div>

            <h2 className="text-[10px] font-bold tracking-wider text-zinc-500 font-mono mt-6 mb-3 uppercase">
              Advanced Restaurant Demos
            </h2>
            <div className="flex flex-col gap-1.5">
              {(["simple", "thread", "multiprocess", "asyncio"] as const).map(mode => {
                const id = `restaurant_${mode}` as ProgramId;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-3 py-2 rounded-xl text-left font-mono text-xs border transition-all capitalize ${
                      activeTab === id
                        ? "bg-purple-950/30 border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.08)]"
                        : "bg-zinc-900/40 border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    Restaurant ({mode})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Log Console */}
          <div className="flex-grow flex flex-col rounded-2xl border border-zinc-800 bg-black overflow-hidden min-h-[220px]">
            <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>TERMINAL STREAM</span>
              <span className={isRunning ? "w-2 h-2 rounded-full bg-purple-500 animate-ping" : "w-2 h-2 rounded-full bg-zinc-700"}></span>
            </div>
            <div className="p-4 flex-grow overflow-y-auto font-mono text-[11px] text-zinc-300 space-y-1 max-h-[300px]">
              {logs.length === 0 && !errorText && (
                <span className="text-zinc-600 italic">No output. Press Run to run script...</span>
              )}
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes("[Process exited")
                      ? "text-zinc-500 border-t border-zinc-900/50 pt-1"
                      : log.includes("Done") || log.includes("Served") || log.includes("Finished")
                      ? "text-emerald-400"
                      : log.includes("Cooking") || log.includes("Starting")
                      ? "text-purple-400"
                      : "text-zinc-300"
                  }`}
                >
                  {log}
                </div>
              ))}
              {errorText && <div className="text-rose-500 font-semibold">{errorText}</div>}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </section>

        {/* Center/Right Column: visual simulator & explainer */}
        <section className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Main Controls & Simulator */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* Visualizer panel */}
            <div className="xl:col-span-7 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/10 flex flex-col justify-between min-h-[350px]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                  <Cpu size={14} />
                  LIVE EXECUTION SIMULATION
                </span>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 text-xs font-bold font-mono transition-all shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                >
                  {isRunning ? "RUNNING..." : "RUN CODE"}
                </button>
              </div>

              {/* Simulation graphic workspace */}
              <div className="flex-grow bg-zinc-950 rounded-xl border border-zinc-900 p-6 flex flex-col items-center justify-center min-h-[220px]">
                
                {/* 1. Restaurant simulation */}
                {isRestaurant ? (
                  <div className="w-full space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {restaurantClients.map((client, idx) => (
                        <div key={idx} className="bg-zinc-900/50 border border-zinc-850 p-4 rounded-xl flex flex-col items-center gap-3 relative">
                          
                          {/* Client Avatar */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all duration-300 ${
                              client.status === "done"
                                ? "bg-emerald-950 border-emerald-500 text-emerald-400"
                                : client.status === "idle"
                                ? "bg-zinc-800 border-zinc-750 text-zinc-500"
                                : "bg-purple-950 border-purple-500 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)] animate-pulse"
                            }`}
                          >
                            {client.name}
                          </div>

                          <div className="text-center">
                            <span className="text-[10px] font-bold text-zinc-200 block">Diner-{client.name}</span>
                            <span className="text-[8px] font-mono text-zinc-500 block uppercase mt-0.5">{client.stepText}</span>
                          </div>

                          {/* Mini progress tracker */}
                          <div className="flex gap-1 mt-1.5 w-full justify-center">
                            {(["greeting", "ordering", "cooking", "bar", "done"] as const).map(step => {
                              const stepMap = {
                                idle: 0,
                                greeting: 1,
                                ordering: 2,
                                cooking: 3,
                                bar: 4,
                                done: 5,
                              };
                              const activeIndex = stepMap[client.status];
                              const currentStepIndex = stepMap[step];
                              
                              return (
                                <div
                                  key={step}
                                  className={`w-2.5 h-1 rounded-full ${
                                    client.status === "done"
                                      ? "bg-emerald-500"
                                      : currentStepIndex <= activeIndex
                                      ? "bg-purple-500"
                                      : "bg-zinc-850"
                                  }`}
                                  title={step}
                                ></div>
                              );
                            })}
                          </div>

                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono border-t border-zinc-900 pt-4 text-zinc-500">
                      <div>
                        <span className="block text-[14px]">🚪</span>
                        <span className="block font-bold">1. Reception</span>
                      </div>
                      <div>
                        <span className="block text-[14px]">📝</span>
                        <span className="block font-bold">2. Order Desk</span>
                      </div>
                      <div>
                        <span className="block text-[14px]">🍳</span>
                        <span className="block font-bold">3. Hot Kitchen</span>
                      </div>
                      <div>
                        <span className="block text-[14px]">🍸</span>
                        <span className="block font-bold">4. Drinks Bar</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // 2. Standard exercises event loop visualizer mock
                  <div className="w-full text-center space-y-4">
                    <div className="flex justify-center items-center gap-4">
                      <div className="w-14 h-14 rounded-full border border-purple-500/20 bg-purple-950/20 text-purple-400 flex items-center justify-center font-bold text-2xl relative">
                        <Cpu size={24} className={isRunning ? "animate-spin" : ""} />
                        {isRunning && (
                          <span className="absolute inset-0 rounded-full border border-dashed border-purple-400 animate-pulse"></span>
                        )}
                      </div>
                      <div className="text-left font-mono">
                        <div className="text-xs text-zinc-400">EVENT LOOP SYSTEM</div>
                        <div className="text-[10px] text-zinc-600 uppercase">
                          {isRunning ? "PROCESSING COROUTINE CORO" : "IDLE // LOOP STANDBY"}
                        </div>
                      </div>
                    </div>

                    {isRunning ? (
                      <div className="text-[10px] font-mono text-purple-400/80 animate-pulse bg-purple-950/20 py-2 border border-purple-900/30 rounded-lg max-w-sm mx-auto">
                        Executing tasks concurrently on single main thread
                      </div>
                    ) : (
                      <div className="text-[10px] font-mono text-zinc-600">
                        Select an exercise and press Run Code to trace execution
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Concept explainer cards */}
            <div className="xl:col-span-5 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-500 font-bold uppercase tracking-wider block mb-2">
                  Concept Explainer
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  {currentConcept?.thaiTitle || currentConcept?.title}
                </h3>
                <h4 className="text-xs text-purple-400 font-mono mt-1">
                  {currentConcept?.title}
                </h4>
                <p className="text-zinc-400 text-xs mt-4 leading-relaxed">
                  {currentConcept?.thaiDescription || currentConcept?.description}
                </p>

                <div className="mt-6 border-t border-zinc-800/80 pt-4 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Key Checkpoints (จุดสังเกตสำคัญ):</span>
                  <ul className="space-y-2">
                    {currentConcept?.keyPoints.map((pt, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                        <span className="text-purple-500 font-bold mt-0.5">&#8226;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {isRestaurant && (
                <div className="bg-purple-950/15 border border-purple-900/30 p-3 rounded-xl mt-6 text-[10px] text-purple-400 font-mono">
                  💡 สังเกตเวลา: ในโหมด Sync จะใช้เวลารวม 12 วินาที, ส่วน Threading และ Asyncio จะลดเหลือเพียงประมาณ 4 วินาที เพราะสามารถทำออเดอร์ขนานกันในขั้นตอนย่อยได้!
                </div>
              )}
            </div>

          </div>

          {/* Code Viewer */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-zinc-900 bg-zinc-950/50 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <FileCode size={12} className="text-purple-500" />
                SOURCE CODE (Week2/{getScriptPath(activeTab).file})
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 bg-zinc-950/30 max-h-[350px] leading-relaxed scrollbar-thin scrollbar-thumb-zinc-850">
              {isLoadingCode ? (
                <span className="text-zinc-600 italic font-sans">Loading script source...</span>
              ) : (
                code
              )}
            </pre>
          </div>

        </section>

      </main>
    </div>
  );
}
