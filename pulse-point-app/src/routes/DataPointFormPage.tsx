import React from 'react'
import DataPointForm from '../Components/DataPointForm'
import {useApi} from '../context/ApiProvider';
import {useLocation, useNavigate} from 'react-router-dom';


export default function DataPointFormPage() {
    const api = useApi();
    const navigate = useNavigate();
    const {metric} = useLocation().state as {metric: Metric};
    
    const handleSubmit = (dataPoint: DataPoint) => {
        api.addDataPoint(dataPoint);
        navigate(`/metrics/view/${metric.id}`, {state: {metric}});

    }
    return (
    <>
      <DataPointForm metric={metric} isEdit={false} handleSubmit={handleSubmit}/>
    </>
  )
}
