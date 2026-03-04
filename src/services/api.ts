import axios from 'axios';
import { ModuleId } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const osintService = {
  scanSocial: (username: string) => api.get(`/osint/social/${username}`),
  scanEmail: (email: string) => api.get(`/osint/email/${email}`),
  scanDomain: (domain: string) => api.get(`/osint/domain/${domain}`),
  scanIp: (ip: string) => api.get(`/osint/ip/${ip}`),
  scanPhone: (number: string) => api.get(`/osint/phone/${number}`),
  scrapeWebsite: (url: string) => api.post('/osint/scrape', { url }),
  extractMetadata: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/osint/metadata', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const historyService = {
  getHistory: () => api.get('/history'),
  deleteScan: (id: string) => api.delete(`/history/${id}`),
};
