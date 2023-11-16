interface Metric{
    id: string;
    name: string;
    description: string;
    unit: string;
    preferredValue?: number;
    referenceRange?:{
        min?:number ;
        max?:number ;
    } ;
}

interface DataPoint {
    metricId:string;
    value: number | null;
    timestamp: number;
    comment: string | null;
}