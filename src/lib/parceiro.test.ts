import { describe, expect, it } from "bun:test"
import { PROFISSOES } from "@/data/profissoes"
import {
  ALTURA_MAX_CM,
  ALTURA_MIN_CM,
  IDADE_MAX,
  IDADE_MIN,
  PESO_MAX_KG,
  PESO_MIN_KG,
  calcularPercentualFaixa,
  formatarAlturaMetros,
  formatarResumoTexto,
  gerarParceiro,
  obterProfissaoPorSexo,
  type Parceiro,
} from "@/lib/parceiro"

describe("profissoes e concordância de gênero", () => {
  it("contém Pintor / Pintora e respeita o gênero na seleção", () => {
    const pintor = PROFISSOES.find(
      (p) => p.masculino === "Pintor" && p.feminino === "Pintora",
    )
    expect(pintor).toBeDefined()
    expect(obterProfissaoPorSexo(pintor!, "Masculino")).toBe("Pintor")
    expect(obterProfissaoPorSexo(pintor!, "Feminino")).toBe("Pintora")
  })

  it("possui todas as profissões com formas masculina e feminina distintas e não vazias", () => {
    expect(PROFISSOES.length).toBeGreaterThanOrEqual(50)
    for (const item of PROFISSOES) {
      expect(item.masculino.trim().length).toBeGreaterThan(0)
      expect(item.feminino.trim().length).toBeGreaterThan(0)
      expect(item.categoria.trim().length).toBeGreaterThan(0)
      expect(item.masculino).not.toBe(item.feminino)
    }
  })
})

describe("gerarParceiro", () => {
  it("respeita faixas válidas, ambos os sexos, concordância e não repetição imediata em 2000 sorteios", () => {
    let anterior: Parceiro | null = null
    let totalMasculino = 0
    let totalFeminino = 0

    for (let i = 1; i <= 2000; i++) {
      const atual = gerarParceiro(i, anterior)

      expect(["Masculino", "Feminino"]).toContain(atual.sexo)
      if (atual.sexo === "Masculino") totalMasculino++
      else totalFeminino++

      expect(Number.isInteger(atual.idade)).toBe(true)
      expect(atual.idade).toBeGreaterThanOrEqual(IDADE_MIN)
      expect(atual.idade).toBeLessThanOrEqual(IDADE_MAX)

      expect(Number.isInteger(atual.alturaCm)).toBe(true)
      expect(atual.alturaCm).toBeGreaterThanOrEqual(ALTURA_MIN_CM)
      expect(atual.alturaCm).toBeLessThanOrEqual(ALTURA_MAX_CM)

      expect(Number.isInteger(atual.pesoKg)).toBe(true)
      expect(atual.pesoKg).toBeGreaterThanOrEqual(PESO_MIN_KG)
      expect(atual.pesoKg).toBeLessThanOrEqual(PESO_MAX_KG)

      const item = PROFISSOES[atual.profissaoIndex]
      expect(item).toBeDefined()
      if (atual.sexo === "Masculino") {
        expect(atual.profissao).toBe(item.masculino)
        expect(atual.profissao).not.toBe(item.feminino)
      } else {
        expect(atual.profissao).toBe(item.feminino)
        expect(atual.profissao).not.toBe(item.masculino)
      }

      if (anterior) {
        expect(atual.profissaoIndex).not.toBe(anterior.profissaoIndex)
      }

      anterior = atual
    }

    expect(totalMasculino).toBeGreaterThan(0)
    expect(totalFeminino).toBeGreaterThan(0)
  })
})

describe("formatação e cálculos", () => {
  it("formata altura em metros com vírgula pt-BR", () => {
    expect(formatarAlturaMetros(175)).toBe("1,75 m")
    expect(formatarAlturaMetros(200)).toBe("2,00 m")
    expect(formatarAlturaMetros(100)).toBe("1,00 m")
  })

  it("calcula percentual de faixa corretamente com clamp", () => {
    expect(calcularPercentualFaixa(14, 14, 99)).toBe(0)
    expect(calcularPercentualFaixa(99, 14, 99)).toBe(100)
    expect(calcularPercentualFaixa(200, 100, 300)).toBe(50)
    expect(calcularPercentualFaixa(0, 40, 400)).toBe(0)
    expect(calcularPercentualFaixa(500, 40, 400)).toBe(100)
  })

  it("formata resumo de texto em pt-BR", () => {
    const resumo = formatarResumoTexto({
      id: "p-1",
      numero: 7,
      sexo: "Feminino",
      idade: 28,
      alturaCm: 175,
      pesoKg: 64,
      profissao: "Pintora",
      categoriaProfissao: "Artes",
      profissaoIndex: 0,
    })

    expect(resumo).toContain("Parceiro Aleatório #7")
    expect(resumo).toContain("Sexo: Feminino")
    expect(resumo).toContain("Idade: 28 anos")
    expect(resumo).toContain("Altura: 175 cm (1,75 m)")
    expect(resumo).toContain("Peso: 64 kg")
    expect(resumo).toContain("Profissão: Pintora")
  })
})
