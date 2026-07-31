"use client";
import * as React from 'react';
import { useState } from 'react';
import { useCadastro, Experiencia } from '../context/CadastroContext';

export default function FormExperiencias() {
  // Puxa a lista oficial e a função de atualizar do Contexto Global
  const { experiencias, setExperiencias } = useCadastro();

  // Estados locais apenas para controlar o formulário na tela
  const [mostrandoFormExp, setMostrandoFormExp] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);
  const [expAtual, setExpAtual] = useState<Experiencia>({
    razaosocial: '', cidade: '', uf: '', datainicio: '', datafim: '', cargo: '', descricaocargo: ''
  });

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExpAtual((prev) => ({ ...prev, [name]: value }));
  };

  const abrirNovaExp = () => {
    setExpAtual({ razaosocial: '', cidade: '', uf: '', datainicio: '', datafim: '', cargo: '', descricaocargo: '' });
    setIndexEdicao(null);
    setMostrandoFormExp(true);
  };

  const abrirEdicaoExp = (index: number, exp: Experiencia) => {
    setExpAtual(exp);
    setIndexEdicao(index);
    setMostrandoFormExp(true);
  };

  const salvarExpNaLista = () => {
    if (!expAtual.razaosocial || !expAtual.cargo || !expAtual.datainicio) {
      alert("Preencha ao menos Empresa, Cargo e Data de Início!");
      return;
    }

    if (indexEdicao !== null) {
      // Editando uma existente
      const novasExps = [...experiencias];
      novasExps[indexEdicao] = expAtual;
      setExperiencias(novasExps);
    } else {
      // Adicionando uma nova
      setExperiencias([...experiencias, expAtual]);
    }
    setMostrandoFormExp(false);
  };

  const removerExpDaLista = (index: number) => {
    if (confirm("Tem certeza que deseja remover esta experiência?")) {
      const novasExps = experiencias.filter((_, i) => i !== index);
      setExperiencias(novasExps);
    }
  };

  // Estilos reaproveitados
  const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' as const };
  const btnActionStyle = { padding: '6px 12px', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' };

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#194369' }}>Experiências Profissionais</h3>
        <button type="button" onClick={abrirNovaExp} style={{ ...btnActionStyle, backgroundColor: '#0056b3' }}>
          + Adicionar
        </button>
      </div>

      {experiencias.length === 0 && <p style={{ color: '#666' }}>Nenhuma experiência cadastrada.</p>}

      {experiencias.map((exp, index) => (
        <div key={index} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{exp.cargo}</strong> na empresa <em>{exp.razaosocial}</em><br/>
            <small style={{ color: '#666' }}>
              {exp.datainicio ? new Date(exp.datainicio).toLocaleDateString('pt-BR') : ''} até {exp.datafim ? new Date(exp.datafim).toLocaleDateString('pt-BR') : 'Atual'}
            </small>
          </div>
          <div>
            <button type="button" onClick={() => abrirEdicaoExp(index, exp)} style={{ ...btnActionStyle, marginRight: '5px', backgroundColor: '#ffc107', color: '#000' }}>Editar</button>
            <button type="button" onClick={() => removerExpDaLista(index)} style={{ ...btnActionStyle, backgroundColor: '#dc3545' }}>Excluir</button>
          </div>
        </div>
      ))}

      {/* SUB-FORMULÁRIO */}
      {mostrandoFormExp && (
        <div style={{ marginTop: '15px', padding: '15px', border: '1px dashed #0056b3', borderRadius: '4px', backgroundColor: '#fff' }}>
          <h4 style={{ margin: '0 0 15px 0' }}>{indexEdicao !== null ? 'Editar Experiência' : 'Nova Experiência'}</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label>Empresa (Razão Social):</label>
              <input type="text" name="razaosocial" value={expAtual.razaosocial} onChange={handleExpChange} style={inputStyle} />
            </div>
            <div>
              <label>Cargo:</label>
              <input type="text" name="cargo" value={expAtual.cargo} onChange={handleExpChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <div>
              <label>Data Início:</label>
              <input type="date" name="datainicio" value={expAtual.datainicio} onChange={handleExpChange} style={inputStyle} />
            </div>
            <div>
              <label>Data Fim (Deixe em branco se atual):</label>
              <input type="date" name="datafim" value={expAtual.datafim} onChange={handleExpChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginTop: '10px' }}>
            <div>
              <label>Cidade:</label>
              <input type="text" name="cidade" value={expAtual.cidade} onChange={handleExpChange} style={inputStyle} />
            </div>
            <div>
              <label>UF:</label>
              <input type="text" name="uf" value={expAtual.uf} onChange={handleExpChange} style={inputStyle} maxLength={2} />
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>Descrição das Atividades:</label>
            <textarea name="descricaocargo" value={expAtual.descricaocargo} onChange={handleExpChange} style={{ ...inputStyle, minHeight: '60px' }} />
          </div>

          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button type="button" onClick={salvarExpNaLista} style={{ ...btnActionStyle, backgroundColor: '#28a745' }}>Confirmar</button>
            <button type="button" onClick={() => setMostrandoFormExp(false)} style={{ ...btnActionStyle, backgroundColor: '#6c757d' }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}