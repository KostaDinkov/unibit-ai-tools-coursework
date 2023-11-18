import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import DataPointForm from "../Components/DataPointForm";

describe("DataPointForm", () => {
  const metric:Metric = {
    id: "metric-1",
    name: "Test Metric",
    description: "Test Description",
    unit: "Test Unit",
  };

  const handleSubmit = vi.fn();
  const handleCancel = vi.fn();

  it("renders the form with default values", () => {
    render(
      <DataPointForm
        metric={metric}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isEdit={false}
      />
    );

    expect(screen.getByLabelText(/value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("submits the form with the entered values", () => {
    render(
      <DataPointForm
        metric={metric}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isEdit={false}
      />
    );

    const valueInput = screen.getByLabelText(/value/i);
    const commentInput = screen.getByLabelText(/comment/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(valueInput, { target: { value: "42" } });
    fireEvent.change(commentInput, { target: { value: "Test Comment" } });
    fireEvent.click(addButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      metricId: metric.id,
      value: 42,
      timestamp: expect.any(Number),
      comment: "Test Comment",
    });
  });

  it("calls handleCancel when cancel button is clicked", () => {
    render(
      <DataPointForm
        metric={metric}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isEdit={false}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });
});