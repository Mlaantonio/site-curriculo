// app/cadastro/page.tsx
"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import FormPrincipal from './components/FormPrincipal';
import FormExperiencias from './components/FormExperiencias';
import FormFormacao from './components/FormFormacao';
import FormHabilidades from './components/FormHabilidades';

// Importa o arquivo CSS (ajuste o caminho se necessário)
import './cadastro.css'; 

// 1. Container que apenas renderiza os formulários independentes
function ContainerCadastro() {
  return (
    <div className="page-container">
      <h2 className="page-title">Editar Cadastro Profissional</h2>
      
      {/* 
        Trocamos a tag <form> por uma <div> porque agora cada 
        componente lidará com o seu próprio salvamento no banco.
      */}
      <div className="form-wrapper">
        <FormPrincipal />
        <FormExperiencias />
        <FormFormacao />
        <FormHabilidades />
      </div>
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
            className="form-input"
            required
          />
          
          <button type="submit" disabled={loadingLogin} className="btn-primary">
            {loadingLogin ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  // Se estiver logado, exibe a página normal de cadastro (sem o Provider antigo)
  return (
    <>
      <div className="header-actions">
        <button 
          onClick={async () => { 
            await fetch('/api/logout', { method: 'POST' }); // Destrói o cookie no back-end
            sessionStorage.removeItem('admin_auth');        // Limpa o front-end
            setAutenticado(false); 
          }}
          className="btn-danger">
          Sair
        </button>
      </div>
      <ContainerCadastro />
    </>
  );
}