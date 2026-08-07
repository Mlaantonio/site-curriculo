// app/cadastro/context/CadastroContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Definindo as Interfaces (Tipagens do TypeScript)
export interface Experiencia {
  id?: number;
  razaosocial: string;
  cidade: string;
  uf: string;
  datainicio?: string;
  datafim?: string;
  cargo: string;
  descricaocargo: string;
}

export interface Formacao {
  id?: number;
  instituicao: string;
  curso: string;
  status: 'CONCLUIDO' | 'CURSANDO' | 'INCOMPLETO' | string;
  datainicio?: string;
  datafim?: string;
}

export interface FormDataProps {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  objetivoprofissional: string;
  resumoprofissional: string;
}

export interface Habilidade {
  id: number;
  nome: string;
}

export interface Ferramenta {
  id?: number;
  idhabilidade: number;
  nomeferramenta: string;
}

// 2. Contexto para exportar os componentes
interface CadastroContextType {
  // --- DADOS PESSOAIS ---
  formData: FormDataProps;
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
  
  // --- LISTAS E RELACIONAMENTOS ---
  experiencias: Experiencia[];
  setExperiencias: React.Dispatch<React.SetStateAction<Experiencia[]>>;
  
  formacoes: Formacao[];
  setFormacoes: React.Dispatch<React.SetStateAction<Formacao[]>>;
  
  habilidadesBase: Habilidade[];
  setHabilidadesBase: React.Dispatch<React.SetStateAction<Habilidade[]>>;

  ferramentas: Ferramenta[];
  setFerramentas: React.Dispatch<React.SetStateAction<Ferramenta[]>>;
  
  // --- CONTROLE DE INTERFACE (UI) ---
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Adicionado
  
  mensagem: string;
  setMensagem: React.Dispatch<React.SetStateAction<string>>; // Adicionado
  
  // --- AÇÕES GLOBAIS ---
  salvarDados: (e: React.FormEvent) => Promise<void>;
}

// 3. Criando o Contexto
const CadastroContext = createContext<CadastroContextType | undefined>(undefined);

// 4. Criando o Provider (Provedor de Dados)
export function CadastroProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormDataProps>({
    id: 0, nome: '', cpf: '', email: '', telefone: '', cidade: '', uf: '', objetivoprofissional: '', resumoprofissional: ''
  });
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([]);
  const [habilidadesBase, setHabilidadesBase] = useState<Habilidade[]>([]);

 // 4.2. Busca inicial (GET)
  useEffect(() => {
    fetch('/api/cadastro')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // 1. Populando os dados principais
          setFormData({
            id: data.id || 0, 
            nome: data.nome || '', 
            cpf: data.cpf || '', 
            email: data.email || '', 
            telefone: data.telefone || '', 
            cidade: data.cidade || '', 
            uf: data.uf || '', 
            objetivoprofissional: data.objetivoprofissional || '', 
            resumoprofissional: data.resumoprofissional || ''
          });
          
          // 2. Populando e formatando as datas de Experiências
          if (data.experiencias) {
            const expFormatadas = data.experiencias.map((e: Experiencia) => ({
              ...e,
              datainicio: e.datainicio ? e.datainicio.split('T')[0] : '',
              datafim: e.datafim ? e.datafim.split('T')[0] : ''
            }));
            setExperiencias(expFormatadas);
          }

          // 3. Populando e formatando as datas de Formações
          if (data.formacoes) {
            const forFormatadas = data.formacoes.map((f: Formacao) => ({
              ...f,
              datainicio: f.datainicio ? f.datainicio.split('T')[0] : '',
              datafim: f.datafim ? f.datafim.split('T')[0] : ''
            }));
            setFormacoes(forFormatadas);
          }

          // 4. Populando as Habilidades
          if (data.habilidadesBase) {
            // Como as habilidades não precisam de formatação de data,
            // basta jogar o array que veio do banco direto no estado!
            setHabilidadesBase(data.habilidadesBase);
          }

          // 5. Populando as Ferramentas
          if (data.ferramentas) {
            // Mesma lógica das habilidades.
            setFerramentas(data.ferramentas);
          }
        }
        setLoading(false); // Tudo carregado com sucesso
      })
      .catch((err) => {
        console.error("Erro ao buscar os dados do perfil:", err);
        setLoading(false); // Tira o loading mesmo se der erro
      });
  }, []); // Array vazia garante que roda apenas na montagem do componente

  // Função de salvar (PUT)
  const salvarDados = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('Salvando...');
    const payload = { ...formData, experiencias, formacoes, ferramentas };

    try {
      const res = await fetch('/api/cadastro', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMensagem('Dados salvos com sucesso!');
        setTimeout(() => setMensagem(''), 3000);
      } else {
        setMensagem('Erro ao salvar os dados.');
      }
    } catch (error) {
      setMensagem('Erro de conexão.');
    }
  };

return (
    <CadastroContext.Provider 
      value={{ 
        formData, 
        setFormData, 
        experiencias, 
        setExperiencias, 
        formacoes,       
        setFormacoes,
        habilidadesBase,      
        setHabilidadesBase,  
        ferramentas,
        setFerramentas,
        loading, 
        setLoading,          
        mensagem, 
        setMensagem,   
        salvarDados 
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
}

// 4. Hook Customizado para facilitar o uso nos componentes
export function useCadastro() {
  const context = useContext(CadastroContext);
  if (!context) {
    throw new Error('useCadastro deve ser usado dentro de um CadastroProvider');
  }
  return context;
}