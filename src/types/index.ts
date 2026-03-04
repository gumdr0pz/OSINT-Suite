export type ModuleId = 
  | 'image-geo'
  | 'social-recon'
  | 'email-breach'
  | 'email-verify'
  | 'domain-intel'
  | 'metadata-ext'
  | 'google-dork'
  | 'wayback'
  | 'ip-recon'
  | 'web-scraper'
  | 'phone-recon'
  | 'reverse-image'
  | 'geoint';

export interface OSINTModule {
  id: ModuleId;
  name: string;
  description: string;
  section: 'SCAN OPS' | 'TRACK & EXPLOIT';
  icon: string;
}

export interface ScanResult {
  id: string;
  moduleId: ModuleId;
  timestamp: string;
  target: string;
  data: any;
}
