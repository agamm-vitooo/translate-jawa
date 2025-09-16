import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AksaraPage from "./pages/Aksara-Jawa";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aksara" element={<AksaraPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
