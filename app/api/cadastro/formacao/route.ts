// app/api/cadastro/formacao/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Busca todos os registros da tabela de formação
    const formacoes = await prisma.tbFormacao.findMany({
      orderBy: {
        id: 'asc' // Garante que virão na ordem correta (1, 2, 3...)
      }
    });

    return NextResponse.json(formacoes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar formações.' }, { status: 500 });
  }
}   