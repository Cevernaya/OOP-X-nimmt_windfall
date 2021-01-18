const express = require('express')
const router = express.Router()

const Dealer = require('../public/javascripts/Dealer.js').Dealer

let dealer

let nowPlayerNum = 0
let ptotal = 0
let phand , pboard ,state
let pname = new Array(6).fill('')
let ppoint = new Array(6).fill(66)
let selectedCardNum = []
let selectedCard = []


/* GET home page. */
router.route('/').get(function(req, res) {
      res.render('index', {title: 'X-nimmt', playerNum: nowPlayerNum });
    }
)

router.route('/join').post(
    function (req, res) {
      if(nowPlayerNum < 6) {
        if(nowPlayerNum == 0){
          ptotal = req.body.totalPlayer
          dealer = new Dealer(ptotal)
          state = ptotal+1
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
    async function (req, res) {
        phand = dealer.players[req.session.user.id].hand
        pboard = dealer.table.board

        if (state == ptotal+1) {
            if (selectedCardNum.length == ptotal) {

                selectedCardNum = selectedCardNum.sort(item => dealer.players[item[0]].hand[item[1]])
                console.log(selectedCardNum)
                for (let item of selectedCardNum){
                    selectedCard.push(dealer.players[item[0]].hand[item[1]])
                }
                console.log(selectedCard)
                state = 1
            }
        }
        else {
            let card = selectedCard[0]
            let chose = selectedCardNum[0]
            console.log(chose)
            if (dealer.playerChooseCard(...chose)){
                delay(10)
                selectedCard.shift()
                await function(){selectedCardNum.shift()}
                state++
            }
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


        if (state != ptotal+1) res.redirect('/table')

        let cardIndex = Number(req.body.selectedCardNum)
        let choose = [true]
        selectedCardNum.forEach((item, index, arr) => {
            if (item[0] == req.session.user.id) {
                choose = [false, index]
            }
        })
        if (choose[0]) {
            selectedCardNum.push([req.session.user.id, cardIndex])
        } else {
            selectedCardNum[choose[1]] = [req.session.user.id, cardIndex]
        }
        console.log(selectedCardNum)
        res.redirect('/table')
    }
)

router.route('/select').post(
    function (req, res) {
        if(state != req.session.user.id) res.redirect('/table')


        let card = selectedCard[0]
        let chose = selectedCardNum[0]
        if (dealer.playerChooseCard(...chose)){
            dealer.playerChooseLine(...chose, card, req.body.listIndex)
        }
        selectedCard.shift()
        selectedCardNum.shift()
        state++
    }
)

module.exports = router;


function delay(gap){
    var then,now
    then=new Date().getTime()
    now=then
    while((now-then)<gap){
        now=new Date().getTime()
    }
}