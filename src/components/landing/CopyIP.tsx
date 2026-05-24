import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const IP = "Sinima.aternos.me"

export default function CopyIP() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(IP)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="text-green-400 border-green-400">Магазин открыт</Badge>
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
