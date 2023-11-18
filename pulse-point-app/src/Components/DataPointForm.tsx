import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function DataPointForm({
  metric,
  handleSubmit,
  handleCancel,
}: {
  metric: Metric;
  handleSubmit: (dataPoint: DataPoint) => void;
  handleCancel: (e: React.FormEvent) => void;
  isEdit: boolean;
}) {
  const defaultFormState: DataPoint = {
    metricId: metric.id,
    value: 0,
    timestamp: new Date().getTime(),
    comment: "",
  };
  const [formState, setFormState] = useState(defaultFormState);

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const removeLeadingZero = value.replace(/^0+/, "");
    if (
      (e.target as HTMLInputElement).type === "number" 
    ) {
      setFormState({ ...formState, [name]: parseFloat(removeLeadingZero) });
      return;
    }

    setFormState({ ...formState, [name]: removeLeadingZero });
  };

  return (
    <article>
      <h2>{metric.name}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formState as DataPoint);
        }}
      >
        <Stack direction={"column"} spacing={2}>
          <TextField
            type="number"
            label="Value"
            value={formState.value || 0}
            name="value"
            required
            onChange={handleChange}
          />

          <TextField
            name="comment"
            label="Comment"
            multiline
            value={formState.comment || ""}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Stack>
      </form>
    </article>
  );
}
