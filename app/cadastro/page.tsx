"use client";
import * as React from 'react';
import { CadastroProvider, useCadastro } from './context/CadastroContext';
import FormPrincipal from './components/FormPrincipal';
import FormExperiencias from './components/FormExperiencias';
import FormFormacao from './components/FormFormacao';

// Criamos um componente interno apenas para consumir o loading/mensagem do contexto
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

// O page principal apenas renderiza o Provider em volta do Container
export default function EditarCadastro() {
  return (
    <CadastroProvider>
      <ContainerCadastro />
    </CadastroProvider>
  );
}