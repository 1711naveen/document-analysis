import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(request) {
  try{
    const [rows] = await db.query('select * from row_document')
    console.log(rows);
    return NextResponse.json({name:rows})
  }catch(errro){

  }
}