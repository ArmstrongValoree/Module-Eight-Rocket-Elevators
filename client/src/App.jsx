import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AgentManagement from './pages/AgentManagement';
import TransactionManagement from './pages/TransactionManagement';
import AlertDemo from './pages/AlertDemo';
import ModalDemo from './pages/ModalDemo';
import Login from './pages/Login';  

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<AgentManagement />} />
        <Route path="/transactions" element={<TransactionManagement />} />
        <Route path="/alerts" element={<AlertDemo />} />
        <Route path="/modals" element={<ModalDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
