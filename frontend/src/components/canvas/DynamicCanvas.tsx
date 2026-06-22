"use client";

import { useCanvasStore } from "@/store/canvasStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

/* ─── Metric Card ─── */
function MetricCard({
  label,
  value,
  change,
  trend,
  icon,
  color,
  index,
}: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string;
  color: string;
  index: number;
}) {
  return (
    <div
      className="glass-card glass-card-hover p-5 relative overflow-hidden animate-slide-up opacity-0"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20"
        style={{ background: color }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-1">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                trend === "up"
                  ? "text-emerald-400 bg-emerald-400/10"
                  : trend === "down"
                  ? "text-rose-400 bg-rose-400/10"
                  : "text-slate-400 bg-slate-400/10"
              }`}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
            </span>
          </div>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

/* ─── Custom Tooltip ─── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 !border-[var(--border-glow)] text-xs">
      <p className="text-[var(--text-secondary)] font-medium mb-1.5">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[var(--text-muted)]">{entry.name}:</span>
          <span className="font-semibold">
            {entry.name === "revenue" || entry.name === "profit"
              ? `$${entry.value.toLocaleString()}`
              : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Activity Item ─── */
function ActivityItem({
  action,
  item,
  time,
  type,
}: {
  action: string;
  item: string;
  time: string;
  type: "add" | "update" | "remove";
}) {
  const colors = { add: "#34d399", update: "#818cf8", remove: "#fb7185" };
  const icons = { add: "+", update: "↻", remove: "×" };
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
        style={{ background: `${colors[type]}15`, color: colors[type] }}
      >
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">
          <span className="text-[var(--text-secondary)]">{action}</span>{" "}
          <span className="font-medium">{item}</span>
        </p>
      </div>
      <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{time}</span>
    </div>
  );
}

/* ─── Inventory Row ─── */
function InventoryRow({
  item,
  index,
}: {
  item: { id: string; product_name: string; category: string; price: number; stock_quantity: number };
  index: number;
}) {
  const stockColor =
    item.stock_quantity > 50
      ? "text-emerald-400"
      : item.stock_quantity > 20
      ? "text-amber-400"
      : "text-rose-400";

  return (
    <div
      className="grid grid-cols-4 gap-4 py-3 px-4 text-sm border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors animate-fade-in opacity-0"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }}
    >
      <span className="font-medium truncate">{item.product_name}</span>
      <span className="text-[var(--text-secondary)]">{item.category}</span>
      <span className="font-mono">${item.price.toFixed(2)}</span>
      <span className={`font-semibold ${stockColor}`}>{item.stock_quantity}</span>
    </div>
  );
}

/* ─── Main Canvas ─── */
export function DynamicCanvas() {
  const { currentView, setCurrentView, metrics, chartData, inventory, recentActivity } =
    useCanvasStore();

  const views: { key: typeof currentView; label: string }[] = [
    { key: "dashboard", label: "Overview" },
    { key: "inventory", label: "Inventory" },
    { key: "analytics", label: "Analytics" },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-5">
      {/* ── Header ── */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-gradient">ChatMaster</span>{" "}
            <span className="text-[var(--text-secondary)] font-normal">Dashboard</span>
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            AI-powered inventory analytics &amp; multi-agent orchestration
          </p>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => setCurrentView(v.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentView === v.key
                  ? "bg-[var(--accent-indigo)] text-white shadow-lg shadow-indigo-500/20"
                  : "text-[var(--text-muted)] hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      {currentView === "dashboard" && (
        <div className="flex-1 flex flex-col gap-5 overflow-auto">
          {/* Metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <MetricCard key={m.label} {...m} index={i} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
            {/* Area chart */}
            <div className="glass-card p-5 lg:col-span-2 flex flex-col animate-slide-up delay-300 opacity-0" style={{ animationFillMode: "forwards" }}>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                Revenue &amp; Profit Trend
              </h3>
              <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={2} fill="url(#colorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Activity feed */}
            <div className="glass-card p-5 flex flex-col animate-slide-up delay-400 opacity-0" style={{ animationFillMode: "forwards" }}>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
                Recent Activity
              </h3>
              <div className="flex-1 overflow-auto">
                {recentActivity.map((a, i) => (
                  <ActivityItem key={i} {...a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === "inventory" && (
        <div className="flex-1 flex flex-col glass-card overflow-hidden animate-fade-in">
          {/* Table header */}
          <div className="grid grid-cols-4 gap-4 py-3 px-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider border-b border-white/[0.06] bg-white/[0.02]">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
          </div>
          <div className="flex-1 overflow-auto">
            {inventory.map((item, i) => (
              <InventoryRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      )}

      {currentView === "analytics" && (
        <div className="flex-1 flex flex-col gap-4 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
            {/* Bar chart */}
            <div className="glass-card p-5 flex flex-col animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                Orders by Month
              </h3>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="orders" fill="#818cf8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue bar */}
            <div className="glass-card p-5 flex flex-col animate-slide-up delay-200 opacity-0" style={{ animationFillMode: "forwards" }}>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                Revenue vs Profit
              </h3>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="#a78bfa" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="profit" fill="#34d399" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
