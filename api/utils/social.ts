import axios from 'axios';
import * as cheerio from 'cheerio';

export async function checkUsername(username: string) {
  const platforms = [
    { name: 'Facebook', url: `https://www.facebook.com/${username}` },
    { name: 'Twitter', url: `https://twitter.com/${username}` },
    { name: 'Instagram', url: `https://www.instagram.com/${username}/` },
    { name: 'GitHub', url: `https://github.com/${username}` },
    { name: 'Reddit', url: `https://www.reddit.com/user/${username}` },
    { name: 'YouTube', url: `https://www.youtube.com/@${username}` },
    { name: 'TikTok', url: `https://www.tiktok.com/@${username}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/in/${username}` },
    { name: 'Telegram', url: `https://t.me/${username}` },
    { name: 'Pinterest', url: `https://www.pinterest.com/${username}` },
    { name: 'Snapchat', url: `https://www.snapchat.com/add/${username}` },
    { name: 'Twitch', url: `https://www.twitch.tv/${username}` },
    { name: 'Steam', url: `https://steamcommunity.com/id/${username}` },
  ];

  const results = await Promise.all(
    platforms.map(async (platform) => {
      try {
        const response = await axios.get(platform.url, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          timeout: 5000,
          validateStatus: (status) => status < 500,
        });
        
        // Simple heuristic: 200 usually means exists, 404 means doesn't
        // Some sites return 200 for "not found" pages, but this is a start
        return {
          platform: platform.name,
          url: platform.url,
          exists: response.status === 200,
        };
      } catch (error) {
        return {
          platform: platform.name,
          url: platform.url,
          exists: false,
          error: true
        };
      }
    })
  );

  return results;
}
