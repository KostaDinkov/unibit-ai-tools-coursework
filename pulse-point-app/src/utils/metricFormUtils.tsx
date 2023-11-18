const defaultFormState: MetricFormState = {
  name: "",
  description: "",
  unit: "",
  preferredValue: "",
  referenceRange: {
    min: "",
    max: "",
  },
};

export function getFormStateFromMetric(metric: Metric | null): MetricFormState {
  if (!metric) return defaultFormState;
  return {
    name: metric.name,
    description: metric.description || "",
    unit: metric.unit,
    preferredValue: metric.preferredValue?.toString() || "",
    referenceRange: {
      min:
          metric.referenceRange.min !== null &&!isNaN(metric.referenceRange.min)
          ? metric.referenceRange.min.toString()
          : "",
      max:
        metric.referenceRange.max !== null && !isNaN(metric.referenceRange.max)
          ? metric.referenceRange.max.toString()
          : "",
    },
  };
}

export function getMetricFromFormState(
  formState: MetricFormState,
  metric: Metric | null
): Metric {
  let id = crypto.randomUUID() as string;
  if (metric) {
    id = metric.id;
  }
  return {
    id: id,
    name: formState.name,
    description: formState.description,
    unit: formState.unit,
    preferredValue: isNaN(Number(formState.preferredValue))
      ? null
      : Number(formState.preferredValue),
    referenceRange: {
      min: isNaN(Number(formState.referenceRange.min))
        ? null
        : Number(formState.referenceRange.min),
      max: isNaN(Number(formState.referenceRange.max))
        ? null
        : Number(formState.referenceRange.max),
    },
  };
}
