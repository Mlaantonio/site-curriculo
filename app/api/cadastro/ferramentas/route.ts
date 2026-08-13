// app/api/cadastro/ferramentas/route.ts
import { NextResponse } from 'next/server'; 
import prisma from '@/lib/prisma'; 

// -------------------------------------------------------------------
// 1. CONSULTAR (GET)
// -------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idpessoa = Number(searchParams.get('idpessoa'));

    if (!idpessoa) {
      return NextResponse.json({ erro: 'O idpessoa é obrigatório.' }, { status: 400 });
    }

    const ferramentas = await prisma.tbFerramentas.findMany({
      where: {
        idpessoa: idpessoa,
      },
      include: {
        habilidade: {
          select: {
            nome: true, 
          },
        },
      },
    });

    return NextResponse.json(ferramentas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao buscar ferramentas.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 2. ADICIONAR (POST)
// -------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idpessoa, idhabilidade, nomeferramenta } = body;

    const novaFerramenta = await prisma.tbFerramentas.create({
      data: {
        idpessoa: Number(idpessoa),
        idhabilidade: Number(idhabilidade),
        nomeferramenta: nomeferramenta,
      },
    });

    return NextResponse.json(novaFerramenta, { status: 201 });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao adicionar ferramenta.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 3. EDITAR (PUT)
// -------------------------------------------------------------------
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, idhabilidade, nomeferramenta } = body;

    const ferramentaAtualizada = await prisma.tbFerramentas.update({
      where: {
        id: Number(id),
      },
      data: {
        idhabilidade: Number(idhabilidade),
        nomeferramenta: nomeferramenta,
      },
    });

    return NextResponse.json(ferramentaAtualizada, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao editar ferramenta.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 4. REMOVER (DELETE)
// -------------------------------------------------------------------
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    if (!id) {
      return NextResponse.json({ erro: 'O ID da ferramenta é obrigatório.' }, { status: 400 });
    }

    await prisma.tbFerramentas.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ mensagem: 'Ferramenta removida com sucesso!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao remover ferramenta.' }, { status: 500 });
  }
}