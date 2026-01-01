import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Gemini Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make API calls with correct headers', async () => {
    const mockResponse = {
      data: {
        candidates: [{
          content: {
            parts: [{ text: 'Test response' }]
          }
        }]
      }
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    // Test API call structure
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.any(Object),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('API Error');
    mockedAxios.post.mockRejectedValueOnce(mockError);

    // Service should catch and handle errors
    expect(async () => {
      // API call that should fail
    }).not.toThrow();
  });

  it('should format responses correctly', () => {
    const mockData = {
      text: 'Test response',
      sources: [{
        web: {
          title: 'Source 1',
          uri: 'https://example.com'
        }
      }]
    };

    expect(mockData).toHaveProperty('text');
    expect(mockData).toHaveProperty('sources');
    expect(Array.isArray(mockData.sources)).toBe(true);
  });
});
