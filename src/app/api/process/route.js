import { NextResponse } from "next/server";
import db from '../../../../lib/db';
import path from 'path'
import fs from 'fs'
import mammoth from 'mammoth';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx"
const WordExtractor = require('word-extractor');

async function writeArrayToDocx(array, name, id) {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: name,
                  bold: true,
                  size: 48,
                  letterSpacing: 2,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 240,
              },
            }),

            ...array.map(item => new Paragraph({
              children: [
                new TextRun({
                  text: item,
                  size: 22,
                  letterSpacing: 1,
                }),
              ],
              spacing: {
                before: 120,
                after: 120,
              },
            })),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const outputPath = path.join(process.cwd(), 'output', id, name);
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, buffer);
    console.log('File written successfully to:', outputPath);
  } catch (error) {
    console.error('Error creating .docx file:', error);
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('doc_id');

  try {
    const [rows] = await db.query(
      'SELECT row_doc_url FROM row_document WHERE row_doc_id = ? ',
      [id]
    );

    const filePath = path.join(process.cwd(), rows[0].row_doc_url);

    try {
      //Extract text from doc/docx file using word-extractor
      const extractor = new WordExtractor();

      const result = await mammoth.extractRawText({ path: filePath });
      const fileContent = result.value;
      const figureArray = fileContent.match(/Figure \d+\.\d+:.*\./g);
      console.log(figureArray);

      const tableArray = fileContent.match(/Table \d+\.\d+:.*\./g);
      console.log(tableArray);

      writeArrayToDocx(tableArray, "Table.docx", id);
      writeArrayToDocx(figureArray, "Figure.docx", id);

    } catch (err) {
      console.error('Error reading .docx file:', err);
    }

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, message: 'Database error' });
  }
  return NextResponse.json({ success: id })
}

