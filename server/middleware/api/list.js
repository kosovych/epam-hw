/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const log = require( INCPATH + '/log')(module);
const path = require('path');
const Article = require('../../shemas/article');
const mongoose = require('mongoose');
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
      Article.deleteMany({}, (err) => {
        if (err) {
          console.log(err);
        }
      })
      list.map(listItem => {
        let mokArticle = new Article({...listItem});
        mokArticle.save();
      })
    });



router.get('/list', (req, res) => {
  log.info('==Get all list articles==');
  if (list.length === 0) {
    res.status(400);
    res.end(JSON.stringify({msg: 'Articles you want to delete is not exist'}));

  } else {
    Article.find({}, (err, articles) => {
      if(err) {
        console.log(error);
        res.status = 500;
        res.end();
      }
      res.end(JSON.stringify(articles));
    })
  }
});

router.post('/list', function(req, res) {
  log.info('==Save article==');
  let newArticle = new Article({...req.body});
  newArticle.save((err, doc) => {
    if (err) {
      console.log(err);
      res.status = 500;
      res.end();
    }
    res.end(JSON.stringify(newArticle));
  });
});

router.delete('/list', (req, res) => {
  log.info('==Delete all articles==');
  Article.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
      res.status = 500;
      res.end();
    }
    res.end(JSON.stringify([]));
  })
});

router.get('/list/:id', (req, res) => {
  log.info('==Get article by id==');
  let atricleID = req.params.id;
  Article.findOne({id: atricleID}, (err, article) => {
    if(err) {
      res.status(400);
      return res.end(JSON.stringify({msg: 'Article you want to get is not exist'}));
    } 
    res.end(JSON.stringify(article));
  })
});

router.put('/list/:id', (req, res) => {
  log.info('==Update article by id==');
  const articleID = req.params.id;
  Article.findOne({id: articleID}, (err, article) => {
    console.log(article.toObject());
    if(err) {
      res.status(400);
      return res.end(JSON.stringify({msg: 'Article you want to update is not exist'}));
    }
    updatedArticle = {...article.toObject(), ...req.body};
    console.log(articleID);
    Article.updateOne({id: articleID}, {$set: {...updatedArticle}}, (err, doc) => {
      res.end(JSON.stringify(doc));
    });
  })
});

router.delete('/list/:id', (req, res) => {
  log.info('==Delete article by id==');
  Article.deleteOne({id: req.params.id}, (err) => {
    if (err) {
      console.log(err);
      res.status = 500;
      return res.end()
    }
    res.status(200);
    res.end(JSON.stringify(list));
  });
});

module.exports = router;
