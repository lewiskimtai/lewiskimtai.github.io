import React from "react";

const CycleWidget: React.FC<{
  phases: { name: string; status: string }[];
  onUpdatePhase: (index: number, status: string) => void;
}> = ({ phases, onUpdatePhase }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">SDLC Phases</h3>
      <div className="space-y-2">
        {phases.map((phase, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full mr-2 ${
                  phase.status === "done"
                    ? "bg-green-500"
                    : phase.status === "in-progress"
                    ? "bg-yellow-500"
                    : "bg-gray-300"
                }`}
              ></div>
              <span>{phase.name}</span>
            </div>
            <select
              value={phase.status}
              onChange={(e) => onUpdatePhase(idx, e.target.value)}
              className="p-1 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CycleWidget;
