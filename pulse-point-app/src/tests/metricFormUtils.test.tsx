import { getFormStateFromMetric } from "../utils/metricFormUtils";

describe("getFormStateFromMetric", () => {
  it("returns default form state when metric is null", () => {
    const metric = null;
    const formState = getFormStateFromMetric(metric);
    expect(formState).toEqual({
      name: "",
      description: "",
      unit: "",
      preferredValue: "",
      referenceRange: {
        min: "",
        max: "",
      },
    });
  });

  it("returns form state with metric values", () => {
    const metric:Metric = {
      id: "test-id",
      name: "Test Metric",
      description: "Test Description",
      unit: "Test Unit",
      preferredValue: 42,
      referenceRange: {
        min: 0,
        max: 0,
      },
    };
    const formState = getFormStateFromMetric(metric);
    expect(formState).toEqual({
      name: "Test Metric",
      description: "Test Description",
      unit: "Test Unit",
      preferredValue: "42",
      referenceRange: {
        min: "0",
        max: "0",
      },
    });
  });

  it("returns form state with empty string for missing metric values", () => {
    const metric:Metric = {
      id: "test-id",
      description:null,
      name: "Test Metric",
      unit: "Test Unit",
      preferredValue: null,
      referenceRange: {
        min: null,
        max: null,
      },
    };
    const formState = getFormStateFromMetric(metric);
    expect(formState).toEqual({
      name: "Test Metric",
      description: "",
      unit: "Test Unit",
      preferredValue: "",
      referenceRange: {
        min: "",
        max: "",
      },
    });
  });
});