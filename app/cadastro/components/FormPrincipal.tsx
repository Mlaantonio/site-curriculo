"use client";
import * as React from 'react';
import { useCadastro } from '../context/CadastroContext';

export default function FormPrincipal() {
  // Puxa o estado e a função de atualizar direto da Context API
  const { formData, setFormData } = useCadastro();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle = { 
    width: '100%', 
    padding: '10px', 
    marginTop: '5px', 
    borderRadius: '4px', 
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const 
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginTop: 0, color: '#194369' }}>Dados Pessoais</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label>Nome Completo:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} style={inputStyle} required />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
        <div>
          <label>E-mail:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginTop: '15px' }}>
        <div>
          <label>Cidade:</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label>UF:</label>
          <input type="text" name="uf" value={formData.uf} onChange={handleChange} style={inputStyle} maxLength={2} />
        </div>
      </div>

      <div style={{ marginTop: '15px' }}>
        <label>Objetivo Profissional:</label>
        <textarea name="objetivoprofissional" value={formData.objetivoprofissional} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px' }} />
      </div>

      <div style={{ marginTop: '15px' }}>
        <label>Resumo Profissional:</label>
        <textarea name="resumoprofissional" value={formData.resumoprofissional} onChange={handleChange} style={{ ...inputStyle, minHeight: '120px' }} />
      </div>
    </div>
  );
}