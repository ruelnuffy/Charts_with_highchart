import { useState } from "react";
import {
  Bell,
  Search,
  User,
  Home,
  BarChart3,
  PieChart,
  TrendingUp,
  Target,
  Download,

  RefreshCw,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const SciChartSalesDashboard = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([
    "sales",
    "target",
    "projected",
  ]);
  const [chartView, setChartView] = useState("grouped");

  // Enhanced multi-dimensional data for the first chart
  const generateEnhancedSalesData = () => {
    const baseData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      sales: 1000 + Math.sin(i * 0.5) * 400 + Math.random() * 200,
      target: 1200 + Math.sin(i * 0.3) * 100,
      projected: 1100 + Math.sin(i * 0.4) * 300 + Math.random() * 150,
      conversions: 80 + Math.sin(i * 0.6) * 30 + Math.random() * 20,
      revenue: (1000 + Math.sin(i * 0.5) * 400 + Math.random() * 200) * 1.2,
      customers: Math.floor(50 + Math.sin(i * 0.4) * 20 + Math.random() * 15),
    }));
    return baseData;
  };

  const [salesData, setSalesData] = useState(generateEnhancedSalesData());

  // Sample data for other charts
  const monthlyData = [
    { month: "Jan", revenue: 45, target: 50, growth: 42 },
    { month: "Feb", revenue: 52, target: 55, growth: 48 },
    { month: "Mar", revenue: 48, target: 52, growth: 45 },
    { month: "Apr", revenue: 61, target: 58, growth: 59 },
    { month: "May", revenue: 55, target: 60, growth: 52 },
    { month: "Jun", revenue: 67, target: 65, growth: 64 },
    { month: "Jul", revenue: 72, target: 70, growth: 69 },
    { month: "Aug", revenue: 69, target: 72, growth: 66 },
    { month: "Sep", revenue: 78, target: 75, growth: 75 },
    { month: "Oct", revenue: 83, target: 80, growth: 81 },
    { month: "Nov", revenue: 91, target: 85, growth: 88 },
    { month: "Dec", revenue: 95, target: 90, growth: 92 },
  ];

  const scatterData = Array.from({ length: 15 }, () => ({
    salesVolume: Math.random() * 1000 + 100,
    profitMargin: Math.random() * 30 + 10,
    size: Math.random() * 20 + 10,
  }));

  // Heatmap functionality
  type HeatmapDataItem = {
    category: number;
    month: number;
    value: number;
    categoryName: string;
    monthName: string;
  };

  const generateHeatmapData = () => {
    const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const data: HeatmapDataItem[] = [];

    categories.forEach((category, catIndex) => {
      months.forEach((month, monthIndex) => {
        data.push({
          category: catIndex,
          month: monthIndex,
          value:
            Math.sin(catIndex * 0.5) * Math.cos(monthIndex * 0.3) * 50 +
            50 +
            Math.random() * 20,
          categoryName: category,
          monthName: month,
        });
      });
    });

    return data;
  };

  const heatmapData = generateHeatmapData();

  interface HeatmapChartProps {
    data: HeatmapDataItem[];
  }

  const HeatmapChart = ({ data }: HeatmapChartProps) => {
    const cellSize = 30;
    const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const getColor = (value: number): string => {
      const intensity = value / 100;
      if (intensity < 0.2) return "#440154";
      if (intensity < 0.4) return "#31688e";
      if (intensity < 0.6) return "#35b779";
      if (intensity < 0.8) return "#fde725";
      return "#ffffff";
    };

    return (
      <svg width="400" height="200" style={{ overflow: "visible" }}>
        {categories.map((cat: string, i: number) => (
          <text
            key={i}
            x={-10}
            y={i * cellSize + cellSize / 2 + 5}
            textAnchor="end"
            fontSize={10}
            fill="#6B7280"
          >
            {cat}
          </text>
        ))}

        {months.map((month: string, i: number) => (
          <text
            key={i}
            x={i * cellSize + cellSize / 2}
            y={-5}
            textAnchor="middle"
            fontSize={10}
            fill="#6B7280"
          >
            {month}
          </text>
        ))}

        {data.map((item: HeatmapDataItem, index: number) => (
          <rect
            key={index}
            x={item.month * cellSize}
            y={item.category * cellSize}
            width={cellSize - 1}
            height={cellSize - 1}
            fill={getColor(item.value)}
            stroke="#fff"
            strokeWidth={1}
          >
            <title>{`${item.categoryName} - ${
              item.monthName
            }: ${item.value.toFixed(1)}`}</title>
          </rect>
        ))}
      </svg>
    );
  };

  // Chart action handlers
  const handleRefreshData = () => {
    setSalesData(generateEnhancedSalesData());
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(salesData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sales-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  const styles = {
    container: {
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundColor: "#f9fafb",
      display: "flex",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    sidebar: {
      width: "256px",
      backgroundColor: "#ffffff",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    sidebarHeader: {
      padding: "24px",
    },
    sidebarTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1f2937",
      margin: 0,
    },
    nav: {
      marginTop: "24px",
    },
    navItems: {
      padding: "0 16px",
      display: "flex",
      flexDirection: "column" as "column",
      gap: "8px",
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: "8px",
      textDecoration: "none",
      color: "#4b5563",
      transition: "background-color 0.2s",
      cursor: "pointer",
    },
    navLinkActive: {
      backgroundColor: "#eff6ff",
      color: "#1d4ed8",
    },
    navIcon: {
      width: "20px",
      height: "20px",
      marginRight: "12px",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as "column",
    },
    header: {
      backgroundColor: "#ffffff",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      borderBottom: "1px solid #e5e7eb",
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1f2937",
      margin: 0,
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    searchContainer: {
      position: "relative" as "relative",
    },
    searchIcon: {
      position: "absolute" as "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "16px",
      height: "16px",
      color: "#9ca3af",
    },
    searchInput: {
      paddingLeft: "40px",
      paddingRight: "16px",
      paddingTop: "8px",
      paddingBottom: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      outline: "none",
      fontSize: "14px",
    },
    notificationButton: {
      padding: "8px",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      position: "relative" as "relative",
    },
    bellIcon: {
      width: "20px",
      height: "20px",
      color: "#4b5563",
    },
    notificationBadge: {
      position: "absolute" as "absolute",
      top: -4,
      right: -4,
      width: 12,
      height: 12,
      backgroundColor: "#ef4444",
      borderRadius: "50%",
    },
    userButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    userIcon: {
      width: "20px",
      height: "20px",
      color: "#4b5563",
    },
    userName: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
    },
    main: {
      flex: 1,
      padding: "24px",
      display: "flex",
      flexDirection: "column" as "column",
      gap: "24px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
    },
    statsCard: {
      backgroundColor: "#ffffff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      border: "1px solid #e5e7eb",
    },
    statsCardContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statsLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#4b5563",
      margin: "0 0 4px 0",
    },
    statsValue: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      margin: "0 0 4px 0",
    },
    statsChangePositive: {
      fontSize: "14px",
      color: "#059669",
      margin: 0,
    },
    statsIcon: {
      padding: "12px",
      borderRadius: "50%",
    },
    iconBase: {
      width: "24px",
      height: "24px",
    },
    chartsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "24px",
    },
    chartCard: {
      backgroundColor: "#ffffff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      border: "1px solid #e5e7eb",
    },
    chartTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1f2937",
      margin: "0 0 16px 0",
    },
    chart: {
      height: "350px",
      width: "100%",
    },
    chartDescription: {
      marginTop: "12px",
      padding: "12px",
      backgroundColor: "#f9fafb",
      borderRadius: "6px",
    },
    chartControls: {
      display: "flex",
      gap: "12px",
      marginBottom: "16px",
      flexWrap: "wrap" as "wrap",
      alignItems: "center",
    },
    controlButton: {
      padding: "8px 16px",
      backgroundColor: "#f3f4f6",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.2s",
    },
    controlButtonActive: {
      backgroundColor: "#3b82f6",
      color: "white",
      borderColor: "#3b82f6",
    },
    metricToggle: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap" as "wrap",
      marginBottom: "16px",
    },
    metricButton: {
      padding: "4px 12px",
      fontSize: "12px",
      borderRadius: "4px",
      border: "1px solid #d1d5db",
      cursor: "pointer",
      transition: "all 0.2s",
      backgroundColor: "#ffffff",
    },
    metricButtonActive: {
      backgroundColor: "#10b981",
      color: "white",
      borderColor: "#10b981",
    },
    featuresPanel: {
      backgroundColor: "#ffffff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      border: "1px solid #e5e7eb",
    },
    featuresPanelTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#1f2937",
      margin: "0 0 20px 0",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },
    featureCard: {
      padding: "20px",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      textAlign: "center" as "center",
    },
    featureIcon: {
      width: "32px",
      height: "32px",
      color: "#3b82f6",
      marginBottom: "12px",
    },
    featureTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1f2937",
      margin: "0 0 8px 0",
    },
    featureDescription: {
      fontSize: "14px",
      color: "#6b7280",
      margin: 0,
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.sidebarTitle}>Sales Dashboard</h1>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItems}>
            <a href="./HighChartsDashboard">
            <div style={styles.navLink}>
              <Home style={styles.navIcon} />
              High Charts
            </div>
            </a>
            <a href="./SciChartSalesDashboard">
            <div style={{ ...styles.navLink, ...styles.navLinkActive }}>
              <BarChart3 style={styles.navIcon} />
              Sci Charts
            </div>
            </a>
            <a href="./ChartJSSalesDashboard">
            <div style={{ ...styles.navLink, ...styles.navLink }}>
              <PieChart style={styles.navIcon} />
              Chart.js
            </div>
            </a>
            <a href="./D3JSSalesDashboard">
            <div style={styles.navLink}>
              <TrendingUp style={styles.navIcon} />
              D3js Charts
            </div>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Bar */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <h2 style={styles.headerTitle}>Analytics Dashboard (Recharts)</h2>
            </div>

            <div style={styles.headerRight}>
              <div style={styles.searchContainer}>
                <Search style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search..."
                  style={styles.searchInput}
                />
              </div>
              <button style={styles.notificationButton}>
                <Bell style={styles.bellIcon} />
                <span style={styles.notificationBadge}></span>
              </button>
              <button style={styles.userButton}>
                <User style={styles.userIcon} />
                <span style={styles.userName}>Sales Manager</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={styles.main}>
          {/* Key Metrics Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Live Sales Rate</p>
                  <p style={styles.statsValue}>$1,247/hr</p>
                  <p style={styles.statsChangePositive}>+8.3% vs yesterday</p>
                </div>
                <div
                  style={{ ...styles.statsIcon, backgroundColor: "#dcfce7" }}
                >
                  <TrendingUp
                    style={{ ...styles.iconBase, color: "#16a34a" }}
                  />
                </div>
              </div>
            </div>

            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Active Customers</p>
                  <p style={styles.statsValue}>2,847</p>
                  <p style={styles.statsChangePositive}>+15.2% vs last week</p>
                </div>
                <div
                  style={{ ...styles.statsIcon, backgroundColor: "#dbeafe" }}
                >
                  <User style={{ ...styles.iconBase, color: "#2563eb" }} />
                </div>
              </div>
            </div>

            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Conversion Rate</p>
                  <p style={styles.statsValue}>4.7%</p>
                  <p style={styles.statsChangePositive}>+0.8% improvement</p>
                </div>
                <div
                  style={{ ...styles.statsIcon, backgroundColor: "#fed7aa" }}
                >
                  <BarChart3 style={{ ...styles.iconBase, color: "#ea580c" }} />
                </div>
              </div>
            </div>

            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Top Product ROI</p>
                  <p style={styles.statsValue}>342%</p>
                  <p style={styles.statsChangePositive}>Electronics leading</p>
                </div>
                <div
                  style={{ ...styles.statsIcon, backgroundColor: "#e9d5ff" }}
                >
                  <Target style={{ ...styles.iconBase, color: "#9333ea" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          {/* Full-width Multi-Dimensional Sales Performance Chart */}
          <div
            style={{
              ...styles.chartCard,
              marginBottom: 24,
              gridColumn: "1 / -1",
            }}
          >
            <h3 style={styles.chartTitle}>
              Multi-Dimensional Sales Performance
            </h3>

            {/* Chart Controls */}
            <div style={styles.chartControls}>
              <button style={styles.controlButton} onClick={handleRefreshData}>
                <RefreshCw size={16} />
                Refresh Data
              </button>

              <button style={styles.controlButton} onClick={handleExportData}>
                <Download size={16} />
                Export
              </button>

              <select
                value={chartView}
                onChange={(e) => setChartView(e.target.value)}
                style={styles.controlButton}
              >
                <option value="grouped">Grouped Bars</option>
                <option value="stacked">Stacked Bars</option>
              </select>
            </div>

            {/* Metric Toggle Buttons */}
            <div style={styles.metricToggle}>
              {["sales", "target", "projected", "conversions", "revenue"].map(
                (metric) => (
                  <button
                    key={metric}
                    style={{
                      ...styles.metricButton,
                      ...(selectedMetrics.includes(metric)
                        ? styles.metricButtonActive
                        : {}),
                    }}
                    onClick={() => handleMetricToggle(metric)}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                )
              )}
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />

                {selectedMetrics.includes("sales") && (
                  <Bar
                    dataKey="sales"
                    fill="#3B82F6"
                    name="Actual Sales"
                    radius={[2, 2, 0, 0]}
                  />
                )}

                {selectedMetrics.includes("target") && (
                  <Bar
                    dataKey="target"
                    fill="#F59E0B"
                    name="Target"
                    radius={[2, 2, 0, 0]}
                  />
                )}

                {selectedMetrics.includes("projected") && (
                  <Bar
                    dataKey="projected"
                    fill="#10B981"
                    name="Projected"
                    radius={[2, 2, 0, 0]}
                  />
                )}

                {selectedMetrics.includes("conversions") && (
                  <Bar
                    dataKey="conversions"
                    fill="#8B5CF6"
                    name="Conversions"
                    radius={[2, 2, 0, 0]}
                  />
                )}

                {selectedMetrics.includes("revenue") && (
                  <Bar
                    dataKey="revenue"
                    fill="#EF4444"
                    name="Revenue"
                    radius={[2, 2, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>

            <div style={styles.chartDescription}>
              <p>
                Interactive multi-bar chart showing sales performance across
                multiple dimensions. Toggle metrics on/off and refresh data in
                real-time. Click export to download the current dataset.
              </p>
            </div>
          </div>

          <div
            style={{
              ...styles.chartCard,
              marginBottom: 24,
              gridColumn: "1 / -1",
            }}
          >
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Monthly Revenue Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                  <Bar dataKey="target" fill="#F59E0B" name="Target" />
                  <Bar dataKey="growth" fill="#3B82F6" name="Growth" />
                </BarChart>
              </ResponsiveContainer>
              <div style={styles.chartDescription}>
                <p>
                  Monthly revenue performance showing revenue, targets, and
                  growth metrics side by side.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Product Performance Heatmap</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <HeatmapChart data={heatmapData} />
              </div>
              <div style={styles.chartDescription}>
                <p>
                  Performance intensity across product categories and months.
                  Darker colors indicate higher performance.
                </p>
              </div>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Sales vs Profit Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="salesVolume" name="Sales Volume" />
                  <YAxis dataKey="profitMargin" name="Profit Margin %" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Products"
                    dataKey="profitMargin"
                    fill="#3B82F6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
              <div style={styles.chartDescription}>
                <p>
                  Scatter plot showing relationship between sales volume and
                  profit margins across different products.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SciChartSalesDashboard;
