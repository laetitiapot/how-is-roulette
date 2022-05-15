import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WipPage from "./pages/WipPage";
import AskCat from "./pages/AskCat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AskCat />} />
          <Route path="/search" element={<WipPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
