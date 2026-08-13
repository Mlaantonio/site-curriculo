// app/api/cadastro/habilidades/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Busca todos os registros da tabela de habilidades (categorias)
    const habilidades = await prisma.tbHabilidades.findMany({
      orderBy: {
        id: 'asc' // Garante que virão na ordem correta (1, 2, 3...)
      }
    });

    return NextResponse.json(habilidades, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar categorias.' }, { status: 500 });
  }
}