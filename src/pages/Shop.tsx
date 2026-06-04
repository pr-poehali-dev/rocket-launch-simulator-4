import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Squares } from "@/components/landing/squares-background"
import Icon from "@/components/ui/icon"

const privileges = [
  { name: "Warden",   price: 49,  oldPrice: 59,  color: "#6ee7b7", desc: "Стартовый набор",    img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/45bc5bbe-e094-4445-bc17-0c5fd01a6f7f.jpg" },
  { name: "SMP",      price: 59,  oldPrice: 79,  color: "#34d399", desc: "Выживание+",          img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/17ea7a7f-211a-4aa3-82a2-ad3852659138.jpg" },
  { name: "Explorer", price: 79,  oldPrice: 99,  color: "#10b981", desc: "Исследователь",       img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/cdde5503-f3fc-4f67-b602-d05edd77c001.jpg" },
  { name: "Warrior",  price: 99,  oldPrice: 149, color: "#059669", desc: "Воин сервера",        img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/f659b02c-6840-421e-ba61-3ee3eb834cfd.jpg" },
  { name: "Legenda",  price: 149, oldPrice: 199, color: "#f59e0b", desc: "Легендарный статус",  img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/d92d8999-71f9-4b60-9cc7-16c8229c2369.jpg" },
  { name: "Lord",     price: 199, oldPrice: 249, color: "#f97316", desc: "Повелитель",           img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/8b4dfb50-d4bd-4f3f-a1bd-d356624f0037.jpg" },
  { name: "Spectre",  price: 229, oldPrice: 349, color: "#a78bfa", desc: "Призрачная сила",     img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/f24947cc-c3f3-4f87-ae29-16f2aea9f6be.jpg" },
  { name: "Viper",    price: 449, oldPrice: 799, color: "#ec4899", desc: "Элита сервера",        img: "https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/c4eba9f0-01c9-43e9-9eaf-e8943224eac3.jpg" },
]

const DA_BASE = "https://dalink.to/derviz"

interface Selected {
  name: string
  price: number
  oldPrice: number
  color: string
}

export default function Shop() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Selected | null>(null)
  const [nick, setNick] = useState("")
  const [error, setError] = useState(false)

  const handleOpen = (p: Selected) => {
    setSelected(p)
    setNick("")
    setError(false)
  }

  const handlePay = () => {
    if (!nick.trim()) {
      setError(true)
      return
    }
    const message = encodeURIComponent(`Привилегия ${selected!.name} | Ник: ${nick.trim()}`)
    window.open(`${DA_BASE}?amount=${selected!.price}&message=${message}`, "_blank")
    setSelected(null)
  }

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
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-neutral-500 line-through">{p.oldPrice} ₽</span>
                  <span className="text-xl font-bold" style={{ color: p.color }}>{p.price} ₽</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 px-4 font-bold border-0 transition-all"
                  style={{ backgroundColor: p.color, color: '#000' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                  onClick={() => handleOpen(p)}
                >
                  Купить
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-neutral-600 mt-8"
        >
          После оплаты напиши в нашу группу — выдадим привилегию
        </motion.p>
      </div>

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
              className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-sm w-full flex flex-col gap-5"
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

              <div>
                <p className="text-neutral-400 text-sm">Покупка привилегии</p>
                <p className="text-white text-2xl font-bold mt-0.5">{selected.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-neutral-500 line-through">{selected.oldPrice} ₽</span>
                  <span className="text-xl font-bold" style={{ color: selected.color }}>{selected.price} ₽</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-400">Твой ник в Minecraft</label>
                <input
                  type="text"
                  value={nick}
                  onChange={e => { setNick(e.target.value); setError(false) }}
                  onKeyDown={e => e.key === "Enter" && handlePay()}
                  placeholder="Введи ник..."
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 outline-none transition-colors ${
                    error ? "border-red-500" : "border-white/10 focus:border-white/30"
                  }`}
                  autoFocus
                />
                {error && <p className="text-xs text-red-400">Укажи ник, чтобы мы знали кому выдать привилегию</p>}
              </div>

              <Button
                className="w-full font-bold h-11 border-0"
                style={{ backgroundColor: selected.color, color: '#000' }}
                onClick={handlePay}
              >
                Перейти к оплате
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
