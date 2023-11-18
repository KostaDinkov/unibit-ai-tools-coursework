import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { defaultFormState } from "../utils/dataPointFormUtils";

export default function DataPointForm({
  metric,
  handleSubmit,
  handleCancel,
}: {
  metric: Metric;
  handleSubmit: (dataPoint: DataPoint) => void;
  handleCancel: (e: React.FormEvent) => void;

}) {

  const [formState, setFormState] = useState(defaultFormState);

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const removeLeadingZero = value.replace(/^0+/, "");
    setFormState({ ...formState, [name]: removeLeadingZero });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const dataPoint: DataPoint = {
      metricId: metric.id,
      value: Number(formState.value),
      comment: formState.comment || null,
      timestamp: new Date().getTime(),
    };
    handleSubmit(dataPoint);
  }

  return (
    <article>
      <h2>{metric.name}</h2>
      <form
        onSubmit={submitForm}
      >
        <Stack direction={"column"} spacing={2}>
          <TextField
            type="number"
            label="Value"
            value={formState.value}
            name="value"
            required
            onChange={handleChange}
          />

          <TextField
            name="comment"
            label="Comment"
            multiline
            value={formState.comment}
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
