"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Award, HelpCircle, Check, X, BookOpen, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "ข้อใดอธิบายความแตกต่างระหว่าง Concurrency (การทำงานร่วมกัน) และ Parallelism (การทำงานขนาน) ได้ถูกต้องที่สุด?",
    options: [
      "Concurrency คือการทำงานหลายอย่างเสร็จพร้อมกันจริงๆ บน CPU หลายคอร์ ส่วน Parallelism เป็นการแบ่งเวลารันบนคอร์เดียว",
      "Concurrency เป็นเรื่องโครงสร้างของระบบที่ออกแบบให้จัดการงานหลายอย่างได้ในเวลาเดียวกัน (Dealing with many things), ส่วน Parallelism เป็นเรื่องการรันงานพร้อมกันจริงๆ (Doing many things) เช่น บน CPU หลายคอร์",
      "ทั้งสองคำมีความหมายเหมือนกันทุกประการ สามารถใช้แทนกันได้ในการเขียนโปรแกรม Python",
      "Concurrency ใช้ได้เฉพาะกับงานคำนวณเลขหนักๆ เท่านั้น ส่วน Parallelism ใช้ได้เฉพาะกับงานเครือข่ายอินเทอร์เน็ต"
    ],
    answerIndex: 1,
    explanation: "ตามคำนิยามของ Rob Pike: Concurrency is about structure (การจัดโครงสร้างเพื่อรองรับหลายงานสลับกันได้) ในขณะที่ Parallelism คือการประมวลผลพร้อมกันจริงๆ ณ เสี้ยววินาทีนั้นๆ (เช่น มี 4 คอร์รัน 4 งานขนานกัน)"
  },
  {
    id: 2,
    question: "ทำไมการใช้ Threading ใน Python (CPython) ถึงไม่ช่วยให้งานประเภทคำนวณคณิตศาสตร์หนักๆ (CPU-Bound) รันได้เร็วขึ้น?",
    options: [
      "เนื่องจาก Python ไม่มีโมดูลสำหรับการสร้าง Thread",
      "เนื่องจาก Threading ใน Python จะตัดการเชื่อมต่อกับระบบปฏิบัติการโดยอัตโนมัติ",
      "เนื่องจากมี Global Interpreter Lock (GIL) คอยล็อกให้ทำงานได้เพียง 1 Thread ต่อ 1 ช่วงเวลา เพื่อความปลอดภัยของหน่วยความจำ",
      "เนื่องจาก CPU ไม่อนุญาตให้ภาษาประเภทสคริปต์เข้าถึงคอร์ประมวลผล"
    ],
    answerIndex: 2,
    explanation: "GIL (Global Interpreter Lock) ในตัวแปลภาษา CPython ป้องกันไม่ให้เธรดหลายเธรดรันโค้ด Python พร้อมกัน ทำให้เธรดต้องสลับกันทำงานทีละเธรด จึงไม่ได้ประโยชน์จาก CPU หลายคอร์ในงานคำนวณหนักๆ"
  },
  {
    id: 3,
    question: "หากต้องการดาวน์โหลดรูปภาพ 1,000 รูปจากเซิร์ฟเวอร์ปลายทางผ่านคำสั่ง HTTP Request โมเดลการประมวลผลใดมีประสิทธิภาพสูงสุดในแง่ของความเร็วและการกินหน่วยความจำ (RAM)?",
    options: [
      "Synchronous ค่อยๆ โหลดทีละรูปตามลำดับคิว",
      "Multiprocessing แตกกระบวนการแยกออกมา 1,000 processes เพื่อดึงข้อมูลพร้อมกัน",
      "Asyncio (Single-Thread) รันบนเธรดเดียวแต่สลับดาวน์โหลดแบบ Non-blocking",
      "รันผ่าน CMD รวดเดียว"
    ],
    answerIndex: 2,
    explanation: "งานดาวน์โหลดรูปภาพเป็น I/O-Bound (ส่วนใหญ่ใช้เวลาไปกับการรอเครือข่ายส่งข้อมูลกลับมา) การใช้ Asyncio ช่วยให้เธรดเดี่ยวสามารถส่งคำขอดาวน์โหลดไปได้พร้อมๆ กันโดยไม่ต้องรอคิว และกินแรมต่ำมากเมื่อเทียบกับการสปอว์น 1,000 Threads หรือ Processes"
  },
  {
    id: 4,
    question: "เมื่อเราเรียกใช้งานฟังก์ชันอะซิงโครนัส เช่น coro_obj = serve_customer('A') ตัวฟังก์ชันดังกล่าวจะเกิดผลอย่างไรขึ้นทันที?",
    options: [
      "รันโค้ดด้านในทันทีจนกว่าจะเสร็จสิ้น และส่งคืนค่าลัพธ์กลับมา",
      "ตัวสคริปต์จะระเบิดและแสดงข้อผิดพลาด Syntax Error",
      "ยังไม่รันโค้ดด้านในทันที แต่จะคืนค่าเป็น Coroutine Object กลับมาเพื่อนำไป await หรือยัดใส่ Event Loop ต่อไป",
      "บันทึกข้อมูลลูกค้ายัดลงไปในระบบ Database อัตโนมัติ"
    ],
    answerIndex: 3, // Wait, option index is 2! (0-indexed: option 0, 1, 2, 3) Let's double check. Options: 0 is "รันโค้ด...", 1 is "ตัวสคริปต์...", 2 is "ยังไม่รันโค้ด...", 3 is "บันทึกข้อมูล..." Wait! The index of "ยังไม่รันโค้ด..." is 2! So it should be 2. Let's fix.
    explanation: "ใน Python การเรียกฟังก์ชัน async def จะเพิ่งส่งคืนตัว Coroutine Object กลับมาเท่านั้น ตัวฟังก์ชันจริงยังไม่ได้รัน หากไม่มีการนำไปสั่งรันผ่าน Event Loop เช่น asyncio.run() หรือใช้คีย์เวิร์ด await"
  },
  {
    id: 5,
    question: "เมื่อเกิดคำสั่ง await asyncio.sleep(1) ในฟังก์ชันอะซิงโครนัส จะเกิดอะไรขึ้นในระดับ Event Loop?",
    options: [
      "ระบบปฏิบัติการจะแช่แข็งโปรแกรมหลักไว้ 1 วินาที ห้ามปุ่มใดๆ ทำงาน",
      "เธรดจะหยุดรอโดยปล่อยสิทธิ์การประมวลผล (Yield Control) คืนให้ Event Loop ไปรัน Task อื่นๆ ในคิวที่รออยู่ได้ทันที",
      "ลูปจะข้ามไปสปอว์น Thread ใหม่ขึ้นมาช่วยรันทันที",
      "ระบบจะหยุดประมวลผลทันทีและไม่สามารถรันต่อได้อีกเลย"
    ],
    answerIndex: 1,
    explanation: "คีย์เวิร์ด await เป็นการบอกให้รู้ว่างานย่อยนี้กำลังรอคอย I/O (ในที่นี้คือจำลองการนอน) เธรดหลักจึงคืนสิทธิ์ให้ลูปกลางไปจับงานชิ้นถัดไปขึ้นมาทำ เพื่อไม่ให้เวลาว่างเสียเปล่า"
  }
];

export default function Quizzes() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Fix index of Q4: the answer is option 2 ("ยังไม่รันโค้ดด้านใน...")
  const correctedQuestions = QUESTIONS.map(q => q.id === 4 ? { ...q, answerIndex: 2 } : q);

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    let finalScore = 0;
    correctedQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.answerIndex) {
        finalScore += 1;
      }
    });
    setScore(finalScore);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const allAnswered = correctedQuestions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <span className="font-mono text-xs text-emerald-500 tracking-wider">ASSESSMENT // CHECKPOINT</span>
              <h1 className="text-md font-bold tracking-tight text-white">CONCURRENCY QUIZZES</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow w-full space-y-8">
        
        {/* Intro */}
        <section className="p-6 rounded-2xl border border-zinc-850 bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <BookOpen className="text-emerald-500" size={20} />
              แบบทดสอบความรู้ Concurrency & Asynchronous
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
              ทดสอบความเข้าใจเกี่ยวกับพฤติกรรมโค้ด บทบาทหน้าที่ของ Event Loop, Threading, Multiprocessing, และการทำงานแบบสลับงานของคำสั่ง await
            </p>
          </div>
          {submitted && (
            <div className="text-center p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl min-w-[120px]">
              <span className="text-[10px] font-mono text-emerald-500 block uppercase font-bold">Your Score</span>
              <span className="text-3xl font-extrabold text-emerald-400 block mt-1">{score} / {correctedQuestions.length}</span>
            </div>
          )}
        </section>

        {/* Questions List */}
        <section className="space-y-6">
          {correctedQuestions.map((q, idx) => {
            const isCorrect = selectedAnswers[q.id] === q.answerIndex;
            const isSelected = selectedAnswers[q.id] !== undefined;

            return (
              <div key={q.id} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 space-y-4">
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
                    {idx + 1}
                  </span>
                  <h3 className="text-md font-bold text-zinc-200 leading-relaxed">
                    {q.question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 pl-0 sm:pl-9">
                  {q.options.map((opt, oIdx) => {
                    const isOptSelected = selectedAnswers[q.id] === oIdx;
                    const showCorrectMarker = submitted && oIdx === q.answerIndex;
                    const showIncorrectMarker = submitted && isOptSelected && !isCorrect;

                    let buttonClass = "bg-zinc-900/40 border-zinc-850 hover:bg-zinc-900/80 text-zinc-400";
                    if (isOptSelected && !submitted) {
                      buttonClass = "bg-emerald-950/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16_185_129,0.05)] font-semibold";
                    } else if (submitted) {
                      if (oIdx === q.answerIndex) {
                        buttonClass = "bg-emerald-950/30 border-emerald-500/50 text-emerald-300 font-semibold";
                      } else if (isOptSelected) {
                        buttonClass = "bg-rose-950/30 border-rose-500/50 text-rose-300 font-semibold";
                      } else {
                        buttonClass = "bg-zinc-900/10 border-zinc-900 text-zinc-600 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={submitted}
                        onClick={() => handleSelect(q.id, oIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${buttonClass}`}
                      >
                        <span>{opt}</span>
                        {showCorrectMarker && <Check size={14} className="text-emerald-400 shrink-0 ml-2" />}
                        {showIncorrectMarker && <X size={14} className="text-rose-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {submitted && (
                  <div className={`mt-4 p-4 rounded-xl border pl-4 sm:pl-9 text-xs leading-relaxed ${
                    isCorrect 
                      ? "bg-emerald-950/10 border-emerald-500/10 text-zinc-300"
                      : "bg-zinc-900/30 border-zinc-800 text-zinc-400"
                  }`}>
                    <span className="font-mono text-emerald-500 font-bold block mb-1">
                      {isCorrect ? "✓ คำตอบถูกต้อง!" : "✗ คำอธิบายเพิ่มเติม:"}
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Footer Actions */}
        <section className="flex gap-4 justify-end pt-4">
          {submitted ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold transition-all text-xs font-mono"
            >
              <RotateCcw size={14} />
              TRY AGAIN
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-zinc-950 disabled:cursor-not-allowed text-zinc-950 font-bold transition-all text-xs shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Award size={14} />
              SUBMIT ANSWERS
            </button>
          )}
        </section>

      </main>
    </div>
  );
}
