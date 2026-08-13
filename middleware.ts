// middleware.ts (na raiz do projeto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Esta função roda ANTES de cada requisição
export function middleware(request: NextRequest) {
  // 1. Pega o cookie diretamente da requisição
  const authCookie = request.cookies.get('admin_auth');

  // 2. Se o cookie não existir ou for diferente de 'true', barra o acesso
  if (!authCookie || authCookie.value !== 'true') {
    return NextResponse.json(
      { erro: 'Acesso negado. Autenticação obrigatória.' },
      { status: 401 }
    );
  }

  // 3. Se estiver tudo certo, permite que a requisição siga para a API
  return NextResponse.next();
}

// 4. Configuração: Aqui você diz QUAIS rotas o "guarda" deve proteger
export const config = {
  matcher: [
    // Protege todas as rotas que começam com /api/cadastro/
    // O :path* significa "e qualquer coisa que vier depois"
    '/api/cadastro/:path*'
  ],
};