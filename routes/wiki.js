const express = require('express');
const routes = express.Router();
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('../views/index');
const { db, Page, User } = require('../models');

routes.get('/', async (req, res, next) => {
  try {
    const pagesArr = await Page.findAll();
    res.send(main(pagesArr));
  } catch (e) {
    next(e);
  }
});

routes.post('/', async (req, res, next) => {
  // res.send('Youre posting /wiki/');
  const { name, email, title, content, status } = req.body;

  const page = new Page({
    title,
    content,
    status,
  });

  try {
    await page.save();
    res.redirect(page.slug);
    console.log(page.dataValues);
  } catch (e) {
    next(e);
  }
});

routes.get('/add', (req, res, next) => {
  res.send(addPage());
});

routes.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(wikiPage(page.dataValues));
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
