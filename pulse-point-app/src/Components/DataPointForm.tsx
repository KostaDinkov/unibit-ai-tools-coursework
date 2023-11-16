import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function DataPointForm({
  metric,
  handleSubmit,
}: {
  metric: Metric;
  handleSubmit: (dataPoint: DataPoint) => void;
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
    setFormState({ ...formState, [name]: removeLeadingZero });
  };

  return (
    <div>
      <h2>{metric.name}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formState as DataPoint);
        }}
      >
        <Stack direction={"column"} spacing={2}>
          <label>
            <span>Value </span>
            <input
              type="number"
              value={formState.value || 0}
              name="value"
              required
              onChange={handleChange}
            />
          </label>

          <label>
            <span>Comment </span>
            <textarea
              name="comment"
              value={formState.comment || ""}
              onChange={handleChange}
            />
          </label>
        </Stack>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
