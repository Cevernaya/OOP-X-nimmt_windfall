const Deck = require("./Deck.js").Deck
const Table = require("./Table.js").Table
const Player = require("./Player.js").Player


class Dealer {
    constructor(totalPlayer) {
        let startBoardCard = 4
        this.deck = new Deck()
        this.table = new Table(this.deck.deckPop(startBoardCard))

        this.players = []
        const startHandCard = 10
        for (let n = 0; n < totalPlayer; n++) {
            let player = new Player(n)
            player.hand = this.deck.deckPop(startHandCard)
            this.players.push(player)
        }
    }

    playerChooseCard(playerNum, cardNum){
        let cardNumber = this.players[playerNum].hand[cardNum].number
        let card = this.players[playerNum].hand.splice(cardNum,1)
        return this.table.setCard(card)
    }

    playerChooseLine(playerNum, cardNum, card, boardNum){
        let point = this.table.takeCard(card, boardNum)
        this.players[playerNum].point -= point
    }
}

exports.Dealer = Dealer