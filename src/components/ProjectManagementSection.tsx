import React, { useState, useEffect } from "react";
import OnboardingWidget from "./ProjectManagement/OnboardingWidget";
import CycleWidget from "./ProjectManagement/CycleWidget";
import InvoicesWidget from "./ProjectManagement/InvoicesWidget";
import TrackingWidget from "./ProjectManagement/TrackingWidget";

const ProjectManagementSection: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    setIsAuthenticated(true); // Placeholder; replace with real auth
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleOnboard = (project: any) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
  };

  const handleUpdateProject = (id: number, updates: any) => {
    if (!isAuthenticated) return;
    setProjects(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  return (
    <section className="pt-20 pb-12">
      <h2 className="text-3xl font-bold mb-4">Project Management</h2>
      {!isAuthenticated ? (
        <p className="text-center text-gray-600">
          Please log in to manage projects. (Authentication placeholder)
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OnboardingWidget onOnboard={handleOnboard} />
          {projects.map((project) => (
            <div
              key={project.id}
              className="col-span-full bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              {project.status === "reviewing" && (
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-gray-700">Status: Reviewing</p>
                  <p className="text-gray-700">
                    Budget:{" "}
                    {project.currency === "KSh"
                      ? `KSh ${project.budget}`
                      : `$${project.budget}`}
                  </p>
                  <p className="text-gray-700">
                    Discuss via{" "}
                    <a
                      href={`mailto:?subject=Review: ${project.name}`}
                      className="text-blue-500 hover:underline"
                    >
                      Gmail
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://zoom.us"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Zoom
                    </a>
                  </p>
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateProject(project.id, {
                          status: "accepted",
                          sdlcPhases: [
                            { name: "Requirements Analysis", status: "done" },
                            { name: "Design", status: "pending" },
                            { name: "Implementation", status: "pending" },
                            { name: "Testing", status: "pending" },
                            { name: "Deployment", status: "pending" },
                            { name: "Maintenance", status: "pending" },
                          ],
                          invoices: [
                            {
                              id: 1,
                              milestone: "Initial Deposit",
                              amount: project.budget * 0.3,
                              paid: false,
                              dateIssued: null,
                            },
                            {
                              id: 2,
                              milestone: "Design Complete",
                              amount: project.budget * 0.3,
                              paid: false,
                              dateIssued: null,
                            },
                            {
                              id: 3,
                              milestone: "Deployment",
                              amount: project.budget * 0.4,
                              paid: false,
                              dateIssued: null,
                            },
                          ],
                          tasks: [
                            {
                              id: 1,
                              name: "Gather Requirements",
                              phase: "Requirements Analysis",
                              progress: 100,
                              due: new Date().toISOString().split("T")[0],
                            },
                          ],
                          meetings: [],
                        })
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateProject(project.id, { status: "declining" })
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
              {project.status === "declining" && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-gray-700">Enter Decline Reason:</p>
                  <textarea
                    onChange={(e) =>
                      handleUpdateProject(project.id, {
                        declineReason: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mutual agreement not to proceed"
                  />
                  <button
                    onClick={() =>
                      handleUpdateProject(project.id, { status: "declined" })
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Confirm Decline
                  </button>
                </div>
              )}
              {project.status === "accepted" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <CycleWidget
                    phases={project.sdlcPhases}
                    onUpdatePhase={(index, status) => {
                      const updatedPhases = [...project.sdlcPhases];
                      updatedPhases[index].status = status;
                      handleUpdateProject(project.id, {
                        sdlcPhases: updatedPhases,
                      });
                    }}
                  />
                  <InvoicesWidget
                    invoices={project.invoices}
                    projectName={project.name}
                    currency={project.currency}
                    onMarkPaid={(invoiceId) => {
                      const updatedInvoices = project.invoices.map((inv: any) =>
                        inv.id === invoiceId ? { ...inv, paid: true } : inv
                      );
                      handleUpdateProject(project.id, {
                        invoices: updatedInvoices,
                      });
                    }}
                    onIssueInvoice={(invoiceId) => {
                      const updatedInvoices = project.invoices.map((inv: any) =>
                        inv.id === invoiceId
                          ? {
                              ...inv,
                              dateIssued: new Date()
                                .toISOString()
                                .split("T")[0],
                            }
                          : inv
                      );
                      handleUpdateProject(project.id, {
                        invoices: updatedInvoices,
                      });
                    }}
                  />
                  <TrackingWidget
                    tasks={project.tasks}
                    meetings={project.meetings}
                    onAddTask={(task) =>
                      handleUpdateProject(project.id, {
                        tasks: [...project.tasks, task],
                      })
                    }
                    onUpdateTask={(taskId, progress) => {
                      const updatedTasks = project.tasks.map((t: any) =>
                        t.id === taskId ? { ...t, progress } : t
                      );
                      handleUpdateProject(project.id, { tasks: updatedTasks });
                    }}
                    onAddMeeting={(meeting) =>
                      handleUpdateProject(project.id, {
                        meetings: [...project.meetings, meeting],
                      })
                    }
                  />
                </div>
              )}
              {project.status === "declined" && (
                <p className="p-4 bg-red-50 rounded-lg text-red-600">
                  Declined:{" "}
                  {project.declineReason || "Mutual agreement not to proceed"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectManagementSection;
