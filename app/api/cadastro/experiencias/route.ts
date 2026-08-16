// app/api/cadastro/experiencias/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// -------------------------------------------------------------------
// 1. CONSULTAR EXPERIÊNCIAS (GET)
// -------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idpessoa = searchParams.get('idpessoa');

    const experiencias = await prisma.tbExperienciaProf.findMany({
      where: idpessoa ? { idpessoa: Number(idpessoa) } : undefined,
      orderBy: {
        datainicio: 'desc' // Mais recentes primeiro
      }
    });

    return NextResponse.json(experiencias, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar experiências:", error);
    return NextResponse.json({ erro: 'Erro ao buscar experiências.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 2. ADICIONAR EXPERIÊNCIA (POST)
// -------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idpessoa = 1, razaosocial, cidade, uf, datainicio, datafim, cargo, descricaocargo } = body;

    if (!razaosocial || !cargo || !datainicio) {
      return NextResponse.json({ erro: 'Empresa, cargo e data de início são obrigatórios.' }, { status: 400 });
    }

    const novaExperiencia = await prisma.tbExperienciaProf.create({
      data: {
        idpessoa: Number(idpessoa),
        razaosocial,
        cidade: cidade || null,
        uf: uf || null,
        datainicio: new Date(datainicio),
        datafim: datafim ? new Date(datafim) : null,
        cargo,
        descricaocargo: descricaocargo || ''
      }
    });

    return NextResponse.json(novaExperiencia, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar experiência:", error);
    return NextResponse.json({ erro: 'Erro ao cadastrar experiência.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 3. EDITAR EXPERIÊNCIA (PUT)
// -------------------------------------------------------------------
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, razaosocial, cidade, uf, datainicio, datafim, cargo, descricaocargo } = body;

    if (!id) {
      return NextResponse.json({ erro: 'O ID da experiência é obrigatório.' }, { status: 400 });
    }

    const experienciaAtualizada = await prisma.tbExperienciaProf.update({
      where: { id: Number(id) },
      data: {
        razaosocial,
        cidade: cidade || null,
        uf: uf || null,
        datainicio: new Date(datainicio),
        datafim: datafim ? new Date(datafim) : null,
        cargo,
        descricaocargo: descricaocargo || ''
      }
    });

    return NextResponse.json(experienciaAtualizada, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar experiência:", error);
    return NextResponse.json({ erro: 'Erro ao atualizar experiência.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// 4. REMOVER EXPERIÊNCIA (DELETE)
// -------------------------------------------------------------------
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    if (!id) {
      return NextResponse.json({ erro: 'O ID da experiência é obrigatório.' }, { status: 400 });
    }

    await prisma.tbExperienciaProf.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ mensagem: 'Experiência removida com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error("Erro ao remover experiência:", error);
    return NextResponse.json({ erro: 'Erro ao remover experiência.' }, { status: 500 });
  }
}