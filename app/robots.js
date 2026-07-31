export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cadastro/'],
    },
    sitemap: 'https://https://mario-luis-alves-antonio.vercel.app/sitemap.xml',
  }
}