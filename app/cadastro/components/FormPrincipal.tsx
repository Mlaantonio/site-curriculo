// app/cadastro/components/FormPrincipal.tsx
"use client";
import * as React from 'react';
import { useCadastro } from '../context/CadastroContext';
import '../cadastro.css'; 

export default function FormPrincipal() {
  const { formData, setFormData } = useCadastro();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Dados Pessoais</h3>
      
      <div className="main-form-grid">
        
        {/* COLUNA ESQUERDA: Dados Básicos e Contato */}
        <div className="form-column">
          <div className="form-row form-row-first grid-cols-even">
            <div>
              <label>Nome Completo:</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="form-input" required />
            </div>
            <div>
              <label>CPF:</label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="form-input" required />
            </div>
          </div>

          <div className="form-row grid-cols-even">
            <div>
              <label>E-mail:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
            </div>
            <div>
              <label>Telefone:</label>
              <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div className="form-row grid-cols-uneven">
            <div>
              <label>Cidade:</label>
              <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="form-input" />
            </div>
            <div>
              <label>UF:</label>
              <input type="text" name="uf" value={formData.uf} onChange={handleChange} className="form-input" maxLength={2} />
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Textos Longos */}
        <div className="form-column">
          <div className="form-group" style={{ marginTop: 0 }}>
            <label>Objetivo Profissional:</label>
            <textarea name="objetivoprofissional" value={formData.objetivoprofissional} onChange={handleChange} className="form-input textarea-small" />
          </div>

          <div className="form-group">
            <label>Resumo Profissional:</label>
            <textarea name="resumoprofissional" value={formData.resumoprofissional} onChange={handleChange} className="form-input textarea-large" />
          </div>
        </div>

      </div>
    </div>
  );
}