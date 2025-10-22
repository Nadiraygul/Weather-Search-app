import { Routes, Route, Link } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {
  return (
    <>
    
    
      <nav>
        <Link to="/">Ana Sayfa</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
