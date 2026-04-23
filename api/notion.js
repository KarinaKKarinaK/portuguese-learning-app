export const config = { runtime: 'edge' };

export default async function handler(req) {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !dbId) {
    return new Response(JSON.stringify({ error: 'Notion not configured' }), {
      status: 503, headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100 }),
    });

    const data = await res.json();
    const words = data.results?.map(page => ({
      id: page.id,
      word: page.properties.word?.title?.[0]?.plain_text || '',
      translation: page.properties.translation_en?.rich_text?.[0]?.plain_text || '',
    })).filter(w => w.word) || [];

    return new Response(JSON.stringify({ words }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
