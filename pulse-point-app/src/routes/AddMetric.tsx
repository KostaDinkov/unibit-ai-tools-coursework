import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../context/ApiProvider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// adds a new metric to the database
export default function AddMetric() {
  const api = useApi();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");

  function handleAddMetric() {
    api.addMetric({ name, description, unit, id: crypto.randomUUID() });
    navigate("/");
  }

  return (
    <div>
      <h2>Add Metric</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMetric();
        }}
      >
        <Stack direction="column" spacing={2}>
          <TextField
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
          <Button type="submit">Add Metric</Button>
          <Button onClick={(e)=>{e.preventDefault(); navigate(-1)}}>Cancel</Button>
        </Stack>
      </form>
    </div>
  );
}
