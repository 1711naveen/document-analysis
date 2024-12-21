import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import db from '../../../../lib/db';
import mammoth from 'mammoth';
import jwt from 'jsonwebtoken';
// import { promises as fs } from 'fs';
import JSZip from 'jszip';
const WordExtractor = require('word-extractor');
import { XMLParser } from 'fast-xml-parser';

export async function POST(request) {
  const token = request.headers.get('authorization').split(' ')[1];
  const formData = await request.formData();
  const file = formData.get('file');
  const fileName = formData.get('name');
  const fileType = formData.get('type');
  const fileSize = formData.get('size');

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file provided' });
  }
  const filePath = path.join(process.cwd(), 'files', fileName);
  const fileBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(fileBuffer);
  const appXml = await zip.file('docProps/app.xml').async('string');
  const parser = new XMLParser();
  const parsedXml = parser.parse(appXml);
  const properties = {
    pages: parsedXml?.Properties?.Pages || null,
    characters: parsedXml?.Properties?.Characters || null,
    lines: parsedXml?.Properties?.Lines || null,
    words: parsedXml?.Properties?.Words || null,
  };
  if (!fs.existsSync(path.join(process.cwd(), 'files'))) {
    fs.mkdirSync(path.join(process.cwd(), 'files'));
  }
  fs.writeFileSync(filePath, Buffer.from(fileBuffer));
  try {
    const decoded = jwt.verify(token, 'naveen');
    const email = decoded.email;
    const [adminRows] = await db.execute('SELECT admin_id FROM admins WHERE admin_email = ?', [email]);
    const [result] = await db.execute(
      'INSERT INTO row_document (row_doc_name, row_doc_type, row_doc_size, user_id, row_doc_url, status, creation_date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [fileName, fileType, fileSize, adminRows[0].admin_id, `/files/${fileName}`, 'active']
    );
    const [insertId] = await db.execute(
      'SELECT LAST_INSERT_ID() AS last_inserted_id'
    );
    const extractor = new WordExtractor();
    const extracted = await extractor.extract(filePath);
    const text = extracted.getBody();
    const words = text.split(/\s+/).length;
    const characters = properties.characters;
    const lines = properties.lines;
    const pages = properties.pages;

    return NextResponse.json({ success: true, message: 'File uploaded and saved to database', characters: characters, words: words, lines: lines, pages: pages, doc_id: insertId[0].last_inserted_id });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, message: 'Database error' });
  }
}