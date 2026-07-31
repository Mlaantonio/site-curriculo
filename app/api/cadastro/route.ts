// app/api/cadastro/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 1. LER DADOS
export async function GET() {
  try {
    const dados = await prisma.tbCadastro.findFirst({
      include: {
        // Agora usamos o nome exato da relação que está no seu schema
        experiencias: {
          orderBy: { datainicio: 'desc' }
        }
      }
    });

    // Como o Prisma já traz as experiências dentro do objeto 'dados', 
    // podemos retornar direto
    return NextResponse.json(dados || {});
  } catch (error) {
    console.error("Erro na API GET:", error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// 2. CRIAR DADOS NOVOS
export async function POST(request: Request) { 
  try {
    const body = await request.json();
    
    const { experiencias = [], ...dadosPessoais } = body;

    const novoRegistro = await prisma.tbCadastro.create({
      data: {
        ...dadosPessoais,
        experiencias: { // Nome exato do schema
          create: experiencias.map((exp: any) => ({
            razaosocial: exp.razaosocial,
            cidade: exp.cidade,
            uf: exp.uf,
            datainicio: new Date(exp.datainicio),
            datafim: exp.datafim ? new Date(exp.datafim) : null,
            cargo: exp.cargo,
            descricaocargo: exp.descricaocargo
          }))
        }
      },
    });
    return NextResponse.json(novoRegistro);
  } catch (error) {
    console.error("Erro na API POST:", error);
    return NextResponse.json({ error: 'Erro interno ao salvar dados' }, { status: 500 });
  }
}

// 3. ATUALIZAR DADOS EXISTENTES
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Separamos o ID, as experiências e o resto dos dados
    const { id, experiencias = [], ...dadosPessoais } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório para atualizar' }, { status: 400 });
    }

    const expsParaAtualizar = experiencias.filter((exp: any) => exp.id);
    const expsParaCriar = experiencias.filter((exp: any) => !exp.id);
    const idsMantidos = expsParaAtualizar.map((exp: any) => exp.id);

    const registroAtualizado = await prisma.tbCadastro.update({
      where: { id: id },
      data: {
        ...dadosPessoais,
        
        experiencias: { // Nome exato do schema
          // 1. Deleta do banco o que não está mais na lista
          deleteMany: idsMantidos.length > 0 
            ? { id: { notIn: idsMantidos } } 
            : {}, 
            
          // 2. Cria as novas
          create: expsParaCriar.map((exp: any) => ({
            razaosocial: exp.razaosocial,
            cidade: exp.cidade,
            uf: exp.uf,
            datainicio: new Date(exp.datainicio),
            datafim: exp.datafim ? new Date(exp.datafim) : null,
            cargo: exp.cargo,
            descricaocargo: exp.descricaocargo
          })),
          
          // 3. Atualiza as existentes
          update: expsParaAtualizar.map((exp: any) => ({
            where: { id: exp.id },
            data: {
              razaosocial: exp.razaosocial,
              cidade: exp.cidade,
              uf: exp.uf,
              datainicio: new Date(exp.datainicio),
              datafim: exp.datafim ? new Date(exp.datafim) : null,
              cargo: exp.cargo,
              descricaocargo: exp.descricaocargo
            }
          }))
        }
      },
    });

    return NextResponse.json(registroAtualizado);
  } catch (error) {
    console.error("Erro na API PUT:", error);
    return NextResponse.json({ error: 'Erro interno ao atualizar dados' }, { status: 500 });
  }
}