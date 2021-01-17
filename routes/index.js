const express = require('express')
const router = express.Router()

const Dealer = require('../public/javascripts/Dealer.js').Dealer

let dealer

let nowPlayerNum = 0
let ptotal = 0
let phand , pboard
let pname = new Array(6).fill('')
let ppoint = new Array(6).fill(66)
let selectedCard = []
let state = true //true : pass , false : choose


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

        if (state) {
            if (selectedCard.length == ptotal) {
                state = false
            }
        }
        else {
            selectedCard = selectedCard.sort(i => i[1].number).reverse()
            for (var i = 0; i < selectedCard.length; i++) {
                let chose = selectedCard.pop()
                let stt = dealer.playerChooseCard(chose[0],chose[1])
                if (stt[0]) {
                    let boardNum = takeList(chose[0])
                    dealer.playerChooseLine(chose[0], stt[1], boardNum)
                }
            }
            state = true
        }
        res.render('table', {
            state: state,
            selectedCard: selectedCard,
            totalPlayerNum: ptotal,
            playerName: pname,
            playerPoint: ppoint,
            playerHand: phand,
            board: pboard
        })
    }
)


router.route('/choice').post(
    function (req, res) {
        let cardIndex = req.body.selectedCardNum
        let choose = [true]
        selectedCard.forEach((item, index, arr) => {
            if (item[0] == req.session.user.id) {
                choose = [false, index]
            }
        })
        if (choose[0]) {
            selectedCard.push([req.session.user.id, cardIndex, dealer.players[req.session.user.id].hand[cardIndex]])
        } else {
            selectedCard[choose[1]] = [req.session.user.id, cardIndex, dealer.players[req.session.user.id].hand[cardIndex]]
        }
        res.redirect('/table')
    }
)
module.exports = router;

function takeList(playerNum){
    let ret =''
    while (true) {
        router.route('/select').post(
            function (req, res) {
                ret = req.body.listIndex
            }
        )
        if (playerNum == req.session.user.id && !ret){
            break
        }
        res.redirect('/table')
    }
    return ret
    res.redirect('/table')
}
