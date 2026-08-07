// app/cadastro/components/FormFormacao.tsx
"use client";
import * as React from 'react';
import { useState } from 'react';
import { useCadastro, Formacao } from '../context/CadastroContext';
import '../cadastro.css'; // Importando o CSS

export default function FormFormacao() {
  const { formacoes, setFormacoes } = useCadastro();

  const [mostrandoFormFor, setMostrandoFormFor] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);
  const [forAtual, setForAtual] = useState<Formacao>({
    instituicao: '', curso: '', status: 'CONCLUIDO', datainicio: '', datafim: ''
  });

  const handleForChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForAtual((prev) => ({ ...prev, [name]: value }));
  };

  const abrirNovaFor = () => {
    setForAtual({ instituicao: '', curso: '', status: '', datainicio: '', datafim: '' });
    setIndexEdicao(null);
    setMostrandoFormFor(true);
  };

  const abrirEdicaoFor = (index: number, formacao: Formacao) => {
    setForAtual(formacao);
    setIndexEdicao(index);
    setMostrandoFormFor(true);
  };

  const salvarForNaLista = () => {
    if (!forAtual.instituicao || !forAtual.curso) {
      alert("Preencha ao menos Instituição e Curso!");
      return;
    }

    if (indexEdicao !== null) {
      const novasFor = [...formacoes];
      novasFor[indexEdicao] = forAtual;
      setFormacoes(novasFor);
    } else {
      setFormacoes([...formacoes, forAtual]);
    }
    setMostrandoFormFor(false);
  };

  const removerForDaLista = (index: number) => {
    if (confirm("Tem certeza que deseja remover esta formação?")) {
      const novasFor = formacoes.filter((_, i) => i !== index);
      setFormacoes(novasFor);
    }
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