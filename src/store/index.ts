import { create } from 'zustand';
import { AppState, AppActions, ApiResponse } from '../types';

interface Store extends AppState, AppActions {}

export const useStore = create<Store>()((set, get) => ({
  // State
  selectedEndpoint: null,
  isDarkMode: false,
  apiKey: 'b9a31935-a222-4bdd-bfc6-a63e6bb01e39',
  formData: {},
  dynamicQueryParams: [],
  dynamicHeaders: [],
  dynamicBodyParams: [],
  enabledBodyParams: {},
  lastResponse: null,
  isLoading: false,
  viewMode: 'form',

  // Actions
  setSelectedEndpoint: (endpointId: string) => {
    set({
      selectedEndpoint: endpointId,
      formData: {},
      dynamicQueryParams: [],
      dynamicHeaders: [],
      dynamicBodyParams: [],
      enabledBodyParams: {},
      lastResponse: null
    });
  },

  toggleDarkMode: () => {
    const newMode = !get().isDarkMode;
    set({ isDarkMode: newMode });
    
    // Apply theme to document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setApiKey: (apiKey: string) => {
    set({ apiKey });
  },

  updateFormData: (data: Record<string, any>) => {
    set((state) => ({ 
      formData: { ...state.formData, ...data }
    }));
  },

  setLastResponse: (response: ApiResponse | null) => {
    set({ lastResponse: response });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  setViewMode: (mode: 'form' | 'code') => {
    set({ viewMode: mode });
  },

  setDynamicQueryParams: (params) => {
    set({ dynamicQueryParams: params });
  },
  setDynamicHeaders: (headers) => {
    set({ dynamicHeaders: headers });
  },
  setDynamicBodyParams: (params) => {
    set({ dynamicBodyParams: params });
  },

  setEnabledBodyParams: (params: Record<string, boolean>) => {
    set({ enabledBodyParams: params });
  },

  toggleBodyParam: (paramName: string, enabled: boolean) => {
    set((state) => ({
      enabledBodyParams: {
        ...state.enabledBodyParams,
        [paramName]: enabled
      }
    }));
  }
}));
