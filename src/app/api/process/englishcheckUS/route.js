import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import nspell from 'nspell';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const buffer = await file.arrayBuffer();

  try {
    const { value: text } = await mammoth.extractRawText({ buffer });

    const affPath = path.resolve('node_modules/dictionary-en-us/index.aff');
    const dicPath = path.resolve('node_modules/dictionary-en-us/index.dic');

    const [aff, dic] = await Promise.all([
      readFile(affPath, 'utf-8'),
      readFile(dicPath, 'utf-8'),
    ]);

    const spell = nspell(aff, dic);

    const words = text.split(/\s+/).filter((word) => {
      const cleaned = cleanWord(word);
      return cleaned.length > 0;
    });

    const misspelledWords = words.filter((word) => {
      const cleaned = cleanWord(word);
      return cleaned && !spell.correct(cleaned);
    });

    console.log('Misspelled Words:', misspelledWords);

    return new NextResponse(JSON.stringify({ misspelledWords }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
  }
}

// const cleanWord = (word) => word.replace(/[^a-zA-Z]/g, '').toLowerCase();
const cleanWord = (word) => {
  // Remove leading/trailing non-alphabetic characters and keep inner valid characters
  const cleaned = word.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, '').toLowerCase();

  // Exclude words that are left empty or purely special characters/numbers after cleaning
  return /^[a-zA-Z']+$/.test(cleaned) ? cleaned : '';
};
