import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import './App.css';
import Search from './Components/Search';
import { Results } from './Components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/drug/:drugName" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
