import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useApi } from "../context/ApiProvider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Legend,
  Label,
} from "recharts";
import Navigation from "../Components/Navigation";
import CustomizedDot from "../Components/CustomizedDot";

export default function MetricView() {
  const api = useApi();
  const navigate = useNavigate();
  const { metric } = useLocation().state as {
    metric: Metric;
  };

  const [chartData, setChartData] = useState(
    [] as { date: string; y: number | null }[]
  );

  useEffect(() => {
    const dataPoints = api.getDataPointsForMetric(metric.id);

    const data = dataPoints
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((dp) => ({
        date: format(new Date(dp.timestamp), "dd-MM-yyyy"),
        y: dp.value,
        comment: dp.comment,
      }));
    setChartData(data);
  }, [metric]);

  const handleAddNewDataPointClick = () => {
    navigate("/data-points/add", { state: { metric } });
  };

  return (
    <div>
      <Navigation pageTitle={`${metric.name}`} />
      <LineChart width={600} height={300} data={chartData}>
        {metric.referenceRange?.max && <ReferenceLine
          label="Max"
          y={metric.referenceRange.max}
          stroke="red"
          strokeDasharray={"3 3"}
        />}
        {metric.referenceRange?.min && <ReferenceLine
          label="Min"
          y={metric.referenceRange.min}
          stroke="yellow"
          strokeDasharray={"3 3"}
        />}
        {/* @ts-expect-error recharts passes the props to CustomizedDot internally*/}
        <Line name={metric.name} type="monotone" dataKey="y" stroke="#1565c0" dot={<CustomizedDot />}/>

        <XAxis dataKey="date">
          <Label value={"date"} position="insideBottom" offset={-10} />
        </XAxis>
        <YAxis
          label={{
            value: `${metric.name} in ${metric.unit}`,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend verticalAlign="top" />
      </LineChart>
      <Button variant="contained" onClick={handleAddNewDataPointClick}>
        Add New Data Point
      </Button>
    </div>
  );
}
