import React, { useMemo, useRef, useState, useEffect } from "react"; import { motion } from "framer-motion"; import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, } from "@/components/ui/select"; import { Switch } from "@/components/ui/switch"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { MessageSquare, Paintbrush, Images, Stars, Sparkles, Moon, Sun, } from "lucide-react";

// ---------- Mock Data ---------- const sampleArticles = [ { id: 1, title: "พลังแห่งความเชื่อ: เริ่มต้นที่ใจ", cover: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1600&auto=format&fit=crop", excerpt: "การตั้งเจตนาเปรียบเหมือนการยิงดาวตก—หากใจนิ่งพอก็จะไปถึงปลายทาง", }, { id: 2, title: "วิธีรับพลังจักรวาลด้วยการหายใจ 3 จังหวะ", cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop", excerpt: "ฝึกง่าย ๆ ทุกเช้า เติมพลังให้วันใหม่ด้วยลมหายใจและสติ", }, ];

const sampleProducts = [ { id: 1, name: "สร้อยหินนำโชค จักรวาล 7 สี", price: "1,290฿", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7cd47f?q=80&w=1200&auto=format&fit=crop", contact: "LINE: @mystic", }, { id: 2, name: "กำไลไทเกอร์อาย เรียกทรัพย์", price: "890฿", img: "https://images.unsplash.com/photo-1599643476532-004b3b4162fd?q=80&w=1200&auto=format&fit=crop", contact: "FB: mystic.galaxy", }, ];

// ---------- Utilities ---------- const SectionTitle: React.FC<{ icon?: React.ReactNode; title: string; subtitle?: string; }> = ({ icon, title, subtitle }) => (

  <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold flex justify-center items-center gap-2">
      {icon} {title}
    </h2>
    {subtitle && <p className="text-gray-400">{subtitle}</p>}
  </div>
);// ---------- Components ----------

// Articles const Articles: React.FC = () => (

  <div className="grid md:grid-cols-2 gap-6">
    {sampleArticles.map((a) => (
      <div
        key={a.id}
        className="bg-white/5 rounded-xl shadow p-4 hover:bg-white/10 transition"
      >
        <img src={a.cover} alt={a.title} className="rounded-lg mb-2" />
        <h3 className="font-semibold">{a.title}</h3>
        <p className="text-sm text-gray-400">{a.excerpt}</p>
      </div>
    ))}
  </div>
);// ChatBox with LocalStorage const ChatBox: React.FC = () => { const [messages, setMessages] = useState< { id: number; text: string; img?: string }[]

> ([]); const [text, setText] = useState(""); const [img, setImg] = useState<string>();



useEffect(() => { const saved = localStorage.getItem("mystic_chat"); if (saved) setMessages(JSON.parse(saved)); }, []);

useEffect(() => { localStorage.setItem("mystic_chat", JSON.stringify(messages)); }, [messages]);

const addMessage = () => { if (!text && !img) return; setMessages((m) => [...m, { id: Date.now(), text, img }]); setText(""); setImg(undefined); };

return ( <div className="space-y-4"> <div className="bg-white/5 p-4 rounded-lg h-64 overflow-y-auto space-y-2"> {messages.map((m) => ( <div key={m.id} className="p-2 bg-white/10 rounded-lg"> <p>{m.text}</p> {m.img && <img src={m.img} className="mt-2 rounded-lg" />} </div> ))} </div> <div className="flex gap-2 items-center"> <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="พิมพ์ข้อความ..." className="bg-white/10 border-white/20 text-white" /> <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; setImg(URL.createObjectURL(f)); }} /> <button
onClick={addMessage}
className="px-4 py-2 bg-indigo-600 rounded-lg"
> ส่ง </button> </div> </div> ); };

// Product Showcase const ProductShowcase: React.FC = () => (

  <div className="grid md:grid-cols-2 gap-6">
    {sampleProducts.map((p) => (
      <div key={p.id} className="bg-white/5 p-4 rounded-lg">
        <img src={p.img} alt={p.name} className="rounded-lg mb-2" />
        <h3 className="font-semibold">{p.name}</h3>
        <p className="text-gray-300">ราคา: {p.price}</p>
        <p className="text-gray-400 text-sm">ติดต่อ: {p.contact}</p>
      </div>
    ))}
  </div>
);// Fortune Game (เซียมซี) const FortuneGame: React.FC = () => { const fortunes = [ "ดวงดีมาก จะมีโชคลาภเข้ามา", "พบอุปสรรคเล็กน้อย แต่ผ่านไปได้", "มีผู้ใหญ่ช่วยเหลือในเรื่องงาน", "ระวังการใช้จ่ายเงินเกินจำเป็น", "ความรักสดใส ราบรื่น", ]; const [count, setCount] = useState(0); const [result, setResult] = useState<string | null>(null);

const shake = () => { if (count >= 4) { const pick = fortunes[Math.floor(Math.random() * fortunes.length)]; setResult(pick); setCount(0); } else { setCount(count + 1); } };

return ( <div className="text-center space-y-4"> <button
onClick={shake}
className="px-6 py-3 bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700"
> เขย่าเซียมซี ({count}/5) </button> {result && <p className="text-lg text-yellow-300">{result}</p>} </div> ); };

// Horoscope AI (rule-based) const HoroscopeAI: React.FC = () => { const [question, setQuestion] = useState(""); const [answer, setAnswer] = useState<string | null>(null);

const askAI = () => { if (!question) return; let response = "วันนี้โชคชะตาของคุณกำลังดี อย่าลืมยิ้มให้กับตัวเอง ✨"; if (question.includes("เงิน")) response = "การเงินจะมีเข้ามาแบบไม่คาดคิด แต่ควรวางแผนการใช้จ่าย"; if (question.includes("ความรัก")) response = "ความรักจะสดใส หากเปิดใจพูดคุยมากขึ้น"; if (question.includes("งาน")) response = "งานจะเหนื่อยเล็กน้อย แต่ความพยายามจะได้รับผลตอบแทน"; setAnswer(response); };

return ( <div className="space-y-4"> <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="ถามสิ่งที่อยากรู้เกี่ยวกับโชคชะตา..." className="bg-white/10 border-white/20 text-white" /> <button
onClick={askAI}
className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
> ถาม AI </button> {answer && <p className="text-yellow-200">{answer}</p>} </div> ); };

// ---------- Main App ---------- export default function MysticGalaxy() { const [dark, setDark] = useState(true);

return ( <div className={${dark ? "bg-gradient-to-b from-slate-900 to-black" : "bg-gradient-to-b from-yellow-100 to-orange-200"} min-h-screen text-white transition} > {/* Header */} <header className="p-4 flex justify-between items-center sticky top-0 bg-black/50 backdrop-blur-md z-50"> <h1 className="text-xl font-bold">🌌 Mystic Galaxy</h1> <nav className="space-x-4 text-sm"> <a href="#articles">บทความ</a> <a href="#chat">พูดคุย</a> <a href="#products">ของมงคล</a> <a href="#fortune">เซียมซี</a> <a href="#horoscope">ดูดวง AI</a> </nav> <button onClick={() => setDark(!dark)} className="ml-4 p-2 bg-white/10 rounded-full" > {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />} </button> </header>

<main className="space-y-16 p-6 max-w-6xl mx-auto">
    {/* Hero */}
    <section className="text-center py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-extrabold mb-4"
      >
        พลังแห่งจักรวาลในปลายนิ้วคุณ
      </motion.h1>
      <p className="text-gray-300">
        อ่านบทความ พูดคุย แชร์ภาพ และสัมผัสพลังการทำนายผ่าน AI
      </p>
    </section>

    {/* Articles */}
    <section id="articles">
      <SectionTitle
        icon={<Paintbrush className="h-5 w-5" />}
        title="บทความ & คลิปสั้น"
        subtitle="แรงบันดาลใจเกี่ยวกับความเชื่อ"
      />
      <Articles />
    </section>

    {/* Chat */}
    <section id="chat">
      <SectionTitle
        icon={<MessageSquare className="h-5 w-5" />}
        title="พูดคุยในชุมชน"
        subtitle="แบ่งปันเรื่องราว ประสบการณ์ และรูปภาพ"
      />
      <ChatBox />
    </section>

    {/* Products */}
    <section id="products">
      <SectionTitle
        icon={<Images className="h-5 w-5" />}
        title="ของมงคล & ช่องทางติดต่อ"
        subtitle="ลงรูปสินค้า รายละเอียด และช่องทางติดต่อ"
      />
      <ProductShowcase />
    </section>

    {/* Fortune */}
    <section id="fortune">
      <SectionTitle
        icon={<Stars className="h-5 w-5" />}
        title="เสี่ยงเซียมซี"
        subtitle="เขย่าไม้ 5 ครั้งเพื่อรับคำทำนาย"
      />
      <FortuneGame />
    </section>

    {/* Horoscope AI */}
    <section id="horoscope">
      <SectionTitle
        icon={<Sparkles className="h-5 w-5" />}
        title="ดูดวง AI"
        subtitle="ถามสิ่งที่อยากรู้เกี่ยวกับชีวิตและโชคชะตา"
      />
      <HoroscopeAI />
    </section>
  </main>

  {/* Footer */}
  <footer className="p-6 text-center text-gray-400">
    © {new Date().getFullYear()} Mystic Galaxy — ศรัทธาพาโชค
  </footer>
</div>

); }

