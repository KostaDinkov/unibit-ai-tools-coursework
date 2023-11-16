import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useApi } from "../context/ApiProvider";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function MetricForm({ metric, isEdit }: { metric: Metric | null, isEdit: boolean }) {
  const api = useApi();
  const navigate = useNavigate();
  const [name, setName] = useState(metric?.name || "");
  const [description, setDescription] = useState(metric?.description || "");
  const [unit, setUnit] = useState(metric?.unit || "");

  function handleSubmit() {
    if(isEdit) {
        api.updateMetric({ name, description, unit, id: metric!.id });}
    else{
        api.addMetric({ name, description, unit, id: crypto.randomUUID() });
    }
    
    navigate("/");
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Stack direction="column" spacing={2}>
        <TextField
          disabled={isEdit}
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          id="unit"
          label="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <Button type="submit">{isEdit ? "Edit Metric" : "Add Metric"}</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
}
