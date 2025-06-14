import { useEffect, useRef } from 'react';
import { Menu, Bell, Search, User, Home, BarChart3, PieChart, TrendingUp, Settings, Users } from 'lucide-react';

// Add Highcharts to the Window type for TypeScript
declare global {
  interface Window {
    Highcharts: any;
  }
}

const Dashboard = () => {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const areaChartRef = useRef(null);
  const chart3DRef = useRef(null);
  const gaugeChartRef = useRef(null);
  const heatmapRef = useRef(null);
  const bubbleChartRef = useRef(null);
  const polarChartRef = useRef(null);
  const treemapRef = useRef(null);
  const speedometerRef = useRef(null);

  useEffect(() => {
    // Load Highcharts from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/highcharts.min.js';
    
    const script3D = document.createElement('script');
    script3D.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/highcharts-3d.min.js';
    
    const scriptMore = document.createElement('script');
    scriptMore.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/highcharts-more.min.js';
    
    const scriptHeatmap = document.createElement('script');
    scriptHeatmap.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/modules/heatmap.min.js';
    
    const scriptTreemap = document.createElement('script');
    scriptTreemap.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/modules/treemap.min.js';
    
    const scriptGauge = document.createElement('script');
    scriptGauge.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/modules/solid-gauge.min.js';

    let loadedScripts = 0;
    const totalScripts = 6;
    
    const checkAllLoaded = () => {
      loadedScripts++;
      if (loadedScripts === totalScripts) {
        setTimeout(initializeCharts, 100); // Small delay to ensure all modules are ready
      }
    };

    script.onload = checkAllLoaded;
    script3D.onload = checkAllLoaded;
    scriptMore.onload = checkAllLoaded;
    scriptHeatmap.onload = checkAllLoaded;
    scriptTreemap.onload = checkAllLoaded;
    scriptGauge.onload = checkAllLoaded;
    
    document.head.appendChild(script);
    document.head.appendChild(script3D);
    document.head.appendChild(scriptMore);
    document.head.appendChild(scriptHeatmap);
    document.head.appendChild(scriptTreemap);
    document.head.appendChild(scriptGauge);

    return () => {
      try {
        document.head.removeChild(script);
        document.head.removeChild(script3D);
        document.head.removeChild(scriptMore);
        document.head.removeChild(scriptHeatmap);
        document.head.removeChild(scriptTreemap);
        document.head.removeChild(scriptGauge);
      } catch (e) {
        // Scripts may have already been removed
      }
    };
  }, []);

  const initializeCharts = () => {
    if (!window.Highcharts) return;
// Speedometer Chart
window.Highcharts.chart(speedometerRef.current, {
  chart: {
    type: 'gauge',
    alignTicks: false,
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: 0,
    plotShadow: false,
    backgroundColor: 'transparent'
  },
  title: {
    text: 'Data Speed',
    style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
  },
  pane: {
    startAngle: -150,
    endAngle: 150
  },
  yAxis: [{
    min: 0,
    max: 200,
    lineColor: '#3B82F6',
    tickColor: '#3B82F6',
    minorTickColor: '#3B82F6',
    offset: -25,
    lineWidth: 2,
    labels: {
      distance: -20,
      rotation: 'auto',
      style: { color: '#6B7280' }
    },
    tickLength: 5,
    minorTickLength: 5,
    endOnTick: false
  }, {
    min: 0,
    max: 124,
    tickPosition: 'outside',
    lineColor: '#EF4444',
    lineWidth: 2,
    minorTickPosition: 'outside',
    tickColor: '#EF4444',
    minorTickColor: '#EF4444',
    tickLength: 5,
    minorTickLength: 5,
    labels: {
      distance: 12,
      rotation: 'auto',
      style: { color: '#6B7280' }
    },
    offset: -20,
    endOnTick: false
  }],
  series: [{
    name: 'Speed',
    data: [80],
    dataLabels: {
      format: '<span style="color:#3B82F6">{y} km/h</span><br/>' +
        '<span style="color:#EF4444">{(multiply y 0.621):.0f} mph</span>',
      backgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, '#f3f4f6'],
          [1, '#FFF']
        ]
      },
      style: {
        fontWeight: 'bold'
      }
    },
    tooltip: {
      valueSuffix: ' km/h'
    }
  }],
  credits: { enabled: false }
}, function (chart: any) {
  // Animation
  if (!chart.series) return;
  
  setInterval(function () {
    if (chart.axes) { // not destroyed
      const point = chart.series[0].points[0],
        inc = Math.round((Math.random() - 0.5) * 20);
      let newVal;

      newVal = point.y + inc;
      if (newVal < 0 || newVal > 200) {
        newVal = point.y - inc;
      }

      point.update(newVal);
    }
  }, 3000);
});
    // Bar Chart
    window.Highcharts.chart(barChartRef.current, {
      chart: {
        type: 'column',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Monthly Sales',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: { style: { color: '#6B7280' } }
      },
      yAxis: {
        title: { text: 'Sales ($)', style: { color: '#6B7280' } },
        labels: { style: { color: '#6B7280' } }
      },
      series: [{
        name: 'Sales',
        data: [29000, 35000, 42000, 38000, 45000, 52000],
        color: '#3B82F6'
      }],
      legend: { enabled: false },
      credits: { enabled: false }
    });

    // Line Chart
    window.Highcharts.chart(lineChartRef.current, {
      chart: {
        type: 'line',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Website Traffic',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      xAxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: { style: { color: '#6B7280' } }
      },
      yAxis: {
        title: { text: 'Visitors', style: { color: '#6B7280' } },
        labels: { style: { color: '#6B7280' } }
      },
      series: [{
        name: 'Visitors',
        data: [1200, 1450, 1100, 1800, 2200, 1900, 1600],
        color: '#10B981'
      }],
      legend: { enabled: false },
      credits: { enabled: false }
    });

    // 3D Pie Chart
    window.Highcharts.chart(pieChartRef.current, {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: 'Revenue by Category (3D)',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%'
          }
        }
      },
      series: [{
        name: 'Revenue',
        data: [
          { name: 'Products', y: 45, color: '#8B5CF6' },
          { name: 'Services', y: 30, color: '#F59E0B' },
          { name: 'Consulting', y: 15, color: '#EF4444' },
          { name: 'Other', y: 10, color: '#6B7280' }
        ]
      }],
      credits: { enabled: false }
    });

    // Area Chart
    window.Highcharts.chart(areaChartRef.current, {
      chart: {
        type: 'area',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'User Growth',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      xAxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
        labels: { style: { color: '#6B7280' } }
      },
      yAxis: {
        title: { text: 'Users', style: { color: '#6B7280' } },
        labels: { style: { color: '#6B7280' } }
      },
      series: [{
        name: 'New Users',
        data: [500, 750, 1200, 1800],
        color: '#F97316',
        fillOpacity: 0.3
      }, {
        name: 'Returning Users',
        data: [300, 550, 800, 1100],
        color: '#06B6D4',
        fillOpacity: 0.3
      }],
      legend: {
        itemStyle: { color: '#6B7280' }
      },
      credits: { enabled: false }
    });

    // 3D Column Chart
    window.Highcharts.chart(chart3DRef.current, {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
        }
      },
      title: {
        text: 'Sales Performance (3D)',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      xAxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
        labels: { style: { color: '#6B7280' } }
      },
      yAxis: {
        title: { text: 'Revenue ($)', style: { color: '#6B7280' } },
        labels: { style: { color: '#6B7280' } }
      },
      plotOptions: {
        column: {
          depth: 25
        }
      },
      series: [{
        name: 'North America',
        data: [50000, 65000, 70000, 85000],
        color: '#3B82F6'
      }, {
        name: 'Europe',
        data: [40000, 55000, 60000, 75000],
        color: '#10B981'
      }, {
        name: 'Asia',
        data: [30000, 45000, 55000, 70000],
        color: '#F59E0B'
      }],
      credits: { enabled: false }
    });

    // Gauge Chart
    window.Highcharts.chart(gaugeChartRef.current, {
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Performance Score',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
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
          [0.1, '#DF5353'],
          [0.5, '#DDDF0D'],
          [0.9, '#55BF3B']
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70
        },
        labels: {
          y: 16
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
        name: 'Performance',
        data: [87],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:25px;color:#374151">{y}</span><br/><span style="font-size:12px;color:#6B7280">Score</span></div>'
        }
      }],
      credits: { enabled: false }
    });

    // Heatmap
    window.Highcharts.chart(heatmapRef.current, {
      chart: {
        type: 'heatmap',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Activity Heatmap',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      xAxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: { style: { color: '#6B7280' } }
      },
      yAxis: {
        categories: ['Morning', 'Afternoon', 'Evening', 'Night'],
        title: null,
        labels: { style: { color: '#6B7280' } }
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#3B82F6'
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
      series: [{
        name: 'Activity Level',
        borderWidth: 1,
        data: [
          [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24],
          [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117],
          [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64],
          [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19],
          [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117],
          [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6],
          [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98]
        ],
        dataLabels: {
          enabled: true,
          color: '#000000'
        }
      }],
      credits: { enabled: false }
    });


    

    // Bubble Chart
    window.Highcharts.chart(bubbleChartRef.current, {
      chart: {
        type: 'bubble',
        backgroundColor: 'transparent',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      title: {
        text: 'Market Analysis',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      xAxis: {
        gridLineWidth: 1,
        title: { text: 'Market Share (%)' },
        labels: { style: { color: '#6B7280' } }
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: { text: 'Growth Rate (%)' },
        labels: { style: { color: '#6B7280' } }
      },
      series: [{
        name: 'Products',
        data: [
          { x: 95, y: 95, z: 13.8, name: 'Product A' },
          { x: 86.5, y: 102.9, z: 14.7, name: 'Product B' },
          { x: 80.8, y: 91.5, z: 15.8, name: 'Product C' },
          { x: 80.4, y: 102.5, z: 12, name: 'Product D' },
          { x: 80.3, y: 86.1, z: 11.8, name: 'Product E' }
        ],
        color: '#3B82F6'
      }],
      credits: { enabled: false }
    });

    // Polar Chart
    window.Highcharts.chart(polarChartRef.current, {
      chart: {
        polar: true,
        type: 'line',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Skills Radar',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS'],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 10
      },
      series: [{
        name: 'Current Skills',
        data: [8, 7, 9, 6, 8, 5],
        pointPlacement: 'on',
        color: '#10B981'
      }, {
        name: 'Target Skills',
        data: [9, 8, 10, 8, 9, 7],
        pointPlacement: 'on',
        color: '#F59E0B'
      }],
      credits: { enabled: false }
    });

    // Treemap
    window.Highcharts.chart(treemapRef.current, {
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: [{
          name: 'Mobile',
          value: 6,
          colorValue: 1
        }, {
          name: 'Desktop',
          value: 6,
          colorValue: 2
        }, {
          name: 'Tablet',
          value: 4,
          colorValue: 3
        }, {
          name: 'Smart TV',
          value: 3,
          colorValue: 4
        }, {
          name: 'Gaming Console',
          value: 2,
          colorValue: 5
        }, {
          name: 'Wearables',
          value: 1,
          colorValue: 6
        }]
      }],
      colorAxis: {
        minColor: '#E3F2FD',
        maxColor: '#1976D2'
      },
      title: {
        text: 'Device Usage Distribution',
        style: { color: '#374151', fontSize: '16px', fontWeight: '600' }
      },
      chart: {
        backgroundColor: 'transparent'
      },
      credits: { enabled: false }
    });
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.sidebarTitle}>Dashboard</h1>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItems as React.CSSProperties}>
            <a href="#" style={{...styles.navLink, ...styles.navLinkActive}}>
              <Home style={styles.navIcon} />
              Dashboard
            </a>
            <a href="#" style={styles.navLink}>
              <BarChart3 style={styles.navIcon} />
              Analytics
            </a>
            <a href="#" style={styles.navLink}>
              <PieChart style={styles.navIcon} />
              Reports
            </a>
            <a href="#" style={styles.navLink}>
              <TrendingUp style={styles.navIcon} />
              Performance
            </a>
            <a href="#" style={styles.navLink}>
              <Users style={styles.navIcon} />
              Users
            </a>
            <a href="#" style={styles.navLink}>
              <Settings style={styles.navIcon} />
              Settings
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
              <button style={styles.menuButton}>
                <Menu style={styles.menuIcon} />
              </button>
              <h2 style={styles.headerTitle}>Analytics Overview</h2>
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
                <span style={styles.userName}>John Doe</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={styles.main}>
          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Total Revenue</p>
                  <p style={styles.statsValue}>$45,231</p>
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
                  <p style={styles.statsLabel}>Total Users</p>
                  <p style={styles.statsValue}>12,458</p>
                  <p style={styles.statsChangePositive}>+8.2% from last month</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#dbeafe'}}>
                  <Users style={{...styles.iconBase, color: '#2563eb'}} />
                </div>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Orders</p>
                  <p style={styles.statsValue}>2,847</p>
                  <p style={styles.statsChangeNegative}>-3.1% from last month</p>
                </div>
                <div style={{...styles.statsIcon, backgroundColor: '#fed7aa'}}>
                  <BarChart3 style={{...styles.iconBase, color: '#ea580c'}} />
                </div>
              </div>
            </div>
            <div style={styles.chartCard}>
  <div ref={speedometerRef} style={styles.chart}></div>
</div>
            <div style={styles.statsCard}>
              <div style={styles.statsCardContent}>
                <div>
                  <p style={styles.statsLabel}>Conversion Rate</p>
                  <p style={styles.statsValue}>3.24%</p>
                  <p style={styles.statsChangePositive}>+0.5% from last month</p>
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
              <div ref={barChartRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={lineChartRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={pieChartRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={areaChartRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={chart3DRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={gaugeChartRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={heatmapRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={bubbleChartRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={polarChartRef} style={styles.chart}></div>
            </div>
            
            <div style={styles.chartCard}>
              <div ref={treemapRef} style={styles.chart}></div>
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
  menuButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'none'
  },
  menuIcon: {
    width: '20px',
    height: '20px'
  },
  headerTitle: {
    marginLeft: '8px',
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
    padding: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
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
  statsChangeNegative: {
    fontSize: '14px',
    color: '#dc2626',
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
  chart: {
    height: '300px'
  }
};

export default Dashboard;