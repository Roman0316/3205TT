const { Router } = require('express');

const wrap = require('../utils/wrap');
const { urlController } = require('../controllers/index');

const urlRouter = Router();

urlRouter.post(
  '/shorten',
  wrap(async (req, res) => {
    const shortUrl = await urlController.createShortURL(req.body);
    res.json(shortUrl);
  }),
);

urlRouter.get(
  '/info/:shortUrl',
  wrap(async (req, res) => {
    const info = await urlController.getInfo(req.params);
    res.json(info);
  }),
);

urlRouter.delete(
  '/delete/:shortUrl',
  wrap(async (req, res) => {
    await urlController.deleteShortUrl(req.params);
    res.status(204).end();
  }),
);

urlRouter.get(
  '/analytics/:shortUrl',
  wrap(async (req, res) => {
    const analytics = await urlController.getAnalytics(req.params);
    res.json(analytics);
  }),
);

urlRouter.get(
  '/:shortUrl',
  wrap(async (req, res) => {
    const originalUrl = await urlController.getOriginalUrl(req.params, req.ip);
    res.redirect(originalUrl);
  }),
);

module.exports = urlRouter;
