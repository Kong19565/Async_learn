# Python Concurrency & Asynchronous Learning Portal

สื่อการเรียนรู้เชิงโต้ตอบ (Interactive Learning Portal) สำหรับวิชา **Asynchronous Programming in Python** ซึ่งรวมแผงควบคุม Cyberpunk Dashboard ที่สามารถรันโค้ด Python จริงในเครื่องของคุณแบบ Real-time และจำลองการทำงานเป็นภาพแอนิเมชันเข้าใจง่าย

---

## 🚀 ฟีเจอร์หลัก (Key Features)

1. **Week 1 Simulator (Concurrency Engines)**:
   * **Coffee Shop Simulator**: จำลองความแตกต่างระหว่างการประมวลผลงานแบบทีละขั้นตอน (Synchronous), การใช้เธรดคู่ขนาน (Threads), การแยกโปรเซสจริง (Multiprocessing) และการสลับงานบนเธรดเดี่ยว (Asyncio)
   * **PID/TID Monitor**: ตารางดึง Process ID และ Thread ID จากระดับระบบปฏิบัติการ (OS) ขึ้นมาแสดงผลจริงเพื่อพิสูจน์การทำงานเชิงลึก
   * **Resource Charts**: วิเคราะห์และเปรียบเทียบการกินแรม (Memory RAM in MB), CPU Time และเวลาที่ใช้จริง (Wall Time)
   * **UP Subtask Timeline**: แสดงการจัดลำดับการทำงานย่อย (เช่น ชงกาแฟพร้อมกับอัปเดตหน้าจอ LCD)

2. **Week 2 Simulator (Asyncio Deep Dive)**:
   * **Exercise Trace**: วิ่งไล่ผลลัพธ์โค้ดของแบบฝึกหัด `asyncio01` ถึง `asyncio10` ทีละข้อ เพื่อเรียนรู้ความหมายของ `async def`, `await`, `create_task`, `asyncio.sleep()`, `asyncio.gather()`, และการคืนค่า Return Value
   * **Restaurant Simulation**: ภาพแอนิเมชันครัวภัตตาคารที่จำลองการจัดการรับออเดอร์ ทำอาหาร และเสิร์ฟเครื่องดื่มในโหมดต่างๆ แบบเห็นภาพ

3. **Knowledge Assessment**:
   * แบบทดสอบวัดความเข้าใจ (Quizzes) 5 ข้อ ครอบคลุมเรื่องโครงสร้าง Concurrency vs Parallelism, การบล็อกโดย GIL, และหลักการทำงานของ Event Loop พร้อมเฉลยอธิบายเบื้องหลังโดยละเอียด

4. **Cloud Sandbox Simulation (Vercel Mode)**:
   * ระบบสามารถรันได้อย่างสมบูรณ์แบบบนคลาวด์ Vercel โดยจะตรวจจับสภาพแวดล้อมและสลับไปใช้ **High-fidelity Simulated Mode** อัตโนมัติ เพื่อส่งมอบแอนิเมชันจำลองการทำงานแบบสดเสมือนรันบนโฮสต์จริง

---

## 🛠️ วิธีการติดตั้งและรันใช้งานภายในเครื่อง (Local Setup)

### 1. โคลนพื้นที่เก็บข้อมูล (Clone Repository)
```bash
git clone https://github.com/Kong19565/Async_learn.git
cd Async_learn
```

### 2. รันแอปพลิเคชัน Next.js (Dashboard)
ย้ายเข้าโฟลเดอร์ `web` เพื่อติดตั้ง Node packages และเปิดเซิร์ฟเวอร์นักพัฒนา
```bash
cd web
npm install
npm run dev
```
เปิดเบราว์เซอร์แล้วเข้าชมได้ที่: **[http://localhost:3000](http://localhost:3000)**

### 3. สภาพแวดล้อม Python (สำหรับนักพัฒนา)
ตัวระบบเบื้องหลังจะเรียกใช้งาน Python ในสภาพแวดล้อมเสมือนที่ตั้งค่าในเครื่องที่:
`async-2026/.venv/Scripts/python.exe` 
*(โฟลเดอร์ `async-2026/` ถูกละเว้นจาก Git ตามนโยบายความปลอดภัยและลดขนาดที่เก็บข้อมูล แต่จะคงอยู่และเรียกใช้งานได้จริงเฉพาะเมื่อรันในเครื่องของผู้พัฒนาต้นทาง)*

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory)

```text
├── web/                       # Next.js App Router (TypeScript & Tailwind v4)
│   ├── src/app/
│   │   ├── api/run/route.ts   # Backend API สำหรับรันสคริปต์และสตรีม log (NDJSON)
│   │   ├── week1/page.tsx     # ตัวจำลองแล็บ Week 1 (Coffee, PID, PS, UP)
│   │   ├── week2/page.tsx     # ตัวจำลองแล็บ Week 2 (asyncio01-10 + Restaurant)
│   │   ├── quizzes/page.tsx   # แบบทดสอบความรู้
│   │   └── page.tsx           # หน้าหลักพอร์ทัล
├── Doc/                       # เอกสารประกอบการสอนวิชา Asynchronous (.pdf, .txt)
└── .gitignore                 # กำหนดค่าข้ามโฟลเดอร์ขนาดใหญ่ (node_modules, async-2026)
```
