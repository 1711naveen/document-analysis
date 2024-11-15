import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'naveen';


export async function POST(request) {
  const { email, password } = await request.json();
  const hashedPassword = md5(password);

  try {
    const [rows] = await db.query(
      'SELECT * FROM admins WHERE admin_email = ? and admin_password = ? and status = 1',
      [email, hashedPassword]
    );

    if (rows.length > 0) {
      const accessToken = jwt.sign(
        { email: email },
        JWT_SECRET,
        { expiresIn: '6h' }
      );
      return NextResponse.json({ success: true, message: 'Login successful', accessToken: accessToken });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
