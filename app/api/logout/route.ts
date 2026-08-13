// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Aguardamos a Promise ser resolvida com o "await"
  const cookieStore = await cookies();
  
  // Apaga o cookie
  cookieStore.delete('admin_auth');
  
  return NextResponse.json({ success: true });
}