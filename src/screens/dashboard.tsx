import { useEffect, useRef, useState } from 'react';
import { Bell, Search, User, Home, BarChart3, PieChart, TrendingUp, DollarSign, ShoppingCart, Target } from 'lucide-react';

declare global {
  interface Window {
    Highcharts: any;
  }
}

const SalesDashboard = () => {
  const monthlySalesRef = useRef<HTMLDivElement>(null);
  const categoryBreakdownRef = useRef<HTMLDivElement>(null);
  const salesTrendRef = useRef<HTMLDivElement>(null);
  const performanceGaugeRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Check if Highcharts is already loaded
    if (window.Highcharts && window.Highcharts.chart) {
      setScriptsLoaded(true);
      return;
    }

    const scriptUrls = [
      'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/highcharts.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/highcharts-more.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/modules/solid-gauge.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/modules/exporting.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/modules/export-data.min.js'
    ];

    let loadedCount = 0;
    const totalScripts = scriptUrls.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalScripts) {
        setScriptsLoaded(true);
      }
    };

    scriptUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;
      script.async = false;
      script.onload = checkAllLoaded;
      script.onerror = () => console.error(`Failed to load script: ${url}`);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup not needed as scripts are global
    };
  }, []);

  useEffect(() => {
    if (scriptsLoaded && monthlySalesRef.current) {
      initializeCharts();
    }
  }, [scriptsLoaded]);

  const initializeCharts = () => {
    if (!window.Highcharts) return;

    // Advanced Monthly Sales Multi-Bar Chart
    const chart = window.Highcharts.chart(monthlySalesRef.current, {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        height: 450
      },
      title: {
        text: 'Advanced Monthly Sales Analysis',
        style: { color: '#374151', fontSize: '20px', fontWeight: '700' }
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            enabled: false
          }
        },
        filename: 'monthly-sales-analysis'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { color: '#6B7280', fontWeight: '500' } },
        crosshair: {
          width: 1,
          color: '#E5E7EB',
          dashStyle: 'Dash'
        }
      },
      yAxis: [{
        title: { 
          text: 'Sales Revenue ($)', 
          style: { color: '#6B7280', fontWeight: '600' } 
        },
        labels: { 
          style: { color: '#6B7280' },
          formatter: function(this: any): string {
            return '$' + (this.value / 1000) + 'K';
          }
        },
        gridLineColor: '#F3F4F6'
      }, {
        title: {
          text: 'Units & Conversion Rate',
          style: { color: '#6B7280', fontWeight: '600' }
        },
        labels: {
          style: { color: '#6B7280' }
        },
        opposite: true,
        gridLineWidth: 0
      }],
      series: [{
        name: '2024 Actual Sales',
        type: 'column',
        yAxis: 0,
        data: [45000, 52000, 48000, 61000, 55000, 67000, 72000, 69000, 78000, 83000, 91000, 95000],
        color: '#3B82F6',
        borderRadius: 4,
        pointWidth: 20,
        groupPadding: 0.1,
        shadow: {
          color: 'rgba(59, 130, 246, 0.3)',
          width: 3,
          offsetX: 0,
          offsetY: 2
        }
      }, {
        name: '2024 Target',
        type: 'column',
        yAxis: 0,
        data: [50000, 50000, 55000, 55000, 60000, 60000, 65000, 70000, 75000, 80000, 85000, 90000],
        color: '#F59E0B',
        borderRadius: 4,
        pointWidth: 15,
        opacity: 0.7
      }, {
        name: '2023 Actual Sales',
        type: 'column',
        yAxis: 0,
        data: [38000, 44000, 41000, 55000, 48000, 58000, 62000, 59000, 65000, 70000, 75000, 78000],
        color: '#E5E7EB',
        borderRadius: 4,
        pointWidth: 18
      }, {
        name: 'Online Sales',
        type: 'column',
        yAxis: 0,
        data: [27000, 31200, 28800, 36600, 33000, 40200, 43200, 41400, 46800, 49800, 54600, 57000],
        color: '#10B981',
        borderRadius: 4,
        pointWidth: 12,
        opacity: 0.8
      }, {
        name: 'Retail Sales',
        type: 'column',
        yAxis: 0,
        data: [18000, 20800, 19200, 24400, 22000, 26800, 28800, 27600, 31200, 33200, 36400, 38000],
        color: '#8B5CF6',
        borderRadius: 4,
        pointWidth: 12,
        opacity: 0.8
      }, {
        name: 'Units Sold (000s)',
        type: 'spline',
        yAxis: 1,
        data: [0.9, 1.04, 0.96, 1.22, 1.1, 1.34, 1.44, 1.38, 1.56, 1.66, 1.82, 1.9],
        color: '#EF4444',
        lineWidth: 3,
        marker: {
          radius: 5,
          fillColor: '#EF4444',
          lineColor: '#FFFFFF',
          lineWidth: 2
        },
        tooltip: {
          valueSuffix: 'K units'
        }
      }, {
        name: 'Conversion Rate %',
        type: 'spline',
        yAxis: 1,
        data: [2.1, 2.3, 2.0, 2.8, 2.5, 3.1, 3.4, 3.2, 3.8, 4.1, 4.5, 4.7],
        color: '#F97316',
        lineWidth: 3,
        dashStyle: 'ShortDot',
        marker: {
          radius: 4,
          fillColor: '#F97316',
          lineColor: '#FFFFFF',
          lineWidth: 2,
          symbol: 'diamond'
        },
        tooltip: {
          valueSuffix: '%'
        }
      }],
      legend: { 
        itemStyle: { 
          color: '#6B7280',
          fontWeight: '500'
        },
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        padding: 12,
        shadow: true
      },
      tooltip: {
        shared: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 8,
        style: {
          color: '#FFFFFF'
        },
        formatter: function(this: any): string {
          let tooltip: string = '<b>' + this.x + '</b><br/>';
          if (this.points) {
            this.points.forEach(function(point: any) {
              if (point.series.name.includes('Sales') || point.series.name.includes('Target')) {
                tooltip += '<span style="color:' + point.color + '">\u25CF</span> ' + 
                           point.series.name + ': <b>$' + point.y!.toLocaleString() + '</b><br/>';
              } else if (point.series.name === 'Units Sold (000s)') {
                tooltip += '<span style="color:' + point.color + '">\u25CF</span> ' + 
                           point.series.name + ': <b>' + point.y + 'K units</b><br/>';
              } else if (point.series.name === 'Conversion Rate %') {
                tooltip += '<span style="color:' + point.color + '">\u25CF</span> ' + 
                           point.series.name + ': <b>' + point.y + '%</b><br/>';
              }
            });
          }
          return tooltip;
        }
      },
      plotOptions: {
        column: {
          borderRadius: 4,
          borderWidth: 0,
          grouping: true,
          shadow: false,
          animation: {
            duration: 1000
          },
          dataLabels: {
            enabled: true,
            inside: false,
            crop: false,
            overflow: 'none',
            rotation: -90,
            align: 'center',
            verticalAlign: 'top',
            y: -10,
            style: {
              color: '#374151',
              fontSize: '10px',
              fontWeight: '600',
              textOutline: 'none'
            },
            formatter: function(this: any) {
              if (this.series.name.includes('Sales') || this.series.name.includes('Target')) {
                return '$' + (this.y / 1000) + 'K';
              }
              return null;
            }
          }
        },
        spline: {
          animation: {
            duration: 1500
          },
          dataLabels: {
            enabled: true,
            style: {
              color: '#374151',
              fontSize: '10px',
              fontWeight: '600',
              textOutline: '1px contrast'
            },
            formatter: function(this: any): string {
              if (this.series.name === 'Units Sold (000s)') {
                return this.y + 'K';
              } else if (this.series.name === 'Conversion Rate %') {
                return this.y + '%';
              }
              return '';
            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      },
      credits: { enabled: false }
    });

    setChartInstance(chart);

    // Sales by Category Pie Chart
    window.Highcharts.chart(categoryBreakdownRef.current, {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Sales by Product Category',
        style: { color: '#374151', fontSize: '18px', fontWeight: '600' }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: ${point.y:,.0f}<br/>({point.percentage:.1f}%)',
            style: {
              color: '#374151'
            }
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Sales',
        colorByPoint: true,
        data: [
          { name: 'Electronics', y: 285000, color: '#3B82F6' },
          { name: 'Clothing', y: 195000, color: '#10B981' },
          { name: 'Home & Garden', y: 145000, color: '#F59E0B' },
          { name: 'Sports', y: 98000, color: '#EF4444' },
          { name: 'Books', y: 67000, color: '#8B5CF6' }
        ]
      }],
      legend: {
        itemStyle: { color: '#6B7280' }
      },
      credits: { enabled: false }
    });

    // Sales Trend Line Chart
    window.Highcharts.chart(salesTrendRef.current, {
      chart: {
        type: 'line',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Weekly Sales Trend (Last 12 Weeks)',
        style: { color: '#374151', fontSize: '18px', fontWeight: '600' }
      },
      xAxis: {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
        labels: { style: { color: '#6B7280' } }
      },
      yAxis: {
        title: { text: 'Sales ($)', style: { color: '#6B7280' } },
        labels: { 
          style: { color: '#6B7280' },
          formatter: function(this:any) {
            return '$' + (this.value / 1000) + 'K';
          }
        }
      },
      series: [{
        name: 'Sales',
        data: [18500, 22000, 19800, 25200, 28900, 24100, 31200, 29800, 33500, 35900, 32100, 38200],
        color: '#10B981',
        lineWidth: 3,
        marker: {
          radius: 6,
          fillColor: '#10B981'
        }
      }, {
        name: 'Target',
        data: [20000, 20000, 20000, 25000, 25000, 25000, 30000, 30000, 30000, 35000, 35000, 35000],
        color: '#F59E0B',
        lineWidth: 2,
        dashStyle: 'Dash',
        marker: {
          enabled: false
        }
      }],
      legend: { 
        itemStyle: { color: '#6B7280' }
      },
      tooltip: {
        formatter: function(this: any): string {
          return '<b>' + this.x + '</b><br/>' +
                 this.series.name + ': $' + this.y.toLocaleString();
        }
      },
      credits: { enabled: false }
    });

    // Sales Target Achievement Gauge
    window.Highcharts.chart(performanceGaugeRef.current, {
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Sales Target Achievement',
        style: { color: '#374151', fontSize: '18px', fontWeight: '600' }
      },
      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      exporting: { enabled: false },
      tooltip: { enabled: false },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#EF4444'], // Red
          [0.5, '#F59E0B'], // Yellow
          [0.9, '#10B981']  // Green
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70
        },
        labels: {
          y : 16,
          formatter: function(this: any): string {
            return this.value + '%';
          }
        }
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      series: [{
        name: 'Achievement',
        data: [87],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:30px;color:#374151;font-weight:bold">{y}%</span><br/><span style="font-size:14px;color:#6B7280">Target Achieved</span></div>'
        }
      }],
      credits: { enabled: false }
    });
  };
const handleDownload = (type: string) => {
  if (chartInstance) {
    chartInstance.exportChart({
      type: type,
      filename: 'monthly-sales-analysis',
      url: 'https://export.highcharts.com/',
      headers: {
        'User-Agent': 'Mozilla/5.0', // Add user agent
        'Referer': window.location.href // Add referer
      }
    });
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
                      <a href="./dashboard" style={{...styles.navLink, ...styles.navLinkActive}}>
                         <Home style={styles.navIcon} />
                         High Charts
                       </a>
                       <a href="./sciChart" style={styles.navLink}>
                         <BarChart3 style={styles.navIcon} />
                         Sci Charts
                       </a>
                       <a href="./ChartJSSalesDashboard" style={{...styles.navLink, }}>
                         <PieChart style={styles.navIcon} />
                         ChartJs
                       </a>
                       <a href="./dthreecharrt" style={styles.navLink}>
                         <TrendingUp style={styles.navIcon} />
                         D3js Charts
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
              <h2 style={styles.headerTitle}>Sales Performance Dashboard</h2>
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
                  <p style={styles.statsLabel}>Total Revenue (YTD)</p>
                  <p style={styles.statsValue}>$790,000</p>
                  <p style={styles.statsChangePositive}>+18.2% vs last year</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#dcfce7'}}>
                  <DollarSign style={{...styles.iconBase, color: '#16a34a'}} />
                </div>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Units Sold</p>
                  <p style={styles.statsValue}>15,247</p>
                  <p style={styles.statsChangePositive}>+12.4% vs last year</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#dbeafe'}}>
                  <ShoppingCart style={{...styles.iconBase, color: '#2563eb'}} />
                </div>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Average Order Value</p>
                  <p style={styles.statsValue}>$52</p>
                  <p style={styles.statsChangePositive}>+5.1% vs last year</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#fed7aa'}}>
                  <BarChart3 style={{...styles.iconBase, color: '#ea580c'}} />
                </div>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Sales Target Progress</p>
                  <p style={styles.statsValue}>87%</p>
                  <p style={styles.statsChangePositive}>On track for Q4</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#e9d5ff'}}>
                  <Target style={{...styles.iconBase, color: '#9333ea'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div style={{ ...styles.chartCard, gridColumn: 'span 2' }}>
            <div ref={monthlySalesRef} style={styles.chart}></div>
            
            {/* Color Legend */}
            <div style={styles.colorLegend}>
              <div style={styles.colorLegendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: '#3B82F6' }}></div>
                <span style={styles.label}>2024 Actual Sales</span>
              </div>
              <div style={styles.colorLegendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: '#F59E0B' }}></div>
                <span style={styles.label}>2024 Target</span>
              </div>
              <div style={styles.colorLegendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: '#E5E7EB' }}></div>
                <span style={styles.label}>2023 Actual Sales</span>
              </div>
              <div style={styles.colorLegendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: '#10B981' }}></div>
                <span style={styles.label}>Online Sales</span>
              </div>
              <div style={styles.colorLegendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: '#8B5CF6' }}></div>
                <span style={styles.label}>Retail Sales</span>
              </div>
              <div style={styles.colorLegendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: '#EF4444' }}></div>
                <span style={styles.label}>Units Sold (000s)</span>
              </div>
              <div style={styles.colorLegendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: '#F97316' }}></div>
                <span style={styles.label}>Conversion Rate %</span>
              </div>
            </div>

            <div style={styles.downloadButtonsContainer}>
              <button 
                style={styles.downloadButton} 
                onClick={() => handleDownload('image/png')}
                disabled={!chartInstance}
              >
                Download PNG
              </button>
              <button 
                style={styles.downloadButton} 
                onClick={() => handleDownload('image/jpeg')}
                disabled={!chartInstance}
              >
                Download JPEG
              </button>
              <button 
                style={styles.downloadButton} 
                onClick={() => handleDownload('application/pdf')}
                disabled={!chartInstance}
              >
                Download PDF
              </button>
              <button 
                style={styles.downloadButton} 
                onClick={() => handleDownload('image/svg+xml')}
                disabled={!chartInstance}
              >
                Download SVG
              </button>
            </div>
          </div>

          {/* Other charts */}
          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <div ref={categoryBreakdownRef} style={styles.chart}></div>
            </div>
            <div style={styles.chartCard}>
              <div ref={salesTrendRef} style={styles.chart}></div>
            </div>
            <div style={styles.chartCard}>
              <div ref={performanceGaugeRef} style={styles.chart}></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
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
    flexDirection: 'column' as React.CSSProperties['flexDirection']
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
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
    gridColumn: 'span 2'
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
    color: '#111827',
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
    gap: '24px',
    gridColumn: 'span 2'
  },
  chartCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e7eb'
  },
  chart: {
    height: '350px'
  },
  downloadButtonsContainer: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start'
  },
  downloadButton: {
    padding: '8px 12px',
    backgroundColor: '#3B82F6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px',
    ':hover': {
      backgroundColor: '#2563EB'
    }
  }, 
  colorLegend: {
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  colorLegendItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  colorBox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    marginRight: '10px',
  },
  label: {
    color: '#374151',
    fontSize: '14px'
  }
};

export default SalesDashboard;