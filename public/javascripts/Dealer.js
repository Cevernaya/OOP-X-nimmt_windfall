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

    playerChoose(playerNum, cardNum){
        let card = this.players[playerNum].hand.splice(cardNum,1)
        let point = this.table.setCard(card)
        if (point < 0){
            let num = 3  ///////////////외부입력
            point = this.table.takeCard(card, num)
        }
        this.players[playerNum].point -= point
    }
}

exports.Dealer = Dealer