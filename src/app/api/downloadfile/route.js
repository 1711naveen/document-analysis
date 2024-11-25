import fs from 'fs';
import path from 'path';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const fileName = searchParams.get('file');

  if (!id || !fileName) {
    return new Response(
      JSON.stringify({ error: 'Missing id or file parameters' }),
      { status: 400 }
    );
  }

  const folderPath = path.join(process.cwd(), 'output', id);
  const filePath = path.join(folderPath, fileName);

  try {
    // Check if the folder and file exist
    if (fs.existsSync(folderPath) && fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);
      const fileExtension = path.extname(fileName).slice(1); // Get the file extension (optional)
      const mimeType = fileExtension === 'pdf' ? 'application/pdf' : 'application/octet-stream'; // Set MIME type accordingly

      // Return the file as a stream with proper headers for download
      return new Response(fileStream, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
      });
    } else {
      return new Response(JSON.stringify({ error: 'File not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error reading the file' }), { status: 500 });
  }
}
