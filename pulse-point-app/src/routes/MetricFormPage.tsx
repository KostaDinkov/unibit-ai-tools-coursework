import { useLocation } from "react-router-dom";
import { useApi } from "../context/ApiProvider";
import MetricForm from "../Components/MetricForm";
import {useNavigate} from 'react-router-dom';
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
  }
  if (isEdit) {
    return (
      <>
        <Navigation pageTitle={`Edit Metric`}/>
        <MetricForm isEdit={true} metric={state.metric} handleSubmit={handleSubmit}/>
      </>
    );
  } else {
    return (
      <>
        <Navigation pageTitle={`Add New Metric`}/>
        <MetricForm isEdit={false} metric={null} handleSubmit={handleSubmit}/>
      </>
    );
  }
}
