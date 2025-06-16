import React, { useEffect, useRef } from 'react';
import { Bell, Search, User, Home, BarChart3, PieChart, TrendingUp, Target } from 'lucide-react';

// Declare Chart as a global variable for TypeScript
declare const Chart: any;

const ChartJSSalesDashboard: React.FC = () => {
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement | null>(null);
  const radarChartRef = useRef<HTMLCanvasElement | null>(null);
  const polarChartRef = useRef<HTMLCanvasElement | null>(null);
  const areaChartRef = useRef<HTMLCanvasElement | null>(null);

  // Sample data
  const salesData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    sales: 1000 + Math.sin(i * 0.5) * 500 + Math.random() * 300,
    target: 1200
  }));

  const monthlyData = [
    { month: 'Jan', revenue: 45, profit: 12, expenses: 33 },
    { month: 'Feb', revenue: 52, profit: 15, expenses: 37 },
    { month: 'Mar', revenue: 48, profit: 11, expenses: 37 },
    { month: 'Apr', revenue: 61, profit: 18, expenses: 43 },
    { month: 'May', revenue: 55, profit: 16, expenses: 39 },
    { month: 'Jun', revenue: 67, profit: 22, expenses: 45 },
    { month: 'Jul', revenue: 72, profit: 25, expenses: 47 },
    { month: 'Aug', revenue: 69, profit: 23, expenses: 46 },
    { month: 'Sep', revenue: 78, profit: 28, expenses: 50 },
    { month: 'Oct', revenue: 83, profit: 31, expenses: 52 },
    { month: 'Nov', revenue: 91, profit: 35, expenses: 56 },
    { month: 'Dec', revenue: 95, profit: 38, expenses: 57 }
  ];

  const productData = [
    { product: 'Electronics', sales: 35 },
    { product: 'Clothing', sales: 25 },
    { product: 'Books', sales: 15 },
    { product: 'Home & Garden', sales: 12 },
    { product: 'Sports', sales: 8 },
    { product: 'Other', sales: 5 }
  ];

  const performanceData = {
    labels: ['Sales', 'Marketing', 'Customer Service', 'Product Quality', 'Delivery', 'Support'],
    datasets: [{
      label: 'Current Performance',
      data: [85, 72, 88, 91, 79, 83],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2
    }, {
      label: 'Target Performance',
      data: [90, 80, 85, 95, 85, 90],
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      borderColor: 'rgb(245, 158, 11)',
      borderWidth: 2
    }]
  };
   useEffect(() => {
     const script = document.createElement('script');
     script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
     
     script.onload = () => {
       // Register Chart.js components
       Chart.Chart.register(
         Chart.CategoryScale,
         Chart.LinearScale,
         Chart.PointElement,
         Chart.LineElement,
         Chart.BarElement,
         Chart.ArcElement,
         Chart.RadialLinearScale,
         Chart.Title,
         Chart.Tooltip,
         Chart.Legend,
         Chart.Filler
       );
       createCharts(); // Call the function to create charts after loading
     };
     script.onerror = () => {
       console.error('Failed to load Chart.js script');
     };
     
     document.head.appendChild(script);
     return () => {
       document.head.removeChild(script);
     };
   }, []);
  const createCharts = () => {
    // Line Chart
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
      new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: salesData.map(d => `${d.hour}:00`),
          datasets: [{
            label: 'Sales ($)',
            data: salesData.map(d => d.sales),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }, {
            label: 'Target ($)',
            data: salesData.map(d => d.target),
            borderColor: 'rgb(245, 158, 11)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderDash: [5, 5],
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          }
        }
      });
    }

    // Bar Chart
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');
      new Chart.Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthlyData.map(d => d.month),
          datasets: [{
            label: 'Revenue',
            data: monthlyData.map(d => d.revenue),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1
          }, {
            label: 'Profit',
            data: monthlyData.map(d => d.profit),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          }, {
            label: 'Expenses',
            data: monthlyData.map(d => d.expenses),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }

    // Doughnut Chart
    if (doughnutChartRef.current) {
      const ctx = doughnutChartRef.current.getContext('2d');
      new Chart.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: productData.map(d => d.product),
          datasets: [{
            data: productData.map(d => d.sales),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(147, 51, 234, 0.8)',
              'rgba(107, 114, 128, 0.8)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
              'rgb(147, 51, 234)',
              'rgb(107, 114, 128)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            }
          }
        }
      });
    }

    // Radar Chart
    if (radarChartRef.current) {
      const ctx = radarChartRef.current.getContext('2d');
      new Chart.Chart(ctx, {
        type: 'radar',
        data: performanceData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }

    // Polar Area Chart
    if (polarChartRef.current) {
      const ctx = polarChartRef.current.getContext('2d');
      new Chart.Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            data: [72, 85, 78, 92],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }

    // Area Chart
    if (areaChartRef.current) {
      const ctx = areaChartRef.current.getContext('2d');
      new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: monthlyData.map(d => d.month),
          datasets: [{
            label: 'Total Revenue',
            data: monthlyData.map(d => d.revenue),
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.3)',
            fill: true,
            tension: 0.4
          }, {
            label: 'Net Profit',
            data: monthlyData.map(d => d.profit),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              stacked: false,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: '#f9fafb',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    sidebar: {
      width: '256px',
      backgroundColor: '#ffffff',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    sidebarHeader: {
      padding: '24px'
    },
    sidebarTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    nav: {
      marginTop: '24px'
    },
    navItems: {
      padding: '0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '8px',
      textDecoration: 'none',
      color: '#4b5563',
      transition: 'background-color 0.2s',
      cursor: 'pointer'
    },
    navLinkActive: {
      backgroundColor: '#eff6ff',
      color: '#1d4ed8'
    },
    navIcon: {
      width: '20px',
      height: '20px',
      marginRight: '12px'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #e5e7eb'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    searchContainer: {
      position: 'relative' as 'relative'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
      color: '#9ca3af'
    },
    searchInput: {
      paddingLeft: '40px',
      paddingRight: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '14px'
    },
    notificationButton: {
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      position: 'relative' as 'relative'
    },
    bellIcon: {
      width: '20px',
      height: '20px',
      color: '#4b5563'
    },
    notificationBadge: {
      position: 'absolute' as 'absolute',
      top: '-4px',
      right: '-4px',
      width: '12px',
      height: '12px',
      backgroundColor: '#ef4444',
      borderRadius: '50%'
    },
    userButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    userIcon: {
      width: '20px',
      height: '20px',
      color: '#4b5563'
    },
    userName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    main: {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px'
    },
    statsCard: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    },
    statsCardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statsLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#4b5563',
      margin: '0 0 4px 0'
    },
    statsValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111 827',
      margin: '0 0 4px 0'
    },
    statsChangePositive: {
      fontSize: '14px',
      color: '#059669',
      margin: 0
    },
    statsIcon: {
      padding: '12px',
      borderRadius: '50%'
    },
    iconBase: {
      width: '24px',
      height: '24px'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px'
    },
    chartCard: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 16px 0'
    },
    chartContainer: {
      height: '350px',
      width: '100%',
      position: 'relative' as 'relative'
    },
    chartDescription: {
      marginTop: '12px',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px'
    },
    featuresPanel: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    },
    featuresPanelTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 20px 0'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    featureCard: {
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      textAlign: 'center'
    },
    featureIcon: {
      width: '32px',
      height: '32px',
      color: '#3b82f6',
      marginBottom: '12px'
    },
    featureTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    featureDescription: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0,
      lineHeight: '1.5'
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.sidebarTitle}>Sales Dashboard</h1>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItems as React.CSSProperties}>
            <a href="./HighChartsDashboard" style={styles.navLink}>
              <Home style={styles.navIcon} />
              High Charts
            </a>
            <a href="./SciChartSalesDashboard" style={styles.navLink}>
              <BarChart3 style={styles.navIcon} />
              Sci Charts
            </a>
            <a href="./ChartJSSalesDashboard" style={{...styles.navLink, ...styles.navLinkActive}}>
              <PieChart style={styles.navIcon} />
              ChartJs
            </a>
            <a href="./D3JSSalesDashboard" style={styles.navLink}>
              <TrendingUp style={styles.navIcon} />
              D3js Charts
            </a>
            
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent as React.CSSProperties}>
        {/* Top Bar */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <h2 style={styles.headerTitle}>Analytics Dashboard (Chart.js)</h2>
            </div>
            
            <div style={styles.headerRight}>
              <div style={styles.searchContainer}>
                <Search style={styles.searchIcon as React.CSSProperties} />
                <input
                  type="text"
                  placeholder="Search..."
                  style={styles.searchInput}
                />
              </div>
              <button style={styles.notificationButton as React.CSSProperties}>
                <Bell style={styles.bellIcon} />
                <span style={styles.notificationBadge}></span>
              </button>
              <button style={styles.userButton}>
                <User  style={styles.userIcon} />
                <span style={styles.userName}>Sales Manager</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={styles.main as React.CSSProperties}>
          {/* Key Metrics Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Total Revenue</p>
                  <p style={styles.statsValue}>$847K</p>
                  <p style={styles.statsChangePositive}>+12.5% from last month</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#dcfce7'}}>
                  <TrendingUp style={{...styles.iconBase, color: '#16a34a'}} />
                </div>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Average Order Value</p>
                  <p style={styles.statsValue}>$156</p>
                  <p style={styles.statsChangePositive}>+5.3% increase</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#dbeafe'}}>
                  <BarChart3 style={{...styles.iconBase, color: '#2563eb'}} />
                </div>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Customer Satisfaction</p>
                  <p style={styles.statsValue}>94.2%</p>
                  <p style={styles.statsChangePositive}>Excellent rating</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#fed7aa'}}>
                  <Target style={{...styles.iconBase, color: '#ea580c'}} />
                </div>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Market Share</p>
                  <p style={styles.statsValue}>23.7%</p>
                  <p style={styles.statsChangePositive}>Growing steadily</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#e9d5ff'}}>
                  <PieChart style={{...styles.iconBase, color: '#9333ea'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Real-time Sales & Targets</h3>
              <div style={styles.chartContainer}>
                <canvas ref={lineChartRef}></canvas>
              </div>
              <div style={styles.chartDescription}>
                <p>Hourly sales performance with target comparison. The filled area shows actual sales trends.</p>
              </div>
            </div>
            
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Financial Overview</h3>
              <div style={styles.chartContainer}>
                <canvas ref={barChartRef}></canvas>
              </div>
              <div style={styles.chartDescription}>
                <p>Monthly breakdown of revenue, profit, and expenses showing business performance trends.</p>
              </div>
            </div>
          </div>

          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Product Category Distribution</h3>
              <div style={styles.chartContainer}>
                <canvas ref={doughnutChartRef}></canvas>
              </div>
              <div style={styles.chartDescription}>
                <p>Sales distribution across product categories. Electronics leads with 35% market share.</p>
              </div>
            </div>
            
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Performance Radar</h3>
              <div style={styles.chartContainer}>
                <canvas ref={radarChartRef}></canvas>
              </div>
              <div style={styles.chartDescription}>
                <p>Multi-dimensional performance analysis comparing current metrics against targets.</p>
              </div>
            </div>
          </div>

          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Quarterly Performance</h3>
              <div style={styles.chartContainer}>
                <canvas ref={polarChartRef}></canvas>
              </div>
              <div style={styles.chartDescription}>
                <p>Polar area chart showing quarterly performance metrics with Q4 showing strongest results.</p>
              </div>
            </div>
            
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Revenue & Profit Trends</h3>
              <div style={styles.chartContainer}>
                <canvas ref={areaChartRef}></canvas>
              </div>
              <div style={styles.chartDescription}>
                <p>Area chart visualization of revenue and profit trends over the past 12 months.</p>
              </div>
            </div>
          </div>

         
        </main>
      </div>
    </div>
  );
};

export default ChartJSSalesDashboard;
