import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
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
        metric,
      },
    });
  }
  function handleEditClick(event: React.MouseEvent): void {
    event.stopPropagation();
    navigate("/metrics/edit", { state: { metric } });
  }

  return (
    <Card
    >
      <CardActionArea onClick={() => {
        handleCardClick();
      }}>
        <CardHeader
          title={metric.name}
          subheader={`Last entry: ${
            lastDataPoint
              ? format(new Date(lastDataPoint.timestamp), "dd-MM-yyyy")
              : "none"
          }`}
          sx={{backgroundColor: '#f1f1e7'}}
        />
        <CardContent>
          <Stack direction='row' alignItems="baseline" justifyContent={'center'}>
            <Typography variant="h2" sx={{fontWeight:'bold'}}>{lastDataPoint?.value}</Typography>
            <Typography variant="body1" sx={{fontWeight:'bold'}}>{metric.unit}</Typography>
          </Stack>
          <span>{metric.description}</span>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack direction ="row" justifyContent={"flex-end"} sx={{width:"100%"}} >
          <Button variant="contained" size="small" color={'secondary'} onClick={handleEditClick}>Edit</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
