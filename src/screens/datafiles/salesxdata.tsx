// salesData.tsx - External data file for Sales Dashboard

// Type definitions
export interface EnhancedSalesDataPoint {
  hour: number;
  sales: number;
  target: number;
  projected: number;
  conversions: number;
  revenue: number;
  customers: number;
}

export interface MonthlyDataPoint {
  month: string;
  revenue: number;
  target: number;
  growth: number;
}

export interface ScatterDataPoint {
  salesVolume: number;
  profitMargin: number;
  size: number;
}

export interface HeatmapDataPoint {
  category: number;
  month: number;
  value: number;
  categoryName: string;
  monthName: string;
}

export interface StatsDataItem {
  label: string;
  value: string;
  change: string;
  color: string;
  bgColor: string;
}

export interface StatsData {
  liveSalesRate: StatsDataItem;
  activeCustomers: StatsDataItem;
  conversionRate: StatsDataItem;
  topProductROI: StatsDataItem;
}

export interface ChartViewOption {
  value: string;
  label: string;
}

export interface HeatmapConstants {
  categories: string[];
  months: string[];
  cellSize: number;
}

// Function to generate enhanced sales data for the first chart
export const generateEnhancedSalesData = (): EnhancedSalesDataPoint[] => {
  const baseData = Array.from({ length: 24 }, (_, i): EnhancedSalesDataPoint => ({
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

// Monthly data for revenue breakdown chart
export const monthlyData: MonthlyDataPoint[] = [
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

// Scatter plot data generator
export const generateScatterData = (): ScatterDataPoint[] => {
  return Array.from({ length: 15 }, (): ScatterDataPoint => ({
    salesVolume: Math.random() * 1000 + 100,
    profitMargin: Math.random() * 30 + 10,
    size: Math.random() * 20 + 10,
  }));
};

// Heatmap data generator
export const generateHeatmapData = (): HeatmapDataPoint[] => {
  const categories: string[] = ["Electronics", "Clothing", "Books", "Home", "Sports"];
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const data: HeatmapDataPoint[] = [];

  categories.forEach((category: string, catIndex: number) => {
    months.forEach((month: string, monthIndex: number) => {
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

// Constants for heatmap
export const heatmapConstants: HeatmapConstants = {
  categories: ["Electronics", "Clothing", "Books", "Home", "Sports"],
  months: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
  cellSize: 30,
};

// Color utility for heatmap
export const getHeatmapColor = (value: number): string => {
  const intensity: number = value / 100;
  if (intensity < 0.2) return "#440154";
  if (intensity < 0.4) return "#31688e";
  if (intensity < 0.6) return "#35b779";
  if (intensity < 0.8) return "#fde725";
  return "#ffffff";
};

// Stats data for the key metrics cards
export const statsData: StatsData = {
  liveSalesRate: {
    label: "Live Sales Rate",
    value: "$1,247/hr",
    change: "+8.3% vs yesterday",
    color: "#16a34a",
    bgColor: "#dcfce7",
  },
  activeCustomers: {
    label: "Active Customers",
    value: "2,847",
    change: "+15.2% vs last week",
    color: "#2563eb",
    bgColor: "#dbeafe",
  },
  conversionRate: {
    label: "Conversion Rate",
    value: "4.7%",
    change: "+0.8% improvement",
    color: "#ea580c",
    bgColor: "#fed7aa",
  },
  topProductROI: {
    label: "Top Product ROI",
    value: "342%",
    change: "Electronics leading",
    color: "#9333ea",
    bgColor: "#e9d5ff",
  },
};

// Available metrics for chart toggle
export const availableMetrics: string[] = [
  "sales",
  "target", 
  "projected", 
  "conversions", 
  "revenue"
];

// Chart view options
export const chartViewOptions: ChartViewOption[] = [
  { value: "grouped", label: "Grouped Bars" },
  { value: "stacked", label: "Stacked Bars" },
];

// Default selected metrics
export const defaultSelectedMetrics: string[] = ["sales", "target", "projected"];