import axios from 'axios';

export async function getIpGeo(ip: string) {
  const token = process.env.IPINFO_TOKEN;
  const url = token ? `https://ipinfo.io/${ip}/json?token=${token}` : `https://ipinfo.io/${ip}/json`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { error: 'IP Geolocation failed' };
  }
}

export async function checkIpAbuse(ip: string) {
  const apiKey = process.env.ABUSEIPDB_API_KEY;
  if (!apiKey) return { status: 'skipped', message: 'AbuseIPDB API key missing' };

  try {
    const response = await axios.get(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,
      {
        headers: {
          'Key': apiKey,
          'Accept': 'application/json'
        }
      }
    );
    return response.data.data;
  } catch (error) {
    return { error: 'AbuseIPDB check failed' };
  }
}
