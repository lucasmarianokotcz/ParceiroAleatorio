import { useEffect, useRef, useState } from "react"
import {
  Briefcase,
  Calendar,
  Check,
  Copy,
  Ruler,
  User,
  Weight,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatarResumoTexto, type Parceiro } from "@/lib/parceiro"
import { cn } from "@/lib/utils"

interface PartnerCardProps {
  parceiro: Parceiro
  isRolling: boolean
}

export function PartnerCard({ parceiro, isRolling }: PartnerCardProps) {
  const shouldReduceMotion = Boolean(useReducedMotion())
  const [copiadoId, setCopiadoId] = useState<string | null>(null)
  const copyTimerRef = useRef<number | null>(null)

  const copiado = copiadoId === parceiro.id

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  async function handleCopiar() {
    if (isRolling) return
    try {
      await navigator.clipboard.writeText(formatarResumoTexto(parceiro))
      setCopiadoId(parceiro.id)
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current)
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiadoId(null)
        copyTimerRef.current = null
      }, 1800)
    } catch {
      // Clipboard API indisponível no contexto atual.
    }
  }

  const itemMotion = (index: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: {
            type: "spring" as const,
            stiffness: 380,
            damping: 28,
            delay: index * 0.035,
          },
        }

  const valueKey = isRolling ? "rolling" : parceiro.id

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 360, damping: 28 }
      }
    >
      <Card className="gap-0 border-border/80 bg-card/95 py-0 shadow-sm backdrop-blur-xs">
        <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            <Badge
              variant="secondary"
              className="rounded-md px-2.5 py-0.5 font-mono text-xs tabular-nums"
            >
              Perfil #{parceiro.numero}
            </Badge>
            <span className="text-[11px] text-muted-foreground sm:text-xs">
              {isRolling ? "Sorteando características..." : "Características sorteadas"}
            </span>
          </div>

          <CardAction className="self-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopiar}
                  disabled={isRolling}
                  aria-label="Copiar resumo do parceiro"
                  className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground sm:h-8 sm:gap-1.5 sm:px-2.5"
                >
                  {copiado ? (
                    <>
                      <Check className="size-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Copiar resumo em texto
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>

        <Separator className="opacity-70" />

        <CardContent className="p-3.5 sm:p-6">
          <div
            aria-live="polite"
            className="grid grid-cols-2 gap-2.5 sm:gap-3"
          >
            {/* Sexo */}
            <motion.div
              {...itemMotion(0)}
              className="rounded-xl border border-border/70 bg-muted/35 p-3 transition-colors hover:bg-muted/55 sm:p-4"
            >
              <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs">
                <span>Sexo</span>
                <User className="size-3.5 text-muted-foreground/80" />
              </div>
              <div className="mt-1.5 sm:mt-2.5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`sexo-${valueKey}`}
                    initial={
                      shouldReduceMotion || isRolling
                        ? false
                        : { opacity: 0.4, y: 4 }
                    }
                    animate={{ opacity: isRolling ? 0.65 : 1, y: 0 }}
                    transition={{ duration: 0.16 }}
                    className={cn(
                      "text-lg font-semibold tracking-tight text-foreground transition-[filter] duration-150 sm:text-2xl",
                      isRolling && "blur-[1.5px]",
                    )}
                  >
                    {parceiro.sexo}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Idade */}
            <motion.div
              {...itemMotion(1)}
              className="rounded-xl border border-border/70 bg-muted/35 p-3 transition-colors hover:bg-muted/55 sm:p-4"
            >
              <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs">
                <span>Idade</span>
                <Calendar className="size-3.5 text-muted-foreground/80" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5 sm:mt-2.5">
                <span
                  className={cn(
                    "font-mono text-lg font-semibold tracking-tight tabular-nums text-foreground transition-all duration-150 sm:text-2xl",
                    isRolling && "opacity-65 blur-[1.5px]",
                  )}
                >
                  {parceiro.idade}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">anos</span>
              </div>
            </motion.div>

            {/* Altura */}
            <motion.div
              {...itemMotion(2)}
              className="rounded-xl border border-border/70 bg-muted/35 p-3 transition-colors hover:bg-muted/55 sm:p-4"
            >
              <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs">
                <span>Altura</span>
                <Ruler className="size-3.5 text-muted-foreground/80" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5 sm:mt-2.5">
                <span
                  className={cn(
                    "font-mono text-lg font-semibold tracking-tight tabular-nums text-foreground transition-all duration-150 sm:text-2xl",
                    isRolling && "opacity-65 blur-[1.5px]",
                  )}
                >
                  {parceiro.alturaCm}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">cm</span>
              </div>
            </motion.div>

            {/* Peso */}
            <motion.div
              {...itemMotion(3)}
              className="rounded-xl border border-border/70 bg-muted/35 p-3 transition-colors hover:bg-muted/55 sm:p-4"
            >
              <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs">
                <span>Peso</span>
                <Weight className="size-3.5 text-muted-foreground/80" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5 sm:mt-2.5">
                <span
                  className={cn(
                    "font-mono text-lg font-semibold tracking-tight tabular-nums text-foreground transition-all duration-150 sm:text-2xl",
                    isRolling && "opacity-65 blur-[1.5px]",
                  )}
                >
                  {parceiro.pesoKg}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">kg</span>
              </div>
            </motion.div>

            {/* Profissão */}
            <motion.div
              {...itemMotion(4)}
              className="col-span-2 rounded-xl border border-border/80 bg-muted/45 p-3 transition-colors hover:bg-muted/65 sm:p-5"
            >
              <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs">
                <span>Profissão</span>
                <Briefcase className="size-3.5 text-muted-foreground/80" />
              </div>
              <div className="mt-1.5 sm:mt-2.5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`prof-${valueKey}`}
                    initial={
                      shouldReduceMotion || isRolling
                        ? false
                        : { opacity: 0.4, y: 5 }
                    }
                    animate={{ opacity: isRolling ? 0.65 : 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={cn(
                      "inline-block text-lg font-semibold tracking-tight text-foreground transition-[filter] duration-150 sm:text-2xl",
                      isRolling && "blur-[1.5px]",
                    )}
                  >
                    {parceiro.profissao}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
