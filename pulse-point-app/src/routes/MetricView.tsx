import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useApi } from "../context/ApiProvider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Legend, Label } from "recharts";


export default function MetricView() {
  const api = useApi();
  const navigate = useNavigate();
  const { metric } = useLocation().state as {
    metric: Metric;
  };
  const [dataPoints, setDataPoints] = useState([] as DataPoint[]);
  const [chartData, setChartData] = useState(
    [] as { x: number; y: number | null }[]
  );

  useEffect(() => {
    const dataPoints = api.getDataPointsForMetric(metric.id);
    setDataPoints(dataPoints);

    const data = dataPoints
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((dp) => ({ x: format(new Date(dp.timestamp), 'dd-MM-yyyy'), y: dp.value }));
    setChartData(data);
  }, [metric]);

  const handleAddNewDataPointClick = () => {
    navigate("/data-points/add", { state: { metric } });
  };

  return (
    <div>
      <h2>{metric.name}</h2>
      
      <LineChart width={600} height={300} data={chartData}>
        <ReferenceLine label="Max" y={metric.referenceRange?.max} stroke="red" strokeDasharray={"3 3"}/>
        <Line name = "Sistolic blood pressure" type="monotone" dataKey="y" stroke="#1565c0" />

        <XAxis dataKey="x" >
            <Label value={'date'} position="insideBottom" offset={-10}/>
        </XAxis>
        <YAxis label={{ value: `${metric.name} in ${metric.unit}`, angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend verticalAlign="top"/>
      </LineChart>
      <Button variant="contained" onClick={handleAddNewDataPointClick}>
        Add New Data Point
      </Button>
    </div>
  );
}
