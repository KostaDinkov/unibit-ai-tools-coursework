import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useApi } from "../context/ApiProvider";

export default function MetricView() {
  const api = useApi();
  const { metricName, metricId } = useLocation().state as {
    metricName: string;
    metricId: string;
  };
  const [dataPoints, setDataPoints] = useState([] as DataPoint[]);

  useEffect(() => {
    const dataPoints = api.getDataPointsForMetric(metricId);
    setDataPoints(dataPoints);
  }, [metricId]);
  return (
    <div>
      <h2>{metricName}</h2>
      <ul>
        {dataPoints.map((dp) => (
          <li key={dp.timestamp}>
            {format(new Date(dp.timestamp), "dd-MM-yyyy")}: {dp.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
