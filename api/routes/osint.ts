import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { checkUsername } from '../utils/social';
import { checkBreaches, verifyEmail } from '../utils/email';
import { getWhois, getDnsRecords, getSubdomains } from '../utils/domain';
import { getIpGeo, checkIpAbuse } from '../utils/ip';
import { extractMetadata } from '../utils/metadata';
import { scrapeWebsite } from '../utils/scraper';
import { checkPhone } from '../utils/phone';
import { saveScan } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Social Media Recon
router.get('/social/:username', async (req, res) => {
  try {
    const results = await checkUsername(req.params.username);
    saveScan({
      id: uuidv4(),
      moduleId: 'social-recon',
      target: req.params.username,
      data: results
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Email Recon
router.get('/email/:email', async (req, res) => {
  try {
    const [breaches, verification] = await Promise.all([
      checkBreaches(req.params.email),
      verifyEmail(req.params.email)
    ]);
    const results = { breaches, verification };
    saveScan({
      id: uuidv4(),
      moduleId: 'email-breach',
      target: req.params.email,
      data: results
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Domain Recon
router.get('/domain/:domain', async (req, res) => {
  try {
    const [whois, dns, subdomains] = await Promise.all([
      getWhois(req.params.domain),
      getDnsRecords(req.params.domain),
      getSubdomains(req.params.domain)
    ]);
    const results = { whois, dns, subdomains };
    saveScan({
      id: uuidv4(),
      moduleId: 'domain-intel',
      target: req.params.domain,
      data: results
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// IP Recon
router.get('/ip/:ip', async (req, res) => {
  try {
    const [geo, abuse] = await Promise.all([
      getIpGeo(req.params.ip),
      checkIpAbuse(req.params.ip)
    ]);
    const results = { geo, abuse };
    saveScan({
      id: uuidv4(),
      moduleId: 'ip-recon',
      target: req.params.ip,
      data: results
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Metadata Extraction
router.post('/metadata', upload.single('file'), async (req: any, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  try {
    const metadata = await extractMetadata(req.file.path);
    saveScan({
      id: uuidv4(),
      moduleId: 'metadata-ext',
      target: req.file.originalname,
      data: metadata
    });
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    res.json(metadata);
  } catch (error: any) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: error.message });
  }
});

// Website Scraper
router.post('/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const results = await scrapeWebsite(url);
    saveScan({
      id: uuidv4(),
      moduleId: 'web-scraper',
      target: url,
      data: results
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Phone Recon
router.get('/phone/:number', async (req, res) => {
  try {
    const results = await checkPhone(req.params.number);
    saveScan({
      id: uuidv4(),
      moduleId: 'phone-recon',
      target: req.params.number,
      data: results
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
