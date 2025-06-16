// app.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FuturisticLogin from './login';
import HighChartsDashboard from './screens/HighChartsDashboard';
import SciChartSalesDashboard from './screens/SciChartSalesDashboard';
import ChartJSSalesDashboard from './screens/ChartJSSalesDashboard.tsx';
import D3JSSalesDashboard from './screens/D3JSSalesDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FuturisticLogin />} />
        <Route path="/screens/HighChartsDashboard" element={<HighChartsDashboard />} />
        <Route path="/screens/SciChartSalesDashboard" element={<SciChartSalesDashboard />} />
        <Route path="/screens/ChartJSSalesDashboard" element={<ChartJSSalesDashboard/>} />
        <Route path="/screens/D3JSSalesDashboard" element={<D3JSSalesDashboard />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </Router>
  );
};

export default App;
