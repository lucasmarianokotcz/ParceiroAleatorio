import { useCallback, useEffect, useRef, useState } from "react"
import { Dices, Moon, Sun } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { PartnerCard } from "@/components/PartnerCard"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "@/hooks/use-theme"
import { gerarParceiro, type Parceiro } from "@/lib/parceiro"

const ROLL_TICKS = 5
const ROLL_INTERVAL_MS = 60

export function App() {
  const { theme, toggleTheme } = useTheme()
  const shouldReduceMotion = Boolean(useReducedMotion())

  const [parceiroAtual, setParceiroAtual] = useState<Parceiro | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [rollCount, setRollCount] = useState(0)

  const contadorRef = useRef(0)
  const ultimoSorteadoRef = useRef<Parceiro | null>(null)
  const rollingTimersRef = useRef<number[]>([])

  const limparTimersDeSorteio = useCallback(() => {
    for (const timerId of rollingTimersRef.current) {
      window.clearTimeout(timerId)
    }
    rollingTimersRef.current = []
  }, [])

  useEffect(() => {
    return () => {
      limparTimersDeSorteio()
    }
  }, [limparTimersDeSorteio])

  const sortearParceiro = useCallback(() => {
    limparTimersDeSorteio()

    const proximoNumero = contadorRef.current + 1
    contadorRef.current = proximoNumero

    const anterior = ultimoSorteadoRef.current
    const parceiroFinal = gerarParceiro(proximoNumero, anterior)
    ultimoSorteadoRef.current = parceiroFinal

    setRollCount((count) => count + 1)

    if (shouldReduceMotion) {
      setIsRolling(false)
      setParceiroAtual(parceiroFinal)
      return
    }

    setIsRolling(true)
    setParceiroAtual(gerarParceiro(proximoNumero))

    for (let step = 1; step < ROLL_TICKS; step++) {
      const timerId = window.setTimeout(() => {
        setParceiroAtual(gerarParceiro(proximoNumero))
      }, step * ROLL_INTERVAL_MS)
      rollingTimersRef.current.push(timerId)
    }

    const finalTimerId = window.setTimeout(() => {
      setIsRolling(false)
      setParceiroAtual(parceiroFinal)
      rollingTimersRef.current = []
    }, ROLL_TICKS * ROLL_INTERVAL_MS)
    rollingTimersRef.current.push(finalTimerId)
  }, [limparTimersDeSorteio, shouldReduceMotion])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code !== "Space" || event.repeat) return
      if (event.ctrlKey || event.metaKey || event.altKey) return

      const target = event.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (
          tag === "BUTTON" ||
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          tag === "A" ||
          target.isContentEditable ||
          target.getAttribute("role") === "button"
        ) {
          return
        }
      }

      if (isRolling) return
      event.preventDefault()
      sortearParceiro()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isRolling, sortearParceiro])

  return (
    <div className="relative flex min-h-svh flex-col bg-background text-foreground">
      {/* Textura de grade neutra sutil ao fundo */}
      <div
        aria-hidden="true"
        className="bg-neutral-grid pointer-events-none fixed inset-0 z-0"
      />

      {/* Top bar minimalista */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-2xl items-center justify-end px-4 pt-4 pb-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Ativar tema claro"
                    : "Ativar tema escuro"
                }
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {theme === "dark" ? "Tema claro" : "Tema escuro"}
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex flex-1 flex-col px-4 pt-3 pb-10 sm:pt-5 sm:pb-14">
        <div className="mx-auto w-full max-w-2xl">
          {/* Hero compacto + Botão */}
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Parceiro Aleatório
            </h1>

            <div className="mt-7 flex flex-col items-center gap-2.5">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
              >
                <Button
                  type="button"
                  size="lg"
                  onClick={sortearParceiro}
                  className="h-11 cursor-pointer gap-2.5 rounded-xl px-6 text-sm font-medium shadow-sm"
                >
                  <motion.span
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { rotate: rollCount * 180 }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="inline-flex"
                  >
                    <Dices className="size-4" />
                  </motion.span>
                  <span>
                    {parceiroAtual ? "Sortear novamente" : "Sortear parceiro"}
                  </span>
                </Button>
              </motion.div>

              <p className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
                <span>Pressione</span>
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground">
                  Espaço
                </kbd>
                <span>para sortear</span>
              </p>
            </div>
          </section>

          {/* Área de resultado abaixo do botão */}
          <AnimatePresence>
            {parceiroAtual && (
              <section className="mt-8">
                <PartnerCard
                  key="partner-card"
                  parceiro={parceiroAtual}
                  isRolling={isRolling}
                />
              </section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default App
