import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import db from '../../../../lib/db';
import mammoth from 'mammoth';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  console.log(request);
  console.log(request.headers['authorization']);
  // const token = request.headers.authorization?.split(' ')[1];
  // console.log(token);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRlbW8uY29tIiwiaWF0IjoxNzMxMDQzMzA4LCJleHAiOjE3MzEwNDY5MDh9.4-Agz7gzFEXEUBMe9aLHAcnsWuoa5xAjKyqp_IWSYp8";

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

  if (!fs.existsSync(path.join(process.cwd(), 'files'))) {
    fs.mkdirSync(path.join(process.cwd(), 'files'));
  }

  fs.writeFileSync(filePath, Buffer.from(fileBuffer));
  try {
    const decoded = jwt.verify(token, 'naveen');
    const email = decoded.email;
    const [adminRows] = await db.execute('SELECT admin_id FROM admins WHERE admin_email = ?', [email]);
    console.log(adminRows)

    const [result] = await db.execute(
      'INSERT INTO row_document (row_doc_name, row_doc_type, row_doc_size, user_id, row_doc_url, status, creation_date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [fileName, fileType, fileSize, adminRows[0].admin_id, `/files/${fileName}`, 'active']
    );

    const uint8Array = new Uint8Array(fileBuffer);
    const { value: text } = await mammoth.extractRawText({ buffer: uint8Array });
    const characters = text.length;
    const words = text.split(/\s+/).length;
    const lines = text.split('\n').length;
    const pages = Math.ceil(words / 300);

    return NextResponse.json({ success: true, message: 'File uploaded and saved to database', characters: characters, words: words, lines: lines, pages: pages });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, message: 'Database error' });
  }
}