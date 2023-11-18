
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { getFormStateFromMetric, getMetricFromFormState } from "../utils/metricFormUtils";


export default function MetricForm({
  metric,
  handleSubmit,
  handleCancel
}: {
  metric: Metric | null;
  handleSubmit: (metric: Metric) => void;
  handleCancel: (e: React.FormEvent) => void;
}) {

  const isEdit = !!metric;
  const [formState, setFormState] = useState( getFormStateFromMetric(metric));

  const onChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormState({ ...formState, [name]: value });
  };

  const onChangeRef = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormState({
      ...formState,
      referenceRange: {
        ...formState.referenceRange,
        [name]: value
      },
    });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newMetric = getMetricFromFormState(formState, metric);
    handleSubmit(newMetric);
  }

  return (
    <form
      onSubmit={submitForm}
    >
      <Stack direction="column" spacing={2}>
        <TextField
          label="Name"
          disabled={isEdit}
          name="name"
          value={formState.name}
          onChange={onChange}
          required
        />

        <TextField
          label="Description"
          name="description"
          value={formState.description}
          onChange={onChange}
        />

        <TextField
          name="unit"
          label="Unit"
          value={formState.unit}
          onChange={onChange}
          required
        />

        <TextField
          type="number"
          label="Preferred Value"
          value={formState.preferredValue || ""}
          onChange={onChange}
          name="preferredValue"
        />

        <Box
          component="fieldset"
          sx={{ borderRadius: "5px", border: "1px solid grey" }}
        >
          <legend>Reference Range</legend>
          <Stack spacing={2}>
            <TextField
              name="min"
              label="Minimum Value"
              value={formState.referenceRange?.min || ""}
              onChange={onChangeRef}
              type="number"
            />
            <TextField
              name="max"
              label="Maximum Value"
              value={formState.referenceRange?.max || ""}
              onChange={onChangeRef}
              type="number"
            />
          </Stack>
        </Box>

        <Button variant ='contained' type="submit">{isEdit ? "Edit Metric" : "Add Metric"}</Button>
        <Button
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
}


