"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Smartphone, Tablet, Monitor, RefreshCw, Cpu, Layers, Layout, HelpCircle, CheckCircle } from "lucide-react";

type Viewport = "mobile" | "tablet" | "desktop";

export default function ResponsiveLab() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [showBroken, setShowBroken] = useState<boolean>(false);
  const [showTouchTargets, setShowTouchTargets] = useState<boolean>(false);

  // Viewport width classes for the simulator frame
  const viewportWidths = {
    mobile: "max-w-[375px]",
    tablet: "max-w-[768px]",
    desktop: "max-w-[1200px] w-full",
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <span className="font-mono text-xs text-cyan-500 tracking-wider">MODULE // 03</span>
              <h1 className="text-md font-bold tracking-tight text-white">RESPONSIVE DESIGN LAB</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setViewport("mobile")}
              className={`p-2 rounded-lg transition-all ${
                viewport === "mobile" ? "bg-cyan-950 text-cyan-400 border border-cyan-500/20" : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Mobile (375px)"
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`p-2 rounded-lg transition-all ${
                viewport === "tablet" ? "bg-cyan-950 text-cyan-400 border border-cyan-500/20" : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Tablet (768px)"
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setViewport("desktop")}
              className={`p-2 rounded-lg transition-all ${
                viewport === "desktop" ? "bg-cyan-950 text-cyan-400 border border-cyan-500/20" : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Desktop (Full)"
            >
              <Monitor size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full space-y-12">
        
        {/* Lab Introduction */}
        <section className="p-6 rounded-2xl border border-zinc-850 bg-zinc-900/10 space-y-3">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Layout className="text-cyan-500" size={20} />
            ห้องปฏิบัติการออกแบบ Responsive Layout & Breakpoints
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
            เรียนรู้วิธีการเขียนโค้ด CSS ด้วย Tailwind CSS โดยใช้แนวทาง <strong>Mobile-First</strong> เพื่อให้หน้าเว็บขยายและจัดสัดส่วนอย่างสง่างาม
            ตั้งแต่หน้าจอโทรศัพท์ แท็บเล็ต ไปจนถึงเดสก์ท็อป ลองกดเลือกสลับปุ่ม Viewport ด้านบนเพื่อดูการยืดหดของโครงสร้างจำลองด้านล่าง
          </p>
        </section>

        {/* Section 1: Mobile-First Component (Prompt 1) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-bold text-zinc-200 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded bg-cyan-500"></span>
              แล็บที่ 1: Component Development (Mobile-First Navbar)
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">PROMPT 1</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Viewport Simulation Window */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <span className="text-xs font-mono text-zinc-500">VIEWPORT SIMULATOR FRAME ({viewport.toUpperCase()} MODE)</span>
              
              <div className="bg-zinc-900/10 border border-zinc-850 rounded-2xl p-6 min-h-[250px] flex items-center justify-center transition-all duration-300">
                <div className={`w-full bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden transition-all duration-500 ${viewportWidths[viewport]}`}>
                  
                  {/* Interactive Simulated Navbar Component */}
                  <div className="w-full bg-zinc-900 p-4 flex items-center justify-between border-b border-zinc-800 text-zinc-200">
                    <div className="flex items-center gap-2 font-bold font-mono text-sm text-cyan-400">
                      <Cpu size={16} />
                      APP_LOGO
                    </div>

                    {/* Nav Items: Hidden on mobile (sm), flex on tablet/desktop */}
                    <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
                      <span className="text-zinc-200 hover:text-white cursor-pointer">Dash</span>
                      <span className="text-zinc-500 hover:text-white cursor-pointer">Stats</span>
                      <span className="text-zinc-500 hover:text-white cursor-pointer">Logs</span>
                    </div>

                    {/* Action Button: Hidden on mobile/tablet (md), shown on desktop (lg) */}
                    <div className="hidden md:block">
                      <button className="px-3 py-1 rounded bg-cyan-500 text-zinc-950 text-xs font-bold font-mono">
                        PRO_MODE
                      </button>
                    </div>

                    {/* Hamburger Button: Shown only on mobile (below sm) */}
                    <div className="block sm:hidden text-zinc-400">
                      <span className="p-2 border border-zinc-800 rounded bg-zinc-950 text-[10px] font-mono">MENU</span>
                    </div>
                  </div>

                  {/* Simulated Content Card inside frame */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-lg text-center">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Breakpoint Status</span>
                        <div className="text-xs font-mono font-bold mt-1 text-zinc-300">
                          {viewport === "mobile" && "Mobile (< 640px)"}
                          {viewport === "tablet" && "Tablet (640px - 768px)"}
                          {viewport === "desktop" && "Desktop (>= 1024px)"}
                        </div>
                      </div>
                      <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-lg text-center">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Navbar Menu</span>
                        <div className="text-xs font-mono font-bold mt-1 text-cyan-400">
                          {viewport === "mobile" ? "Collapsed (Menu Button)" : "Expanded Menu"}
                        </div>
                      </div>
                      <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-lg text-center sm:col-span-2 md:col-span-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Action Button</span>
                        <div className="text-xs font-mono font-bold mt-1 text-purple-400">
                          {viewport === "desktop" ? "Visible" : "Hidden (Collapsed)"}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Code Explainer Column */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-wider block">HOW IT WORKS</span>
                <h4 className="text-md font-bold text-white">การควบคุมการแสดงผลของคอมโพเนนต์</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  โค้ดนี้ใช้หลักการเขียนคลาส Tailwind สเกลหน้าจอแบบ Mobile-First โดยเริ่มเขียนสถานะที่เล็กที่สุด แล้วเขียนคลาสขยายตามขนาดหน้าจอ (sm:, md:, lg:)
                </p>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono text-[10px] text-zinc-400 space-y-2">
                  <div>
                    <span className="text-cyan-400">sm:flex</span>
                    <span className="text-zinc-600 block">ซ่อนบนมือถือ เริ่มแสดงแถบรายการเมื่อหน้าจอขนาดกว้างกว่า 640px</span>
                  </div>
                  <div>
                    <span className="text-purple-400">md:block</span>
                    <span className="text-zinc-600 block">ซ่อนบนมือถือ/แท็บเล็ต แสดงปุ่มกดเมื่อกว้างกว่า 768px</span>
                  </div>
                  <div>
                    <span className="text-amber-400">sm:hidden</span>
                    <span className="text-zinc-600 block">ซ่อนปุ่ม Hamburger เมื่อเข้าสู่หน้าจอแท็บเล็ต</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 2: Layout Strategy & Grid Optimization (Prompt 2) */}
        <section className="space-y-6 border-t border-zinc-900 pt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-bold text-zinc-200 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded bg-purple-500"></span>
              แล็บที่ 2: Layout Strategy & Grid Optimization
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">PROMPT 2</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visual Grid Simulation */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-zinc-500">SIMULATED DASHBOARD GRID SYSTEM</span>
                <button
                  onClick={() => setShowTouchTargets(!showTouchTargets)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold font-mono transition-colors border ${
                    showTouchTargets 
                      ? "bg-emerald-950 border-emerald-500/30 text-emerald-400" 
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {showTouchTargets ? "HIDE TOUCH TARGETS" : "SHOW MOBILE TOUCH TARGETS"}
                </button>
              </div>

              <div className="bg-zinc-900/10 border border-zinc-850 rounded-2xl p-6 transition-all duration-300">
                <div className={`w-full bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden transition-all duration-500 mx-auto ${viewportWidths[viewport]}`}>
                  <div className="p-4 grid grid-cols-12 gap-4">
                    
                    {/* Simulated Sidebar: Hidden on Mobile, Column-span 3 on Desktop */}
                    <div className={`${
                      viewport === "mobile" 
                        ? "hidden" 
                        : viewport === "tablet" 
                        ? "col-span-12 h-12 flex items-center justify-around" 
                        : "col-span-3 h-48 flex flex-col gap-2"
                    } bg-zinc-900 border border-zinc-850 p-3 rounded-xl transition-all duration-300`}>
                      <span className="text-[10px] font-bold font-mono text-zinc-500 block uppercase">
                        {viewport === "tablet" ? "Horizontal Menu (Tablet)" : "SIDEBAR (Desktop)"}
                      </span>
                      {viewport === "desktop" && (
                        <div className="space-y-2 mt-2">
                          <div className={`h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center px-2 text-[10px] text-zinc-400 ${showTouchTargets ? "ring-2 ring-emerald-500/50" : ""}`}>Menu Item 1</div>
                          <div className={`h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center px-2 text-[10px] text-zinc-400 ${showTouchTargets ? "ring-2 ring-emerald-500/50" : ""}`}>Menu Item 2</div>
                        </div>
                      )}
                      {viewport === "tablet" && (
                        <div className="flex gap-4 w-full justify-center">
                          <span className="text-[10px] text-zinc-400 border border-zinc-800 px-3 py-1 rounded bg-zinc-950">Item 1</span>
                          <span className="text-[10px] text-zinc-400 border border-zinc-800 px-3 py-1 rounded bg-zinc-950">Item 2</span>
                        </div>
                      )}
                    </div>

                    {/* Main Content Area */}
                    <div className={`${
                      viewport === "mobile" 
                        ? "col-span-12" 
                        : viewport === "tablet" 
                        ? "col-span-12" 
                        : "col-span-9"
                    } space-y-4 transition-all duration-300`}>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-900 border border-zinc-850 rounded-xl">
                          <span className="text-[9px] font-mono text-zinc-500 block">CARD 1</span>
                          <div className="text-md font-bold text-zinc-300 mt-1">Data Display</div>
                        </div>
                        <div className="p-4 bg-zinc-900 border border-zinc-850 rounded-xl">
                          <span className="text-[9px] font-mono text-zinc-500 block">CARD 2</span>
                          <div className="text-md font-bold text-zinc-300 mt-1">Data Display</div>
                        </div>
                      </div>

                      {/* Touch target overlay demo */}
                      {showTouchTargets && viewport === "mobile" && (
                        <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl space-y-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">Touch Target Check (48x48px):</span>
                          <div className="flex gap-3 justify-center">
                            <button className="h-12 w-12 rounded-lg bg-emerald-500 text-zinc-950 text-xs font-bold flex items-center justify-center shadow-lg" title="Correct size">
                              OK
                            </button>
                            <button className="h-7 w-7 rounded bg-rose-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center" title="Too small for thumb click!">
                              ERR
                            </button>
                          </div>
                          <span className="text-[8px] font-mono text-zinc-500 block text-center mt-1">
                            ปุ่มสีแดงมีขนาดเล็กกว่า 48px ทำให้กดยากบนหน้าจอสัมผัส ปุ่มสีเขียวมีขนาด 48x48px (h-12 w-12) ปลอดภัย
                          </span>
                        </div>
                      )}

                      <div className="p-6 bg-zinc-900 border border-zinc-850 rounded-xl h-24 flex items-center justify-center font-mono text-xs text-zinc-500">
                        {viewport === "mobile" && "SINGLE-COLUMN MAIN CONTENT"}
                        {viewport === "tablet" && "TABLET LANDSCAPE GRID"}
                        {viewport === "desktop" && "DESKTOP WIDE GRAPH"}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Explainer */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-purple-500 font-bold uppercase tracking-wider block">GRID ARCHITECTURE</span>
                <h4 className="text-md font-bold text-white">กลยุทธ์การจัดพื้นที่โครงสร้าง Grid</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  เมื่อย่อหน้าจอลงเป็นแท็บเล็ต เมนูด้านซ้ายจะลอยขึ้นไปอยู่ด้านบนเป็นแนวนอน (`flex-row`) เพื่อไม่ให้กินพื้นที่ด้านข้าง และเมื่อย่อลงมือถือ เมนูจะถูกบีบซ่อนไปอยู่หลัง Hamburger Button เพื่อให้เนื้อหาหลักแสดงเต็มความกว้างจอ
                </p>
                <div className="border-t border-zinc-850 pt-4 space-y-2 text-xs text-zinc-500">
                  <span className="font-bold text-zinc-300">Best Practices:</span>
                  <ul className="space-y-1">
                    <li>1. หลีกเลี่ยงค่า width แบบตายตัว</li>
                    <li>2. ระยะกดบนมือถือต้องกว้างอย่างน้อย 48px</li>
                    <li>3. ลดขนาด gap ของ Grid ลงเมื่อเปิดบนจอเล็ก</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Debugging & Refactoring (Prompt 3) */}
        <section className="space-y-6 border-t border-zinc-900 pt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-bold text-zinc-200 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded bg-emerald-500"></span>
              แล็บที่ 3: Debugging & Refactoring Playground
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">PROMPT 3</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Viewport Simulation Frame */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-zinc-500">LAYOUT COMPARISON (Broken vs Refactored)</span>
                <button
                  onClick={() => setShowBroken(!showBroken)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                    showBroken 
                      ? "bg-rose-950 border-rose-500/30 text-rose-400" 
                      : "bg-emerald-950 border-emerald-500/30 text-emerald-400"
                  }`}
                >
                  {showBroken ? "SWITCH TO REFACTORED WORK" : "SWITCH TO BROKEN WORK"}
                </button>
              </div>

              <div className="bg-zinc-900/10 border border-zinc-850 rounded-2xl p-6 flex justify-center transition-all duration-300">
                <div className={`w-full bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden transition-all duration-500 ${viewportWidths[viewport]}`}>
                  
                  {showBroken ? (
                    /* ❌ BROKEN COMPONENT SIMULATION */
                    <div className="p-6">
                      <div className="bg-rose-950/20 border border-rose-500/30 p-2 rounded-lg text-[9px] font-mono text-rose-400 text-center mb-4">
                        ⚠️ BROKEN VERSION: w-[600px] absolute width overflows wrapper on small devices
                      </div>
                      
                      {/* Fixed width container that overflows */}
                      <div className="flex w-[600px] bg-zinc-900 p-8 rounded-lg gap-8 border border-zinc-800">
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold">Total Operations</h2>
                          <p className="text-xl text-cyan-400">12,450 operations processed</p>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold">Memory Load</h2>
                          <p className="text-xl text-purple-400">68.90 MB consumed</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /*  REFACTORED RESPONSIVE COMPONENT SIMULATION */
                    <div className="p-6">
                      <div className="bg-emerald-950/20 border border-emerald-500/30 p-2 rounded-lg text-[9px] font-mono text-emerald-400 text-center mb-4">
                        ✓ REFACTORED VERSION: w-full max-w-3xl responsive columns adapt gracefully
                      </div>
                      
                      {/* Responsive Grid */}
                      <div className="w-full max-w-3xl mx-auto bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6 md:p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-850">
                          <h2 className="text-md sm:text-lg md:text-xl font-bold text-zinc-100 font-mono">Total Operations</h2>
                          <p className="text-xs sm:text-sm md:text-base text-cyan-400 font-mono mt-2">12,450 operations processed</p>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-850">
                          <h2 className="text-md sm:text-lg md:text-xl font-bold text-zinc-100 font-mono">Memory Load</h2>
                          <p className="text-xs sm:text-sm md:text-base text-purple-400 font-mono mt-2">68.90 MB consumed</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Code Diff Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider block">DEBUG DETAILS</span>
                <h4 className="text-md font-bold text-white">การแก้ไขส่วนที่ล้นหน้าจอ (Overflow)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  ในเวอร์ชันที่พัง เราใช้ความกว้างตายตัว `w-[600px]` ซึ่งเมื่อเปิดบนจอมือถือขนาด `375px` จะทำให้เนื้อหาล้นหลุดขอบและทำลาย Layout หลัก วิธีแก้คือแทนที่ด้วย `w-full` และจัดคอลัมน์ใหม่ด้วย CSS Grid
                </p>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono text-[9px] text-zinc-400 space-y-2">
                  <div className="text-rose-500">- flex w-[600px] gap-8</div>
                  <div className="text-emerald-500">+ w-full grid grid-cols-1 md:grid-cols-2 gap-6</div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
