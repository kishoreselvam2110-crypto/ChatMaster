import { create } from 'zustand';

interface CanvasState {
  currentView: string;
  chartData: any[];
  setChartData: (data: any[]) => void;
  setCurrentView: (view: string) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  currentView: 'dashboard',
  chartData: [
    { x: 1, y: 400 },
    { x: 2, y: 300 },
    { x: 3, y: 600 },
    { x: 4, y: 800 },
  ],
  setChartData: (data) => set({ chartData: data }),
  setCurrentView: (view) => set({ currentView: view }),
}));
