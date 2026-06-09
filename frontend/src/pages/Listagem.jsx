import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Listagem() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/livros')
      .then(res => res.json())
      .then(data => setLivros(data))
      .catch(err => console.error('Erro ao buscar livros:', err));
  }, []);
  
  return (
    <>
    <h1>Listagem de livros</h1>
    <Link to="/cadastro">
      <button>Adicionar</button>
    </Link>

    <table>
      <thead>
        <tr>
          <th>Nome do livro</th>
          <th>Gênero</th>
          <th>Autor</th>
          <th>Estado</th>
          <th>Status</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        {livros.map(livro => (
          <tr key={livro.id}>
            <td>{livro.titulo}</td>
            <td>{livro.genero}</td>
            <td>{livro.autor}</td>
            <td>{livro.estado}</td>
            <td>{livro.status ? 'Disponível' : 'Indisponível'}</td>
            <td>R$ {Number(livro.preco).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    </>
  );
}