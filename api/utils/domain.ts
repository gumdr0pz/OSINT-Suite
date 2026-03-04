import whois from 'whois-json';
import dns from 'dns';
import { promisify } from 'util';
import axios from 'axios';

const resolveDns = promisify(dns.resolve);

export async function getWhois(domain: string) {
  try {
    return await whois(domain);
  } catch (error) {
    return { error: 'WHOIS lookup failed' };
  }
}

export async function getDnsRecords(domain: string) {
  const types = ['A', 'MX', 'NS', 'TXT', 'AAAA'];
  const results: any = {};

  await Promise.all(
    types.map(async (type) => {
      try {
        results[type] = await resolveDns(domain, type);
      } catch (e) {
        results[type] = [];
      }
    })
  );

  return results;
}

export async function getSubdomains(domain: string) {
  try {
    const response = await axios.get(`https://crt.sh/?q=%25.${domain}&output=json`, {
      timeout: 10000
    });
    const subdomains = new Set<string>();
    response.data.forEach((entry: any) => {
      const names = entry.name_value.split('\n');
      names.forEach((name: string) => {
        const cleanName = name.trim().replace(/^\*\./, '');
        if (cleanName.endsWith(domain)) {
          subdomains.add(cleanName);
        }
      });
    });
    return Array.from(subdomains).sort();
  } catch (error) {
    return [];
  }
}
