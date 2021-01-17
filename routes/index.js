const express = require('express');
const router = express.Router();

let nowPlayerNum = 0
let ptotal = 0
pname = new Array(6).fill('')
ppoint = new Array(6).fill(63)
phand = new Array(6)



/* GET home page. */
router.route('/').get(function(req, res) {
      res.render('index', {title: 'X-nimmt', playerNum: nowPlayerNum });
    }
);

router.route('/join').post(
    function (req, res) {
      if(nowPlayerNum < 6) {
        if(nowPlayerNum == 0){
          ptotal = req.body.totalPlayer
        }

        if(!req.session.user){
          if(nowPlayerNum < 6){
            pname[nowPlayerNum] = req.body.playerName
          }
          req.session.user = {
            "id": nowPlayerNum,
            "name": req.body.playerName
          }
          nowPlayerNum++
        }
      }
      res.redirect('/table')
    }
)

router.route('/table').get(
    function (req, res) {
        res.render('table', { totalPlayerNum:ptotal, playerName: pname, playerPoint: ppoint, playerHand: phand})
    }
)

module.exports = router;
