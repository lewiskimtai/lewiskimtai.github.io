import React, { useState } from "react";

const OnboardingWidget: React.FC<{ onOnboard: (project: any) => void }> = ({
  onOnboard,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    requirements: "",
    budget: "",
    deadline: "",
    currency: "KSh",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOnboard({
      ...formData,
      budget: parseFloat(formData.budget),
      status: "reviewing",
    });
    setFormData({
      name: "",
      requirements: "",
      budget: "",
      deadline: "",
      currency: "KSh",
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Onboard a New Project</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <div className="flex items-center mb-2">
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="p-2 border rounded mr-2"
          >
            <option value="KSh">KSh (Local)</option>
            <option value="USD">$ (International)</option>
          </select>
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit for Review
        </button>
      </form>
    </div>
  );
};

export default OnboardingWidget;
