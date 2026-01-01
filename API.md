# HydraMax9 API Documentation

## Overview

HydraMax9 integrates with multiple AI and data services to provide comprehensive deterministic AI capabilities.

## Gemini API Integration

### Base Configuration

```typescript
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
```

### Models

#### Gemini 2.0 Flash (Experimental)
- **Model ID**: `gemini-2.0-flash-exp`
- **Use Case**: Fast inference, real-time responses
- **Features**: Grounding with Google Search

#### Gemini 1.5 Pro
- **Model ID**: `gemini-1.5-pro`
- **Use Case**: Complex reasoning, long context
- **Features**: Advanced analysis, multi-modal support

### Request Format

```typescript
interface GeminiRequest {
  contents: Array<{
    role: string;
    parts: Array<{ text: string }>;
  }>;
  tools?: Array<{
    googleSearch?: {};
  }>;
  safetySettings?: Array<{
    category: string;
    threshold: string;
  }>;
}
```

### Example Request

```typescript
const request = {
  contents: [{
    role: 'user',
    parts: [{ text: 'Your query here' }]
  }],
  tools: [{ googleSearch: {} }],
  safetySettings: [
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_ONLY_HIGH'
    }
  ]
};

const response = await axios.post(
  `${GEMINI_API_URL}/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
  request,
  {
    headers: { 'Content-Type': 'application/json' }
  }
);
```

### Response Format

```typescript
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    groundingMetadata?: {
      webSearchQueries?: string[];
      groundingChunks?: Array<{
        web: {
          title: string;
          uri: string;
        };
      }>;
    };
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}
```

## Internal APIs

### Performance Metrics

#### Get Current Metrics

```typescript
interface PerformanceMetrics {
  cpu: number;        // 0-100
  memory: number;     // 0-100
  latency: number;    // milliseconds
  throughput: number; // requests/sec
}

// Usage
const metrics = getPerformanceMetrics();
```

### Security Events

#### Create Security Event

```typescript
interface SecurityEvent {
  id: string;
  code: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  ts: string; // ISO 8601
  entropy: number; // 0-1
}

// Usage
const event = createSecurityEvent({
  code: 'SEC-001',
  severity: 'HIGH',
  message: 'Anomaly detected',
  entropy: 0.85
});
```

### Entropy Analysis

#### Calculate Entropy

```typescript
interface EntropyMetrics {
  currentEntropy: number;     // 0-1
  averageEntropy: number;     // 0-1
  entropyThreshold: number;   // 0-1
  violations: number;         // count
}

// Usage
const entropy = calculateEntropy(data);
```

### Anomaly Detection

#### Detect Anomalies

```typescript
interface AnomalyDetectionResult {
  isAnomaly: boolean;
  confidence: number; // 0-1
  reason: string;
}

// Usage
const result = detectAnomaly(metrics);
if (result.isAnomaly) {
  console.log(`Anomaly detected: ${result.reason}`);
  console.log(`Confidence: ${result.confidence}`);
}
```

## Error Handling

### API Errors

```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
}

try {
  const response = await makeAPICall();
} catch (error) {
  if (axios.isAxiosError(error)) {
    const apiError: APIError = {
      code: error.response?.data?.error?.code || 'UNKNOWN',
      message: error.response?.data?.error?.message || error.message,
      details: error.response?.data
    };
    handleError(apiError);
  }
}
```

### Common Error Codes

- `AUTH_ERROR`: Invalid API key or authentication failure
- `RATE_LIMIT`: API rate limit exceeded
- `INVALID_REQUEST`: Malformed request
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable
- `TIMEOUT`: Request timeout

## Rate Limiting

### Gemini API Limits

- **Requests per minute**: 60
- **Tokens per minute**: 32,000
- **Concurrent requests**: 10

### Best Practices

```typescript
// Implement exponential backoff
const makeRequestWithRetry = async (fn: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};
```

## Environment Variables

```bash
# Required
VITE_GEMINI_API_KEY=your_api_key_here

# Optional
VITE_DEBUG_MODE=false
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
```

## Security Considerations

1. **API Keys**: Never expose API keys in client-side code
2. **CORS**: Configure appropriate CORS policies
3. **Rate Limiting**: Implement client-side rate limiting
4. **Input Validation**: Always validate user inputs
5. **Error Messages**: Don't expose sensitive information in errors

## Examples

### Meta Deep Search

```typescript
const performMetaSearch = async (query: string): Promise<GeminiIntelResult> => {
  const request = {
    contents: [{
      role: 'user',
      parts: [{ text: query }]
    }],
    tools: [{ googleSearch: {} }]
  };

  const response = await axios.post(
    `${GEMINI_API_URL}/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
    request
  );

  return {
    query,
    response: response.data.candidates[0].content.parts[0].text,
    sources: response.data.candidates[0].groundingMetadata?.groundingChunks || [],
    timestamp: new Date().toISOString()
  };
};
```

### Real-time Monitoring

```typescript
const startMonitoring = (intervalMs: number = 1000) => {
  setInterval(() => {
    const metrics = getPerformanceMetrics();
    const anomaly = detectAnomaly(metrics);
    
    if (anomaly.isAnomaly) {
      createSecurityEvent({
        code: 'PERF-001',
        severity: 'MEDIUM',
        message: anomaly.reason,
        entropy: calculateEntropy(metrics).currentEntropy
      });
    }
  }, intervalMs);
};
```

## Testing

### Mock API Responses

```typescript
import { jest } from '@jest/globals';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('should handle API response', async () => {
  mockedAxios.post.mockResolvedValueOnce({
    data: {
      candidates: [{
        content: {
          parts: [{ text: 'Test response' }]
        }
      }]
    }
  });

  const result = await performMetaSearch('test query');
  expect(result.response).toBe('Test response');
});
```

## Support

For API-related questions or issues:
- Email: devdollzai@gmail.com
- GitHub Issues: https://github.com/AXI0MH1VE/HydraMax9/issues
- Documentation: https://github.com/AXI0MH1VE/HydraMax9
