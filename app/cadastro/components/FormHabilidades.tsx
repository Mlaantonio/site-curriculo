// app/cadastro/components/FormHabilidades.tsx
"use client";
import * as React from 'react';
import { useState } from 'react';
import { useCadastro, Ferramenta } from '../context/CadastroContext';
import '../cadastro.css'; 

export default function FormHabilidades() {
  // Puxa as ferramentas cadastradas e a lista de categorias (TbHabilidades) do contexto
  const { ferramentas, setFerramentas, habilidadesBase } = useCadastro();

  const [mostrandoForm, setMostrandoForm] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);
  const [ferramentaAtual, setFerramentaAtual] = useState<Ferramenta>({
    idhabilidade: 0,
    nomeferramenta: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFerramentaAtual((prev) => ({ 
      ...prev, 
      // Se for o select de habilidade, converte para número, senão mantém texto
      [name]: name === 'idhabilidade' ? Number(value) : value 
    }));
  };

  const abrirNova = () => {
    setFerramentaAtual({ idhabilidade: 0, nomeferramenta: '' });
    setIndexEdicao(null);
    setMostrandoForm(true);
  };

  const abrirEdicao = (index: number, ferramenta: Ferramenta) => {
    setFerramentaAtual(ferramenta);
    setIndexEdicao(index);
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

  const removerDaLista = (index: number) => {
    if (confirm("Tem certeza que deseja remover esta ferramenta?")) {
      const novas = ferramentas.filter((_, i) => i !== index);
      setFerramentas(novas);
    }
  };

  // Função auxiliar para achar o nome da categoria para exibir na lista
  const getNomeCategoria = (id: number) => {
    const hab = habilidadesBase?.find(h => h.id === id);
    return hab ? hab.nome : 'Categoria desconhecida';
  };

  return (
    <div className="form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 className="form-title">Habilidades e Ferramentas</h3>
        <button type="button" onClick={abrirNova} className="btn-action btn-add">
          + Adicionar
        </button>
      </div>

      {(!ferramentas || ferramentas.length === 0) && <p style={{ color: '#666' }}>Nenhuma ferramenta cadastrada.</p>}

      {ferramentas?.map((ferramenta, index) => (
        <div key={index} className="list-item-card list-item-grid">
          
          {/* COLUNA ESQUERDA - TEXTOS (75%) */}
          <div>
            <strong>{ferramenta.nomeferramenta}</strong><br/>
            <small style={{ color: '#666' }}>
              Categoria: {getNomeCategoria(ferramenta.idhabilidade)}
            </small>
          </div>
          
          {/* COLUNA DIREITA - BOTÕES (25%) */}
          <div className="list-item-buttons">
            <button type="button" onClick={() => abrirEdicao(index, ferramenta)} className="btn-action btn-edit">
              Editar
            </button>
            <button type="button" onClick={() => removerDaLista(index)} className="btn-action btn-delete">
              Excluir
            </button>
          </div>
          
        </div>
      ))}

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