import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AgentManagement from './pages/AgentManagement';
import TransactionManagement from './pages/TransactionManagement';
import AlertDemo from './pages/AlertDemo';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<AgentManagement />} />
        <Route path="/transactions" element={<TransactionManagement />} />
        <Route path="/alerts" element={<AlertDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
