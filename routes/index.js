var express = require('express');
var router = express.Router();
const getConnection = require('../db/connection');
var sha256 = require('sha256');
let title = '정보보안 과제4';

/* GET signup listing. */
router.get('/', function(req, res, next) {
  title = '정보보안 과제4';
  let result;
  console.log(req.query.user)
  if(req.query.user){
    title = req.query.user + " 님 가입 완료!"
  }
  res.render('index', { title: title, err:'' });
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  let data = {
    id: req.body.id,
    password: sha256(req.body.password)
  }
  getConnection(async(conn)=>{
    try {
      const result = await conn.query('SELECT nickname FROM user WHERE id=? and password=?',[data.id, data.password])
      console.log(result[0][0])
      if(result[0][0].nickname){
        res.redirect('/admin')
      }
    } catch (error) {
      res.render('index', { title: title, err:"잘못된 입력입니다."});
    }
  })
})

module.exports = router;
