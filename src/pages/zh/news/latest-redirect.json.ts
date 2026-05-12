import type { APIRoute } from 'astro';
export const GET: APIRoute = async () => {
  const modules = import.meta.glob('../../../content/news/**/*.md', { eager: true });
  const posts = Object.entries(modules)
    .filter(([filepath]) => filepath.includes('/zh/'))
    .map(([filepath, mod]) => {
      const slug = filepath.split('/').pop()?.replace(/\.md$/, '');
      const fm = (mod as any).frontmatter;
      return { slug, date: fm?.date };
    })
    .filter(p => p.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latest = posts[0];
  return new Response(
    JSON.stringify({ url: latest ? `/zh/news/${latest.slug}/` : '/zh/news/' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
