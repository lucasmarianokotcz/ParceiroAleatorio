import { PROFISSOES, type ProfissaoItem } from "@/data/profissoes"

export const IDADE_MIN = 14
export const IDADE_MAX = 99
export const ALTURA_MIN_CM = 100
export const ALTURA_MAX_CM = 300
export const PESO_MIN_KG = 40
export const PESO_MAX_KG = 400

export type Sexo = "Masculino" | "Feminino"

export interface Parceiro {
  id: string
  numero: number
  sexo: Sexo
  idade: number
  alturaCm: number
  pesoKg: number
  profissao: string
  categoriaProfissao: string
  profissaoIndex: number
}

/**
 * Gera um número inteiro aleatório no intervalo inclusivo [min, max].
 */
export function gerarInteiro(
  min: number,
  max: number,
  rng: () => number = Math.random,
): number {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(rng() * (maxInt - minInt + 1)) + minInt
}

/**
 * Retorna a flexão da profissão adequada ao sexo informado.
 */
export function obterProfissaoPorSexo(item: ProfissaoItem, sexo: Sexo): string {
  return sexo === "Masculino" ? item.masculino : item.feminino
}

function sortearProfissaoIndex(
  anterior?: Parceiro | null,
  rng: () => number = Math.random,
): number {
  const total = PROFISSOES.length
  if (total <= 1 || !anterior) {
    return gerarInteiro(0, total - 1, rng)
  }

  // Sorteia entre (total - 1) posições para nunca repetir imediatamente a profissão anterior.
  const idx = gerarInteiro(0, total - 2, rng)
  return idx >= anterior.profissaoIndex ? idx + 1 : idx
}

/**
 * Gera um perfil completo de parceiro aleatório com todas as características dentro das faixas
 * e profissão gramaticalmente concordante com o sexo sorteado.
 */
export function gerarParceiro(
  numero: number,
  anterior?: Parceiro | null,
  rng: () => number = Math.random,
): Parceiro {
  const sexo: Sexo = rng() < 0.5 ? "Masculino" : "Feminino"
  const idade = gerarInteiro(IDADE_MIN, IDADE_MAX, rng)
  const alturaCm = gerarInteiro(ALTURA_MIN_CM, ALTURA_MAX_CM, rng)
  const pesoKg = gerarInteiro(PESO_MIN_KG, PESO_MAX_KG, rng)
  const profissaoIndex = sortearProfissaoIndex(anterior, rng)
  const item = PROFISSOES[profissaoIndex]

  return {
    id: `parceiro-${numero}-${gerarInteiro(1000, 9999, rng)}`,
    numero,
    sexo,
    idade,
    alturaCm,
    pesoKg,
    profissao: obterProfissaoPorSexo(item, sexo),
    categoriaProfissao: item.categoria,
    profissaoIndex,
  }
}

/**
 * Formata altura em centímetros para metros no padrão pt-BR (ex: 175 -> "1,75 m").
 */
export function formatarAlturaMetros(alturaCm: number): string {
  const metros = (alturaCm / 100).toFixed(2).replace(".", ",")
  return `${metros} m`
}

/**
 * Calcula o percentual normalizado (0 a 100) de um valor dentro de uma faixa [min, max].
 */
export function calcularPercentualFaixa(
  valor: number,
  min: number,
  max: number,
): number {
  if (max <= min) return 0
  const percentual = ((valor - min) / (max - min)) * 100
  return Math.min(100, Math.max(0, percentual))
}

/**
 * Formata um resumo legível em pt-BR para copiar para a área de transferência.
 */
export function formatarResumoTexto(parceiro: Parceiro): string {
  return [
    `Parceiro Aleatório #${parceiro.numero}`,
    `Sexo: ${parceiro.sexo}`,
    `Idade: ${parceiro.idade} anos`,
    `Altura: ${parceiro.alturaCm} cm (${formatarAlturaMetros(parceiro.alturaCm)})`,
    `Peso: ${parceiro.pesoKg} kg`,
    `Profissão: ${parceiro.profissao}`,
  ].join("\n")
}
