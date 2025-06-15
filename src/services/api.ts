import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiEndpoint, ApiResponse, KeyValuePair } from '../types';

// MomentScience API Status Codes
export const API_STATUS_CODES = {
  200: 'OK - The request was successful',
  400: 'Bad Request - The request was malformed or invalid',
  401: 'Unauthorized - The request requires authentication',
  403: 'Forbidden - The request is not authorized to access the requested resource',
  404: 'Not Found - The requested resource was not found',
  422: 'Unprocessable Entity - The request sent invalid inputs'
} as const;

export class ApiService {  static async makeRequest(
    endpoint: ApiEndpoint,
    apiKey: string,
    formData: Record<string, any>,
    dynamicQueryParams: KeyValuePair[] = [],
    dynamicHeaders: KeyValuePair[] = [],
    dynamicBodyParams: KeyValuePair[] = [],
    enabledBodyParams: Record<string, boolean> = {}
  ): Promise<ApiResponse> {
    const startTime = Date.now();
    
    try {      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('api_key', apiKey);
        
      // Add default query params from endpoint
      Object.entries(endpoint.queryParams).forEach(([key]) => {
        if (key !== 'api_key' && formData[key]) {
          queryParams.append(key, formData[key]);
        }
      });

      // Add dynamic query parameters
      dynamicQueryParams.forEach(param => {
        if (param.key && param.value) {
          queryParams.append(param.key, param.value);
        }
      });

      const url = `${endpoint.url}?${queryParams.toString()}`;
        
      // Prepare request config
      const config: any = {
        method: endpoint.method,
        url,
        headers: {
          ...endpoint.headers,
          'User-Agent': 'MomentScience-API-Explorer/1.0'
        },
        timeout: 30000,
        // Add CORS handling
        withCredentials: false
      };

      // Add dynamic headers
      dynamicHeaders.forEach(header => {
        if (header.key && header.value) {
          config.headers[header.key] = header.value;
        }
      });      // Add body for POST requests or GET requests that require body
      if (endpoint.requiresBody && (Object.keys(formData).length > 0 || dynamicBodyParams.length > 0)) {
        const bodyData: Record<string, any> = {};
        
        // Add only enabled default body parameters
        Object.keys(endpoint.bodySchema).forEach(key => {
          const isEnabled = enabledBodyParams[key] !== false; // Default to enabled
          if (isEnabled && formData[key] !== undefined) {
            bodyData[key] = formData[key];
          }
        });
        
        // Add dynamic body parameters
        dynamicBodyParams.forEach(param => {
          if (param.key && param.value) {
            bodyData[param.key] = param.value;
          }
        });
        
        config.data = bodyData;
      }

      const response: AxiosResponse = await axios(config);
      
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers as Record<string, string>,
        timestamp: Date.now() - startTime
      };    } catch (error) {
      const axiosError = error as AxiosError;
      
      // Provide more detailed error information
      let errorMessage = axiosError.message;
      let errorData = axiosError.response?.data;
      
      // Handle specific error cases
      if (axiosError.code === 'ERR_NETWORK') {
        errorMessage = 'Network error - possibly CORS blocked or server unreachable';
        errorData = {
          error: 'CORS_OR_NETWORK_ERROR',
          message: 'The browser blocked this request due to CORS policy, or the server is unreachable.',
          suggestion: 'Try using the cURL command in your terminal instead, or contact the API provider about CORS configuration.'
        };
      } else if (axiosError.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout';
        errorData = {
          error: 'TIMEOUT',
          message: 'The request took too long to complete.',
          suggestion: 'Check your internet connection and try again.'
        };
      }
      
      return {
        status: axiosError.response?.status || 0,
        statusText: axiosError.response?.statusText || errorMessage,
        data: errorData || { 
          error: axiosError.code || 'UNKNOWN_ERROR',
          message: errorMessage,
          details: axiosError.response?.data
        },
        headers: axiosError.response?.headers as Record<string, string> || {},
        timestamp: Date.now() - startTime
      };
    }
  }  static generateCurlCommand(
    endpoint: ApiEndpoint,
    apiKey: string,
    formData: Record<string, any>,
    dynamicQueryParams: KeyValuePair[] = [],
    dynamicHeaders: KeyValuePair[] = [],
    dynamicBodyParams: KeyValuePair[] = [],
    enabledBodyParams: Record<string, boolean> = {}
  ): string {
    const queryParams = new URLSearchParams();
    queryParams.append('api_key', apiKey);
      
    // Add default query params from endpoint
    Object.entries(endpoint.queryParams).forEach(([key]) => {
      if (key !== 'api_key' && formData[key]) {
        queryParams.append(key, formData[key]);
      }
    });

    // Add dynamic query parameters
    dynamicQueryParams.forEach(param => {
      if (param.key && param.value) {
        queryParams.append(param.key, param.value);
      }
    });

    const url = `${endpoint.url}?${queryParams.toString()}`;
    
    let curl = `curl -X ${endpoint.method} "${url}"`;
    
    // Add default headers
    Object.entries(endpoint.headers).forEach(([key, value]) => {
      curl += ` \\\n  -H "${key}: ${value}"`;
    });
    
    // Add dynamic headers
    dynamicHeaders.forEach(header => {
      if (header.key && header.value) {
        curl += ` \\\n  -H "${header.key}: ${header.value}"`;
      }
    });    // Add body for POST requests
    if (endpoint.requiresBody && (Object.keys(formData).length > 0 || dynamicBodyParams.length > 0)) {
      const bodyData: Record<string, any> = {};
      
      // Add only enabled default body parameters
      Object.keys(endpoint.bodySchema).forEach(key => {
        const isEnabled = enabledBodyParams[key] !== false; // Default to enabled
        if (isEnabled && formData[key] !== undefined) {
          bodyData[key] = formData[key];
        }
      });
      
      // Add dynamic body parameters
      dynamicBodyParams.forEach(param => {
        if (param.key && param.value) {
          bodyData[param.key] = param.value;
        }
      });
      
      curl += ` \\\n  -d '${JSON.stringify(bodyData, null, 2)}'`;
    }
    
    return curl;
  }
}
