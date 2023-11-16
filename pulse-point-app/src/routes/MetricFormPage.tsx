import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import MetricForm from "../Components/MetricForm";

// adds a new metric to the database
export default function MetricFormPage() {
  const state = useLocation().state as { metric: Metric };
  const isEdit = !!state.metric;

  if (isEdit) {
    return (
      <>
        <h2>Edit Metric</h2>
        <MetricForm isEdit metric={state.metric} />
      </>
    );
  } else {
    return (
      <>
        <h2>Add Metric</h2>
        <MetricForm isEdit metric={null} />
      </>
    );
  }
}
