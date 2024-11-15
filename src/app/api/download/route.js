import path from 'path';
import fs from 'fs';
import db from '../../../../lib/db';

export async function GET(req) {
  const url = new URL(req.url);
  const final_doc_id = url.searchParams.get('final_doc_id');

  // Retrieve file information based on final_doc_id from the database
  const fileData = await getFileDataFromDatabase(final_doc_id);

  if (!fileData) {
    return new Response(JSON.stringify({ error: 'File not found' }), { status: 404 });
  }

  const filePath = path.join(process.cwd(), fileData.final_doc_url);

  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath);
    return new Response(fileStream, {
      headers: {
        'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
        'Content-Type': 'application/octet-stream',
      },
    });
  } else {
    return new Response(JSON.stringify({ error: 'File not found' }), { status: 404 });
  }
}

async function getFileDataFromDatabase(final_doc_id) {
  const [rows] = await db.query(
    'SELECT final_doc_url FROM final_document WHERE row_doc_id = ? ',
    [final_doc_id]
  );

  return {
    final_doc_id,
    final_doc_url: rows[0].final_doc_url,
  };
}