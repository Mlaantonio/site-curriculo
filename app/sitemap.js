export default function sitemap() {
  // Troque pela URL real do seu projeto na Vercel ou domínio próprio
  const baseUrl = 'https://mario-luis-alves-antonio.vercel.app'; 

  return [
    {
      url: baseUrl, // Sua página inicial (Portfólio)
      lastModified: new Date(),
      changeFrequency: 'monthly', // Com que frequência você atualiza a página
      priority: 1, // Prioridade máxima (1.0) pois é a página principal
    },
    {
      url: `${baseUrl}/curriculo.html`, // O seu currículo em HTML
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/curriculo.json`, // O currículo em formato ATS (JSON)
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    }
  ]
}