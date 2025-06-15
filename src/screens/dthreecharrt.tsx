import React, { useEffect, useRef, useState } from 'react';
import { Bell, Search, User, Home, BarChart3, PieChart, TrendingUp, Target } from 'lucide-react';
import * as d3 from 'd3';

const D3JSSalesDashboard: React.FC = () => {
  const lineChartRef = useRef<HTMLDivElement | null>(null);
  const stackedBarChartRef = useRef<HTMLDivElement | null>(null);
  const radialChartRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Sample data
  const timeSeriesData = Array.from({ length: 100 }, (_, i) => ({
    date: new Date(2023, 0, i + 1),
    value: 50 + Math.sin(i / 5) * 30 + Math.random() * 20,
    trend: 50 + Math.sin(i / 5) * 30
  }));

  const categoryData = [
    { category: 'Electronics', q1: 400, q2: 300, q3: 200, q4: 500 },
    { category: 'Clothing', q1: 300, q2: 500, q3: 400, q4: 600 },
    { category: 'Home', q1: 200, q2: 100, q3: 300, q4: 400 },
    { category: 'Sports', q1: 100, q2: 200, q3: 100, q4: 300 },
    { category: 'Books', q1: 50, q2: 150, q3: 250, q4: 200 }
  ];

  const radialData = [
    { name: 'Revenue', current: 85, target: 90 },
    { name: 'Profit', current: 72, target: 80 },
    { name: 'Growth', current: 88, target: 85 },
    { name: 'Market', current: 91, target: 95 },
    { name: 'Satisfaction', current: 79, target: 85 },
    { name: 'Retention', current: 83, target: 90 }
  ];

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (lineChartRef.current) {
        setDimensions({
          width: lineChartRef.current.offsetWidth,
          height: 500
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    // Clear previous charts
    d3.select(lineChartRef.current).selectAll('*').remove();
    d3.select(stackedBarChartRef.current).selectAll('*').remove();
    d3.select(radialChartRef.current).selectAll('*').remove();

    // Create charts
    createTimeSeriesChart();
    createStackedBarChart();
    createRadialBarChart();
  }, [dimensions]);

  const createTimeSeriesChart = () => {
    if (!lineChartRef.current) return;

    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = d3.select(lineChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleTime()
      .domain(d3.extent(timeSeriesData, d => d.date) as [Date, Date])
      .range([0, width]);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(timeSeriesData, d => d.value) as number + 20])
      .range([height, 0]);

    // Area generator
    const area = d3.area<{ date: Date; value: number; trend: number }>()
      .x(d => x(d.date))
      .y0(d => y(d.trend))
      .y1(d => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Line generator
    const line = d3.line<{ date: Date; trend: number }>()
      .x(d => x(d.date))
      .y(d => y(d.trend))
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Add area
    svg.append('path')
      .datum(timeSeriesData)
      .attr('fill', 'rgba(59, 130, 246, 0.2)')
      .attr('stroke', 'none')
      .attr('d', area);

    // Add line
    svg.append('path')
      .datum(timeSeriesData)
      .attr('fill', 'none')
      .attr('stroke', 'rgb(59, 130, 246)')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add circles for data points
    svg.selectAll('.dot')
      .data(timeSeriesData.filter((_, i) => i % 10 === 0))
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', 'rgb(59, 130, 246)');

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b %Y') as any));

    svg.append('g')
      .call(d3.axisLeft(y));

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat('' as any));

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Time Series with Trend Line');
  };

  const createStackedBarChart = () => {
    if (!stackedBarChartRef.current) return;

    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = d3.select(stackedBarChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Stack the data
    const stack = d3.stack()
      .keys(['q1', 'q2', 'q3', 'q4'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(categoryData as any);

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(['q1', 'q2', 'q3', 'q4'])
      .range(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

    // X scale
    const x = d3.scaleBand()
      .domain(categoryData.map(d => d.category))
      .range([0, width])
      .padding(0.2);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(stackedData, layer => d3.max(layer, d => d[1])) as number])
      .range([height, 0]);

    // Create bars
    svg.selectAll('.category')
      .data(stackedData)
      .enter().append('g')
      .attr('class', 'category')
      .attr('fill', d => color(d.key) as string)
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', (d: any) => x(d.data.category) as number)
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .attr('rx', 3)
      .attr('ry', 3);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 200}, -20)`);

    ['Q1', 'Q2', 'Q3', 'Q4'].forEach((label, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(${i * 50}, 0)`);

      legendItem.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(`q${i + 1}`) as string);

      legendItem.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(label)
        .style('font-size', '12px');
    });

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Quarterly Sales by Category (Stacked Bar Chart)');
  };

  const createRadialBarChart = () => {
    if (!radialChartRef.current) return;

    const margin = { top: 30, right: 30, bottom: 50, left: 30 };
    const width = Math.min(dimensions.width, 800) - margin.left - margin.right;
    const height = Math.min(dimensions.width, 800) - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(radialChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(radialData.map(d => d.name))
      .range([0, 2 * Math.PI])
      .padding(0.2);

    // Y scale
    const y = d3.scaleRadial()
      .domain([0, 100])
      .range([0, radius]);

    // Create arc generator with proper typing
    const arcGenerator = d3.arc<any>()
      .innerRadius(0)
      .outerRadius((d: any) => y(d.data.current))
      .startAngle((d: any) => x(d.data.name) as number)
      .endAngle((d: any) => (x(d.data.name) as number) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(radius);

    // Add bars for current values
    svg.append('g')
      .selectAll('path')
      .data(radialData.map(d => ({ data: d })))
      .join('path')
      .attr('fill', '#3b82f6')
      .attr('fill-opacity', 0.8)
      .attr('d', arcGenerator);

    // Create target arc generator
    const targetArcGenerator = d3.arc<any>()
      .innerRadius((d: any) => y(d.data.current) - 2)
      .outerRadius((d: any) => y(d.data.current) + 2)
      .startAngle((d: any) => x(d.data.name) as number)
      .endAngle((d: any) => (x(d.data.name) as number) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(radius);

    // Add bars for target values (as lines)
    svg.append('g')
      .selectAll('path')
      .data(radialData.map(d => ({ data: d })))
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2)
      .attr('d', targetArcGenerator);

    // Add axes
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickValues([20, 40, 60, 80, 100])
        .tickSize(-radius)
        .tickFormat(d => `${d}%`));

    // Add category labels
    svg.append('g')
      .selectAll('g')
      .data(radialData)
      .join('g')
      .attr('text-anchor', d => (x(d.name) as number + x.bandwidth() / 2) < Math.PI ? 'start' : 'end')
      .attr('transform', d => `
        rotate(${((x(d.name) as number + x.bandwidth() / 2) * 180 / Math.PI - 90)})
        translate(${radius + 10},0)
        ${(x(d.name) as number + x.bandwidth() / 2) < Math.PI ? '' : 'rotate(180)'}
      `)
      .append('text')
      .text(d => d.name)
      .attr('transform', d => (x(d.name) as number + x.bandwidth() / 2) < Math.PI ? '' : 'rotate(180)')
      .style('font-size', '12px')
      .attr('alignment-baseline', 'middle');

  
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -radius - 20)
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('');
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
      gridTemplateColumns: 'repeat(1, 1fr)',
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
      height: '500px',
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
            <a href="./dashboard" style={styles.navLink}>
              <Home style={styles.navIcon} />
              High Charts
            </a>
            <a href="./sciChart" style={styles.navLink}>
              <BarChart3 style={styles.navIcon} />
              Sci Charts
            </a>
            <a href="./ChartJSSalesDashboard" style={styles.navLink}>
              <PieChart style={styles.navIcon} />
              ChartJs
            </a>
            <a href="./dthreecharrt" style={{ ...styles.navLink, ...styles.navLinkActive }}>
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
              <h2 style={styles.headerTitle}>Advanced D3.js Analytics Dashboard</h2>
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
                <User style={styles.userIcon} />
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
                <div style={{ ...styles.statsIcon, backgroundColor: '#dcfce7' }}>
                  <TrendingUp style={{ ...styles.iconBase, color: '#16a34a' }} />
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
                <div style={{ ...styles.statsIcon, backgroundColor: '#dbeafe' }}>
                  <BarChart3 style={{ ...styles.iconBase, color: '#2563eb' }} />
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
                <div style={{ ...styles.statsIcon, backgroundColor: '#fed7aa' }}>
                  <Target style={{ ...styles.iconBase, color: '#ea580c' }} />
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
                <div style={{ ...styles.statsIcon, backgroundColor: '#e9d5ff' }}>
                  <PieChart style={{ ...styles.iconBase, color: '#9333ea' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Time Series with Trend Analysis</h3>
              <div ref={lineChartRef} style={styles.chartContainer}></div>
              <div style={styles.chartDescription}>
             
              </div>
            </div>

            <div style={styles.chartCard }>
              <h3 style={styles.chartTitle}>Quarterly Category Performance</h3>
              <div ref={stackedBarChartRef} style={styles.chartContainer}></div>
              <div style={styles.chartDescription}>
           
              </div>
            </div>

            <div style={{...styles.chartCard, height: '1000px'}}>
              <h3 style={styles.chartTitle}>Radial Performance Metrics</h3>
              <div ref={radialChartRef} style={{ ...styles.chartContainer, height: '600px' }}></div>
           
            </div> 
          </div>

        
        </main>
      </div>
    </div>
  );
};

export default D3JSSalesDashboard;