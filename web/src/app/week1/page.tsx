"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, RotateCcw, Cpu, Clock, HardDrive, Terminal as TermIcon, FileCode, CheckCircle, HelpCircle, ArrowLeft } from "lucide-react";

type Scenario = "coffee" | "pid" | "ps" | "up";
type Mode = "synchronous" | "thread" | "multiprocess" | "asyncio";

interface CustomerState {
  name: string;
  status: "idle" | "waiting" | "cooking" | "lcd" | "done";
  workerId?: string;
  pid?: string;
  tid?: string;
}

interface WorkerState {
  id: string;
  name: string;
  activeCustomer?: string;
  type: "thread" | "process" | "eventloop";
}

interface RunResult {
  mode: Mode;
  wallTime: number;
  cpuTime: number;
  memory: number;
}

export default function Week1() {
  const [scenario, setScenario] = useState<Scenario>("coffee");
  const [mode, setMode] = useState<Mode>("synchronous");
  const [code, setCode] = useState<string>("");
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [terminalText, setTerminalText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  
  // Animation states
  const [customers, setCustomers] = useState<CustomerState[]>([
    { name: "A", status: "idle" },
    { name: "B", status: "idle" },
    { name: "C", status: "idle" },
  ]);
  const [workers, setWorkers] = useState<WorkerState[]>([]);
  const [activePids, setActivePids] = useState<{pid: string, tid: string, threadName: string, customer: string}[]>([]);
  
  // Resource metrics
  const [metrics, setMetrics] = useState<{
    wallTime?: string;
    cpuTime?: string;
    memory?: string;
  }>({});
  
  // Comparison history
  const [history, setHistory] = useState<Record<Scenario, Partial<Record<Mode, RunResult>>>>({
    coffee: {},
    pid: {},
    ps: {},
    up: {},
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Map selections to actual file names
  const getFileName = (scen: Scenario, md: Mode): string => {
    const prefixMap: Record<Scenario, string> = {
      coffee: "coffee",
      pid: "pid",
      ps: "ps",
      up: "up",
    };
    const numMap: Record<Mode, string> = {
      synchronous: "01_synchronous",
      thread: "02_thread",
      multiprocess: "03_multiprocess",
      asyncio: "04_asyncio",
    };
    return `${prefixMap[scen]}${numMap[md]}.py`;
  };

  // Load code on selection change
  useEffect(() => {
    async function loadCode() {
      setIsLoadingCode(true);
      setErrorText("");
      try {
        const response = await fetch("/api/code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            folder: "Week1",
            script: getFileName(scenario, mode),
          }),
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
  }, [scenario, mode]);

  // Scroll terminal to bottom when logs update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const resetAnimation = () => {
    setCustomers([
      { name: "A", status: "idle" },
      { name: "B", status: "idle" },
      { name: "C", status: "idle" },
    ]);
    setWorkers([]);
    setActivePids([]);
    setMetrics({});
  };

  // Parse lines to drive animations
  const parseLogLine = (line: string) => {
    // 1. Reset check
    if (line.includes("=== เริ่มระบบ") || line.includes("Coffee Machine")) {
      resetAnimation();
      return;
    }

    // 2. Coffee shop animations
    if (scenario === "coffee" || scenario === "pid" || scenario === "ps") {
      // Parse PID & TID details if present:
      // "Wed Jul  1 11:27:22 2026 | [PID: 123] [TID: 456] [Thread Name: Thread-A] กำลังชงกาแฟให้ ลูกค้า A..."
      const pidMatch = line.match(/\[PID:\s*(\d+)\]\s*\[TID:\s*(\d+)\]\s*\[Thread Name:\s*([^\]]+)\]/);
      
      // Look for starting brew
      if (line.includes("กำลังชงกาแฟให้") || line.includes("Making coffee for")) {
        const custMatch = line.match(/(?:ลูกค้า|Customer|customer)\s*([A-C])/);
        if (custMatch) {
          const custName = custMatch[1];
          let workerName = "Main Thread";
          let pidVal = "MAIN";
          let tidVal = "MAIN";

          if (pidMatch) {
            pidVal = pidMatch[1];
            tidVal = pidMatch[2];
            workerName = pidMatch[3];

            // Add to active PIDs list
            setActivePids(prev => {
              if (prev.some(p => p.customer === custName)) return prev;
              return [...prev, { pid: pidVal, tid: tidVal, threadName: workerName, customer: custName }];
            });
          }

          // Register worker
          const workerId = pidMatch ? tidVal : "main_worker";
          setWorkers(prev => {
            if (prev.some(w => w.id === workerId)) {
              return prev.map(w => w.id === workerId ? { ...w, activeCustomer: custName } : w);
            }
            return [...prev, {
              id: workerId,
              name: workerName,
              activeCustomer: custName,
              type: mode === "multiprocess" ? "process" : mode === "thread" ? "thread" : "eventloop"
            }];
          });

          // Update customer state
          setCustomers(prev => prev.map(c => c.name === custName ? { ...c, status: "cooking", workerId } : c));
        }
      }

      // Look for finished brew
      if (line.includes("ได้รับกาแฟแล้ว!") || line.includes("Coffee ready for")) {
        const custMatch = line.match(/(?:ลูกค้า|Customer)\s*([A-C])/);
        if (custMatch) {
          const custName = custMatch[1];
          setCustomers(prev => prev.map(c => c.name === custName ? { ...c, status: "done" } : c));
          
          // Free workers
          setWorkers(prev => prev.map(w => w.activeCustomer === custName ? { ...w, activeCustomer: undefined } : w));
          // Remove from active PIDs
          setActivePids(prev => prev.filter(p => p.customer !== custName));
        }
      }
    }

    // 3. LCD upload animations (Scenario: up)
    if (scenario === "up") {
      // "LCD: Processing for customer A..."
      if (line.includes("LCD: Processing for customer")) {
        const custMatch = line.match(/customer\s*([A-C])/);
        if (custMatch) {
          const custName = custMatch[1];
          setCustomers(prev => prev.map(c => c.name === custName ? { ...c, status: "lcd" } : c));
        }
      }
      
      // "LCD: Done for customer A."
      if (line.includes("LCD: Done for customer")) {
        const custMatch = line.match(/customer\s*([A-C])/);
        if (custMatch) {
          const custName = custMatch[1];
          setCustomers(prev => prev.map(c => c.name === custName ? { ...c, status: "done" } : c));
        }
      }

      // "Making coffee for A..."
      if (line.includes("Making coffee for")) {
        const custMatch = line.match(/for\s*([A-C])/);
        if (custMatch) {
          const custName = custMatch[1];
          setCustomers(prev => prev.map(c => c.name === custName ? { ...c, status: "cooking" } : c));
        }
      }
    }

    // 4. Summaries (ps stats)
    if (line.includes("เวลาที่ใช้จริง") || line.includes("Wall Time") || line.includes("Total time")) {
      const match = line.match(/([\d\.]+)\s*(?:วินาที|seconds)/);
      if (match) setMetrics(prev => ({ ...prev, wallTime: match[1] }));
    }
    if (line.includes("เวลาที่ CPU ใช้ประมวลผลจริง") || line.includes("CPU Time")) {
      const match = line.match(/([\d\.]+)\s*วินาที/);
      if (match) setMetrics(prev => ({ ...prev, cpuTime: match[1] }));
    }
    if (line.includes("ทรัพยากร Memory") || line.includes("RAM")) {
      const match = line.match(/([\d\.]+)\s*MB/);
      if (match) setMetrics(prev => ({ ...prev, memory: match[1] }));
    }
  };

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setTerminalText("");
    setErrorText("");
    resetAnimation();

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder: "Week1",
          script: getFileName(scenario, mode),
        }),
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
              parseLogLine(parsed.data);
            } else if (parsed.type === "exit") {
              setLogs(prev => [...prev, `[Process exited with code ${parsed.code}]`]);
            } else if (parsed.type === "error") {
              setErrorText(parsed.message);
            }
          } catch (e) {
            // Not JSON
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

  // Log final metrics to comparison history
  useEffect(() => {
    if (!isRunning && metrics.wallTime) {
      const wall = parseFloat(metrics.wallTime);
      const cpu = metrics.cpuTime ? parseFloat(metrics.cpuTime) : 0;
      const mem = metrics.memory ? parseFloat(metrics.memory) : 0;

      setHistory(prev => {
        const updatedScenario = { ...prev[scenario] };
        updatedScenario[mode] = {
          mode,
          wallTime: wall,
          cpuTime: cpu,
          memory: mem,
        };
        return { ...prev, [scenario]: updatedScenario };
      });
    }
  }, [isRunning, metrics]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <span className="font-mono text-xs text-cyan-500 tracking-wider">MODULE // 01</span>
              <h1 className="text-md font-bold tracking-tight text-white">CONCURRENCY ENGINES</h1>
            </div>
          </div>
          <div className="flex gap-2">
            {(["coffee", "pid", "ps", "up"] as Scenario[]).map(scen => (
              <button
                key={scen}
                onClick={() => setScenario(scen)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono border transition-all ${
                  scenario === scen
                    ? "bg-cyan-950 border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {scen.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow w-full">
        {/* Left Side: Control Panel & Terminal */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Engine Selector */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm">
            <h2 className="text-sm font-bold tracking-wider text-zinc-400 font-mono mb-4">
              SELECT CONCURRENCY MODE
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(["synchronous", "thread", "multiprocess", "asyncio"] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 group relative overflow-hidden ${
                    mode === m
                      ? "bg-cyan-950/30 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.08)]"
                      : "bg-zinc-900/50 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  <span className="text-xs font-mono font-bold capitalize">{m}</span>
                  <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 line-clamp-1">
                    {m === "synchronous" && "คิวเดี่ยว ทำทีละคน"}
                    {m === "thread" && "คิวแยก (Threads)"}
                    {m === "multiprocess" && "กระบวนการแยก (PIDs)"}
                    {m === "asyncio" && "สลับงานอัจฉริยะ (GIL-free)"}
                  </span>
                </button>
              ))}
            </div>

            {/* Run Button */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
              >
                <Play size={16} className="fill-current" />
                <span>{isRunning ? "RUNNING..." : "LAUNCH ENGINE"}</span>
              </button>
              <button
                onClick={resetAnimation}
                disabled={isRunning}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-750 text-zinc-400 hover:text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Real-time Terminal */}
          <div className="flex-grow flex flex-col rounded-2xl border border-zinc-800 bg-black overflow-hidden h-[300px] lg:h-[400px]">
            <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <TermIcon size={12} className="text-cyan-400" />
                CONSOLE OUTPUT (Week1/{getFileName(scenario, mode)})
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
            </div>
            <div className="p-4 flex-grow overflow-y-auto font-mono text-xs text-zinc-300 space-y-1 scrollbar-thin scrollbar-thumb-zinc-850">
              {logs.length === 0 && !errorText && (
                <span className="text-zinc-600 italic">Waiting for engine execution logs...</span>
              )}
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes("[Process exited")
                      ? "text-zinc-500 border-t border-zinc-900/50 pt-1"
                      : log.includes("Done") || log.includes("ได้รับกาแฟ")
                      ? "text-emerald-400"
                      : log.includes("กำลังชง") || log.includes("Processing")
                      ? "text-cyan-400"
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

        {/* Right Side: Game-like Simulator & Code View */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Simulator Panel */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/10 min-h-[350px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-600">
              VISUALIZATOR v1.0.0
            </div>
            
            <div>
              <h2 className="text-sm font-bold tracking-wider text-zinc-400 font-mono mb-6 flex items-center gap-2">
                <Cpu size={16} className="text-cyan-500" />
                {scenario === "coffee" && "COFFEE SHOP SIMULATOR"}
                {scenario === "pid" && "PROCESS & THREAD MONITOR"}
                {scenario === "ps" && "RESOURCE CONSUMPTION GRAPH"}
                {scenario === "up" && "SUB-TASK CONCURRENCY TIMELINE"}
              </h2>

              {/* Simulation workspace */}
              <div className="bg-zinc-950/80 rounded-xl border border-zinc-900 p-6 min-h-[220px] flex items-center justify-center relative">
                
                {/* 1. Coffee Shop Simulation */}
                {scenario === "coffee" && (
                  <div className="w-full flex flex-col gap-8">
                    {/* Customer Row */}
                    <div className="flex justify-around items-center">
                      {customers.map((cust, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border transition-all duration-300 relative ${
                              cust.status === "done"
                                ? "bg-emerald-950 border-emerald-500 text-emerald-400"
                                : cust.status === "cooking"
                                ? "bg-cyan-950 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-pulse"
                                : "bg-zinc-900 border-zinc-800 text-zinc-500"
                            }`}
                          >
                            {cust.name}
                            {cust.status === "cooking" && (
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono uppercase text-zinc-500">
                            {cust.status === "idle" && "Waiting"}
                            {cust.status === "cooking" && "Brewing..."}
                            {cust.status === "done" && "Served!"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Connection Arrows or State indicator */}
                    <div className="flex justify-center items-center h-4">
                      {isRunning ? (
                        <div className="text-xs text-cyan-500/70 font-mono tracking-widest animate-pulse">
                          {mode === "synchronous" && "PROCESSING SEQUENTIALLY..."}
                          {mode === "thread" && "THREADS EXECUTING PARALLEL..."}
                          {mode === "multiprocess" && "PROCESSES FORKED PARALLEL..."}
                          {mode === "asyncio" && "ASYNC EVENT LOOP INTERLEAVING..."}
                        </div>
                      ) : (
                        <div className="text-xs text-zinc-600 font-mono">STANDBY</div>
                      )}
                    </div>

                    {/* Workers Row */}
                    <div className="flex justify-around items-center bg-zinc-900/30 border border-zinc-900/60 p-4 rounded-xl">
                      {workers.length === 0 ? (
                        <div className="text-xs text-zinc-600 italic">No active workers. Launch to initialize.</div>
                      ) : (
                        workers.map((w, idx) => (
                          <div key={idx} className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-cyan-500/10 bg-cyan-950/10">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
                            <div className="flex flex-col text-left">
                              <span className="text-xs font-mono font-bold text-zinc-300">{w.name}</span>
                              <span className="text-[9px] font-mono text-cyan-500">
                                {w.activeCustomer ? `Serving Client: ${w.activeCustomer}` : "Idle"}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Process / Thread ID monitor */}
                {scenario === "pid" && (
                  <div className="w-full flex flex-col gap-4">
                    <h3 className="text-xs font-bold font-mono text-zinc-500 border-b border-zinc-900 pb-2">
                      ACTIVE PID/TID REGISTRATION TABLE
                    </h3>
                    <div className="overflow-auto max-h-[160px] font-mono text-xs">
                      <table className="w-full text-left text-zinc-400">
                        <thead>
                          <tr className="text-[10px] text-zinc-600 uppercase border-b border-zinc-900">
                            <th className="py-1">Customer</th>
                            <th className="py-1">OS PID</th>
                            <th className="py-1">Thread TID</th>
                            <th className="py-1">Worker Name</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/50">
                          {activePids.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="py-4 text-center text-zinc-700 italic">
                                Run scripts to capture operating system PID/TID metrics...
                              </td>
                            </tr>
                          ) : (
                            activePids.map((p, idx) => (
                              <tr key={idx} className="text-cyan-400 hover:bg-cyan-950/10">
                                <td className="py-1.5 font-bold">Client-{p.customer}</td>
                                <td className="py-1.5 text-zinc-300">{p.pid}</td>
                                <td className="py-1.5 text-purple-400">{p.tid}</td>
                                <td className="py-1.5 text-zinc-400">{p.threadName}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. PS Resource Metrics Chart */}
                {scenario === "ps" && (
                  <div className="w-full flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl text-center">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center justify-center gap-1">
                          <Clock size={10} className="text-cyan-400" />
                          Wall Time
                        </span>
                        <div className="text-lg font-mono font-bold text-cyan-400 mt-1">
                          {metrics.wallTime ? `${metrics.wallTime}s` : "--"}
                        </div>
                      </div>
                      <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl text-center">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center justify-center gap-1">
                          <Cpu size={10} className="text-purple-400" />
                          CPU Time
                        </span>
                        <div className="text-lg font-mono font-bold text-purple-400 mt-1">
                          {metrics.cpuTime ? `${metrics.cpuTime}s` : "--"}
                        </div>
                      </div>
                      <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl text-center">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center justify-center gap-1">
                          <HardDrive size={10} className="text-emerald-400" />
                          RAM Used
                        </span>
                        <div className="text-lg font-mono font-bold text-emerald-400 mt-1">
                          {metrics.memory ? `${metrics.memory} MB` : "--"}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-zinc-500 leading-relaxed bg-zinc-900/20 p-3 rounded-lg border border-zinc-900">
                      <span className="font-semibold text-zinc-300">💡 คำแนะนำ:</span> ลองกดเลือกโหมดต่างๆ (Sync, Thread, Multiprocess, Asyncio) รันให้ครบลูป แล้วเปรียบเทียบผลลัพธ์ว่าทำไม Multiprocess ใช้ RAM เยอะสุด หรือทำไม CPU Time ถึงต่างกัน!
                    </div>
                  </div>
                )}

                {/* 4. UP Timeline */}
                {scenario === "up" && (
                  <div className="w-full flex flex-col gap-4">
                    <h3 className="text-xs font-bold font-mono text-zinc-500 border-b border-zinc-900 pb-2 uppercase">
                      Subtask Orchestrator Timeline
                    </h3>
                    <div className="space-y-3">
                      {customers.map((c, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs">
                          <span className="w-16 font-mono text-zinc-400">Client {c.name}:</span>
                          <div className="flex-grow grid grid-cols-2 gap-2 h-7">
                            {/* Coffee Step */}
                            <div
                              className={`rounded flex items-center justify-center text-[10px] font-mono border transition-all duration-300 ${
                                c.status === "cooking"
                                  ? "bg-cyan-950/40 border-cyan-500 text-cyan-400 animate-pulse font-bold"
                                  : c.status === "lcd" || c.status === "done"
                                  ? "bg-cyan-950/20 border-cyan-800/40 text-cyan-600"
                                  : "bg-zinc-900/20 border-zinc-900 text-zinc-700"
                              }`}
                            >
                              Make Coffee
                            </div>
                            
                            {/* LCD Step */}
                            <div
                              className={`rounded flex items-center justify-center text-[10px] font-mono border transition-all duration-300 ${
                                c.status === "lcd"
                                  ? "bg-purple-950/40 border-purple-500 text-purple-400 animate-pulse font-bold"
                                  : c.status === "done"
                                  ? "bg-purple-950/20 border-purple-800/40 text-purple-600"
                                  : "bg-zinc-900/20 border-zinc-900 text-zinc-700"
                              }`}
                            >
                              Update LCD
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Metrics HUD summary */}
            <div className="mt-4 border-t border-zinc-900 pt-4 flex justify-between text-xs font-mono text-zinc-500">
              <div>
                <span>STATUS: </span>
                <span className={isRunning ? "text-cyan-400 font-bold" : "text-zinc-600"}>
                  {isRunning ? "RUNNING" : "READY"}
                </span>
              </div>
              <div>
                <span>WALL TIME: </span>
                <span className="text-zinc-300 font-bold">{metrics.wallTime ? `${metrics.wallTime}s` : "0.00s"}</span>
              </div>
            </div>
          </div>

          {/* Scenario Comparison History Dashboard */}
          {Object.keys(history[scenario]).length > 0 && (
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm">
              <h3 className="text-xs font-bold font-mono text-zinc-500 border-b border-zinc-900 pb-2 mb-4 uppercase">
                LAB HISTORY COMPARISON ({scenario.toUpperCase()})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(["wallTime", "cpuTime", "memory"] as const).map(metricKey => {
                  const items = Object.entries(history[scenario]).filter(([_, val]) => val !== undefined) as [Mode, RunResult][];
                  if (items.length === 0) return null;
                  
                  // Don't show CPU Time or memory for "coffee" or "up" since they aren't calculated or are negligible
                  if (metricKey === "cpuTime" && (scenario === "coffee" || scenario === "up")) return null;
                  if (metricKey === "memory" && (scenario === "coffee" || scenario === "up")) return null;
                  
                  const labelMap = {
                    wallTime: "Wall Time (วินาที - ยิ่งน้อยยิ่งดี)",
                    cpuTime: "CPU Time (วินาที)",
                    memory: "Memory Usage (MB)",
                  };

                  const maxVal = Math.max(...items.map(([_, data]) => data[metricKey] || 0.1), 0.1);

                  return (
                    <div key={metricKey} className="space-y-3 bg-zinc-950/40 p-4 rounded-xl border border-zinc-900">
                      <span className="text-[10px] font-mono text-zinc-400 block">{labelMap[metricKey]}</span>
                      <div className="space-y-2">
                        {items.map(([modeName, data]) => {
                          const val = data[metricKey] || 0;
                          const percent = Math.min((val / maxVal) * 100, 100);
                          return (
                            <div key={modeName} className="space-y-1">
                              <div className="flex justify-between text-[9px] font-mono">
                                <span className="capitalize">{modeName}</span>
                                <span className="font-bold">{val.toFixed(2)}</span>
                              </div>
                              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    modeName === "asyncio"
                                      ? "bg-cyan-500"
                                      : modeName === "thread"
                                      ? "bg-purple-500"
                                      : modeName === "multiprocess"
                                      ? "bg-amber-500"
                                      : "bg-zinc-600"
                                  }`}
                                  style={{ width: `${percent}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Script Code Viewer */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-950/50 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <FileCode size={12} className="text-cyan-500" />
                SOURCE CODE (Week1/{getFileName(scenario, mode)})
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 bg-zinc-950/30 max-h-[300px] leading-relaxed scrollbar-thin scrollbar-thumb-zinc-850">
              {isLoadingCode ? (
                <span className="text-zinc-600 italic">Loading script source...</span>
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
