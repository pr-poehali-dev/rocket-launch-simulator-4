import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Squares } from "@/components/landing/squares-background"
import Icon from "@/components/ui/icon"

const privileges = [
  { name: "Warden",   price: 29,  color: "#6ee7b7", desc: "Стартовый набор" },
  { name: "SMP",      price: 49,  color: "#34d399", desc: "Выживание+" },
  { name: "Explorer", price: 69,  color: "#10b981", desc: "Исследователь" },
  { name: "Warrior",  price: 89,  color: "#059669", desc: "Воин сервера" },
  { name: "Legenda",  price: 119, color: "#f59e0b", desc: "Легендарный статус" },
  { name: "Lord",     price: 149, color: "#f97316", desc: "Повелитель" },
  { name: "Spectre",  price: 189, color: "#a78bfa", desc: "Призрачная сила" },
  { name: "Viper",    price: 249, color: "#ec4899", desc: "Элита сервера" },
]

export default function Shop() {
  const navigate = useNavigate()

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
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold"
                style={{ backgroundColor: `${p.color}22`, color: p.color }}
              >
                {p.name[0]}
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
                  className="text-xs h-8 px-4 border-white/20 text-white/70 transition-all"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = p.color
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#000'
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = p.color
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = ''
                    ;(e.currentTarget as HTMLButtonElement).style.color = ''
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = ''
                  }}
                  onClick={() => window.open('https://vk.ru/club239028200', '_blank')}
                >
                  Купить
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
