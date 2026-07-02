import Link from "next/link";
import { Terminal, Cpu, Layers, BookOpen, ChevronRight, Zap, Play, Award, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
              <Cpu size={20} />
            </div>
            <div>
              <span className="font-mono text-xs text-cyan-500 tracking-wider">SYSTEM: ACTIVE</span>
              <h1 className="text-md font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                ASYNC-LABS // CONCURRENCY PORTAL
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Local Server Connected
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-zinc-900">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400">
              <Zap size={12} className="text-cyan-400" />
              <span>เรียนรู้ระบบการทำงานแบบประสานเวลา (Asynchronous Programming)</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              เจาะลึก Concurrency และ Asynchronous ใน Python
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              เครื่องมือและสื่อการเรียนรู้เชิงอินเตอร์แอคทีฟ รันโค้ดจำลองในระบบของคุณแบบ Real-time เปรียบเทียบความแตกต่างระหว่าง
              <span className="text-cyan-400 font-semibold"> Sync</span>,
              <span className="text-cyan-400 font-semibold"> Threading</span>,
              <span className="text-cyan-400 font-semibold"> Multiprocessing</span> และ
              <span className="text-cyan-400 font-semibold"> Asyncio</span> อย่างเห็นภาพชัดเจนที่สุด
            </p>
          </div>
        </div>
      </section>

      {/* Modules Selection Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Week 1 Module Card */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-zinc-900/50 transition-all duration-300">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Layers size={24} />
                </div>
                <span className="text-xs font-mono text-cyan-500 border border-cyan-500/30 px-2 py-0.5 rounded">WEEK 1</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                Concurrency Engines
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                เปรียบเทียบลูปการทำงานด้วยตัวอย่างจำลองร้านชงกาแฟ (Coffee Shop Simulator) ค้นหาความแตกต่างเชิงลึกของ PIDs, TIDs และการกินทรัพยากรระบบ (CPU/RAM Usage) ของโมเดลต่างๆ
              </p>
              <ul className="text-xs text-zinc-500 space-y-2 border-t border-zinc-800/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-cyan-500" />
                  <span>Coffee: การรับคิวชงกาแฟ</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-cyan-500" />
                  <span>PID: ตรวจสอบ Process & Thread ID</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-cyan-500" />
                  <span>PS: วิเคราะห์การใช้ RAM & CPU Time</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-cyan-500" />
                  <span>UP: งานย่อยและลำดับการประมวลผล</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 relative">
              <Link
                href="/week1"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-400 text-sm font-semibold tracking-wide transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                เข้าสู่ห้องแล็บ 1 <Play size={14} className="fill-cyan-400/20" />
              </Link>
            </div>
          </div>

          {/* Week 2 Module Card */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-purple-500/40 hover:bg-zinc-900/50 transition-all duration-300">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Terminal size={24} />
                </div>
                <span className="text-xs font-mono text-purple-500 border border-purple-500/30 px-2 py-0.5 rounded">WEEK 2</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 group-hover:text-purple-400 transition-colors">
                Asyncio Deep Dive
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                ทำความเข้าใจคำสั่ง Coroutines, Awaitables, Tasks และ Event Loop ทีละขั้นตอนผ่านโปรแกรมตัวอย่าง asyncio01-asyncio10 พร้อมระบบจำลองร้านอาหาร (Restaurant Workflow)
              </p>
              <ul className="text-xs text-zinc-500 space-y-2 border-t border-zinc-800/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-purple-500" />
                  <span>แบบฝึกหัดพื้นฐาน asyncio01 - 10</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-purple-500" />
                  <span>Event Loop & การทำงานร่วมกับ Task</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-purple-500" />
                  <span>ระบบจำลองภัตตาคาร (Restaurant Simulator)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-purple-500" />
                  <span>การเขียนโปรแกรมแบบไม่บล็อกการทำงาน (Non-blocking)</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 relative">
              <Link
                href="/week2"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/30 text-purple-400 text-sm font-semibold tracking-wide transition-all group-hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
              >
                เข้าสู่ห้องแล็บ 2 <Play size={14} className="fill-purple-400/20" />
              </Link>
            </div>
          </div>

          {/* Quizzes Module Card */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-zinc-900/50 transition-all duration-300">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Award size={24} />
                </div>
                <span className="text-xs font-mono text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded">QUIZ</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                Knowledge Checkpoint
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                แบบทดสอบความเข้าใจระบบการทำงานแบบ Concurrency เพื่อวัดผลทักษะการเลือกใช้งานโมเดลการประมวลผลที่เหมาะสมกับแต่ละปัญหา พร้อมคำเฉลยอธิบายโดยละเอียด
              </p>
              <ul className="text-xs text-zinc-500 space-y-2 border-t border-zinc-800/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-emerald-500" />
                  <span>คำถามความเข้าใจ Concurrency vs Parallelism</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-emerald-500" />
                  <span>วิเคราะห์โค้ดผลลัพธ์ของ asyncio</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-emerald-500" />
                  <span>การเลือกใช้ Threading vs Multiprocessing</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-emerald-500" />
                  <span>ระบบสรุปคะแนนพร้อมคำชี้แนะเสริมความเข้าใจ</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 relative">
              <Link
                href="/quizzes"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400 text-sm font-semibold tracking-wide transition-all group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              >
                ทำแบบทดสอบ <BookOpen size={14} />
              </Link>
            </div>
          </div>

          {/* Responsive Lab Module Card */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-zinc-900/50 transition-all duration-300">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Layout size={24} />
                </div>
                <span className="text-xs font-mono text-cyan-500 border border-cyan-500/30 px-2 py-0.5 rounded">WEB LAB</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                Responsive Design
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                เรียนรู้การสร้างคอมโพเนนต์ Mobile-First ด้วย Tailwind CSS จำลองขนาดหน้าจอ (Breakpoints) และไขจุดบกพร่อง Layout Overflow ในเบราว์เซอร์
              </p>
              <ul className="text-xs text-zinc-500 space-y-2 border-t border-zinc-800/80 pt-3">
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-cyan-500" />
                  <span>Mobile-First Navbar Component</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-cyan-500" />
                  <span>Grid Optimization & Touch Targets</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-cyan-500" />
                  <span>Debugging & Refactoring Playground</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 relative">
              <Link
                href="/responsive"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-400 text-sm font-semibold tracking-wide transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                เข้าสู่ห้องแล็บ 3 <Play size={14} className="fill-cyan-400/20" />
              </Link>
            </div>
          </div>

        </div>

        {/* Quick Concept Explainer */}
        <div className="mt-16 p-8 rounded-2xl border border-zinc-800 bg-zinc-900/10">
          <h4 className="text-lg font-bold text-zinc-200 mb-6 flex items-center gap-2">
            <BookOpen size={18} className="text-cyan-500" />
            ตารางเปรียบเทียบการทำงานของ Concurrency แต่ละประเภท
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm text-left text-zinc-400">
              <thead className="text-xs text-zinc-500 uppercase border-b border-zinc-800 bg-zinc-900/50">
                <tr>
                  <th className="px-4 py-3">ประเภทโมเดล</th>
                  <th className="px-4 py-3">ลักษณะเด่น</th>
                  <th className="px-4 py-3">ข้อจำกัดของ Python (GIL)</th>
                  <th className="px-4 py-3">เหมาะกับงานประเภทใด</th>
                  <th className="px-4 py-3">การกินแรม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-4 font-semibold text-zinc-200">Synchronous</td>
                  <td className="px-4 py-4">ทำทีละงานตามลำดับ ทำงาน 1 เสร็จถึงจะต่อ 2</td>
                  <td className="px-4 py-4">ไม่มีผลกระทบ (ทำงานทีละอย่าง)</td>
                  <td className="px-4 py-4">งานทั่วไปที่มีลำดับแน่นอนและไม่มีจุดรอนานๆ</td>
                  <td className="px-4 py-4 text-cyan-400">ต่ำสุด (1 Process/Thread)</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-4 font-semibold text-zinc-200">Threading</td>
                  <td className="px-4 py-4">แบ่งงานให้หลาย Threads ช่วยกันทำงานใน 1 Process</td>
                  <td className="px-4 py-4">ถูกบล็อกโดย GIL ให้รันโค้ดได้ทีละ 1 Thread</td>
                  <td className="px-4 py-4 text-cyan-400">I/O-Bound (ดึงเว็บ, อ่านไฟล์, รอฐานข้อมูล)</td>
                  <td className="px-4 py-4">ปานกลาง (แชร์หน่วยความจำร่วมกัน)</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-4 font-semibold text-zinc-200">Multiprocessing</td>
                  <td className="px-4 py-4">สร้าง Processes ใหม่มี Memory & GIL ของตัวเองแยกกัน</td>
                  <td className="px-4 py-4">ข้ามข้อจำกัด GIL รันบน CPU หลายคอร์พร้อมกันได้</td>
                  <td className="px-4 py-4 text-cyan-400">CPU-Bound (คำนวณคณิตศาสตร์, ประมวลผลภาพ)</td>
                  <td className="px-4 py-4 text-rose-400">สูงมาก (เนื่องจากต้องก็อปปี้ RAM แยกกัน)</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-4 font-semibold text-zinc-200">Asyncio (Single-Thread)</td>
                  <td className="px-4 py-4">รันงานบน Thread เดียวแต่สลับงานเมื่อมีจังหวะรอ (await)</td>
                  <td className="px-4 py-4">ไม่ถูกบล็อกด้วย GIL เนื่องจากเป็น Single-thread</td>
                  <td className="px-4 py-4 text-cyan-400">I/O-Bound ที่มีการเชื่อมต่อเครือข่ายจำนวนมาก</td>
                  <td className="px-4 py-4 text-emerald-400">ต่ำและคุ้มค่าที่สุดในการขยายสเกล</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-zinc-600">
          <span>&copy; {new Date().getFullYear()} ASYNC-LABS. พัฒนาขึ้นสำหรับเป็นสื่อการสอนวิชา Asynchronous Programming.</span>
        </div>
      </footer>
    </div>
  );
}
