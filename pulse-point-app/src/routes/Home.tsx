import { useEffect, useState } from "react";
import { useApi } from "../context/ApiProvider.tsx";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MetricCard from "../Components/MetricCard.tsx";
import Navigation from "../Components/Navigation.tsx";

export default function Home() {
  const api = useApi();
  const [dataPoints, setDataPoints] = useState([] as DataPoint[]);
  const [metrics, setMetrics] = useState([] as Metric[]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataPoints = api.getDataPoints();
    setDataPoints(dataPoints);
    const metrics = api.getMetrics();
    setMetrics(metrics);
  }, []);

  return (
    <>
    <Navigation pageTitle="My Metrics"/>
      <Stack direction="column" spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/metrics/add", { state: { metric: null } });
          }}
        >
          Add Metric
        </Button>
        {metrics.map((metric) => {
          //get the last data point for this metric
          const lastDataPoint = dataPoints
            .filter((dp) => dp.metricId === metric.id)
            .sort((a, b) => a.timestamp - b.timestamp)
            .pop();
          return <MetricCard key={metric.id} lastDataPoint={lastDataPoint} metric={metric} />;
        })}
      </Stack>
    </>
  );
}
