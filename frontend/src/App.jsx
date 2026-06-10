import { Route, Routes } from "react-router";
import Listagem from "./pages/Listagem";
import Cadastro from "./pages/Cadastro";

export default function App() {
  return (
    console.log('API URL:', import.meta.env.VITE_API_URL),
    <>
      <Routes>
        <Route path="/" element={<Listagem />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </>
  );
}