import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import DataPointForm from "../Components/DataPointForm";

describe("DataPointForm", () => {
  const metric:Metric = {
    id: "test-id",
    name: "Test Metric",
    description: "Test description",
    unit: "test unit",
    preferredValue: 42,
    referenceRange: {
      min: 0,
      max: 100,
    },
  };

  const handleSubmit = vi.fn();
  const handleCancel = vi.fn();

  beforeEach(() => {
    render(
      <DataPointForm
        metric={metric}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    );
  });

  it("renders the metric name", () => {
    const metricNameElement = screen.getByText(metric.name);
    expect(metricNameElement).toBeInTheDocument();
  });

  it("calls handleSubmit when the form is submitted", () => {
    const valueInput = screen.getByLabelText(/value/i);
    const commentInput = screen.getByLabelText(/comment/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(valueInput, { target: { value: "42" } });
    fireEvent.change(commentInput, { target: { value: "Test comment" } });
    fireEvent.click(addButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      metricId: metric.id,
      value: 42,
      comment: "Test comment",
      timestamp: expect.any(Number),
    });
  });

  it("calls handleCancel when the Cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});