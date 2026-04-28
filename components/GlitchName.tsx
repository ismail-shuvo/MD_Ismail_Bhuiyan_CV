'use client'
import { useEffect, useState } from 'react'

export default function GlitchName({ name }: { name: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(name.slice(0, i + 1))
      i++
      if (i >= name.length) { clearInterval(interval); setDone(true) }
    }, 60)
    return () => clearInterval(interval)
  }, [name])

  return (
    <span className={done ? 'glitch' : ''} style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 30,
      color: 'var(--accent)',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }}>
      {displayed}
      {!done && <span style={{ opacity: 0.5 }}>|</span>}
    </span>
  )
}