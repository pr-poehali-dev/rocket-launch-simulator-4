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
const CURRENCY_RATE = 10
const CURRENCY_MIN = 1
const CURRENCY_MAX = 100
const CURRENCY_STEP = 1

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

  const [currencyNick, setCurrencyNick] = useState("")
  const [currencyError, setCurrencyError] = useState(false)
  const [currencyModal, setCurrencyModal] = useState(false)
  const [currencySteps, setCurrencySteps] = useState(10)

  const currencyAmount = currencySteps * 1000
  const currencyPrice = currencySteps * CURRENCY_RATE

  const handleOpen = (p: Selected) => {
    setSelected(p)
    setNick("")
    setError(false)
  }

  const notify = (data: object) => {
    fetch("https://functions.poehali.dev/067f91eb-9197-4cda-8339-7fd36c45fb9b", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch(() => {})
  }

  const handlePay = () => {
    if (!nick.trim()) { setError(true); return }
    notify({ nick: nick.trim(), privilege: selected!.name, price: selected!.price })
    const message = encodeURIComponent(`Привилегия ${selected!.name} | Ник: ${nick.trim()}`)
    window.open(`${DA_BASE}?amount=${selected!.price}&message=${message}`, "_blank")
    setSelected(null)
  }

  const handleCurrencyPay = () => {
    if (!currencyNick.trim()) { setCurrencyError(true); return }
    notify({ nick: currencyNick.trim(), privilege: `Валюта ${currencyAmount.toLocaleString()} ед.`, price: currencyPrice })
    const message = encodeURIComponent(`Валюта ${currencyAmount} ед. | Ник: ${currencyNick.trim()}`)
    window.open(`${DA_BASE}?amount=${currencyPrice}&message=${message}`, "_blank")
    setCurrencyModal(false)
  }

  const sliderPercent = ((currencySteps - CURRENCY_MIN) / (CURRENCY_MAX - CURRENCY_MIN)) * 100

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

        {/* Привилегии */}
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

        {/* Валюта */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Валюта</h2>
          <div className="rounded-xl border border-yellow-500/20 bg-white/5 backdrop-blur-sm p-6 max-w-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img src="https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/efb52b2a-1e3a-4a35-adc3-0feb755bd6f4.jpg" alt="монета" className="w-8 h-8 rounded-md object-cover" />
                <span className="text-white font-bold text-xl">{currencyAmount.toLocaleString()} ед.</span>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 font-bold text-2xl">{currencyPrice} ₽</span>
                <p className="text-xs text-neutral-500">10 ₽ за 1 000 ед.</p>
              </div>
            </div>

            <div className="relative mt-5 mb-3">
              <div className="w-full h-2 bg-white/10 rounded-full relative">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all"
                  style={{ width: `${sliderPercent}%` }}
                />
              </div>
              <input
                type="range"
                min={CURRENCY_MIN}
                max={CURRENCY_MAX}
                step={CURRENCY_STEP}
                value={currencySteps}
                onChange={e => setCurrencySteps(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
                style={{ margin: 0 }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-yellow-400 border-2 border-black shadow-lg transition-all pointer-events-none"
                style={{ left: `calc(${sliderPercent}% - 10px)` }}
              />
            </div>

            <div className="flex justify-between text-xs text-neutral-600 mb-5">
              <span>1 000</span>
              <span>100 000</span>
            </div>

            <Button
              className="w-full font-bold h-11 border-0 bg-yellow-400 hover:bg-yellow-300 text-black"
              onClick={() => { setCurrencyModal(true); setCurrencyNick(""); setCurrencyError(false) }}
            >
              Купить за {currencyPrice} ₽
            </Button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-neutral-600 mt-8"
        >
          После оплаты напиши в нашу группу — выдадим привилегию или валюту
        </motion.p>
      </div>

      {/* Модалка привилегии */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-sm w-full flex flex-col gap-5"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
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
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 outline-none transition-colors ${error ? "border-red-500" : "border-white/10 focus:border-white/30"}`}
                  autoFocus
                />
                {error && <p className="text-xs text-red-400">Укажи ник, чтобы мы знали кому выдать привилегию</p>}
              </div>
              <Button className="w-full font-bold h-11 border-0" style={{ backgroundColor: selected.color, color: '#000' }} onClick={handlePay}>
                Перейти к оплате
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модалка валюты */}
      <AnimatePresence>
        {currencyModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCurrencyModal(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative bg-[#111] border border-yellow-500/20 rounded-2xl p-6 max-w-sm w-full flex flex-col gap-5"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setCurrencyModal(false)} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
                <Icon name="X" size={18} />
              </button>
              <div>
                <p className="text-neutral-400 text-sm">Покупка валюты</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <img src="https://cdn.poehali.dev/projects/0989b7ef-f7ad-4b5a-b9df-4d48eb223e8b/files/efb52b2a-1e3a-4a35-adc3-0feb755bd6f4.jpg" alt="монета" className="w-8 h-8 rounded-md object-cover" />
                  <p className="text-white text-2xl font-bold">{currencyAmount.toLocaleString()} ед.</p>
                </div>
                <p className="text-yellow-400 text-xl font-bold mt-1">{currencyPrice} ₽</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-400">Твой ник в Minecraft</label>
                <input
                  type="text"
                  value={currencyNick}
                  onChange={e => { setCurrencyNick(e.target.value); setCurrencyError(false) }}
                  onKeyDown={e => e.key === "Enter" && handleCurrencyPay()}
                  placeholder="Введи ник..."
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 outline-none transition-colors ${currencyError ? "border-red-500" : "border-white/10 focus:border-white/30"}`}
                  autoFocus
                />
                {currencyError && <p className="text-xs text-red-400">Укажи ник, чтобы мы знали кому зачислить валюту</p>}
              </div>
              <Button className="w-full font-bold h-11 border-0 bg-yellow-400 hover:bg-yellow-300 text-black" onClick={handleCurrencyPay}>
                Перейти к оплате
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}