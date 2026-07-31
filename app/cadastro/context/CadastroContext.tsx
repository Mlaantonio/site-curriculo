"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Definindo as Interfaces (Tipagens do TypeScript)
export interface Experiencia {
  id?: number;
  razaosocial: string;
  cidade: string;
  uf: string;
  datainicio: string;
  datafim: string;
  cargo: string;
  descricaocargo: string;
}

export interface Formacao {
  id?: number;
  instituicao: string;
  curso: string;
  situacao: string; // Ex: Concluído, Cursando, Trancado
  datainicio: string;
  datafim: string;
}

export interface FormDataProps {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  objetivoprofissional: string;
  resumoprofissional: string;
}

// O que o nosso Contexto vai exportar para os componentes
interface CadastroContextType {
  formData: FormDataProps;
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
  experiencias: Experiencia[];
  setExperiencias: React.Dispatch<React.SetStateAction<Experiencia[]>>;
  loading: boolean;
  mensagem: string;
  salvarDados: (e: React.FormEvent) => Promise<void>;
  formacoes: Formacao[];
  setFormacoes: React.Dispatch<React.SetStateAction<Formacao[]>>;
}

// 2. Criando o Contexto
const CadastroContext = createContext<CadastroContextType | undefined>(undefined);

// 3. Criando o Provider (Provedor de Dados)
export function CadastroProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormDataProps>({
    id: '', nome: '', cpf: '', email: '', telefone: '', cidade: '', uf: '', objetivoprofissional: '', resumoprofissional: ''
  });
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);

  // Busca inicial (GET)
  useEffect(() => {
    fetch('/api/cadastro')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            id: data.id || '', nome: data.nome || '', cpf: data.cpf || '', email: data.email || '', 
            telefone: data.telefone || '', cidade: data.cidade || '', uf: data.uf || '', 
            objetivoprofissional: data.objetivoprofissional || '', resumoprofissional: data.resumoprofissional || ''
          });
          
          if (data.experiencias) {
            const expFormatadas = data.experiencias.map((e: any) => ({
              ...e,
              datainicio: e.datainicio ? e.datainicio.split('T')[0] : '',
              datafim: e.datafim ? e.datafim.split('T')[0] : ''
            }));
            setExperiencias(expFormatadas);
          }

          if (data.formacoes) {
            const forFormatadas = data.formacoes.map((f: any) => ({
              ...f,
              datainicio: f.datainicio ? f.datainicio.split('T')[0] : '',
              datafim: f.datafim ? f.datafim.split('T')[0] : ''
            }));
            setFormacoes(forFormatadas);
          }

        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Função de salvar (PUT)
  const salvarDados = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('Salvando...');
    const payload = { ...formData, experiencias, formacoes };

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
        loading, 
        mensagem, 
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