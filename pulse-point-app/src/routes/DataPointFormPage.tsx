import React from 'react'
import DataPointForm from '../Components/DataPointForm'
import {useApi} from '../context/ApiProvider';
import {useLocation, useNavigate} from 'react-router-dom';
import Navigation from '../Components/Navigation';


export default function DataPointFormPage() {
    const api = useApi();
    const navigate = useNavigate();
    const {metric} = useLocation().state as {metric: Metric};
    const handleSubmit = (dataPoint: DataPoint) => {
        api.addDataPoint(dataPoint);
        navigate(`/metrics/view/${metric.id}`, {state: {metric}});

    }

    const handleCancel = (e:React.FormEvent) => {
        e.preventDefault();
        navigate(-1);
    }
    return (
    <>
     <Navigation pageTitle={`Add Data Point`}/>
      <DataPointForm metric={metric} isEdit={false} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
    </>
  )
}
