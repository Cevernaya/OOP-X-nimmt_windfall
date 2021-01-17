const express = require('express')
const router = express.Router()

const Dealer = require('../public/javascripts/Dealer.js').Dealer

let dealer

let nowPlayerNum = 0
let ptotal = 0
let phand , pboard
let pname = new Array(6).fill('')
let ppoint = new Array(6).fill(66)



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
          dealer = new Dealer(ptotal)
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
        phand = dealer.players[req.session.user.id].hand
        pboard = dealer.table.board
        res.render('table', { totalPlayerNum:ptotal, playerName: pname, playerPoint: ppoint, playerHand: phand, board: pboard})
    }
)
router.route('/table').post(
    function (req, res) {



        res.redirect('/table')
    }
)
module.exports = router;
