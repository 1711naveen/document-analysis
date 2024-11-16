import md5 from "md5"; // Consider bcrypt for better security
import jwt from "jsonwebtoken"; // If using JWTs
import db from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, newPassword, confirmPassword } = await request.json();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
    }

    // Hash the new password
    const hashedPassword = md5(newPassword);

    // Update password in database (pseudo-code, replace with actual query)
    const result = await updateUserPassword(email, hashedPassword);

    if (!result) {
      return new Response(JSON.stringify({ error: "Password update failed" }), { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Changed Password successful'});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Changed Password error'});
  }
}

async function updateUserPassword(email, hashedPassword) {
  const [result] = await db.query(
    'UPDATE admins SET admin_password = ? WHERE admin_email = ? ',
    [hashedPassword, email]
  );
  return true;
}
