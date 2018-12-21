let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../db").getDb;

router.get('/getAll', (req,resp) => {
    const db = getDb();
    db.query("Select id, name from heroes", function(err, res, fields) {
        if(err) {
            resp.status(400).json({"message":"Something went wrong..."});
        } else if(res.length === 0 || res === undefined) {
            resp.status(404).json({"message":"No Heroes found..."});
        } else {
            let responseJSON = {};
            for (let i = 0; i < res.length; i++) {
                responseJSON[i] = {
                    "id": res[i].id,
                    "name": res[i].name
                };
            }
            resp.status(200).json(responseJSON);
        }
    });
});

router.get('/id/:id', (req, resp) => {
    const db = getDb();
    db.query("select name from heroes where id="+req.params.id, function(err,res,fields){
        if(err) {
            resp.status(400).json({"message":"Something went wrong..."});
        } else if(res.length === 0 || res === undefined) {
            resp.status(404).json({"message":"No Hero with id=" + req.params.id + " was found..."});
        } else {
            let responseJSON = {"id":req.params.id,"name":res[0].name};
            resp.status(200).json(responseJSON);
        }
    });
});

router.get('/search/:name', (req, resp) => {
    const db = getDb();
    db.query("select id, name from heroes where name like '%"+req.params.name + "%'", function(err,res,fields){
        if(err) {
            resp.status(400).json({"message":"Something went wrong..."});
        } else if(res.length === 0 || res === undefined) {
            resp.status(404).json({"message":"No Hero with name '" + req.params.name + "' was found..."});
        } else {
            let responseJSON = {};
            for (let i = 0; i < res.length; i++) {
                responseJSON[i] = {
                    "id": res[i].id,
                    "name": res[i].name
                };
            }
            resp.status(200).json(responseJSON);
        }
    });
});
router.post('/newHero', (req,resp) => {
    const db = getDb();
    db.query("insert into heroes(name) values('"+req.body.name + "')", function(err,res,fields){
        if(err || res.affectedRows === 0 || res === undefined) {
            resp.status(400).json({"message":"Something went wrong..."});
        }
    });
    db.query("select id from heroes where name='" + req.body.name + "'", (err,res,fields) => {
        if(err) {
            resp.status(402).json({"message":"Cannot retireve requested DB entry..."});
        } else {
            resp.status(200).json({"id":res[0].id,"name":req.body.name});
        }
    });
});
router.delete('/delHero/:id',(req,resp) => {
    const db = getDb();
    db.query("delete from heroes where id="+req.params.id, function(err,res,fields){
        if(err || res.affectedRows === 0 || res === undefined) {
            resp.status(400).json({"message":"Something went wrong..."});
        } else {
            resp.status(200).json({"message":"successfully deleted hero with id=" + req.params.id});
        }
    });
});
router.put('/update', (req,resp) => {
    const db = getDb();
    db.query("update heroes set name=" + req.body.name + " where id=" + req.body.id, function(err,res,fields) {
        if(err || res.affectedRows === 0 || res === undefined) {
            resp.status(400).json({"message":"Something went wrong..."});
        } else {
            resp.status(200).json({"message":"successfully updated hero with id=" + req.body.id});
        }
    });
});
module.exports = router;
