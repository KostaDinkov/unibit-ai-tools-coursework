import { format } from "date-fns";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export default function MetricCard({
  metric,
  lastDataPoint,
}: {
  metric: Metric;
  lastDataPoint?: DataPoint;
}) {
  const navigate = useNavigate();
  
  function handleCardClick(): void {
    navigate(`/metrics/view/${metric.id}`, {
      state: {
        metricName: metric.name,
        metricId: metric.id,
      },
    });
  }
  function handleEditClick(event: React.MouseEvent): void {
    event.stopPropagation();
    navigate('/metrics/edit', {state:{metric}})
  }
  
  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => {
        handleCardClick();
      }}
    >
      <Stack direction={"row"} spacing={2}>
        <h3>{metric.name}</h3>
        <Button onClick={handleEditClick}>Edit</Button>
      </Stack>
      <p>{metric.description}</p>
      <h2>{lastDataPoint?.value}</h2>
      {lastDataPoint && (
        <span>{format(new Date(lastDataPoint.timestamp), "dd-MM-yyyy")}</span>
      )}
    </Card>
  );
}
