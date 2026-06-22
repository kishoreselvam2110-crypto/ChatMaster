"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useCanvasStore } from "@/store/canvasStore";

export function ChatInterface() {
  const setChartData = useCanvasStore((state) => state.setChartData);
  const setCurrentView = useCanvasStore((state) => state.setCurrentView);

  useCopilotAction({
    name: "query_products",
    description: "Generates a table of products based on a query",
    parameters: [
      {
        name: "products",
        type: "object[]",
        description: "The list of products to display",
      },
    ],
    render: ({ args, status }) => {
      // Set to render mode for table generation
      if (status !== "complete") {
        return <div className="text-sm text-neutral-400 animate-pulse">Querying database...</div>;
      }
      return (
        <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800 my-4 shadow-xl">
          <h3 className="text-white font-medium mb-3">Product Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-400 uppercase bg-neutral-950/50">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {args.products?.map((p: any, i: number) => (
                  <tr key={i} className="border-b border-neutral-800">
                    <td className="px-4 py-2">{p.name || p.product_name}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2">${p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },
  });

  useCopilotAction({
    name: "generate_form",
    description: "Generates an interactive form for data entry",
    parameters: [
      {
        name: "fields",
        type: "object[]",
        description: "List of fields for the form",
      },
    ],
    render: ({ args, status }) => {
      if (status !== "complete") return <div>Designing form...</div>;
      return (
        <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
          <h4 className="font-medium text-blue-400 mb-2">Dynamic Form</h4>
          {args.fields?.map((f: any, i: number) => (
            <div key={i} className="mb-2">
              <label className="block text-xs text-neutral-400">{f.label}</label>
              <input type={f.type || 'text'} className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-sm mt-1" />
            </div>
          ))}
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm w-full mt-2 transition-colors">Submit</button>
        </div>
      );
    },
  });

  return null; // This component handles actions invisibly, UI is rendered by CopilotKit's CopilotSidebar or custom UI
}
