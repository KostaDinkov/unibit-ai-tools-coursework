interface Metric{
    id: string;
    name: string;
    description: string;
    unit: string;
    preferredValue?: number;
    referenceRange?:{
        min:number | null;
        max:number | null;
    } ;
}

interface DataPoint {
    metricId:string;
    value: number;
    timestamp: number;
    comment?: string;
}