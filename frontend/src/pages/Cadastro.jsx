import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Cadastro() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/livros')
      .then(res => res.json())
      .then(data => console.log('Livros existentes:', data))
      .catch(err => console.error('Erro ao buscar livros:', err));
  }, []);

  const onSubmit = data => {
    fetch(import.meta.env.VITE_API_URL + '/api/livros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao cadastrar livro');
      return res.json();
    })
    .then(() => navigate('/'))
    .catch(err => console.error('Erro ao cadastrar livro:', err));
  };

  return (
    <>
        <h1>Cadastro de livro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Título" {...register('titulo')} required />
            <input placeholder="Gênero" {...register('genero')} required />
            <textarea placeholder="Sinopse" {...register('sinopse')} required />
            <select {...register('estado')} required>
                <option value="">Selecione o estado</option>
                <option value="NOVO">Novo</option>
                <option value="USADO_BOM">Usado - Bom</option>
                <option value="USADO_EXCELENTE">Usado - Excelente</option>
                <option value="RECONDICIONADO">Recondicionado</option>
            </select>
            <select {...register('status')} required>
                <option value="">Selecione o status</option>
                <option value={true}>Disponível</option>
                <option value={false}>Indisponível</option>
            </select>
            <input type="number" placeholder="Preço" {...register('preco')} required />
            <button type="submit">Cadastrar</button>
        </form>
        <Link to="/">Voltar para listagem</Link>
    </>
  );
}
