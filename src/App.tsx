// app.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FuturisticLogin from './login';
import Dashboard from './screens/dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FuturisticLogin />} />
        <Route path="/screens/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
