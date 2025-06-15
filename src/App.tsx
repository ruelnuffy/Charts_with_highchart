// app.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FuturisticLogin from './login';
import Dashboard from './screens/dashboard';
import SciChartSalesDashboard from './screens/sciChart';
import ChartJSSalesDashboard from './screens/ChartJSSalesDashboard.tsx';
import D3JSSalesDashboard from './screens/dthreecharrt';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FuturisticLogin />} />
        <Route path="/screens/dashboard" element={<Dashboard />} />
        <Route path="/screens/sciChart" element={<SciChartSalesDashboard />} />
        <Route path="/screens/ChartJSSalesDashboard" element={<ChartJSSalesDashboard/>} />
        <Route path="/screens/dthreecharrt" element={<D3JSSalesDashboard />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </Router>
  );
};

export default App;
