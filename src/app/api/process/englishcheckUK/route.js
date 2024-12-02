// import AdmZip from 'adm-zip';
// import { NextResponse } from 'next/server';
// import nspell from 'nspell';
// import mammoth from 'mammoth';
// import path from 'path';
// import { readFile } from 'fs/promises';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file');

//     const buffer = await file.arrayBuffer();
//     const fileBuffer = Buffer.from(buffer);
//     const { value: text } = await mammoth.extractRawText({ buffer });

//     const affPath = path.resolve('node_modules/dictionary-en-gb/index.aff');
//     const dicPath = path.resolve('node_modules/dictionary-en-gb/index.dic');
//     const [aff, dic] = await Promise.all([
//       readFile(affPath, 'utf-8'),
//       readFile(dicPath, 'utf-8'),
//     ]);

//     const spell = nspell(aff, dic);

//     const cleanWord = (word) => word.replace(/[^a-zA-Z']/g, '').toLowerCase();
//     const words = text.split(/\s+/).map(cleanWord).filter((word) => word);

//     const misspelledWords = words.filter((word) => !spell.correct(word));
//     console.log(misspelledWords);

//     const highlightedText = highlightMisspelledWords(text, misspelledWords);
//     const newDocBuffer = createHighlightedDoc(fileBuffer, misspelledWords);

//     if (!fileBuffer || fileBuffer.length === 0) {
//       return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
//     }
//     const zip = new AdmZip(fileBuffer);

//     const entries = zip.getEntries();
//     const entryNames = entries.map(entry => entry.entryName);
//     console.log('Available entries:', entryNames);

//     const docXmlEntry = zip.getEntry('word/document.xml');
//     if (!docXmlEntry) {
//       return NextResponse.json(
//         { message: 'Invalid Word document: word/document.xml not found.' },
//         { status: 400 }
//       );
//     }

//     const documentXml = docXmlEntry.getData().toString('utf-8');
//     const regex = /<w:lastRenderedPageBreak[^>]*>/g;
//     const matches = documentXml.match(regex);
//     const count = matches ? matches.length : 0;
//     console.log('Number of lastRenderedPageBreak elements:', count);

//     return new NextResponse(newDocBuffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/octet-stream',
//         'Content-Disposition': 'attachment; filename="highlighted_document.docx"',
//       },
//     });

//   } catch (error) {
//     console.error('Error processing document:', error.message);
//     return NextResponse.json(
//       { message: 'Error processing document: ' + error.message },
//       { status: 500 }
//     );
//   }
// }
// const createHighlightedDoc = (originalBuffer, misspelledWords) => {
//   const zip = new AdmZip(originalBuffer);

//   const docXmlEntry = zip.getEntry('word/document.xml');
//   if (!docXmlEntry) {
//     throw new Error('Invalid Word document: Missing document.xml');
//   }

//   const originalXml = docXmlEntry.getData().toString('utf-8');

//   let highlightedBody = `<w:p w:rsidR="004436D6" w:rsidRPr="006558AD" w:rsidRDefault="004436D6" w:rsidP="006558AD"><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/><w:jc w:val="both"/></w:pPr>`;

//   misspelledWords.forEach((word) => {
//     highlightedBody += `<w:r><w:rPr><w:highlight w:val="red"/></w:rPr><w:t>${word}</w:t></w:r>`;
//   });

//   highlightedBody += `</w:p>`;

//   const newBody = `<w:body>${highlightedBody}</w:body>`;

//   const updatedXml = originalXml.replace(/<w:body>[\s\S]*<\/w:body>/, newBody);

//   zip.updateFile('word/document.xml', Buffer.from(updatedXml, 'utf-8'));

//   return zip.toBuffer();
// };

// const highlightMisspelledWords = (text, misspelledWords) => {
//   let highlightedText = text;
//   misspelledWords.forEach((word) => {
//     const regex = new RegExp(`\\b${word}\\b`, 'gi');
//     highlightedText = highlightedText.replace(
//       regex,
//       `<w:r><w:rPr><w:highlight w:val="red"/></w:rPr><w:t>${word}</w:t></w:r>`
//     );
//   });
//   console.log(highlightedText);
//   return highlightedText;
// };


//This is code for loging the misspelled word in log line wise
// import AdmZip from 'adm-zip';
// import { NextResponse } from 'next/server';
// import nspell from 'nspell';
// import mammoth from 'mammoth';
// import path from 'path';
// import { readFile, writeFile } from 'fs/promises';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {

//   const url = new URL(req.url);
//   const id = url.searchParams.get('doc_id');

//   try {
//     const formData = await req.formData();
//     const file = formData.get('file');

//     const buffer = await file.arrayBuffer();
//     const fileBuffer = Buffer.from(buffer);
//     const { value: text } = await mammoth.extractRawText({ buffer });

//     const affPath = path.resolve('node_modules/dictionary-en-gb/index.aff');
//     const dicPath = path.resolve('node_modules/dictionary-en-gb/index.dic');
//     const [aff, dic] = await Promise.all([
//       readFile(affPath, 'utf-8'),
//       readFile(dicPath, 'utf-8'),
//     ]);

//     const spell = nspell(aff, dic);

//     const cleanWord = (word) => word.replace(/[^a-zA-Z']/g, '').toLowerCase();

//     const lines = text.split('\n');
//     const logData = [];
//     let misspelledWordCount = 0;

//     lines.forEach((line, lineIndex) => {
//       const words = line.split(/\s+/);
//       words.forEach((word) => {
//         const cleaned = cleanWord(word);
//         if (cleaned && !spell.correct(cleaned)) {
//           misspelledWordCount++;
//           logData.push(`Line ${lineIndex + 1}: ${word}`);
//         }
//       });
//     });

//     // const logContent = logData.join('\n');
//     // const logPath = path.resolve('logUk.txt');
//     // await writeFile(logPath, logContent);

//     const outputPath = path.join(process.cwd(), 'output', id, 'logUK.txt');

//     const dir = path.dirname(outputPath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     const logFilePath = path.join(process.cwd(), 'output', id, 'logUK.txt');
//     const logContent = logData.join('\n');
//     await writeFile(logFilePath, logContent);
//     // fs.writeFileSync(logFilePath, logContent, { encoding: 'utf-8' });

//     if (!fileBuffer || fileBuffer.length === 0) {
//       return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
//     }

//     const zip = new AdmZip(fileBuffer);

//     const entries = zip.getEntries();
//     const entryNames = entries.map((entry) => entry.entryName);
//     console.log('Available entries:', entryNames);

//     const docXmlEntry = zip.getEntry('word/document.xml');
//     if (!docXmlEntry) {
//       return NextResponse.json(
//         { message: 'Invalid Word document: word/document.xml not found.' },
//         { status: 400 }
//       );
//     }

//     const documentXml = docXmlEntry.getData().toString('utf-8');
//     const regex = /<w:lastRenderedPageBreak[^>]*>/g;
//     const matches = documentXml.match(regex);
//     const count = matches ? matches.length : 0;
//     console.log('Number of lastRenderedPageBreak elements:', count);

//     return NextResponse.json(
//       {
//         message: 'Processing complete. Log file created.',
//         logPath: logFilePath,
//         misspelledWordCount: misspelledWordCount,
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error('Error processing document:', error.message);
//     return NextResponse.json(
//       { message: 'Error processing document: ' + error.message },
//       { status: 500 }
//     );
//   }
// }




import JSZip from 'jszip';
import nspell from 'nspell';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const cleanWord = (word) => {
  const cleaned = word.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, '').toLowerCase();
  return /^[a-zA-Z']+$/.test(cleaned) ? cleaned : '';
};

const processXmlContent = (node, spell) => {
  if (typeof node === 'string') {
    return node
      .split(/\s+/)
      .map((word) => {
        const cleaned = cleanWord(word);
        if (cleaned && !spell.correct(cleaned)) {
          const suggestions = spell.suggest(cleaned);
          const correction = suggestions[0] || cleaned;
          return word.replace(cleaned, correction);
        }
        return word;
      })
      .join(' ');
  }

  if (typeof node === 'object') {
    for (let key in node) {
      node[key] = processXmlContent(node[key], spell);
    }
  }

  return node;
};

export async function POST(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('doc_id');
  console.log(id);

  const formData = await req.formData();
  const file = formData.get('file');
  const buffer = await file.arrayBuffer();

  try {
    const affPath = path.resolve('node_modules/dictionary-en-gb/index.aff');
    const dicPath = path.resolve('node_modules/dictionary-en-gb/index.dic');
    const [aff, dic] = await Promise.all([
      readFile(affPath, 'utf-8'),
      readFile(dicPath, 'utf-8'),
    ]);

    const spell = nspell(aff, dic);

    const zip = await JSZip.loadAsync(buffer);
    const documentXml = await zip.file('word/document.xml').async('string');

    const parserOptions = {
      ignoreAttributes: false,
      parseNodeValue: false,
      parseAttributeValue: false,
      trimValues: false,
    };

    // Parse XML content
    const parser = new XMLParser(parserOptions);
    const xmlData = parser.parse(documentXml);

    // Process and correct content
    const correctedXmlData = processXmlContent(xmlData, spell);

    // Build updated XML content
    const builder = new XMLBuilder(parserOptions);
    const updatedDocumentXml = builder.build(correctedXmlData);

    zip.file('word/document.xml', updatedDocumentXml);
    const updatedDocx = await zip.generateAsync({ type: 'nodebuffer' });

    const outputPath = path.join(process.cwd(), 'output', id, 'corrected_document_uk.docx');
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, updatedDocx);

    return new NextResponse(
      JSON.stringify({ message: 'Document corrected and saved', path: outputPath }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Error processing document' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
