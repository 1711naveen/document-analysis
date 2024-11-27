import fs from 'fs';
import mammoth from 'mammoth';

export async function handler(req, res) {
  const { file } = req.body; // Assuming the file is passed from the frontend
  const buffer = Buffer.from(file, 'base64'); // Decode base64 file content

  try {
    const { value: text } = await mammoth.extractRawText({ buffer });
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to extract text' });
  }
}
