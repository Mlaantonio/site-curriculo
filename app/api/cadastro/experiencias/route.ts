// app/api/cadastro/experiencias/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Busca todos os registros da tabela de experiências
    const experiencias = await prisma.tbExperienciaProf.findMany({
      orderBy: {
        id: 'asc' // Garante que virão na ordem correta (1, 2, 3...)
      }
    });

    return NextResponse.json(experiencias, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar experiências.' }, { status: 500 });
  }
}