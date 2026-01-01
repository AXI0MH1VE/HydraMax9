import {
  AxiomSystemLog,
  GeminiIntelResult,
  SecurityEvent,
  EntropyMetrics,
  AnomalyDetectionResult,
} from '../types';

describe('Type Definitions', () => {
  it('should define AxiomSystemLog correctly', () => {
    const log: AxiomSystemLog = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      subsystem: 'test',
      message: 'Test message',
    };

    expect(log).toHaveProperty('timestamp');
    expect(log).toHaveProperty('level');
    expect(log).toHaveProperty('subsystem');
    expect(log).toHaveProperty('message');
  });

  it('should define SecurityEvent correctly', () => {
    const event: SecurityEvent = {
      id: 'test-id',
      code: 'SEC-001',
      severity: 'HIGH',
      message: 'Security alert',
      ts: new Date().toISOString(),
      entropy: 0.85,
    };

    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('severity');
    expect(['LOW', 'MEDIUM', 'HIGH']).toContain(event.severity);
  });

  it('should define EntropyMetrics correctly', () => {
    const metrics: EntropyMetrics = {
      currentEntropy: 0.8,
      averageEntropy: 0.75,
      entropyThreshold: 0.7,
      violations: 0,
    };

    expect(metrics.currentEntropy).toBeGreaterThanOrEqual(0);
    expect(metrics.currentEntropy).toBeLessThanOrEqual(1);
    expect(metrics.violations).toBeGreaterThanOrEqual(0);
  });

  it('should define AnomalyDetectionResult correctly', () => {
    const result: AnomalyDetectionResult = {
      isAnomaly: false,
      confidence: 0.95,
      reason: 'Normal behavior',
    };

    expect(typeof result.isAnomaly).toBe('boolean');
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });
});
