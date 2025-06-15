// API Configuration Types
export interface ApiEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST';
  url: string;
  description: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  bodySchema: Record<string, any>;
  requiresBody: boolean;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
  timestamp: number;
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[];
  description?: string;
}

export interface AppState {
  selectedEndpoint: string | null;
  isDarkMode: boolean;
  apiKey: string;
  formData: Record<string, any>;
  dynamicQueryParams: KeyValuePair[];
  dynamicHeaders: KeyValuePair[];
  dynamicBodyParams: KeyValuePair[];
  enabledBodyParams: Record<string, boolean>;
  lastResponse: ApiResponse | null;
  isLoading: boolean;
  viewMode: 'form' | 'code';
}

// Store actions
export interface AppActions {
  setSelectedEndpoint: (endpointId: string) => void;
  toggleDarkMode: () => void;
  setApiKey: (apiKey: string) => void;
  updateFormData: (data: Record<string, any>) => void;
  setDynamicQueryParams: (params: KeyValuePair[]) => void;
  setDynamicHeaders: (headers: KeyValuePair[]) => void;
  setDynamicBodyParams: (params: KeyValuePair[]) => void;
  setEnabledBodyParams: (params: Record<string, boolean>) => void;
  toggleBodyParam: (paramName: string, enabled: boolean) => void;
  setLastResponse: (response: ApiResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setViewMode: (mode: 'form' | 'code') => void;
}

export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}
