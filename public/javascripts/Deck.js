const Card = require("./Card.js").Card

class Deck{
    constructor () {
        this.list = []
        for (let a = 0; a < 104; a++){
            let card = new Card(a+1)
            this.list.push([card.number, card.point])
        }
    }

    deckPop(num){
        shuffle(this.list)
        return this.list.splice(-num)
    }
}

exports.Deck = Deck


function shuffle(li) {
    var j, x, i
    for (i = li.length; i; i -= 1) {
        j = Math.floor(Math.random() * i)
        x = li[i - 1]
        li[i - 1] = li[j]
        li[j] = x
    }
}