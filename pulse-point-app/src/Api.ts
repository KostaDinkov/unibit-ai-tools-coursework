export default class API {
    private metrics: Metric[];
    private dataPoints: DataPoint[];

    constructor({metrics = [], dataPoints = []}:
        {metrics?: Metric[], dataPoints?: DataPoint[]}={}) {
        this.metrics = metrics;
        this.dataPoints = dataPoints;
    }

    public addMetric(metric: Metric): void {
        if (this.metrics.some(existingMetric => existingMetric.id === metric.id)) {
            throw new Error(`A metric with id ${metric.id} already exists.`);
        }
        this.metrics.push(metric);
    }

    public addDataPoint(dataPoint: DataPoint): void {
        if (!this.metrics.some(metric => metric.id === dataPoint.metricId)) {
            throw new Error('Metric ID does not exist');
        }
        this.dataPoints.push(dataPoint);
    }

    public getDataPointsForMetric(metricId: string): DataPoint[] {
        return this.dataPoints
            .filter(dataPoint => dataPoint.metricId === metricId)
            .sort((a, b) => a.timestamp - b.timestamp);
    }

    //Следващите методи са генерирани от Github Copilot на базата на коментарите пред тях.

    // get all metrics
    public getMetrics(): Metric[] {
        return this.metrics;
    }

    // get all data points
    public getDataPoints(): DataPoint[] {
        return this.dataPoints;
    }

    // update a metric
    public updateMetric(metric: Metric): void {
        const index = this.metrics.findIndex(existingMetric => existingMetric.id === metric.id);
        if (index === -1) {
            throw new Error(`A metric with id ${metric.id} does not exist.`);
        }
        this.metrics[index] = metric;
    }

    //update a data point based on timestamp
    public updateDataPoint(dataPoint: DataPoint): void {
        const index = this.dataPoints.findIndex(existingDataPoint => existingDataPoint.timestamp === dataPoint.timestamp);
        if (index === -1) {
            throw new Error(`A data point with timestamp ${dataPoint.timestamp} does not exist.`);
        }
        this.dataPoints[index] = dataPoint;
    }

    // delete a metric and all of the data points associated with it
    public deleteMetric(metricId: string): void {
        this.metrics = this.metrics.filter(metric => metric.id !== metricId);
        this.dataPoints = this.dataPoints.filter(dataPoint => dataPoint.metricId !== metricId);
    }

    // delete a data point based on timestamp
    public deleteDataPoint(timestamp: number): void {
        this.dataPoints = this.dataPoints.filter(dataPoint => dataPoint.timestamp !== timestamp);
    }
}
