import { OSINTModule } from "./types";

export const OSINT_MODULES: OSINTModule[] = [
  {
    id: 'image-geo',
    name: 'IMAGE GEOLOCATION',
    description: 'Extract GPS data from image metadata or provide tactical manual guidance.',
    section: 'SCAN OPS',
    icon: 'MapPin'
  },
  {
    id: 'social-recon',
    name: 'SOCIAL MEDIA DEEP DIVE',
    description: 'Initiate username recon across prime social platforms.',
    section: 'SCAN OPS',
    icon: 'Users'
  },
  {
    id: 'email-breach',
    name: 'EMAIL BREACH & SOURCE SWEEP',
    description: 'Probe email breach databases and scrape public paste content.',
    section: 'SCAN OPS',
    icon: 'ShieldAlert'
  },
  {
    id: 'email-verify',
    name: 'EMAIL VERIFICATION & INTEL',
    description: 'Via Hunter.io & manual reverse lookup portals.',
    section: 'SCAN OPS',
    icon: 'CheckCircle'
  },
  {
    id: 'domain-intel',
    name: 'DOMAIN INTELLIGENCE',
    description: 'WHOIS records, DNS, and subdomain reconnaissance.',
    section: 'SCAN OPS',
    icon: 'Globe'
  },
  {
    id: 'metadata-ext',
    name: 'METADATA EXTRACTION',
    description: 'Decrypt EXIF and file data. Unveil hidden digital footprints.',
    section: 'SCAN OPS',
    icon: 'FileSearch'
  },
  {
    id: 'google-dork',
    name: 'GOOGLE DORKING',
    description: 'Inject advanced search payloads. Reveal secrets hidden in plain sight.',
    section: 'SCAN OPS',
    icon: 'Search'
  },
  {
    id: 'wayback',
    name: 'WAYBACK MACHINE DOMINATION',
    description: 'Raid web archives. Reconstruct the digital past.',
    section: 'TRACK & EXPLOIT',
    icon: 'History'
  },
  {
    id: 'ip-recon',
    name: 'IP GEOBLACKLIST RECON',
    description: 'Trace location, abuse reports, and expose hostile IP infrastructure.',
    section: 'TRACK & EXPLOIT',
    icon: 'Shield'
  },
  {
    id: 'web-scraper',
    name: 'WEBSITE METADATA & ENTITY SCRAPER',
    description: 'Deep crawl URLs, extract titles, meta, emails, persons, locations.',
    section: 'TRACK & EXPLOIT',
    icon: 'Database'
  },
  {
    id: 'phone-recon',
    name: 'PHONE NUMBER HACK-RECON',
    description: 'Validate and extract telecom info; generate attack dorks.',
    section: 'TRACK & EXPLOIT',
    icon: 'Phone'
  },
  {
    id: 'reverse-image',
    name: 'REVERSE IMAGE MISSIONS',
    description: 'Deploy visual reconnaissance on popular reverse image engines.',
    section: 'TRACK & EXPLOIT',
    icon: 'Image'
  },
  {
    id: 'geoint',
    name: 'GEOINT OPS',
    description: 'Visualize coordinates or places with satellite layers.',
    section: 'TRACK & EXPLOIT',
    icon: 'Satellite'
  }
];
