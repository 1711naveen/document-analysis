// import path from 'path';
// import fs from 'fs/promises'; // Use promises for async file handling
// import { NextResponse } from 'next/server';
// import db from '../../../../lib/db';

// export async function GET(req) {
//   try {
//     // Parse query parameters
//     const { searchParams } = new URL(req.url);
//     const final_doc_id = searchParams.get('final_doc_id');
//     const fileName = searchParams.get('file');

//     if (!final_doc_id) {
//       return NextResponse.json(
//         { error: 'final_doc_id is required' },
//         { status: 400 }
//       );
//     }

//     const fileData = await getFileDataFromDatabase(final_doc_id);

//     if (!fileData || !fileData.final_doc_url) {
//       return NextResponse.json(
//         { error: 'File not found in the database' },
//         { status: 404 }
//       );
//     }

//     const folderPath = path.join(process.cwd(), 'output', final_doc_id);
//     const filePath = path.join(folderPath, fileName);

//     try {
//       const fileContent = await fs.readFile(filePath, 'utf-8');
//       return NextResponse.json(
//         { final_doc_id: fileData.final_doc_id, fileContent },
//         { status: 200 }
//       );
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'Error reading the file', details: error.message },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Server error', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// async function getFileDataFromDatabase(final_doc_id) {
//   const [rows] = await db.query(
//     'SELECT final_doc_url FROM final_document WHERE row_doc_id = ?',
//     [final_doc_id]
//   );
//   console.log(final_doc_id);
//   console.log(rows);

//   if (rows.length === 0) {
//     return null; // No data found
//   }

//   return {
//     final_doc_id,
//     final_doc_url: rows[0].final_doc_url,
//   };
// }


// import path from 'path';
// import fs from 'fs/promises'; // Use promises for async file handling
// import { NextResponse } from 'next/server';
// import mammoth from 'mammoth'; // For extracting text from docx files
// import db from '../../../../lib/db';

// export async function GET(req) {
//   try {
//     // Parse query parameters
//     const { searchParams } = new URL(req.url);
//     const final_doc_id = searchParams.get('final_doc_id');
//     const fileName = searchParams.get('file');

//     if (!final_doc_id) {
//       return NextResponse.json(
//         { error: 'final_doc_id is required' },
//         { status: 400 }
//       );
//     }

//     const fileData = await getFileDataFromDatabase(final_doc_id);

//     if (!fileData || !fileData.final_doc_url) {
//       return NextResponse.json(
//         { error: 'File not found in the database' },
//         { status: 404 }
//       );
//     }

//     const folderPath = path.join(process.cwd(), 'output', final_doc_id);
//     const filePath = path.join(folderPath, fileName);

//     try {
//       const fileBuffer = await fs.readFile(filePath);

//       if (fileName.endsWith('.docx')) {
//         // Extract text from the .docx file using Mammoth
//         const { value: text } = await mammoth.extractRawText({ buffer: fileBuffer });
//         return NextResponse.json(
//           { final_doc_id: fileData.final_doc_id, content: text },
//           { status: 200 }
//         );
//       } else {
//         // If the file is not a .docx, return plain text content
//         const fileContent = fileBuffer.toString('utf-8');
//         return NextResponse.json(
//           { final_doc_id: fileData.final_doc_id, content: fileContent },
//           { status: 200 }
//         );
//       }
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'Error reading the file', details: error.message },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Server error', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// async function getFileDataFromDatabase(final_doc_id) {
//   const [rows] = await db.query(
//     'SELECT final_doc_url FROM final_document WHERE row_doc_id = ?',
//     [final_doc_id]
//   );
//   console.log(final_doc_id);
//   console.log(rows);

//   if (rows.length === 0) {
//     return null; // No data found
//   }

//   return {
//     final_doc_id,
//     final_doc_url: rows[0].final_doc_url,
//   };
// }


import path from 'path';
import fs from 'fs/promises'; // Use promises for async file handling
import { NextResponse } from 'next/server';
import mammoth from 'mammoth'; // For extracting text from docx files
import db from '../../../../lib/db';

export async function GET(req) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const final_doc_id = searchParams.get('final_doc_id');
    const fileName = searchParams.get('file');

    if (!final_doc_id) {
      return NextResponse.json(
        { error: 'final_doc_id is required' },
        { status: 400 }
      );
    }

    const fileData = await getFileDataFromDatabase(final_doc_id);

    if (!fileData || !fileData.final_doc_url) {
      return NextResponse.json(
        { error: 'File not found in the database' },
        { status: 404 }
      );
    }

    const folderPath = path.join(process.cwd(), 'output', final_doc_id);
    const filePath = path.join(folderPath, fileName);

    try {
      const fileBuffer = await fs.readFile(filePath);

      let htmlContent = '';
      if (fileName.endsWith('.docx')) {
        // Extract text from the .docx file using Mammoth
        const { value: text } = await mammoth.extractRawText({ buffer: fileBuffer });
        htmlContent = generateHTML(formatText(text));
      } else {
        // If the file is not a .docx, return plain text content
        const fileContent = fileBuffer.toString('utf-8');
        htmlContent = generateHTML(formatText(fileContent));
      }

      // Return HTML response
      return new Response(htmlContent, {
        headers: { 'Content-Type': 'text/html' },
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Error reading the file', details: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}

async function getFileDataFromDatabase(final_doc_id) {
  const [rows] = await db.query(
    'SELECT final_doc_url FROM final_document WHERE row_doc_id = ?',
    [final_doc_id]
  );

  if (rows.length === 0) {
    return null; // No data found
  }

  return {
    final_doc_url: rows[0].final_doc_url,
  };
}

// Helper function to format text into readable paragraphs
function formatText(text) {
  return text
    .trim()
    .split('\n')
    .filter((line) => line.trim() !== '') // Remove empty lines
    .map((line) => `<p>${line.trim()}</p>`) // Wrap each line in <p> tags
    .join('\n'); // Combine all paragraphs
}

// Helper function to generate an HTML template
function generateHTML(content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document Viewer</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 2rem auto;
          max-width: 800px;
          padding: 1rem;
          background-color: #f9f9f9;
          color: #333;
        }
        p {
          margin-bottom: 1.5rem;
        }
      </style>
    </head>
    <body>
      <h1>Document Content</h1>
      ${content}
    </body>
    </html>
  `;
}

