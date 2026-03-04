# Darknet OSINT Suite v3.0

A comprehensive full-stack OSINT (Open Source Intelligence) platform designed for tactical reconnaissance and digital footprint analysis.

## Overview
The Darknet OSINT Suite is a modular platform that aggregates various OSINT techniques into a unified, high-performance web interface. It allows operators to perform deep-dive investigations into usernames, emails, domains, IPs, and more.

## Services
- **Image Geolocation**: Extract GPS data from EXIF metadata.
- **Social Media Recon**: Automated username search across 30+ platforms.
- **Email Intelligence**: Breach detection (HIBP), verification (Hunter.io), and paste scraping.
- **Domain Recon**: WHOIS, DNS records, and subdomain harvesting (crt.sh).
- **Metadata Extraction**: Forensic file analysis.
- **IP Intelligence**: Geolocation and abuse reporting (AbuseIPDB).
- **Website Scraper**: Entity extraction (PERSON, LOC, GPE) using NLP.
- **Phone Recon**: Telecom info and validation.
- **Wayback Machine**: Historical web archive reconstruction.

## Local Run
### Prerequisites
- Node.js 18+
- Docker & Docker Compose (optional)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Env Vars
Required API keys for full functionality:
- `HIBP_API_KEY`: Have I Been Pwned API.
- `HUNTER_IO_API_KEY`: Hunter.io for email verification.
- `ABUSEIPDB_API_KEY`: AbuseIPDB for IP reputation.
- `IPINFO_TOKEN`: ipinfo.io for IP geolocation.

## Basic API List
- `GET /api/osint/social/:username`: Search social media profiles.
- `GET /api/osint/email/:email`: Analyze email breaches and verification.
- `GET /api/osint/domain/:domain`: Perform domain intelligence.
- `GET /api/osint/ip/:ip`: Geolocation and abuse check.
- `POST /api/osint/metadata`: Extract metadata from uploaded files.
- `POST /api/osint/scrape`: Scrape website for entities.
