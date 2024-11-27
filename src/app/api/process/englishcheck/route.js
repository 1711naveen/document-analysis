import { NextResponse } from 'next/server';
import fs from 'fs';
import mammoth from 'mammoth';
import spellchecker from 'simple-spellchecker';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export async function POST(req) {
  // const { file } = await req.json();

  const formData = await req.formData();
  const file = formData.get('file');
  // const buffer = Buffer.from(file, 'base64');
  const buffer = await file.arrayBuffer();

  try {
    // Step 1: Extract text from the Word document using mammoth
    const { value: text } = await mammoth.extractRawText({ buffer });

    // Step 2: Load the dictionary (US English in this case)
    const dictionary = spellchecker.getDictionarySync("en_US");

    // Step 3: Check each word in the extracted text for spelling errors
    const words = text.split(/\s+/);
    const misspelledWords = [];

    words.forEach((word) => {
      // Check if the word is misspelled
      if (!dictionary.check(word)) {
        misspelledWords.push(word);
      }
    });

    // Step 4: Highlight misspelled words in the text
    const highlightedText = highlightMisspelledWords(text, misspelledWords);

    // Step 5: Create a new Word document with highlighted words
    const newDocBuffer = createHighlightedDoc(highlightedText);

    // Step 6: Send the new document back as a download
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

// Helper function to highlight misspelled words in the text
const highlightMisspelledWords = (text, misspelledWords) => {
  let highlightedText = text;

  misspelledWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Match the whole word, case insensitive
    highlightedText = highlightedText.replace(regex, `<span style="background-color: yellow">${word}</span>`);
  });

  return highlightedText;
};

// Helper function to create a new Word document with highlighted words
const createHighlightedDoc = (highlightedText) => {
  const zip = new PizZip();
  const doc = new Docxtemplater(zip);

  // Set the highlighted text into the document's body
  doc.setData({ text: highlightedText });

  doc.render();

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  return buf;
};
