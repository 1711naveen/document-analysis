import fs from 'fs';
import path from 'path';

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  console.log(id);
  const folderPath = path.join(process.cwd(), 'output', id);
  console.log(folderPath);

  try {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);

      return new Response(JSON.stringify({ files }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Folder not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error reading the folder' }), { status: 500 });
  }
}
