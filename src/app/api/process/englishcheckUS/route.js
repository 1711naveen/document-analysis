// import { NextResponse } from 'next/server';
// import mammoth from 'mammoth';
// import nspell from 'nspell';
// import { readFile } from 'fs/promises';
// import path from 'path';

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get('file');
//   const buffer = await file.arrayBuffer();

//   try {
//     const { value: text } = await mammoth.extractRawText({ buffer });

//     const affPath = path.resolve('node_modules/dictionary-en-us/index.aff');
//     const dicPath = path.resolve('node_modules/dictionary-en-us/index.dic');

//     const [aff, dic] = await Promise.all([
//       readFile(affPath, 'utf-8'),
//       readFile(dicPath, 'utf-8'),
//     ]);

//     const spell = nspell(aff, dic);

//     const words = text.split(/\s+/).filter((word) => {
//       const cleaned = cleanWord(word);
//       return cleaned.length > 0;
//     });

//     const misspelledWords = words.filter((word) => {
//       const cleaned = cleanWord(word);
//       return cleaned && !spell.correct(cleaned);
//     });

//     console.log('Misspelled Words:', misspelledWords);

//     return new NextResponse(JSON.stringify({ misspelledWords }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error processing document:', error);
//     return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
//   }
// }

// const cleanWord = (word) => {
//   const cleaned = word.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, '').toLowerCase();

//   return /^[a-zA-Z']+$/.test(cleaned) ? cleaned : '';
// };

// import mammoth from 'mammoth';
// import nspell from 'nspell';
// import { readFile, writeFile } from 'fs/promises';
// import path from 'path';
// import { NextResponse } from 'next/server';
// import JSZip from 'jszip';

// // function cleanWord(word) {
// //   return word.replace(/[^a-zA-Z']/g, '').toLowerCase();
// // }

// const cleanWord = (word) => {
//   const cleaned = word.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, '').toLowerCase();

//   return /^[a-zA-Z']+$/.test(cleaned) ? cleaned : '';
// };

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get('file');
//   const buffer = await file.arrayBuffer();

//   try {
//     const { value: text } = await mammoth.extractRawText({ buffer });

//     const affPath = path.resolve('node_modules/dictionary-en-us/index.aff');
//     const dicPath = path.resolve('node_modules/dictionary-en-us/index.dic');

//     const [aff, dic] = await Promise.all([
//       readFile(affPath, 'utf-8'),
//       readFile(dicPath, 'utf-8'),
//     ]);

//     const spell = nspell(aff, dic);

//     const words = text.split(/\s+/).filter((word) => {
//       const cleaned = cleanWord(word);
//       return cleaned.length > 0;
//     });

//     const correctedText = words.map((word) => {
//       const cleaned = cleanWord(word);

//       if (cleaned && !spell.correct(cleaned)) {
//         const suggestions = spell.suggest(cleaned);
//         console.log(suggestions);
//         const correction = suggestions[0] || cleaned;
//         return word.replace(cleaned, correction);
//       }
//       return word;
//     });

//     const correctedContent = correctedText.join(' ');

//     const zip = await JSZip.loadAsync(buffer);
//     const documentXml = await zip.file('word/document.xml').async('string');

//     const updatedDocumentXml = documentXml.replace(
//       /<w:body>[\s\S]*<\/w:body>/,
//       `<w:body><w:p><w:r><w:t>${correctedContent}</w:t></w:r></w:p></w:body>`
//     );

//     zip.file('word/document.xml', updatedDocumentXml);
//     const updatedDocx = await zip.generateAsync({ type: 'nodebuffer' });

//     const outputPath = path.resolve('corrected_document.docx');
//     await writeFile(outputPath, updatedDocx);

//     return new NextResponse(JSON.stringify({ message: 'Document corrected and saved', path: outputPath }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
//   }
// }


//API for getting wrong word and printingn in wrong file

// import mammoth from 'mammoth';
// import nspell from 'nspell';
// import { readFile, writeFile } from 'fs/promises';
// import path from 'path';
// import { NextResponse } from 'next/server';
// import fs from 'fs';

// function cleanWord(word) {
//   return word.replace(/[^a-zA-Z']/g, '').toLowerCase();
// }

// export async function POST(req) {

//   const url = new URL(req.url);
//   const id = url.searchParams.get('doc_id');
//   console.log(id);

//   const formData = await req.formData();
//   const file = formData.get('file');
//   const buffer = await file.arrayBuffer();

//   try {
//     const { value: text } = await mammoth.extractRawText({ buffer });

//     const affPath = path.resolve('node_modules/dictionary-en-us/index.aff');
//     const dicPath = path.resolve('node_modules/dictionary-en-us/index.dic');

//     const [aff, dic] = await Promise.all([
//       readFile(affPath, 'utf-8'),
//       readFile(dicPath, 'utf-8'),
//     ]);

//     const spell = nspell(aff, dic);

//     const lines = text.split('\n');
//     const logData = [];
//     let lineCounter = 0;

//     lines.forEach((line, index) => {
//       const words = line.split(/\s+/);
//       words.forEach((word) => {
//         const cleaned = cleanWord(word);
//         if (cleaned && !spell.correct(cleaned)) {
//           lineCounter++;
//           logData.push(`Line ${index + 1}: ${word}`);
//         }
//       });
//     });

//     const outputPath = path.join(process.cwd(), 'output', id, 'logUs.txt');

//     const dir = path.dirname(outputPath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     const logFilePath = path.join(process.cwd(), 'output', id, 'logUS.txt');
//     const logContent = logData.join('\n');
//     await writeFile(outputPath, logContent);

//     return new NextResponse(
//       JSON.stringify({
//         message: 'Log file created with misspelled words and line numbers',
//         path: logFilePath,
//         misspelledWordCount: lineCounter,
//       }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }


import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import nspell from 'nspell';
import { Document, Packer, Paragraph } from 'docx';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

// Helper to handle file uploads in the App Router
const processMultipartForm = (req) =>
  new Promise((resolve, reject) => {
    upload.single('file')(req, {}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(req.file);
      }
    });
  });

export async function POST(req) {
  try {
    // Handle file upload
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text using Mammoth
    const { value: text } = await mammoth.extractRawText({ buffer });

    // Load dictionary for `nspell`
    const affPath = path.resolve('node_modules/dictionary-en-us/index.aff');
    const dicPath = path.resolve('node_modules/dictionary-en-us/index.dic');
    const [aff, dic] = await Promise.all([
      fs.readFile(affPath, 'utf-8'),
      fs.readFile(dicPath, 'utf-8'),
    ]);

    const spell = nspell(aff, dic);

    // Spell-check and correct text
    // const correctedText = text.split(' ').map((word) => {
    //   // console.log(word);
    //   if (spell.correct(word)) {
    //     return word;
    //   } else {
    //     const suggestions = spell.suggest(word);
    //     return suggestions.length > 0 ? suggestions[0] : word;
    //   }
    // }).join(' ');
    // console.log(correctedText);

    const cache = {};
    console.time('SpellCheck');
    const correctedText = text.split(' ').map((word) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');

      if (!cleanWord) return word;

      if (cache[cleanWord]) {
        return cache[cleanWord];
      }

      // Check spelling
      if (spell.correct(cleanWord)) {
        cache[cleanWord] = word; // Cache correct words
        return word;
      }

      // Suggest correction
      const suggestions = spell.suggest(cleanWord);
      const corrected = suggestions.length > 0 ? suggestions[0] : word;
      cache[cleanWord] = corrected;
      return corrected;
    }).join(' ');

    console.timeEnd('SpellCheck');
    console.log('completed 1')

    // Create a new Word document with corrected text
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(correctedText)],
        },
      ],
    });

    // Save the corrected document
    const outputPath = path.join(process.cwd(), 'output', '139', 'corrected.docx');
    const docBuffer = await Packer.toBuffer(doc);
    await fs.writeFile(outputPath, docBuffer);

    console.log('completed 2')

    // Respond with the file path
    return NextResponse.json({
      message: 'Spell-check completed',
      filePath: '/uploads/corrected.docx',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
