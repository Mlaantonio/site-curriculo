"use client";
import * as React from 'react';
import { useState } from 'react';
import { useCadastro, Formacao } from '../context/CadastroContext';

export default function FormFormacao() {
  const { formacoes, setFormacoes } = useCadastro();

  const [mostrandoFormFor, setMostrandoFormFor] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);
  const [forAtual, setForAtual] = useState<Formacao>({
    instituicao: '', curso: '', situacao: 'Concluído', datainicio: '', datafim: ''
  });

  const handleForChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForAtual((prev) => ({ ...prev, [name]: value }));
  };

  const abrirNovaFor = () => {
    setForAtual({ instituicao: '', curso: '', situacao: 'Concluído', datainicio: '', datafim: '' });
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

  const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' as const };
  const btnActionStyle = { padding: '6px 12px', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' };

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#194369' }}>Formação Acadêmica</h3>
        <button type="button" onClick={abrirNovaFor} style={{ ...btnActionStyle, backgroundColor: '#0056b3' }}>
          + Adicionar
        </button>
      </div>

      {(!formacoes || formacoes.length === 0) && <p style={{ color: '#666' }}>Nenhuma formação cadastrada.</p>}

      {formacoes?.map((formacao, index) => (
        <div key={index} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{formacao.curso}</strong> na instituição <em>{formacao.instituicao}</em><br/>
            <small style={{ color: '#666' }}>
              Situação: {formacao.situacao} | {formacao.datainicio ? new Date(formacao.datainicio).toLocaleDateString('pt-BR') : ''} até {formacao.datafim ? new Date(formacao.datafim).toLocaleDateString('pt-BR') : 'Atual'}
            </small>
          </div>
          <div>
            <button type="button" onClick={() => abrirEdicaoFor(index, formacao)} style={{ ...btnActionStyle, marginRight: '5px', backgroundColor: '#ffc107', color: '#000' }}>Editar</button>
            <button type="button" onClick={() => removerForDaLista(index)} style={{ ...btnActionStyle, backgroundColor: '#dc3545' }}>Excluir</button>
          </div>
        </div>
      ))}

      {mostrandoFormFor && (
        <div style={{ marginTop: '15px', padding: '15px', border: '1px dashed #0056b3', borderRadius: '4px', backgroundColor: '#fff' }}>
          <h4 style={{ margin: '0 0 15px 0' }}>{indexEdicao !== null ? 'Editar Formação' : 'Nova Formação'}</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label>Instituição de Ensino:</label>
              <input type="text" name="instituicao" value={forAtual.instituicao} onChange={handleForChange} style={inputStyle} />
            </div>
            <div>
              <label>Curso:</label>
              <input type="text" name="curso" value={forAtual.curso} onChange={handleForChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <div>
              <label>Situação:</label>
              <select name="situacao" value={forAtual.situacao} onChange={handleForChange} style={inputStyle}>
                <option value="Concluído">Concluído</option>
                <option value="Cursando">Cursando</option>
                <option value="Trancado/Incompleto">Trancado/Incompleto</option>
              </select>
            </div>
            <div>
              <label>Data Início:</label>
              <input type="date" name="datainicio" value={forAtual.datainicio} onChange={handleForChange} style={inputStyle} />
            </div>
            <div>
              <label>Data Fim:</label>
              <input type="date" name="datafim" value={forAtual.datafim} onChange={handleForChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button type="button" onClick={salvarForNaLista} style={{ ...btnActionStyle, backgroundColor: '#28a745' }}>Confirmar Formação</button>
            <button type="button" onClick={() => setMostrandoFormFor(false)} style={{ ...btnActionStyle, backgroundColor: '#6c757d' }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}