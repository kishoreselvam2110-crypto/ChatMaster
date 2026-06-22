import { create } from "zustand";

/* ─── Types ─── */
export interface InventoryItem {
  id: string;
  product_name: string;
  category: string;
  price: number;
  stock_quantity: number;
}

export interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  orders: number;
  profit: number;
}

export type ViewMode = "dashboard" | "inventory" | "analytics";

/* ─── Store ─── */
interface CanvasState {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;

  metrics: MetricCard[];
  chartData: ChartDataPoint[];
  inventory: InventoryItem[];
  recentActivity: { action: string; item: string; time: string; type: "add" | "update" | "remove" }[];

  setChartData: (data: ChartDataPoint[]) => void;
  setInventory: (items: InventoryItem[]) => void;
}

const defaultMetrics: MetricCard[] = [
  { label: "Total Revenue", value: "$48,352", change: "+12.5%", trend: "up", icon: "💰", color: "#818cf8" },
  { label: "Active Orders", value: "1,248", change: "+8.2%", trend: "up", icon: "📦", color: "#22d3ee" },
  { label: "Inventory Items", value: "3,847", change: "-2.1%", trend: "down", icon: "📊", color: "#fb7185" },
  { label: "Agents Online", value: "7", change: "+3", trend: "up", icon: "🤖", color: "#34d399" },
];

const defaultChartData: ChartDataPoint[] = [
  { name: "Jan", revenue: 4200, orders: 240, profit: 1800 },
  { name: "Feb", revenue: 3800, orders: 198, profit: 1540 },
  { name: "Mar", revenue: 5100, orders: 310, profit: 2200 },
  { name: "Apr", revenue: 4700, orders: 280, profit: 2050 },
  { name: "May", revenue: 6300, orders: 420, profit: 2900 },
  { name: "Jun", revenue: 5800, orders: 380, profit: 2650 },
  { name: "Jul", revenue: 7200, orders: 510, profit: 3400 },
  { name: "Aug", revenue: 6900, orders: 475, profit: 3100 },
];

const defaultInventory: InventoryItem[] = [
  { id: "1", product_name: "Quantum Keyboard", category: "Electronics", price: 129.99, stock_quantity: 45 },
  { id: "2", product_name: "Ergonomic Mouse", category: "Electronics", price: 59.99, stock_quantity: 120 },
  { id: "3", product_name: "Standing Desk", category: "Furniture", price: 499.0, stock_quantity: 15 },
  { id: "4", product_name: "Ultra Monitor 4K", category: "Electronics", price: 899.99, stock_quantity: 32 },
  { id: "5", product_name: "Wireless Headset", category: "Audio", price: 249.99, stock_quantity: 78 },
  { id: "6", product_name: "Mesh Chair Pro", category: "Furniture", price: 649.0, stock_quantity: 22 },
];

const defaultActivity = [
  { action: "Added", item: "Quantum Keyboard ×10", time: "2 min ago", type: "add" as const },
  { action: "Updated", item: "Standing Desk price", time: "8 min ago", type: "update" as const },
  { action: "Removed", item: "Old Monitor Stock", time: "15 min ago", type: "remove" as const },
  { action: "Added", item: "Wireless Headset ×25", time: "32 min ago", type: "add" as const },
  { action: "Updated", item: "Ergonomic Mouse qty", time: "1 hr ago", type: "update" as const },
];

export const useCanvasStore = create<CanvasState>((set) => ({
  currentView: "dashboard",
  setCurrentView: (view) => set({ currentView: view }),

  metrics: defaultMetrics,
  chartData: defaultChartData,
  inventory: defaultInventory,
  recentActivity: defaultActivity,

  setChartData: (data) => set({ chartData: data }),
  setInventory: (items) => set({ inventory: items }),
}));
