import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { senha } = await request.json();

    // Puxa a senha verdadeira do seu arquivo .env
    const senhaCorreta = process.env.SENHA_ADMIN;

    if (senha === senhaCorreta) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}