// testAPI.test.ts
import {test, expect, describe, beforeEach} from 'vitest'
import API from '../Api';

describe('TestAPI', () => {
    let api: API;
    let testMetric: Metric;
    let testDataPoint: DataPoint;

    beforeEach(() => {
        api = new API();
        testMetric = { id: 'metric1', name: 'Temperature', description: 'Measures temperature', unit: 'Celsius', preferredValue: null, referenceRange: null };
        testDataPoint = { metricId: 'metric1', value: 36.5, timestamp: 1700059960194, comment: null };
    });

    test('addMetric should add a new metric', () => {
        api.addMetric(testMetric);
        expect(api.getMetrics()).toContain(testMetric);
    });

    test('addMetric should throw error if metric with same id already exists', () => {
        api.addMetric(testMetric);
        expect(() => api.addMetric(testMetric)).toThrow('A metric with id metric1 already exists.');
    });

    test('addDataPoint should add a new data point', () => {
        api.addMetric(testMetric);
        api.addDataPoint(testDataPoint);
        expect(api.getDataPoints()).toContain(testDataPoint);
    });

    test('addDataPoint should throw error if metric ID does not exist', () => {
        expect(() => api.addDataPoint(testDataPoint)).toThrow('Metric ID does not exist');
    });

    test('getDataPointsForMetric should return data points sorted by date', () => {
        api.addMetric(testMetric);
        api.addDataPoint({ ...testDataPoint, timestamp: testDataPoint.timestamp + 1000000000000 });
        api.addDataPoint(testDataPoint);
        expect(api.getDataPointsForMetric('metric1')).toEqual([testDataPoint, { ...testDataPoint, timestamp: testDataPoint.timestamp + 1000000000000  }]);
    });

    // Test for getMetrics
    test('getMetrics should return all metrics', () => {
        api.addMetric(testMetric);
        expect(api.getMetrics()).toEqual([testMetric]);
    });

    // Test for getDataPoints
    test('getDataPoints should return all data points', () => {
        api.addMetric(testMetric);
        api.addDataPoint(testDataPoint);
        expect(api.getDataPoints()).toEqual([testDataPoint]);
    });

    // Test for updateMetric
    test('updateMetric should update an existing metric', () => {
        api.addMetric(testMetric);
        const updatedMetric = { ...testMetric, name: 'Updated Temperature' };
        api.updateMetric(updatedMetric);
        expect(api.getMetrics()).toContainEqual(updatedMetric);
    });

    test('updateMetric should throw an error if the metric does not exist', () => {
        expect(() => api.updateMetric(testMetric)).toThrow(`A metric with id ${testMetric.id} does not exist.`);
    });

    // Test for updateDataPoint
    test('updateDataPoint should update an existing data point', () => {
        api.addMetric(testMetric);
        api.addDataPoint(testDataPoint);
        const updatedDataPoint = { ...testDataPoint, value: 37.0 };
        api.updateDataPoint(updatedDataPoint);
        expect(api.getDataPoints()).toContainEqual(updatedDataPoint);
    });

    test('updateDataPoint should throw an error if the data point does not exist', () => {
        expect(() => api.updateDataPoint(testDataPoint)).toThrow(`A data point with timestamp ${testDataPoint.timestamp} does not exist.`);
    });

    // Test for deleteMetric
    test('deleteMetric should remove a metric and its associated data points', () => {
        api.addMetric(testMetric);
        api.addDataPoint(testDataPoint);
        api.deleteMetric(testMetric.id);
        expect(api.getMetrics()).not.toContain(testMetric);
        expect(api.getDataPoints()).not.toContain(testDataPoint);
    });

    // Test for deleteDataPoint
    test('deleteDataPoint should remove a specific data point', () => {
        api.addMetric(testMetric);
        api.addDataPoint(testDataPoint);
        api.deleteDataPoint(testDataPoint.timestamp);
        expect(api.getDataPoints()).not.toContain(testDataPoint);
    });
});
