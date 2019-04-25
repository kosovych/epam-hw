/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const log = require( INCPATH + '/log')(module);
const path = require('path');

let list;

fs.readFile(
    path.join(__dirname, '../../config/articles.json'),
    'utf8',
    function(err, data) {
      if (err) {
        return console.log(err);
      }
      list = data;
      list = JSON.parse(list);
    });

router.get('/list', (req, res) => {
  if (list.length === 0) {
    res.status(400);
    res.end(JSON.stringify({msg: 'Articles you want to delete is not exist'}));

  } else {
    log.info('==Get all list articles==');
    res.end(JSON.stringify(list));
  }
});

router.post('/list', function(req, res) {
  log.info('==Save article==');
  list.push(req.body);
  res.end(JSON.stringify(list));
});

router.delete('/list', (req, res) => {
  log.info('==Delete all articles==');
  list = [];
  res.end(JSON.stringify(list));
});

router.get('/list/:id', (req, res) => {
  log.info('==Get article by id==');
  const articleById = list.find((article) => +article.id === +req.params.id);
  if(articleById) {
    res.end(JSON.stringify(articleById));
  } else {
    res.status(404);
    res.end(JSON.stringify({msg: 'Article you want to get is not exist'}));
  }
});

router.put('/list/:id', (req, res) => {
  log.info('==Update article by id==');
  let articleById = list.find((article) => +article.id === +req.params.id);
  const indexOfArticle = list.indexOf(articleById);

  if (indexOfArticle < 0) {
    res.status(400);
    res.end(JSON.stringify({msg: 'Article you want to update is not exist'}));
  } else {
    articleById = {...articleById, ...req.body};
    list[indexOfArticle] = articleById;
    res.end(JSON.stringify(articleById));
  }
});

router.delete('/list/:id', (req, res) => {
  log.info('==Delete article by id==');
  let articleById = list.find((article) => +article.id === +req.params.id);
  const indexOfArticle = list.indexOf(articleById);
  console.log(indexOfArticle);

  if (indexOfArticle < 0) {
    res.status(400);
    res.statusText;
    res.end(JSON.stringify({msg: 'Article you want to delete is not exist'}));
  } else {
    list.splice(indexOfArticle, 1);
    res.status(200);
    res.end(JSON.stringify(list));
  }
});


module.exports = router;
