import type { APIRoute } from 'astro';
export const GET: APIRoute = async () => {
  // 使用 import.meta.glob 获取所有 post
  const modules = import.meta.glob('../content/news/*.md', { eager: true });
  const posts = Object.entries(modules)
    .map(([filepath, mod]) => {
      const slug = filepath.split('/').pop()?.replace(/\.md$/, '');
      const fm = (mod as any).frontmatter;
      return { slug, date: fm?.date };
    })
    .filter(p => p.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latest = posts[0];
  return new Response(
    JSON.stringify({ url: latest ? `/news/${latest.slug}/` : '/news' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};