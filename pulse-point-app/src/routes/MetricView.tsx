import {useLocation} from 'react-router-dom';
import {format} from 'date-fns';

export default function MetricView() {

    const {metricName, dataPoints} = useLocation().state as {metricName: string, dataPoints: DataPoint[]};
  return (
    <div>
      <h2>{metricName}</h2>
      <ul>
            {dataPoints.map((dp)=>(
                <li key={dp.timestamp}>
                    {format(new Date(dp.timestamp),'dd-MM-yyyy')}: {dp.value}
                </li>
            ))}
      </ul>
    </div>
  )
}
