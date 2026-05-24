import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const privileges = [
  { name: "Warden",  price: 29,  color: "#6ee7b7", desc: "Стартовый набор" },
  { name: "SMP",     price: 49,  color: "#34d399", desc: "Выживание+" },
  { name: "Explorer",price: 69,  color: "#10b981", desc: "Исследователь" },
  { name: "Warrior", price: 89,  color: "#059669", desc: "Воин сервера" },
  { name: "Legenda", price: 119, color: "#f59e0b", desc: "Легендарный статус" },
  { name: "Lord",    price: 149, color: "#f97316", desc: "Повелитель" },
  { name: "Spectre", price: 189, color: "#a78bfa", desc: "Призрачная сила" },
  { name: "Viper",   price: 249, color: "#ec4899", desc: "Элита сервера" },
]

interface Props {
  isActive: boolean
}

export default function PrivilegesSection({ isActive }: Props) {
  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Выбери привилегию
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {privileges.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex flex-col gap-2 hover:bg-white/10 transition-all cursor-pointer"
            style={{ borderColor: `${p.color}33` }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${p.color}22`, color: p.color }}>
              {p.name[0]}
            </div>
            <div>
              <p className="font-bold text-white text-base leading-tight">{p.name}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{p.desc}</p>
            </div>
            <div className="mt-auto pt-2 flex items-center justify-between">
              <span className="text-lg font-bold" style={{ color: p.color }}>{p.price} ₽</span>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 px-3 border-white/20 text-white/70 hover:text-black hover:border-transparent transition-all"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = p.color; (e.currentTarget as HTMLButtonElement).style.color = '#000' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = ''; (e.currentTarget as HTMLButtonElement).style.color = '' }}
                onClick={() => window.open('https://vk.ru/club239028200', '_blank')}
              >
                Купить
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}