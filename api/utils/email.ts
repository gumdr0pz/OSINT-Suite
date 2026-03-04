import axios from 'axios';

export async function checkBreaches(email: string) {
  const apiKey = process.env.HIBP_API_KEY;
  if (!apiKey) return { status: 'skipped', message: 'HIBP API key missing' };

  try {
    const response = await axios.get(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'user-agent': 'Darknet-OSINT-Suite',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) return [];
    throw error;
  }
}

export async function verifyEmail(email: string) {
  const apiKey = process.env.HUNTER_IO_API_KEY;
  if (!apiKey) return { status: 'skipped', message: 'Hunter.io API key missing' };

  try {
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
