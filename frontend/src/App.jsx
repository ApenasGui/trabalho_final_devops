import { Route, Routes } from "react-router";
import Listagem from "./pages/Listagem";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Listagem />} />
      </Routes>
    </>
  );
}