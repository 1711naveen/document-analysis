
import JSZip from 'jszip';
import nspell from 'nspell';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import db from '../../../../../lib/db';
import fs from 'fs'
import mammoth from 'mammoth';

const cleanWord = (word) => {
  const cleaned = word.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, '').toLowerCase();
  if (/^\d/.test(cleaned)) {
    return '';
  }
  return /^[a-zA-Z']+$/.test(cleaned) ? cleaned : '';
};

// Recursive function to process XML content
const processXmlContent = (node, spell) => {
  // Check if the node is an array, and recursively process all items in the array
  if (Array.isArray(node)) {
    return node.map(item => processXmlContent(item, spell)); // Apply the process to each item
  }

  // Check if the node is an object (it may have keys like w:p, w:r)
  if (typeof node === 'object') {
    // Iterate through each key in the object
    for (let key in node) {
      // Skip attributes (those starting with '@')
      if (key.startsWith('@')) {
        continue;
      }
      
      // Process if the key represents text content (e.g., text inside <w:r>)
      if (typeof node[key] === 'string') {
        node[key] = processXmlContent(node[key], spell);
      } else {
        node[key] = processXmlContent(node[key], spell);
      }
    }
  }

  if (typeof node === 'string') {
    return node
      .split(/\s+/)
      .map((word) => {
        if ((word.startsWith("'") && word.endsWith("'")) || (word.startsWith('"') && word.endsWith('"'))) {
          return word;
        }

        const cleaned = cleanWord(word);
        if (cleaned && !spell.correct(cleaned)) {
          const suggestions = spell.suggest(cleaned);
          const correction = suggestions[0] || cleaned;
          console.log('word -> ', word, " , correction -> ", correction);
          return word.replace(word, correction);
        }
        return word;
      })
      .join(' ');
  }

  return node;
};

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('doc_id');
  console.log(id);

  try {

    const [rows] = await db.query(
      'SELECT * FROM row_document WHERE row_doc_id = ? ',
      [id]
    );
    const filePath = path.join(process.cwd(), rows[0].row_doc_url);
    console.log(filePath);
    const buffer = fs.readFileSync(filePath);

    const affPath = path.resolve('node_modules/dictionary-en-gb/index.aff');
    const dicPath = path.resolve('node_modules/dictionary-en-gb/index.dic');
    const [aff, dic] = await Promise.all([
      readFile(affPath, 'utf-8'),
      readFile(dicPath, 'utf-8'),
    ]);

    const spell = nspell(aff, dic);
    const { value: text } = await mammoth.extractRawText({ buffer });
    const lines = text.split('\n');
    const logData = [];
    let lineCounter = 0;

    lines.forEach((line, index) => {
      const words = line.split(/\s+/);
      words.forEach((word) => {
        const cleaned = cleanWord(word);
        if (cleaned && !spell.correct(cleaned)) {
          lineCounter++;
          const suggestions = spell.suggest(cleaned);
          const suggestionText = suggestions.length > 0
            ? ` Suggestions: ${suggestions.join(', ')}`
            : ' No suggestions available';
          logData.push(`Line ${index + 1}: ${word},  ${suggestionText}`);
        }
      });
    });

    const outputPathFile = path.join(process.cwd(), 'output', id, 'logUK.txt');

    const dir = path.dirname(outputPathFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const logContent = logData.join('\n');
    await writeFile(outputPathFile, logContent);

    const zip = await JSZip.loadAsync(buffer);
    const documentXml = await zip.file('word/document.xml').async('string');

    const parserOptions = {
      ignoreAttributes: false,
      parseNodeValue: false,
      parseAttributeValue: false,
      trimValues: false,
    };

    const parser = new XMLParser(parserOptions);
    const xmlData = parser.parse(documentXml);

    const correctedXmlData = processXmlContent(xmlData, spell);

    const builder = new XMLBuilder(parserOptions);
    const updatedDocumentXml = builder.build(correctedXmlData);

    zip.file('word/document.xml', updatedDocumentXml);
    const updatedDocx = await zip.generateAsync({ type: 'nodebuffer' });

    const outputPath = path.join(process.cwd(), 'output', id, 'corrected_document_uk.docx');
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, updatedDocx);

    return new NextResponse(
      JSON.stringify({ message: 'Document corrected and saved', path: outputPathFile }),
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
