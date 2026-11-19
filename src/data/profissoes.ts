export interface ProfissaoItem {
  masculino: string
  feminino: string
  categoria: string
}

export const PROFISSOES: readonly ProfissaoItem[] = [
  // Artes, Cultura, Música & Cinema (12)
  { masculino: "Pintor", feminino: "Pintora", categoria: "Artes" },
  { masculino: "Escultor", feminino: "Escultora", categoria: "Artes" },
  { masculino: "Ilustrador", feminino: "Ilustradora", categoria: "Artes" },
  { masculino: "Fotógrafo", feminino: "Fotógrafa", categoria: "Artes" },
  { masculino: "Escritor", feminino: "Escritora", categoria: "Cultura" },
  { masculino: "Ator", feminino: "Atriz", categoria: "Cultura" },
  { masculino: "Cantor", feminino: "Cantora", categoria: "Música" },
  { masculino: "Bailarino", feminino: "Bailarina", categoria: "Artes" },
  { masculino: "Compositor", feminino: "Compositora", categoria: "Música" },
  { masculino: "Maestro", feminino: "Maestrina", categoria: "Música" },
  { masculino: "Diretor de Cinema", feminino: "Diretora de Cinema", categoria: "Cinema" },
  { masculino: "Produtor Musical", feminino: "Produtora Musical", categoria: "Música" },

  // Saúde (6)
  { masculino: "Médico", feminino: "Médica", categoria: "Saúde" },
  { masculino: "Enfermeiro", feminino: "Enfermeira", categoria: "Saúde" },
  { masculino: "Psicólogo", feminino: "Psicóloga", categoria: "Saúde" },
  { masculino: "Veterinário", feminino: "Veterinária", categoria: "Saúde" },
  { masculino: "Farmacêutico", feminino: "Farmacêutica", categoria: "Saúde" },
  { masculino: "Cirurgião", feminino: "Cirurgiã", categoria: "Saúde" },

  // Tecnologia & Ciência (9)
  { masculino: "Engenheiro", feminino: "Engenheira", categoria: "Tecnologia" },
  { masculino: "Programador", feminino: "Programadora", categoria: "Tecnologia" },
  { masculino: "Desenvolvedor", feminino: "Desenvolvedora", categoria: "Tecnologia" },
  { masculino: "Pesquisador", feminino: "Pesquisadora", categoria: "Ciência" },
  { masculino: "Biólogo", feminino: "Bióloga", categoria: "Ciência" },
  { masculino: "Químico", feminino: "Química", categoria: "Ciência" },
  { masculino: "Físico", feminino: "Física", categoria: "Ciência" },
  { masculino: "Astrônomo", feminino: "Astrônoma", categoria: "Ciência" },
  { masculino: "Arqueólogo", feminino: "Arqueóloga", categoria: "Ciência" },

  // Educação & Comunicação (6)
  { masculino: "Historiador", feminino: "Historiadora", categoria: "Educação" },
  { masculino: "Professor", feminino: "Professora", categoria: "Educação" },
  { masculino: "Bibliotecário", feminino: "Bibliotecária", categoria: "Educação" },
  { masculino: "Tradutor", feminino: "Tradutora", categoria: "Comunicação" },
  { masculino: "Locutor", feminino: "Locutora", categoria: "Comunicação" },
  { masculino: "Apresentador", feminino: "Apresentadora", categoria: "Comunicação" },

  // Direito & Design/Moda (6)
  { masculino: "Advogado", feminino: "Advogada", categoria: "Direito" },
  { masculino: "Juiz", feminino: "Juíza", categoria: "Direito" },
  { masculino: "Promotor", feminino: "Promotora", categoria: "Direito" },
  { masculino: "Arquiteto", feminino: "Arquiteta", categoria: "Design" },
  { masculino: "Decorador", feminino: "Decoradora", categoria: "Design" },
  { masculino: "Costureiro", feminino: "Costureira", categoria: "Moda" },

  // Gastronomia (4)
  { masculino: "Cozinheiro", feminino: "Cozinheira", categoria: "Gastronomia" },
  { masculino: "Confeiteiro", feminino: "Confeiteira", categoria: "Gastronomia" },
  { masculino: "Padeiro", feminino: "Padeira", categoria: "Gastronomia" },
  { masculino: "Garçom", feminino: "Garçonete", categoria: "Gastronomia" },

  // Negócios, Serviços, Ofícios & Esportes (13)
  { masculino: "Administrador", feminino: "Administradora", categoria: "Negócios" },
  { masculino: "Contador", feminino: "Contadora", categoria: "Negócios" },
  { masculino: "Empresário", feminino: "Empresária", categoria: "Negócios" },
  { masculino: "Corretor de Imóveis", feminino: "Corretora de Imóveis", categoria: "Negócios" },
  { masculino: "Comissário de Bordo", feminino: "Comissária de Bordo", categoria: "Serviços" },
  { masculino: "Bombeiro", feminino: "Bombeira", categoria: "Serviços" },
  { masculino: "Mecânico", feminino: "Mecânica", categoria: "Ofícios" },
  { masculino: "Marceneiro", feminino: "Marceneira", categoria: "Ofícios" },
  { masculino: "Jardineiro", feminino: "Jardineira", categoria: "Ofícios" },
  { masculino: "Mergulhador", feminino: "Mergulhadora", categoria: "Esportes" },
  { masculino: "Treinador", feminino: "Treinadora", categoria: "Esportes" },
  { masculino: "Nadador", feminino: "Nadadora", categoria: "Esportes" },
  { masculino: "Jogador de Xadrez", feminino: "Jogadora de Xadrez", categoria: "Esportes" },
] as const
