import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url: string) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const $ = cheerio.load(response.data);
    
    const title = $('title').text().trim();
    const meta: any = {};
    $('meta').each((i, el) => {
      const name = $(el).attr('name') || $(el).attr('property');
      const content = $(el).attr('content');
      if (name && content) {
        meta[name.toLowerCase()] = content;
      }
    });

    const text = $('body').text();
    const emails = Array.from(new Set(text.match(/[\w\.-]+@[\w\.-]+\.\w+/g) || []));

    return {
      title,
      meta,
      emails,
      url
    };
  } catch (error) {
    throw new Error('Website scraping failed');
  }
}
