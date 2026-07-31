// app/cadastro/page.tsx
"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { CadastroProvider, useCadastro } from './context/CadastroContext';
import FormPrincipal from './components/FormPrincipal';
import FormExperiencias from './components/FormExperiencias';
import FormFormacao from './components/FormFormacao';

// ------------------------------------------------------------------
// COMPONENTE DO FORMULÁRIO (Mantido exatamente como você fez)
// ------------------------------------------------------------------
function ContainerCadastro() {
  const { loading, mensagem, salvarDados } = useCadastro();

  if (loading) return <div style={{ padding: '20px' }}>Carregando dados do banco...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{color: '#194369'}}>Editar Cadastro Profissional</h2>
      
      {mensagem && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '15px' }}>
          {mensagem}
        </div>
      )}

      <form onSubmit={salvarDados} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormPrincipal />
        <FormExperiencias />
        <FormFormacao />
        
        <button type="submit" style={{ padding: '12px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
        <form onSubmit={handleLogin} style={{ padding: '30px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
          
          <h3 style={{ margin: 0, textAlign: 'center', color: '#194369' }}>Acesso Restrito</h3>
          
          {erro && <p style={{ color: 'red', margin: 0, fontSize: '14px', textAlign: 'center' }}>{erro}</p>}
          
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          
          <button type="submit" disabled={loadingLogin} style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: loadingLogin ? 'not-allowed' : 'pointer' }}>
            {loadingLogin ? 'Verificando...' : 'Entrar'}
          </button>

        </form>
      </div>
    );
  }

  // Se estiver logado, exibe a página normal de cadastro com o Provider
  return (
    <CadastroProvider>
      <div style={{ padding: '10px', textAlign: 'right', maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => { sessionStorage.removeItem('admin_auth'); setAutenticado(false); }}
          style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sair
        </button>
      </div>
      <ContainerCadastro />
    </CadastroProvider>
  );
}