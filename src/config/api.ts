import { ApiEndpoint } from '../types';

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'moments',
    name: 'Moments API',
    method: 'POST',
    url: 'https://api.adspostx.com/native/v2/offers.json',    description: 'Deliver relevant perks at key customer journey moments to boost loyalty and engagement',
    headers: {
      'Content-Type': 'application/json'
    },
    queryParams: {},
    bodySchema: {
      dev: '1',
      ip: '192.168.1.1',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      membershipID: '',
      adpx_fp: '',
      pub_user_id: '',
      sub_id: '',
      placement: 'homepage',
      country: 'US',
      state: '',
      city: '',
      zip: '',
      age: '',
      gender: '',
      device_type: 'desktop'
    },
    requiresBody: true
  },  {
    id: 'perkswall',
    name: 'Perkswall API',
    method: 'POST',
    url: 'https://api.adspostx.com/native/v4/perkswall.json',    description: 'Access curated perks in a central location for customers - your unique destination to reward and retain',
    headers: {
      'Content-Type': 'application/json'
    },
    queryParams: {},
    bodySchema: {
      sub_id: '',
      adpx_fp: '',
      pub_user_id: '',
      device_type: 'web',
      country: 'US',
      state: '',
      city: '',
      zip: '',
      ip: '192.168.1.1',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      age: '',
      gender: '',
      interests: '',
      platform: 'web'
    },
    requiresBody: true
  },
  {
    id: 'catalog',
    name: 'Offer Catalog API',
    method: 'GET',
    url: 'https://api.adspostx.com/native/v3/catalog.json',
    description: 'Browse the complete catalog of available offers and perks from major brands across all verticals',
    headers: {
      'Content-Type': 'application/json'
    },    queryParams: {
      category: '',
      country: 'US',
      limit: '50',
      offset: '0'
    },
    bodySchema: {
      filters: {
        category: '',
        brand: '',
        min_payout: '',
        max_payout: '',
        device_type: 'web'
      }
    },
    requiresBody: true
  },
  {
    id: 'reporting',
    name: 'Reporting API',
    method: 'GET',
    url: 'https://api.adspostx.com/native/activity.json',
    description: 'Access comprehensive analytics and activity reports for tracking performance and conversions',
    headers: {},    queryParams: {
      start_date: '',
      end_date: '',
      group_by: 'date',
      timezone: 'UTC',
      format: 'json'
    },
    bodySchema: {},
    requiresBody: false
  }
];

export const getEndpointById = (id: string): ApiEndpoint | undefined => {
  return API_ENDPOINTS.find(endpoint => endpoint.id === id);
};
