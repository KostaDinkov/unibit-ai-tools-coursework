interface Metric{
    id: string;
    name: string;
    description: string;
    unit: string;
    preferredValue: number | null;
    referenceRange:{
        min:number | null;
        max:number | null;
    } | null;
}

interface DataPoint {
    metricId:string;
    value: number;
    date: string;
    comment: string
}