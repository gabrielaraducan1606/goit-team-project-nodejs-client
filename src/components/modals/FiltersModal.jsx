import React, { useState } from "react";
import Modal from "./Modal";

const FiltersModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentSettings = {},
}) => {
  const [selectedPriorities, setSelectedPriorities] = useState(
    currentSettings.priorities || []
  );
  const [showAllLabels, setShowAllLabels] = useState(
    currentSettings.showAllLabels || false
  );

  const priorities = [
    { id: "without-priority", label: "Without priority" },
    { id: "low", label: "Low" },
    { id: "medium", label: "Medium" },
    { id: "high", label: "High" },
  ];

  const togglePriority = (priorityId) => {
    if (selectedPriorities.includes(priorityId)) {
      setSelectedPriorities(
        selectedPriorities.filter((id) => id !== priorityId)
      );
    } else {
      setSelectedPriorities([...selectedPriorities, priorityId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters({
      priorities: selectedPriorities,
      showAllLabels,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-medium text-title">Label color</h3>
            <button
              type="button"
              className="text-sm text-text hover:text-title"
              onClick={() => setShowAllLabels(!showAllLabels)}
            >
              {showAllLabels ? "Hide all" : "Show all"}
            </button>
          </div>

          <div className="space-y-2 mb-6">
            {priorities.map((priority) => (
              <div key={priority.id} className="flex items-center">
                <label className="flex items-center space-x-3 cursor-pointer w-full text-text">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4"
                    checked={
                      selectedPriorities.includes(priority.id) || showAllLabels
                    }
                    onChange={() => togglePriority(priority.id)}
                    disabled={showAllLabels}
                  />
                  <svg className="w-3 h-3">
                    <use
                      xlinkHref={`/svg/sprite.svg#priority-${priority.id}`}
                    />
                  </svg>
                  <span>{priority.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="w-full h-10 rounded">
            Apply filters
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FiltersModal;
