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


// import { NextResponse } from 'next/server';
// import mammoth from 'mammoth';
// import nspell from 'nspell';
// import PizZip from 'pizzip';
// import Docxtemplater from 'docxtemplater';
// import { readFile } from 'fs/promises';
// import path from 'path';
// import AdmZip from 'adm-zip';

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get('file');
//   const buffer = await file.arrayBuffer();

//   try {
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

//     const highlightedText = highlightMisspelledWords(text, misspelledWords);

//     const newDocBuffer = createHighlightedDoc(highlightedText);

//     return new NextResponse(newDocBuffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         'Content-Disposition': 'attachment; filename="highlighted_document.docx"',
//       },
//     });
//   } catch (error) {
//     console.error('Error processing document:', error);
//     return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
//   }
// }

// const highlightMisspelledWords = (text, misspelledWords) => {
//   let highlightedText = text;
//   misspelledWords.forEach((word) => {
//     const regex = new RegExp(`\\b${word}\\b`, 'gi');
//     highlightedText = highlightedText.replace(
//       regex,
//       `<w:highlight w:val="yellow">${word}</w:highlight>`
//     );
//   });
//   return highlightedText;
// };

// const createHighlightedDoc = (highlightedText) => {
//   const zip = new PizZip();
//   const doc = new Docxtemplater(zip, { linebreaks: true });

//   doc.setData({ text: highlightedText });

//   doc.render();

//   return doc.getZip().generate({ type: 'nodebuffer' });
// };


import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import nspell from 'nspell';
import AdmZip from 'adm-zip';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const buffer = await file.arrayBuffer();

  try {
    // Extract text using mammoth
    const { value: text } = await mammoth.extractRawText({ buffer });

    // Load the British English dictionary
    const affPath = path.resolve('node_modules/dictionary-en-gb/index.aff');
    const dicPath = path.resolve('node_modules/dictionary-en-gb/index.dic');
    const [aff, dic] = await Promise.all([
      readFile(affPath, 'utf-8'),
      readFile(dicPath, 'utf-8'),
    ]);

    const spell = nspell(aff, dic);

    // Helper function to clean and split words
    const cleanWord = (word) => word.replace(/[^a-zA-Z']/g, '').toLowerCase();
    const words = text.split(/\s+/).map(cleanWord).filter((word) => word);

    // Find misspelled words
    const misspelledWords = words.filter((word) => !spell.correct(word));

    // Highlight misspelled words in the original text
    const highlightedText = highlightMisspelledWords(text, misspelledWords);

    // Create a new Word document with highlights using adm-zip
    const newDocBuffer = createHighlightedDoc(buffer, highlightedText);

    // Return the modified document
    return new NextResponse(newDocBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="highlighted_document.docx"',
      },
    });
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
  }
}

// Function to highlight misspelled words in text
const highlightMisspelledWords = (text, misspelledWords) => {
  let highlightedText = text;
  misspelledWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    highlightedText = highlightedText.replace(
      regex,
      `<w:r><w:rPr><w:highlight w:val="yellow"/></w:rPr><w:t>${word}</w:t></w:r>` // Word's highlight XML tag
    );
  });
  return highlightedText;
};

// Function to create a new Word document with highlights using adm-zip
// const createHighlightedDoc = (originalBuffer, highlightedText) => {
//   const zip = new AdmZip(originalBuffer);

//   const docXmlEntry = zip.getEntry('word/document.xml');

//   if (!docXmlEntry) {
//     throw new Error('Invalid Word document: Missing document.xml');
//   }

//   const originalXml = docXmlEntry.getData().toString('utf-8');
//   const updatedXml = originalXml.replace(/<w:body>[\s\S]*<\/w:body>/, `<w:body>${highlightedText}</w:body>`);

//   zip.updateFile('word/document.xml', Buffer.from(updatedXml, 'utf-8'));

//   return zip.toBuffer();
// };

// const createHighlightedDoc = (originalBuffer, highlightedText) => {
//   const zip = new AdmZip(originalBuffer);

//   // Locate the document.xml file within the .docx archive
//   const docXmlEntry = zip.getEntry('word/document.xml');
//   if (!docXmlEntry) {
//     throw new Error('Invalid Word document: Missing word/document.xml');
//   }

//   // Retrieve the existing XML content of document.xml
//   const originalXml = docXmlEntry.getData().toString('utf-8');

//   // Safely replace content within <w:body> tags to include highlighted text
//   const updatedXml = originalXml.replace(
//     /<w:body>([\s\S]*?)<\/w:body>/,
//     `<w:body>${highlightedText}</w:body>`
//   );

//   // Update the document.xml file in the ZIP archive with the modified content
//   zip.updateFile('word/document.xml', Buffer.from(updatedXml, 'utf-8'));

//   // Generate a new .docx file as a buffer and return it
//   return zip.toBuffer();
// };
const createHighlightedDoc = (originalBuffer, highlightedText) => {
  const zip = new AdmZip(originalBuffer);

  // List all entries in the ZIP archive for debugging purposes
  const zipEntries = zip.getEntries();
  // console.log('Available entries:', zipEntries.map(entry => entry.entryName));

  // Attempt to access the document.xml file inside the .docx archive
  // const docXmlEntry = zip.getEntry('word/document.xml');
  // if (!docXmlEntry) {
  //   throw new Error('Invalid Word document: Missing word/document.xml');
  // }

  // Retrieve the existing XML content of document.xml
  const originalXml = docXmlEntry.getData().toString('utf-8');

  // Safely replace content within <w:body> tags to include highlighted text
  const updatedXml = originalXml.replace(
    /<w:body>([\s\S]*?)<\/w:body>/,
    `<w:body>${highlightedText}</w:body>`
  );

  // Update the document.xml file in the ZIP archive with the modified content
  zip.updateFile('word/document.xml', Buffer.from(updatedXml, 'utf-8'));

  // Generate a new .docx file as a buffer and return it
  return zip.toBuffer();
};


