// app/cadastro/components/FormExperiencias.tsx
"use client";
import * as React from 'react';
import { useState } from 'react';
import { useCadastro, Experiencia } from '../context/CadastroContext';
import '../cadastro.css'; // Importando o CSS

export default function FormExperiencias() {
  const { experiencias, setExperiencias } = useCadastro();

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
      const novasExps = [...experiencias];
      novasExps[indexEdicao] = expAtual;
      setExperiencias(novasExps);
    } else {
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

  return (
    <div className="form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 className="form-title">Experiências Profissionais</h3>
        <button type="button" onClick={abrirNovaExp} className="btn-action btn-add">
          + Adicionar
        </button>
      </div>

      {experiencias.length === 0 && <p style={{ color: '#666' }}>Nenhuma experiência cadastrada.</p>}

      {experiencias.map((exp, index) => (
        <div key={index} className="list-item-card list-item-grid">
          
          {/* COLUNA ESQUERDA - TEXTOS (Ocupa 3fr = 75%) */}
          <div>
            <strong>{exp.cargo}</strong> na empresa <em>{exp.razaosocial}</em><br/>
            <small style={{ color: '#666' }}>
              {exp.datainicio ? new Date(exp.datainicio).toLocaleDateString('pt-BR') : ''} até {exp.datafim ? new Date(exp.datafim).toLocaleDateString('pt-BR') : 'Atual'}
            </small>
          </div>
          
          {/* COLUNA DIREITA - BOTÕES (Ocupa 1fr = 25%) */}
          <div className="list-item-buttons">
            <button type="button" onClick={() => abrirEdicaoExp(index, exp)} className="btn-action btn-edit">
              Editar
            </button>
            <button type="button" onClick={() => removerExpDaLista(index)} className="btn-action btn-delete">
              Excluir
            </button>
          </div>
          
        </div>
      ))}

      {/* SUB-FORMULÁRIO DE CADASTRO/EDIÇÃO */}
      {mostrandoFormExp && (
        <div className="sub-form-container">
          <h4 style={{ margin: '0 0 15px 0' }}>{indexEdicao !== null ? 'Editar Experiência' : 'Nova Experiência'}</h4>
          
          <div className="form-row form-row-first grid-cols-even">
            <div>
              <label>Empresa (Razão Social):</label>
              <input type="text" name="razaosocial" value={expAtual.razaosocial} onChange={handleExpChange} className="form-input" />
            </div>
            <div>
              <label>Cargo:</label>
              <input type="text" name="cargo" value={expAtual.cargo} onChange={handleExpChange} className="form-input" />
            </div>
          </div>

          <div className="form-row grid-cols-even">
            <div>
              <label>Data Início:</label>
              <input type="date" name="datainicio" value={expAtual.datainicio} onChange={handleExpChange} className="form-input" />
            </div>
            <div>
              <label>Data Fim (Deixe em branco se atual):</label>
              <input type="date" name="datafim" value={expAtual.datafim} onChange={handleExpChange} className="form-input" />
            </div>
          </div>

          <div className="form-row grid-cols-uneven">
            <div>
              <label>Cidade:</label>
              <input type="text" name="cidade" value={expAtual.cidade} onChange={handleExpChange} className="form-input" />
            </div>
            <div>
              <label>UF:</label>
              <input type="text" name="uf" value={expAtual.uf} onChange={handleExpChange} className="form-input" maxLength={2} />
            </div>
          </div>

          <div className="form-group">
            <label>Descrição das Atividades:</label>
            <textarea name="descricaocargo" value={expAtual.descricaocargo} onChange={handleExpChange} className="form-input textarea-small" />
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={salvarExpNaLista} className="btn-action btn-confirm">Confirmar</button>
            <button type="button" onClick={() => setMostrandoFormExp(false)} className="btn-action btn-cancel">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}