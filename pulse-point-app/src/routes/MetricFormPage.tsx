import { useLocation } from "react-router-dom";
import { useApi } from "../context/ApiProvider";
import MetricForm from "../Components/MetricForm";
import { useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation";

// adds a new metric to the database
export default function MetricFormPage() {
  const api = useApi();
  const navigate = useNavigate();
  const state = useLocation().state as { metric: Metric };
  const isEdit = !!state.metric;

  const handleSubmit = (metric: Metric) => {

    if (isEdit) {
      api.updateMetric(metric);
    } else {
      api.addMetric(metric);
    }

    navigate("/");
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  if (isEdit) {
    return (
      <>
        <Navigation pageTitle={`Edit Metric`} />
        <MetricForm
          metric={state.metric}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </>
    );
  } else {
    return (
      <>
        <Navigation pageTitle={`Add New Metric`} />
        <MetricForm
          metric={null}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </>
    );
  }
}
