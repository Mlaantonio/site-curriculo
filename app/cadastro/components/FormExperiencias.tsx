// app/cadastro/components/FormExperiencias.tsx
"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import '../cadastro.css';

// 1. Tipagens definidas
export interface Experiencia {
  id?: number;
  idpessoa?: number;
  razaosocial: string;
  cidade: string;
  uf: string;
  datainicio: string;
  datafim?: string | null;
  cargo: string;
  descricaocargo: string;
}

export default function FormExperiencias() {
  // 2. Estados do componente
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  const [expAtual, setExpAtual] = useState<Experiencia>({
    razaosocial: '',
    cidade: '',
    uf: '',
    datainicio: '',
    datafim: '',
    cargo: '',
    descricaocargo: ''
  });
  const [mostrandoFormExp, setMostrandoFormExp] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);

  // 3. Buscar experiências cadastradas no banco
  const buscarExperiencias = async () => {
    try {
      const res = await fetch('/api/cadastro/experiencias');
      if (res.ok) {
        const dados = await res.json();
        setExperiencias(Array.isArray(dados) ? dados : []);
      } else {
        console.error('Erro ao buscar experiências:', res.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar experiências:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarExperiencias();
  }, []);

  // Helper para formatar data para o input HTML YYYY-MM-DD
  const formatarParaInputDate = (data?: string | null) => {
    if (!data) return '';
    return data.includes('T') ? data.split('T')[0] : data.substring(0, 10);
  };

  // Helper para exibir data formatada PT-BR
  const formatarDataExibicao = (data?: string | null) => {
    if (!data) return '';
    const datePart = data.includes('T') ? data.split('T')[0] : data;
    const [ano, mes, dia] = datePart.split('-');
    if (ano && mes && dia) {
      return `${dia}/${mes}/${ano}`;
    }
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const abrirEdicaoExp = (index: number, exp: Experiencia) => {
    setExpAtual({
      ...exp,
      cidade: exp.cidade || '',
      uf: exp.uf || '',
      datainicio: formatarParaInputDate(exp.datainicio),
      datafim: formatarParaInputDate(exp.datafim),
      descricaocargo: exp.descricaocargo || ''
    });
    setIndexEdicao(index);
    setMostrandoFormExp(true);
    setMensagem(null);
  };

  const abrirNovaExp = () => {
    setExpAtual({
      razaosocial: '',
      cidade: '',
      uf: '',
      datainicio: '',
      datafim: '',
      cargo: '',
      descricaocargo: ''
    });
    setIndexEdicao(null);
    setMostrandoFormExp(true);
    setMensagem(null);
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExpAtual((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Salvar (Criar ou Atualizar) experiência no banco de dados
  const salvarExpNaLista = async () => {
    if (!expAtual.razaosocial || !expAtual.cargo || !expAtual.datainicio) {
      alert("Preencha ao menos Empresa (Razão Social), Cargo e Data de Início!");
      return;
    }

    setSalvando(true);
    setMensagem(null);

    try {
      const isEdicao = expAtual.id !== undefined;
      const url = '/api/cadastro/experiencias';
      const method = isEdicao ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expAtual)
      });

      if (res.ok) {
        setMensagem({
          tipo: 'sucesso',
          texto: isEdicao ? 'Experiência atualizada com sucesso!' : 'Experiência cadastrada com sucesso!'
        });
        setMostrandoFormExp(false);
        await buscarExperiencias();
        setTimeout(() => setMensagem(null), 4000);
      } else {
        const erroData = await res.json().catch(() => ({}));
        alert(erroData.erro || 'Erro ao salvar experiência.');
      }
    } catch (error) {
      console.error('Erro ao salvar experiência:', error);
      alert('Erro de conexão ao salvar experiência.');
    } finally {
      setSalvando(false);
    }
  };

  // 5. Remover experiência do banco de dados
  const removerExpDaLista = async (exp: Experiencia, index: number) => {
    if (!confirm(`Tem certeza que deseja remover a experiência na empresa "${exp.razaosocial}"?`)) {
      return;
    }

    if (!exp.id) {
      // Se não tiver ID (somente local), remove do estado
      setExperiencias(experiencias.filter((_, i) => i !== index));
      return;
    }

    try {
      const res = await fetch(`/api/cadastro/experiencias?id=${exp.id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setMensagem({ tipo: 'sucesso', texto: 'Experiência removida com sucesso!' });
        await buscarExperiencias();
        setTimeout(() => setMensagem(null), 4000);
      } else {
        const erroData = await res.json().catch(() => ({}));
        alert(erroData.erro || 'Erro ao excluir experiência.');
      }
    } catch (error) {
      console.error('Erro ao excluir experiência:', error);
      alert('Erro de conexão ao excluir experiência.');
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

      {mensagem && (
        <div className={mensagem.tipo === 'sucesso' ? 'alert-success' : 'error-message'} style={{ marginBottom: '15px', padding: '10px', borderRadius: '4px' }}>
          {mensagem.texto}
        </div>
      )}

      {carregando && <p style={{ color: '#666' }}>Carregando experiências...</p>}

      {!carregando && experiencias.length === 0 && (
        <p style={{ color: '#666' }}>Nenhuma experiência cadastrada.</p>
      )}

      {!carregando && experiencias.map((exp, index) => (
        <div key={exp.id || index} className="list-item-card list-item-grid">
          
          {/* COLUNA ESQUERDA - TEXTOS (Ocupa 3fr = 75%) */}
          <div>
            <strong>{exp.cargo}</strong> na empresa <em>{exp.razaosocial}</em>
            {exp.cidade && <span> - {exp.cidade}{exp.uf ? `/${exp.uf}` : ''}</span>}
            <br/>
            <small style={{ color: '#666' }}>
              {formatarDataExibicao(exp.datainicio)} até {exp.datafim ? formatarDataExibicao(exp.datafim) : 'Atual'}
            </small>
            {exp.descricaocargo && (
              <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', color: '#444', whiteSpace: 'pre-line' }}>
                {exp.descricaocargo}
              </p>
            )}
          </div>
          
          {/* COLUNA DIREITA - BOTÕES (Ocupa 1fr = 25%) */}
          <div className="list-item-buttons">
            <button type="button" onClick={() => abrirEdicaoExp(index, exp)} className="btn-action btn-edit">
              Editar
            </button>
            <button type="button" onClick={() => removerExpDaLista(exp, index)} className="btn-action btn-delete">
              Excluir
            </button>
          </div>
          
        </div>
      ))}

      {/* SUB-FORMULÁRIO DE CADASTRO/EDIÇÃO */}
      {mostrandoFormExp && (
        <div className="sub-form-container">
          <h4 style={{ margin: '0 0 15px 0' }}>
            {expAtual.id ? 'Editar Experiência' : 'Nova Experiência'}
          </h4>
          
          <div className="form-row form-row-first grid-cols-even">
            <div>
              <label>Empresa (Razão Social):</label>
              <input 
                type="text" 
                name="razaosocial" 
                value={expAtual.razaosocial} 
                onChange={handleExpChange} 
                className="form-input" 
                required 
              />
            </div>
            <div>
              <label>Cargo:</label>
              <input 
                type="text" 
                name="cargo" 
                value={expAtual.cargo} 
                onChange={handleExpChange} 
                className="form-input" 
                required 
              />
            </div>
          </div>

          <div className="form-row grid-cols-even">
            <div>
              <label>Data Início:</label>
              <input 
                type="date" 
                name="datainicio" 
                value={expAtual.datainicio} 
                onChange={handleExpChange} 
                className="form-input" 
                required 
              />
            </div>
            <div>
              <label>Data Fim (Deixe em branco se atual):</label>
              <input 
                type="date" 
                name="datafim" 
                value={expAtual.datafim || ''} 
                onChange={handleExpChange} 
                className="form-input" 
              />
            </div>
          </div>

          <div className="form-row grid-cols-uneven">
            <div>
              <label>Cidade:</label>
              <input 
                type="text" 
                name="cidade" 
                value={expAtual.cidade} 
                onChange={handleExpChange} 
                className="form-input" 
              />
            </div>
            <div>
              <label>UF:</label>
              <input 
                type="text" 
                name="uf" 
                value={expAtual.uf} 
                onChange={handleExpChange} 
                className="form-input" 
                maxLength={2} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descrição das Atividades:</label>
            <textarea 
              name="descricaocargo" 
              value={expAtual.descricaocargo} 
              onChange={handleExpChange} 
              className="form-input textarea-small" 
            />
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button" 
              onClick={salvarExpNaLista} 
              disabled={salvando} 
              className="btn-action btn-confirm"
            >
              {salvando ? 'Salvando...' : 'Confirmar'}
            </button>
            <button 
              type="button" 
              onClick={() => setMostrandoFormExp(false)} 
              disabled={salvando} 
              className="btn-action btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
