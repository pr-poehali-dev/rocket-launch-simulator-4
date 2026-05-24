import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Squares } from "@/components/landing/squares-background"
import Icon from "@/components/ui/icon"

const privileges = [
  { name: "Warden",   price: 29,  color: "#6ee7b7", desc: "Стартовый набор",    img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/45bc5bbe-e094-4445-bc17-0c5fd01a6f7f.jpg" },
  { name: "SMP",      price: 49,  color: "#34d399", desc: "Выживание+",          img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/17ea7a7f-211a-4aa3-82a2-ad3852659138.jpg" },
  { name: "Explorer", price: 69,  color: "#10b981", desc: "Исследователь",       img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/cdde5503-f3fc-4f67-b602-d05edd77c001.jpg" },
  { name: "Warrior",  price: 89,  color: "#059669", desc: "Воин сервера",        img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/f659b02c-6840-421e-ba61-3ee3eb834cfd.jpg" },
  { name: "Legenda",  price: 119, color: "#f59e0b", desc: "Легендарный статус",  img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/d92d8999-71f9-4b60-9cc7-16c8229c2369.jpg" },
  { name: "Lord",     price: 149, color: "#f97316", desc: "Повелитель",           img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/8b4dfb50-d4bd-4f3f-a1bd-d356624f0037.jpg" },
  { name: "Spectre",  price: 189, color: "#a78bfa", desc: "Призрачная сила",     img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/f24947cc-c3f3-4f87-ae29-16f2aea9f6be.jpg" },
  { name: "Viper",    price: 249, color: "#ec4899", desc: "Элита сервера",        img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/c4eba9f0-01c9-43e9-9eaf-e8943224eac3.jpg" },
]

const QR_URL = "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/bucket/b133a06d-0420-4e5d-aa76-9015bcd54942.jpg"

interface Selected {
  name: string
  price: number
  color: string
}

export default function Shop() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Selected | null>(null)

  return (
    <div className="min-h-screen bg-black relative overflow-auto">
      <div className="fixed inset-0 z-0">
        <Squares direction="diagonal" speed={0.3} squareSize={40} borderColor="#222" hoverFillColor="#1a1a1a" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-10"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Магазин привилегий</h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {privileges.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-xl border bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-3 hover:bg-white/10 transition-all"
              style={{ borderColor: `${p.color}44` }}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden border" style={{ borderColor: `${p.color}44` }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-tight">{p.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{p.desc}</p>
              </div>
              <div className="mt-auto pt-2 flex items-center justify-between">
                <span className="text-xl font-bold" style={{ color: p.color }}>{p.price} ₽</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 px-4 font-bold border-0 transition-all"
                  style={{ backgroundColor: p.color, color: '#000' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                  onClick={() => setSelected(p)}
                >
                  Купить
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно с QR */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-sm w-full flex flex-col items-center gap-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
              >
                <Icon name="X" size={18} />
              </button>

              <div className="text-center">
                <p className="text-neutral-400 text-sm">Оплата привилегии</p>
                <p className="text-white text-2xl font-bold mt-1">{selected.name}</p>
                <p className="text-xl font-bold mt-1" style={{ color: selected.color }}>{selected.price} ₽</p>
              </div>

              <img
                src={QR_URL}
                alt="QR-код для оплаты"
                className="w-52 h-52 rounded-xl object-cover"
              />

              <div className="text-center text-sm text-neutral-400 leading-relaxed">
                Отсканируй QR-код камерой телефона<br />
                и переведи <span className="text-white font-semibold">{selected.price} ₽</span> через СБП (Озон Банк)
              </div>

              <p className="text-xs text-neutral-600 text-center">
                После оплаты напиши в{" "}
                <a href="https://vk.ru/club239028200" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white underline transition-colors">
                  нашу группу ВК
                </a>
                {" "}— выдадим привилегию
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}