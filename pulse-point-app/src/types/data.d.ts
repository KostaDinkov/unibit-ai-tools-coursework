interface Metric {
  id: string;
  name: string;
  description: string | null;
  unit: string;
  preferredValue: number | null;
  referenceRange: {
    min: number | null;
    max: number | null;
  };
}

interface DataPoint {
  metricId: string;
  value: number | null;
  timestamp: number;
  comment: string | null;
}

interface MetricFormState {
  name: string;
  description: string;
  unit: string;
  preferredValue: string;
  referenceRange: {
    min: string;
    max: string;
  };
}

interface DataPointFormState {
  value: string | null;
  timestamp: number;
  comment: string;
}
