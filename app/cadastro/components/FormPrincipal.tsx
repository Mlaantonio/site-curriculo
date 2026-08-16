// app/cadastro/components/FormPrincipal.tsx
"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import '../cadastro.css'; 

// 1. Tipagem do formulário principal
export interface FormPrincipalData {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  objetivoprofissional: string;
  resumoprofissional: string;
}

export default function FormPrincipal() {
  // 2. Estados do componente
  const [formData, setFormData] = useState<FormPrincipalData>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cidade: '',
    uf: '',
    objetivoprofissional: '',
    resumoprofissional: ''
  });
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  // 3. Busca dos dados na API
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const res = await fetch('/api/cadastro/principal');
        if (res.ok) {
          const dados = await res.json();
          const item = Array.isArray(dados) ? dados[0] : dados;
          if (item) {
            setFormData({
              id: item.id,
              nome: item.nome || '',
              cpf: item.cpf || '',
              email: item.email || '',
              telefone: item.telefone || '',
              cidade: item.cidade || '',
              uf: item.uf || '',
              objetivoprofissional: item.objetivoprofissional || '',
              resumoprofissional: item.resumoprofissional || ''
            });
          }
        } else {
          console.error('Erro ao buscar dados do formulário:', res.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do formulário:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };      

  // 4. Salvar alterações no banco de dados
  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setMensagem(null);

    try {
      const res = await fetch('/api/cadastro/principal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setMensagem({ tipo: 'sucesso', texto: 'Dados pessoais salvos com sucesso!' });
        setTimeout(() => setMensagem(null), 4000);
      } else {
        const erroData = await res.json().catch(() => ({}));
        setMensagem({ tipo: 'erro', texto: erroData.erro || 'Erro ao salvar dados pessoais.' });
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro de conexão ao salvar.' });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSalvar}>
        {/* Cabeçalho do Card */}
        <div className="form-header">
          <div>
            <h3 className="form-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, width: '22px', height: '22px' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Dados Pessoais e Apresentação
            </h3>
            <p className="form-subtitle">Informações de contato e resumo para o cabeçalho do currículo</p>
          </div>
          
          <button 
            type="submit" 
            disabled={salvando || carregando} 
            className="btn-action btn-confirm"
            style={{ padding: '10px 22px', fontSize: '0.95rem' }}
          >
            {salvando ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Salvando...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Salvar Dados Pessoais
              </>
            )}
          </button>
        </div>

        {/* Mensagens de Notificação */}
        {mensagem && (
          <div className={mensagem.tipo === 'sucesso' ? 'alert-success' : 'error-message'}>
            {mensagem.tipo === 'sucesso' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, width: '18px', height: '18px' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, width: '18px', height: '18px' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
            <span>{mensagem.texto}</span>
          </div>
        )}
        
        {/* Grid de Formulário em 2 Colunas */}
        <div className="main-form-grid">
          
          {/* COLUNA ESQUERDA: Dados Básicos e Contato */}
          <div className="form-column">
            <div className="form-row grid-cols-even">
              <div className="form-group">
                <label className="form-label">
                  Nome Completo <span className="required-star">*</span>
                </label>
                <input 
                  type="text" 
                  name="nome" 
                  placeholder="Ex: Mario Antonio"
                  value={formData.nome} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  CPF <span className="required-star">*</span>
                </label>
                <input 
                  type="text" 
                  name="cpf" 
                  placeholder="000.000.000-00"
                  value={formData.cpf} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>
            </div>

            <div className="form-row grid-cols-even">
              <div className="form-group">
                <label className="form-label">
                  E-mail <span className="required-star">*</span>
                </label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="nome@dominio.com"
                  value={formData.email} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefone / WhatsApp:</label>
                <input 
                  type="text" 
                  name="telefone" 
                  placeholder="(00) 00000-0000"
                  value={formData.telefone} 
                  onChange={handleChange} 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-row grid-cols-uneven">
              <div className="form-group">
                <label className="form-label">Cidade:</label>
                <input 
                  type="text" 
                  name="cidade" 
                  placeholder="Ex: São Paulo"
                  value={formData.cidade} 
                  onChange={handleChange} 
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">UF:</label>
                <input 
                  type="text" 
                  name="uf" 
                  placeholder="SP"
                  value={formData.uf} 
                  onChange={handleChange} 
                  className="form-input" 
                  maxLength={2} 
                />
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Textos Longos e Objetivos */}
          <div className="form-column">
            <div className="form-group">
              <label className="form-label">Objetivo Profissional:</label>
              <textarea 
                name="objetivoprofissional" 
                placeholder="Ex: Atuar como Desenvolvedor Full Stack contribuindo para soluções escaláveis..."
                value={formData.objetivoprofissional} 
                onChange={handleChange} 
                className="form-input textarea-small" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Resumo Profissional:</label>
              <textarea 
                name="resumoprofissional" 
                placeholder="Breve descrição da sua trajetória, principais tecnologias dominadas e diferenciais..."
                value={formData.resumoprofissional} 
                onChange={handleChange} 
                className="form-input textarea-large" 
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}