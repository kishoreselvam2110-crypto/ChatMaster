"use client";

import { useCanvasStore } from "@/store/canvasStore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

export function DynamicCanvas() {
  const chartData = useCanvasStore((state) => state.chartData);
  const currentView = useCanvasStore((state) => state.currentView);

  return (
    <div className="h-full w-full flex flex-col p-6 bg-neutral-950/80 backdrop-blur-md rounded-2xl border border-neutral-800/50 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500"></div>
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          Analytics Dashboard
        </h2>
        <div className="flex space-x-2">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Live Sync</span>
        </div>
      </div>

      <div className="flex-grow min-h-0 bg-neutral-900/50 rounded-xl p-4 border border-neutral-800/50">
        <ResponsiveContainer width="100%" height="100%">
          {currentView === 'forecast' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="x" stroke="#888" tick={{fill: '#888'}} />
              <YAxis stroke="#888" tick={{fill: '#888'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={{fill: '#8b5cf6', r: 4}} activeDot={{r: 6}} />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="x" stroke="#888" tick={{fill: '#888'}} />
              <YAxis stroke="#888" tick={{fill: '#888'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                cursor={{fill: '#262626'}}
              />
              <Bar dataKey="y" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
