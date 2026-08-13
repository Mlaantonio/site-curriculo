// app/cadastro/components/FormHabilidades.tsx
"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import '../cadastro.css'; 

// 1. Tipagens definidas
export interface Ferramenta {
  id?: number;
  idhabilidade: number;
  idpessoa?: number;
  nomeferramenta: string;
}

export interface HabilidadeBase {
  id: number;
  nome: string;
}

export default function FormHabilidades() {


  // 2. Estados do componente
  const [habilidadesBase, setHabilidadesBase] = useState<HabilidadeBase[]>([]);
  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([]);
  const [ferramentaAtual, setFerramentaAtual] = useState<Ferramenta>({ idhabilidade: 0, nomeferramenta: '' });
  const [mostrandoForm, setMostrandoForm] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);
 
  // 3. Busca inicial na API
  useEffect(() => { 
    const buscarDados = async () => {
try {
        // 1. Busca as ferramentas que a pessoa já tem cadastradas
        const resFerramentas = await fetch('/api/cadastro/ferramentas?idpessoa=1');
        if (resFerramentas.ok) {
          setFerramentas(await resFerramentas.json());
        }

        // 2. Busca TODAS as categorias do banco para preencher o <select>
        const resHabilidades = await fetch('/api/cadastro/habilidades');
        if (resHabilidades.ok) {
          setHabilidadesBase(await resHabilidades.json());
        }

      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };
    
    buscarDados();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFerramentaAtual((prev) => ({ 
      ...prev, 
      [name]: name === 'idhabilidade' ? Number(value) : value 
    }));
  };

  const abrirNova = (idhabilidadePreSelecionada: number = 0) => {
    setFerramentaAtual({ idhabilidade: idhabilidadePreSelecionada, nomeferramenta: '' });
    setIndexEdicao(null);
    setMostrandoForm(true);
  };

  const salvarNaLista = () => {
    if (!ferramentaAtual.idhabilidade || !ferramentaAtual.nomeferramenta) {
      alert("Selecione a Categoria (Habilidade) e digite o nome da Ferramenta!");
      return;
    }

    if (indexEdicao !== null) {
      const novas = [...ferramentas];
      novas[indexEdicao] = ferramentaAtual;
      setFerramentas(novas);
    } else {
      setFerramentas([...(ferramentas || []), ferramentaAtual]);
    }
    setMostrandoForm(false);
  };

  const getNomeCategoria = (id: number) => {
    const hab = habilidadesBase?.find(h => h.id === id);
    return hab ? hab.nome : 'Categoria desconhecida';
  };

  // Agrupa as ferramentas
  const ferramentasAgrupadas = ferramentas?.reduce((acc, ferramenta, index) => {
    const id = ferramenta.idhabilidade;
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push({ ...ferramenta, indexOriginal: index });
    return acc;
  }, {} as Record<number, Array<Ferramenta & { indexOriginal: number }>>);

  return (
    <div className="form-container">
      {/* ESTE BOTÃO ADICIONAR GLOBAL AGORA É OPCIONAL, JÁ QUE TEMOS UM POR CATEGORIA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 className="form-title">Habilidades e Ferramentas</h3>
        <button type="button" onClick={() => abrirNova()} className="btn-action btn-add">
          + Adicionar Categoria/Ferramenta
        </button>
      </div>

      {(!ferramentas || ferramentas.length === 0) && <p style={{ color: '#666' }}>Nenhuma ferramenta cadastrada.</p>}

      {/* Ferramentas Agrupadas por Habilidade */}
      {ferramentasAgrupadas && Object.entries(ferramentasAgrupadas).map(([idString, listaDeFerramentas]) => {
        const idHabilidade = Number(idString);
        
        return (
          <div key={idHabilidade} className="list-item-card" style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            padding: '15px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            
            {/* CABEÇALHO DA HABILIDADE */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '15px', 
              paddingBottom: '10px', 
              borderBottom: '1px solid #eee' 
            }}>
              <h4 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
                Habilidade: {getNomeCategoria(idHabilidade)}
              </h4>
              
              <button style={{
                backgroundColor: '#0056b3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 12px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                width: '80px',
              }}>
                editar
              </button>
            </div>
            
            {/* CORPO: TAGS + BOTÕES */}
            <div style={{ 
              display: 'flex',
              justifyContent: 'min-content', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              width: '300px',
              gap: '15px'
            }}>
            
              {/* LISTA DE FERRAMENTAS (TAGS) em linha */}
              <div style={{ display: 'flex',  width: '700px', flexDirection: 'row', gap: '8px' }}>
                {listaDeFerramentas.map((item) => (
                  <span key={item.indexOriginal} style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#333',
                    width: 'max-content',
                  }}>
                    {item.nomeferramenta}
                  </span>
                ))}
              </div>

              {/* BOTÕES DE AÇÃO DO GRUPO */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button"
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 14px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  editar
                </button>
                <button 
                  type="button"
                  onClick={() => abrirNova(idHabilidade)} // Já abre o form com a categoria pré-selecionada!
                  style={{
                    backgroundColor: '#0056b3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 14px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  adicionar
                </button>
                <button 
                  type="button"
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 14px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  excluir
                </button> 
              </div>
              
            </div>
          </div>
        );
      })}

      {/* SUB-FORMULÁRIO DE CADASTRO/EDIÇÃO */}
      {mostrandoForm && (
        <div className="sub-form-container">
          <h4 style={{ margin: '0 0 15px 0' }}>{indexEdicao !== null ? 'Editar Ferramenta' : 'Nova Ferramenta'}</h4>
          
          <div className="form-row form-row-first grid-cols-even">
            <div>
              <label>Categoria (Habilidade):</label>
              <select name="idhabilidade" value={ferramentaAtual.idhabilidade} onChange={handleChange} className="form-input">
                <option value={0} disabled>Selecione uma categoria...</option>
                {habilidadesBase?.map((hab) => (
                  <option key={hab.id} value={hab.id}>
                    {hab.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Nome da Ferramenta:</label>
              <input 
                type="text" 
                name="nomeferramenta" 
                value={ferramentaAtual.nomeferramenta} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="Ex: JavaScript, MySQL, Photoshop..."
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={salvarNaLista} className="btn-action btn-confirm">Confirmar</button>
            <button type="button" onClick={() => setMostrandoForm(false)} className="btn-action btn-cancel">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}