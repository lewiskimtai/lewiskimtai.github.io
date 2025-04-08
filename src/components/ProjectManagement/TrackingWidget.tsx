import React, { useState } from "react";

const TrackingWidget: React.FC<{
  tasks: {
    id: number;
    name: string;
    phase: string;
    progress: number;
    due: string;
  }[];
  meetings: { id: number; title: string; date: string; zoomLink: string }[];
  onAddTask: (task: any) => void;
  onUpdateTask: (id: number, progress: number) => void;
  onAddMeeting: (meeting: any) => void;
}> = ({ tasks, meetings, onAddTask, onUpdateTask, onAddMeeting }) => {
  const [newTask, setNewTask] = useState({
    name: "",
    phase: "Design",
    due: "",
  });
  const [newMeeting, setNewMeeting] = useState({ title: "", date: "" });

  const handleAddTask = () => {
    onAddTask({
      id: tasks.length + 1,
      name: newTask.name,
      phase: newTask.phase,
      progress: 0,
      due: newTask.due,
    });
    setNewTask({ name: "", phase: "Design", due: "" });
  };

  const handleAddMeeting = () => {
    const zoomLink = `https://zoom.us/j/${Math.floor(
      Math.random() * 1000000000
    )}`; // Placeholder
    onAddMeeting({
      id: meetings.length + 1,
      title: newMeeting.title,
      date: newMeeting.date,
      zoomLink,
    });
    setNewMeeting({ title: "", date: "" });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Task & Meeting Tracking</h3>
      <h4 className="font-semibold">Tasks</h4>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex flex-col">
            <div className="flex justify-between">
              <span>
                {task.name} ({task.phase})
              </span>
              <span>{task.due}</span>
            </div>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={task.progress}
                onChange={(e) =>
                  onUpdateTask(task.id, parseInt(e.target.value))
                }
                className="w-full"
              />
              <span className="ml-2">{task.progress}%</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="New Task"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <select
          value={newTask.phase}
          onChange={(e) => setNewTask({ ...newTask, phase: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="Design">Design</option>
          <option value="Implementation">Implementation</option>
          <option value="Testing">Testing</option>
          <option value="Deployment">Deployment</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <input
          type="date"
          value={newTask.due}
          onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <h4 className="font-semibold mt-4">Meetings</h4>
      <ul className="space-y-2">
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            {meeting.date} - {meeting.title} (
            <a
              href={meeting.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Zoom
            </a>
            )
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Meeting Title"
          value={newMeeting.title}
          onChange={(e) =>
            setNewMeeting({ ...newMeeting, title: e.target.value })
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          value={newMeeting.date}
          onChange={(e) =>
            setNewMeeting({ ...newMeeting, date: e.target.value })
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleAddMeeting}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
};

export default TrackingWidget;
