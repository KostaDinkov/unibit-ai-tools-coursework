let metrics: Metric[] = [
  {
    id: "1",
    name: "Sistolic Blood Pressure",
    description: "The pressure in your arteries when your heart beats",
    unit: "mmHg",
    preferredValue: 110,
    referenceRange: {
      min: 90,
      max: 120,
    },
  },
  {
    id: "2",
    name: "Diastolic Blood Pressure",
    description: "The pressure in your arteries between beats",
    unit: "mmHg",
    preferredValue: 70,
    referenceRange: {
      min: 60,
      max: 80,
    },
  },
  {
    id: "3",
    name: "HDL",
    description: "High-density lipoprotein",
    unit: "mmol/L",
    preferredValue: 1.5,
    referenceRange: {
      min: 1.0,
      max: null,
    },
  },
  {
    id: "4",
    name: "LDL",
    description: "Low-density lipoprotein",
    unit: "mmol/L",
    preferredValue: 2.6,
    referenceRange: {
      min: 1.0,
      max: 3.0,
    },
  },
  
  // Данните по-долу са добавени автоматично от Github Copilot
  {
    id: "5",
    name: "Cholesterol",
    description: "Total cholesterol",
    unit: "mmol/L",
    preferredValue: 4.5,
    referenceRange: {
      min: null,
      max: 5.0,
    },
  },
  {
    id: "6",
    name: "Triglycerides",
    description: "Triglycerides",
    unit: "mmol/L",
    preferredValue: 1.7,
    referenceRange: {
      min: null,
      max: 2.0,
    },
  },
  {
    id: "7",
    name: "Glucose",
    description: "Glucose",
    unit: "mmol/L",
    preferredValue: 4.5,
    referenceRange: {
      min: 3.0,
      max: 6.0,
    },
  },
  {
    id: "8",
    name: "Hemoglobin A1c",
    description: "Hemoglobin A1c",
    unit: "%",
    preferredValue: 5.5,
    referenceRange: {
      min: 4.0,
      max: 6.0,
    },
  },
  {
    id: "9",
    name: "Weight",
    description: "Weight",
    unit: "kg",
    preferredValue: 70,
    referenceRange: {
      min: 60,
      max: 80,
    },
  },
  {
    id: "10",
    name: "Waist Circumference",
    description: "Waist Circumference",
    unit: "cm",
    preferredValue: 80,
    referenceRange: {
      min: 70,
      max: 90,
    },
  },
  {
    id: "11",
    name: "Rested Heart Rate",
    description: "Rested Heart Rate",
    unit: "bpm",
    preferredValue: 50,
    referenceRange: {
      min: 40,
      max: 60,
    },
  },
];

export default metrics;
