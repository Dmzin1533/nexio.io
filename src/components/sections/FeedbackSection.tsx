'use client';

import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface FormData {
  name: string;
  comment: string;
}

const FeedbackSection = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', comment: '' });
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  // Carregar comentários ao montar o componente
  useEffect(() => {
    fetchComments();
  }, []);

  // Buscar comentários da API
  const fetchComments = async () => {
    try {
      setIsLoadingComments(true);
      const response = await fetch('/api/comments');
      const data = await response.json();
      
      if (data.success) {
        setComments(data.data);
      } else {
        console.error('Erro ao carregar comentários:', data.error);
      }
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Manipular mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enviar comentário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name.trim() || !formData.comment.trim()) {
      setMessage({ type: 'error', text: 'Por favor, preencha todos os campos.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ name: '', comment: '' }); // Limpar formulário
        fetchComments(); // Recarregar comentários
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao enviar comentário. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section id="feedback" className="py-20" style={{ backgroundColor: 'var(--section-bg)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Deixe seu Feedback
          </h2>
          <p className="text-lg" style={{ color: 'var(--foreground)', opacity: '0.8' }}>
            Sua opinião é muito importante para nós. Compartilhe sua experiência!
          </p>
        </div>

        {/* Formulário */}
        <div className="rounded-lg p-6 mb-12" style={{ 
          backgroundColor: 'var(--background)', 
          border: '1px solid var(--border)',
          boxShadow: '0 4px 6px -1px var(--shadow-light), 0 2px 4px -1px var(--shadow-light)'
        }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                  focusRingColor: 'var(--accent)'
                }}
                placeholder="Seu nome"
                maxLength={100}
                required
              />
            </div>

            {/* Campo Comentário */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Comentário
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:border-transparent resize-vertical transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                  focusRingColor: 'var(--accent)'
                }}
                placeholder="Compartilhe sua opinião sobre a Nexio..."
                maxLength={1000}
                required
              />
              <p className="text-sm mt-1" style={{ color: 'var(--foreground)', opacity: '0.6' }}>
                {formData.comment.length}/1000 caracteres
              </p>
            </div>

            {/* Mensagem de feedback */}
            {message && (
              <div className="p-4 rounded-lg border" style={{
                backgroundColor: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: message.type === 'success' ? '#16a34a' : '#dc2626',
                borderColor: message.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'
              }}>
                {message.text}
              </div>
            )}

            {/* Botão Enviar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: isLoading ? 'var(--accent)' : 'var(--foreground)',
                color: isLoading ? 'var(--foreground)' : 'var(--background)',
                opacity: isLoading ? '0.6' : '1',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.opacity = '1';
                }
              }}
            >
              {isLoading ? 'Enviando...' : 'Enviar Comentário'}
            </button>
          </form>
        </div>

        {/* Lista de Comentários */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
            Comentários da Comunidade
          </h3>
          
          {isLoadingComments ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--accent)' }}></div>
              <p className="mt-2" style={{ color: 'var(--foreground)', opacity: '0.7' }}>Carregando comentários...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <p style={{ color: 'var(--foreground)', opacity: '0.7' }}>Ainda não há comentários. Seja o primeiro a deixar sua opinião!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id} className="rounded-lg p-6 border-l-4" style={{ 
                  backgroundColor: 'var(--background)', 
                  border: '1px solid var(--border-light)',
                  borderLeftColor: 'var(--accent)',
                  borderLeftWidth: '4px',
                  boxShadow: '0 2px 4px -1px var(--shadow-light)'
                }}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                      {comment.name}
                    </h4>
                    <span className="text-sm" style={{ color: 'var(--foreground)', opacity: '0.6' }}>
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="leading-relaxed" style={{ color: 'var(--foreground)', opacity: '0.9' }}>
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;