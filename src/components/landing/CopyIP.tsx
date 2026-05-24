import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const IP = "Sinima.aternos.me:35428"

export default function CopyIP() {
  const [copied, setCopied] = useState(false)
  const [online, setOnline] = useState<number | null>(null)
  const [isOnline, setIsOnline] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${IP}`)
        const data = await res.json()
        setIsOnline(data.online ?? false)
        setOnline(data.players?.online ?? 0)
      } catch {
        setIsOnline(false)
      }
    }
    fetchStatus()
    const interval = setInterval(fetchStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(IP)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {isOnline === null ? (
        <Badge variant="outline" className="text-neutral-500 border-neutral-700">Проверяем...</Badge>
      ) : isOnline ? (
        <Badge variant="outline" className="text-green-400 border-green-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
          {online} онлайн
        </Badge>
      ) : (
        <Badge variant="outline" className="text-red-400 border-red-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
          Сервер выключен
        </Badge>
      )}

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 border border-neutral-600 rounded-full px-3 py-0.5 text-sm font-mono text-neutral-400 hover:border-green-400 hover:text-green-400 transition-all"
      >
        <span>{IP}</span>
        <Icon name={copied ? "Check" : "Copy"} size={13} />
      </button>
      {copied && <span className="text-xs text-green-400">Скопировано!</span>}
    </div>
  )
}