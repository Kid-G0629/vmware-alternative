import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  return [
    { params: { locale: 'en' } },
    { params: { locale: 'zh' } },
  ];
}

export const GET: APIRoute = async ({ params }) => {
  const { locale } = params;
  const lang = locale || 'en';
  const basePath = lang === 'en' ? '' : `/${lang}`;

  const modules = import.meta.glob('../../../content/news/**/*.md', { eager: true });
  const posts = Object.entries(modules)
    .filter(([filepath]) => filepath.includes(`/${lang}/`))
    .map(([filepath, mod]) => {
      const slug = filepath.split('/').pop()?.replace(/\.md$/, '');
      const fm = (mod as any).frontmatter;
      return { slug, date: fm?.date };
    })
    .filter(p => p.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latest = posts[0];
  return new Response(
    JSON.stringify({ url: latest ? `${basePath}/news/${latest.slug}/` : `${basePath}/news/` }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
