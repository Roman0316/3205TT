const { BadRequest, InternalServerError, NotFound } = require('http-errors');
const { nanoid } = require('nanoid');

const { PORT, URL } = require('../dotenv/config');
const {
  get, set, del, getTtl,
} = require('../services/redis');
const { redisConfig } = require('../dotenv/config');
const isValidUrl = require('../utils/isValidUrl');

async function createShortURL({ originalUrl, expiresIn, alias }) {
  if (!originalUrl) {
    throw new BadRequest('The originalUrl field is mandatory');
  }
  if (!isValidUrl(originalUrl)) {
    throw new BadRequest('Invalid URL');
  }

  const { DEFAULT_EX } = redisConfig;
  let shortHash;

  if (alias) {
    if (alias.length > 20) {
      throw new BadRequest('Alias length must not exceed 20 characters');
    }
    const existingAlias = await get(alias);
    if (existingAlias) {
      throw new BadRequest('Alias already in use');
    }
    shortHash = alias;
  } else {
    shortHash = nanoid(6);
    const existingHash = await get(shortHash);
    if (existingHash) {
      throw new InternalServerError('Generation error, repeat the request');
    }
  }

  await set(shortHash, {
    originalUrl, createdAt: new Date(), clickCount: 0, analytics: [{ timeToClick: null, ipAddress: null }],
  }, expiresIn || DEFAULT_EX);
  return `${URL}:${PORT}/${shortHash}`;
}

async function getOriginalUrl({ shortUrl }, ip) {
  const url = await get(shortUrl);
  if (!url) {
    throw new NotFound('Reference not found');
  }
  url.clickCount += 1;
  url.analytics[0].timeToClick = new Date();
  url.analytics[0].ipAddress = ip.split(':').pop();
  const ttl = await getTtl(shortUrl);
  await set(shortUrl, url, ttl);
  return url.originalUrl;
}

async function getInfo({ shortUrl }) {
  const { originalUrl, createdAt, clickCount } = await get(shortUrl);
  return { originalUrl, createdAt, clickCount };
}

async function deleteShortUrl({ shortUrl }) {
  await del(shortUrl);
}

async function getAnalytics({ shortUrl }) {
  const analytics = await get(shortUrl);
  return analytics;
}

module.exports = {
  createShortURL,
  getOriginalUrl,
  getInfo,
  deleteShortUrl,
  getAnalytics,
};
