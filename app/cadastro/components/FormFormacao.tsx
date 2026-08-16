// app/cadastro/components/FormFormacao.tsx
"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import '../cadastro.css'; // Importando o CSS

  export interface Formacao {
    id?: number;
    idpessoa?: number;
    instituicao: string;
    curso: string;
    status: 'CONCLUIDO' | 'CURSANDO' | 'INCOMPLETO';
    datainicio: string; // Formato YYYY-MM-DD
    datafim: string; // Formato YYYY-MM-DD
  }

  export default function FormFormacao() {
    const [formacoes, setFormacoes] = useState<Formacao[]>([]);
    const [forAtual, setForAtual] = useState<Formacao>({ instituicao: '', curso: '', status: 'CONCLUIDO', datainicio: '', datafim: '' });
    const [mostrandoFormFor, setMostrandoFormFor] = useState(false);
    const [indexEdicao, setIndexEdicao] = useState<number | null>(null); 

    useEffect(() => {
      const buscarFormacoes = async () => {
        try {
          const res = await fetch('/api/cadastro/formacao');
          if (res.ok) {
            setFormacoes(await res.json());
          } else {
            console.error('Erro ao buscar formações:', res.statusText);
          }
        } catch (error) {
          console.error('Erro ao buscar formações:', error);
        }
      };

      buscarFormacoes();
    }, []);

    const handleForChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForAtual((prev) => ({ ...prev, [name]: value }));
    };

    const abrirNovaFor = () => {
      setForAtual({ instituicao: '', curso: '', status: 'CONCLUIDO', datainicio: '', datafim: '' });
      setIndexEdicao(null);
      setMostrandoFormFor(true);
    };

    const abrirEdicaoFor = (index: number, formacao: Formacao) => {
      setForAtual(formacao);
      setIndexEdicao(index);
      setMostrandoFormFor(true);
    };

    const salvarForNaLista = () => {
      if (indexEdicao !== null) {
        // Editando uma formação existente
        const novasFormacoes = [...formacoes];
        novasFormacoes[indexEdicao] = forAtual;
        setFormacoes(novasFormacoes);
      } else {
        // Adicionando uma nova formação
        setFormacoes([...formacoes, forAtual]);
      }
      setMostrandoFormFor(false);
    };

    const removerForDaLista = (index: number) => {
      const novasFormacoes = formacoes.filter((_, i) => i !== index);
      setFormacoes(novasFormacoes);
    };

  return (
    <div className="form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 className="form-title">Formação Acadêmica</h3>
        <button type="button" onClick={abrirNovaFor} className="btn-action btn-add">
          + Adicionar
        </button>
      </div>

      {(!formacoes || formacoes.length === 0) && <p style={{ color: '#666' }}>Nenhuma formação cadastrada.</p>}

      {formacoes?.map((formacao, index) => (
        <div key={index} className="list-item-card list-item-grid">
          
          {/* COLUNA ESQUERDA - TEXTOS (Ocupa 3fr = 75%) */}
          <div>
            <strong>{formacao.curso}</strong> - Instituição: <em>{formacao.instituicao}</em><br/>
            <small style={{ color: '#666' }}>
              Situação: {formacao.status} | {formacao.datainicio ? new Date(formacao.datainicio).toLocaleDateString('pt-BR') : ''} até {formacao.datafim ? new Date(formacao.datafim).toLocaleDateString('pt-BR') : 'Atual'}
            </small>
          </div>
          
          {/* COLUNA DIREITA - BOTÕES (Ocupa 1fr = 25%) */}
          <div className="list-item-buttons">
            <button type="button" onClick={() => abrirEdicaoFor(index, formacao)} className="btn-action btn-edit">
              Editar
            </button>
            <button type="button" onClick={() => removerForDaLista(index)} className="btn-action btn-delete">
              Excluir
            </button>
          </div>
          
        </div>
      ))}

      {/* SUB-FORMULÁRIO DE CADASTRO/EDIÇÃO */}
      {mostrandoFormFor && (
        <div className="sub-form-container">
          <h4 style={{ margin: '0 0 15px 0' }}>{indexEdicao !== null ? 'Editar Formação' : 'Nova Formação'}</h4>
          
          <div className="form-row form-row-first grid-cols-even">
            <div>
              <label>Instituição de Ensino:</label>
              <input type="text" name="instituicao" value={forAtual.instituicao} onChange={handleForChange} className="form-input" />
            </div>
            <div>
              <label>Curso:</label>
              <input type="text" name="curso" value={forAtual.curso} onChange={handleForChange} className="form-input" />
            </div>
          </div>

          <div className="form-row grid-cols-3">
            <div>
              <label>Situação:</label>
              {/* O select funciona perfeitamente com a classe form-input */}
              <select name="status" value={forAtual.status} onChange={handleForChange} className="form-input">
                <option value="CONCLUIDO">Concluído</option>
                <option value="CURSANDO">Cursando</option>
                <option value="INCOMPLETO">Trancado/Incompleto</option>
              </select>
            </div>
            <div>
              <label>Data Início:</label>
              <input type="date" name="datainicio" value={forAtual.datainicio} onChange={handleForChange} className="form-input" />
            </div>
            <div>
              <label>Data Fim:</label>
              <input type="date" name="datafim" value={forAtual.datafim} onChange={handleForChange} className="form-input" />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={salvarForNaLista} className="btn-action btn-confirm">Confirmar Formação</button>
            <button type="button" onClick={() => setMostrandoFormFor(false)} className="btn-action btn-cancel">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}