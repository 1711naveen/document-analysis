import { NextResponse } from "next/server";
import db from '../../../../../lib/db';
import path from 'path'
import fs from 'fs'
import mammoth from 'mammoth';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx"
import { compareAsc, format } from "date-fns";
const WordExtractor = require('word-extractor');

async function writeArrayToDocx(array, name, id, heading, chapter) {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: heading,
                  bold: true,
                  size: 36,
                  letterSpacing: 2,
                }),
              ],
              spacing: {
                after: 240,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: chapter,
                  bold: true,
                  size: 28,
                  letterSpacing: 2,
                }),
              ],
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

    const logFilePath = path.join(process.cwd(), 'output', id, 'log.txt');
    const logMessage = `File Created: ${name}
                        Path: ${outputPath}
                        Date and Time: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}
                        --------------------------------------------\n`;

    fs.appendFileSync(logFilePath, logMessage, { encoding: 'utf-8' });
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
      // 'SELECT row_doc_url FROM row_document WHERE row_doc_id = ? ',
      'SELECT * FROM row_document WHERE row_doc_id = ? ',
      [id]
    );

    // console.log(rows);
    const filePath = path.join(process.cwd(), rows[0].row_doc_url);

    try {
      //Extract text from doc/docx file using word-extractor
      const extractor = new WordExtractor();
      const extracted = await extractor.extract(filePath);
      const text = extracted.getBody();
      const fileContent = text;
      const chapter = text[0];

      // const result = await mammoth.extractRawText({ path: filePath });
      // const fileContent = result.value;
      const figureArray = fileContent.match(/Figure \d+\.\d+:.*\./g) || [];
      const tableArray = fileContent.match(/Table \d+\.\d+:.*\./g) || [];

      const updatedFigureArray = figureArray.map((figure) => {
        const colonIndex = figure.indexOf(':');
        let result = colonIndex !== -1 ? figure.slice(0, colonIndex) + figure.slice(colonIndex + 1) : figure;
      
        if (result.endsWith('.')) {
          result = result.slice(0, -1);
        }
        return result;
      });

      const updatedTableArray = tableArray.map((table) => {
        const colonIndex = table.indexOf(':');
        let result = colonIndex !== -1 ? table.slice(0, colonIndex) + table.slice(colonIndex + 1) : table;
        if (result.endsWith('.')) {
          result = result.slice(0, -1);
        }
        return result;
      });

      // console.log(tableArray);
      // console.log(figureArray);

      writeArrayToDocx(updatedTableArray, "Table.docx", id, "List of Tables", `Chapter ${chapter}`);
      writeArrayToDocx(updatedFigureArray, "Figure.docx", id, "List of Figures", `Chapter ${chapter}`);

      const folderUrl = `/output/${id}/`;
      const [rows_effected] = await db.execute(
        'INSERT INTO final_document (row_doc_id, user_id, final_doc_size, final_doc_url, status, creation_date) VALUES (?, ?, ?, ?, ?, NOW())',
        [id, rows[0].user_id, rows[0].row_doc_size, folderUrl, rows[0].status]
      );

    } catch (err) {
      console.error('Error reading .docx file:', err);
    }

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, message: 'Database error' });
  }
  return NextResponse.json({ success: id });
}

