// app/api/cadastro/principal/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// -------------------------------------------------------------------
// 1. CONSULTAR DADOS PRINCIPAIS (GET)
// -------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    let principal;
    if (id) {
      principal = await prisma.tbCadastro.findUnique({
        where: { id: Number(id) }
      });
    } else {
      principal = await prisma.tbCadastro.findFirst({
        orderBy: { id: 'asc' }
      });
    }

    return NextResponse.json(principal || {}, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar dados principais:", error);
    return NextResponse.json({ erro: 'Erro ao buscar dados principais.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 2. ATUALIZAR DADOS PRINCIPAIS (PUT)
// -------------------------------------------------------------------
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...dadosPessoais } = body;

    // Se vier com ID definido atualiza pelo ID, senão busca o primeiro registro existente
    let targetId = id ? Number(id) : undefined;
    if (!targetId) {
      const primeiro = await prisma.tbCadastro.findFirst({
        orderBy: { id: 'asc' },
        select: { id: true }
      });
      targetId = primeiro?.id;
    }

    if (!targetId) {
      return NextResponse.json({ erro: 'Nenhum registro encontrado para atualizar.' }, { status: 404 });
    }

    const principalAtualizado = await prisma.tbCadastro.update({
      where: { id: targetId },
      data: dadosPessoais
    });

    return NextResponse.json(principalAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar dados principais:", error);
    return NextResponse.json({ erro: 'Erro ao atualizar dados principais.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 3. CRIAR DADOS PRINCIPAIS (POST)
// -------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const novoRegistro = await prisma.tbCadastro.create({
      data: body
    });

    return NextResponse.json(novoRegistro, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar dados principais:", error);
    return NextResponse.json({ erro: 'Erro ao cadastrar dados principais.' }, { status: 500 });
  }
}

