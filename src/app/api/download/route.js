import path from 'path';
import fs from 'fs';
import db from '../../../../lib/db';
import AdmZip from 'adm-zip';

export async function GET(req) {
  const url = new URL(req.url);
  const final_doc_id = url.searchParams.get('final_doc_id');
  const fileData = await getFileDataFromDatabase(final_doc_id);

  if (!fileData) {
    return new Response(JSON.stringify({ error: 'File not found' }), { status: 404 });
  }

  const folderPath = path.join(process.cwd(), fileData.final_doc_url);
  console.log(folderPath)

  if (fs.existsSync(folderPath)) {
    const zip = new AdmZip();

    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      zip.addLocalFile(filePath);
    });

    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="files_${final_doc_id}.zip"`,
        'Content-Type': 'application/zip',
      },
    });
  } else {
    return new Response(JSON.stringify({ error: 'Folder not found' }), { status: 404 });
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