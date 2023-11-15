import { useEffect, useState } from "react";
import { useApi } from "../context/ApiProvider.tsx";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

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

  function handleCardClick(metricId: string): void {
    const metricName = metrics.find((m) => m.id === metricId)?.name;
    navigate(`/view/${metricId}`, {
      state: {
        metricName,
        dataPoints: dataPoints.filter((dp) => dp.metricId === metricId),
      },
    });
  }

  return (
    <>
      <h2>My metrics</h2>

      <Stack direction="column" spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/metrics/add");
          }}
        >
          Add Metric
        </Button>
        {metrics.map((metric) => {
            //get the last data point for this metric
          const lastDataPoint = dataPoints.filter((dp) => dp.metricId === metric.id).sort((a,b)=>a.timestamp-b.timestamp).pop();
          console.log(lastDataPoint)
          return (

            <Card
              key={metric.id}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                handleCardClick(metric.id);
              }}
            >
              <h3>{metric.name}</h3>
              <p>{metric.description}</p>
              <h2>
                {lastDataPoint?.value}
              </h2>
              {lastDataPoint &&<span>{format(new Date(lastDataPoint.timestamp), "dd-MM-yyyy")}</span>}
            </Card>
          );
        })}
      </Stack>
    </>
  );
}
