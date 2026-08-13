// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { senha } = await request.json();
    const senhaCorreta = process.env.ADMIN_PASS;

    if (senha === senhaCorreta) {
      const cookieStore = await cookies();
      
      // Cria o cookie de autenticação gerido pelo servidor
      cookieStore.set('admin_auth', 'true', {
        httpOnly: true, // impede acesso via JavaScript no front-end
        secure: process.env.NODE_ENV === 'production', // garante que o cookie só seja enviado em conexões HTTPS
        sameSite: 'strict', // previne envio do cookie em requisições cross-site
        maxAge: 60 * 60 * 24, // expira em 1 dia
        path: '/',  // garante que o cookie seja enviado em todas as rotas do site
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}