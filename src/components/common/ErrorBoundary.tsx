// src/components/common/ErrorBoundary.tsx
import  { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  // Este método é chamado quando um erro é capturado por um componente filho
  public static getDerivedStateFromError(_: Error): State {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback
    return { hasError: true, error: _, errorInfo: null };
  }

  // Este método é chamado após um erro ser capturado por um componente descendente
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    // Você também pode logar o erro em um serviço de relatórios de erros aqui
    this.setState({ error: error, errorInfo: errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#ff4d4f', border: '1px solid #ff4d4f', borderRadius: '8px', margin: '20px auto', maxWidth: '600px', backgroundColor: '#fff0f0' }}>
          <h2 style={{ color: '#ff4d4f' }}>Ops! Algo deu errado.</h2>
          <p>Não se preocupe, estamos trabalhando para resolver isso.</p>
          {this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', marginTop: '20px', borderTop: '1px solid #ffccc7', paddingTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#ff4d4f' }}>Detalhes do erro (apenas em desenvolvimento)</summary>
              <p>{this.state.error.toString()}</p>
              <p>O componente que falhou foi: {this.state.errorInfo?.componentStack}</p>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;