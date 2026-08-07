// app/cadastro/page.tsx
"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { CadastroProvider, useCadastro } from './context/CadastroContext';
import FormPrincipal from './components/FormPrincipal';
import FormExperiencias from './components/FormExperiencias';
import FormFormacao from './components/FormFormacao';
import FormHabilidades from './components/FormHabilidades';

// Importa o arquivo CSS (ajuste o caminho se necessário)
import './cadastro.css'; 

function ContainerCadastro() {
  const { loading, mensagem, salvarDados } = useCadastro();

  if (loading) return <div className="loading-text">Carregando dados do banco...</div>;

  return (
    <div className="page-container">
      <h2 className="page-title">Editar Cadastro Profissional</h2>
      
      {mensagem && (
        <div className="alert-success">
          {mensagem}
        </div>
      )}

      <form onSubmit={salvarDados} className="form-wrapper">
        <FormPrincipal />
        <FormExperiencias />
        <FormFormacao />
        <FormHabilidades />
        <button type="submit" className="btn-primary btn-save">
          Salvar Perfil Completo
        </button>
      </form>
    </div>
  );
}

// ------------------------------------------------------------------
// PÁGINA PRINCIPAL COM SISTEMA DE LOGIN
// ------------------------------------------------------------------
export default function EditarCadastro() {
  const [autenticado, setAutenticado] = useState(false);
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Verifica se o usuário já logou nesta aba do navegador
  useEffect(() => {
    const isLogado = sessionStorage.getItem('admin_auth');
    if (isLogado === 'true') {
      setAutenticado(true);
    }
    setVerificandoSessao(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    setErro('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha })
      });

      if (res.ok) {
        sessionStorage.setItem('admin_auth', 'true'); // Salva a sessão
        setAutenticado(true); // Libera o acesso
      } else {
        setErro('Senha incorreta!');
      }
    } catch (error) {
      setErro('Erro de conexão.');
    } finally {
      setLoadingLogin(false);
    }
  };

  // Evita um "piscar" da tela de login enquanto verifica a sessão salva
  if (verificandoSessao) return null; 

  // Se não estiver logado, exibe a tela de Login
  if (!autenticado) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          
          <h3 className="login-title">Acesso Restrito</h3>
          
          {erro && <p className="error-message">{erro}</p>}
          
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="form-input" /* Reaproveitando a classe de input do FormPrincipal! */
            required
          />
          
          <button type="submit" disabled={loadingLogin} className="btn-primary">
            {loadingLogin ? 'Verificando...' : 'Entrar'}
          </button>

        </form>
      </div>
    );
  }

  // Se estiver logado, exibe a página normal de cadastro com o Provider
  return (
    <CadastroProvider>
      <div className="header-actions">
        <button 
          onClick={() => { sessionStorage.removeItem('admin_auth'); setAutenticado(false); }}
          className="btn-danger">
          Sair
        </button>
      </div>
      <ContainerCadastro />
    </CadastroProvider>
  );
}