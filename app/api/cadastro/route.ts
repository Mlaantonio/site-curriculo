// app/api/cadastro/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 1. LER DADOS
export async function GET() {
  try {
    const dados = await prisma.tbCadastro.findFirst({
      include: {
        experiencias: {
          orderBy: { datainicio: 'desc' }
        },
        formacoes: {
          orderBy: { datainicio: 'desc' }
        }, // <-- Faltava essa vírgula
        ferramentas: {
          orderBy: { id: 'desc' }
        }
      }
    });

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
    
    // Adicionado ferramentas = [] aqui
    const { experiencias = [], formacoes = [], ferramentas = [], ...dadosPessoais } = body;

    const novoRegistro = await prisma.tbCadastro.create({
      data: {
        ...dadosPessoais,
        experiencias: { 
          create: experiencias.map((exp: any) => ({
            razaosocial: exp.razaosocial,
            cidade: exp.cidade,
            uf: exp.uf,
            datainicio: new Date(exp.datainicio),
            datafim: exp.datafim ? new Date(exp.datafim) : null,
            cargo: exp.cargo,
            descricaocargo: exp.descricaocargo
          }))
        },
        formacoes: {
          create: formacoes.map((form: any) => ({
            instituicao: form.instituicao,
            nomecurso: form.curso || form.nomecurso,
            status: form.status ? form.status.toUpperCase() : null,
            datainicio: form.datainicio ? new Date(form.datainicio) : null,
            datafim: form.datafim ? new Date(form.datafim) : null
          }))
        },
        ferramentas: {
          create: ferramentas.map((ferramenta: any) => ({
            idhabilidade: Number(ferramenta.idhabilidade),
            nomeferramenta: ferramenta.nomeferramenta
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
    
    // Separamos o ID, as experiências, formações, ferramentas e o resto dos dados
    const { experiencias = [], formacoes = [], ferramentas = [], ...dadosPessoais } = body;

    // 1. Prepara as EXPERIÊNCIAS
    const expsParaAtualizar = experiencias.filter((exp: any) => exp.id);
    const expsParaCriar = experiencias.filter((exp: any) => !exp.id);
    const idsMantidos = expsParaAtualizar.map((exp: any) => exp.id);
    
    // 2. Prepara as FORMAÇÕES 
    const formsParaAtualizar = formacoes.filter((form: any) => form.id);
    const formsParaCriar = formacoes.filter((form: any) => !form.id);
    const idsFormsMantidos = formsParaAtualizar.map((form: any) => form.id);

    // 3. Prepara as FERRAMENTAS
    const ferramentasParaAtualizar = ferramentas.filter((f: any) => f.id);
    const ferramentasParaCriar = ferramentas.filter((f: any) => !f.id);
    const idsFerramentasMantidas = ferramentasParaAtualizar.map((f: any) => f.id);

    // 4. Atualiza tudo no Prisma
    const registroAtualizado = await prisma.tbCadastro.update({
      where: { id: 1 },
      data: {
        ...dadosPessoais,
        
        // --- BLOCO DE EXPERIÊNCIAS ---
        experiencias: {
          deleteMany: idsMantidos.length > 0 
            ? { id: { notIn: idsMantidos } } 
            : {}, 
          create: expsParaCriar.map((exp: any) => ({
            razaosocial: exp.razaosocial,
            cidade: exp.cidade,
            uf: exp.uf,
            datainicio: new Date(exp.datainicio),
            datafim: exp.datafim ? new Date(exp.datafim) : null,
            cargo: exp.cargo,
            descricaocargo: exp.descricaocargo
          })),
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
        },

        // --- BLOCO DE FORMAÇÕES ---
        formacoes: {
          deleteMany: idsFormsMantidos.length > 0 
            ? { id: { notIn: idsFormsMantidos } } 
            : {},
          create: formsParaCriar.map((form: any) => ({
            instituicao: form.instituicao,
            nomecurso: form.curso || form.nomecurso,
            status: form.status ? form.status.toUpperCase() : null,
            datainicio: form.datainicio ? new Date(form.datainicio) : null,
            datafim: form.datafim ? new Date(form.datafim) : null
          })),
          update: formsParaAtualizar.map((form: any) => ({
            where: { id: form.id },
            data: {
              instituicao: form.instituicao,
              nomecurso: form.curso || form.nomecurso,
              status: form.status ? form.status.toUpperCase() : null,
              datainicio: form.datainicio ? new Date(form.datainicio) : null,
              datafim: form.datafim ? new Date(form.datafim) : null
            }
          }))
        }, // <-- Faltava essa vírgula também

        // --- BLOCO DE FERRAMENTAS ---
        ferramentas: {
          deleteMany: idsFerramentasMantidas.length > 0 
            ? { id: { notIn: idsFerramentasMantidas } } 
            : {},
          create: ferramentasParaCriar.map((ferramenta: any) => ({
            idhabilidade: Number(ferramenta.idhabilidade),
            nomeferramenta: ferramenta.nomeferramenta
          })),
          update: ferramentasParaAtualizar.map((ferramenta: any) => ({
            where: { id: ferramenta.id },
            data: {
              idhabilidade: Number(ferramenta.idhabilidade),
              nomeferramenta: ferramenta.nomeferramenta
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