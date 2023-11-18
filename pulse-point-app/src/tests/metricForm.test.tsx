import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import MetricForm from "../Components/MetricForm";

describe("MetricForm", () => {
  const handleSubmit = vi.fn();
  const handleCancel = vi.fn();

  it("renders the form with default values", () => {
    render(
      <MetricForm
        metric={null}
        isEdit={false}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/unit/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Value")).toBeInTheDocument();
    expect(screen.getByText("Reference Range")).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum value/i)).toBeInTheDocument();
    expect(screen.getByText("Add Metric")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("submits the form with the entered values", () => {
    render(
      <MetricForm
        metric={null}
        isEdit={false}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const unitInput = screen.getByLabelText(/unit/i);
    const preferredValueInput = screen.getByLabelText("Preferred Value");
    const minInput = screen.getByLabelText("Minimum Value");
    const maxInput = screen.getByLabelText("Maximum Value");
    const submitButton = screen.getByText("Add Metric");

    fireEvent.change(nameInput, { target: { value: "Test Metric" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.change(unitInput, { target: { value: "Test Unit" } });
    fireEvent.change(preferredValueInput, { target: { value: "42" } });
    fireEvent.change(minInput, { target: { value: "0" } });
    fireEvent.change(maxInput, { target: { value: "100" } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        name: "Test Metric",
        description: "Test Description",
        unit: "Test Unit",
        preferredValue: 42,
        id: expect.any(String),
        referenceRange: {
          min: 0,
          max: 100,
        },
      }
    );
  });
});
