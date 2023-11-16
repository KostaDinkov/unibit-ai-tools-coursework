import React, {createContext, useContext} from 'react';
import Api from '../Api';
import dataPoints from '../sampleData/dataPoints';
import metrics from '../sampleData/metrics';


const ApiContext = createContext({} as Api);


export default function ApiProvider({children}: {children: React.ReactNode}) {
    const api = new Api({dataPoints, metrics});
  return (
    <ApiContext.Provider value = {api} >
        {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
    return useContext(ApiContext);
}


