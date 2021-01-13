var express = require('express');
var router = express.Router();

/* GET home page. */
let nowPlayerNum = 0
pname = ['','','','','','']

router.route('/').get(
    function(req, res) {
      res.render('index', { playerNum: nowPlayerNum });
    }
);

router.route('/join').post(
    function (req, res) {
      if(nowPlayerNum < 6) {
        if(req.session.user){
        }
        else{
          if(nowPlayerNum < 6){
            pname[nowPlayerNum] = req.body.id
          }
          req.session.user = {
            "id": nowPlayerNum,
            "name": req.body.id
          }
          nowPlayerNum++
        }
      }
      res.redirect('/table')
    }
)
module.exports = router;
