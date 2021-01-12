const Card = require("./Card.js").Card

class Deck{
    constructor () {
        this.maxNum = 104
        this.list = []
        for (let a = 0; a < this.maxNum; a++){
            let card = new Card(a+1)
            this.list.push(card)
        }
        shuffle(this.list)
    }

    deckPop(num){
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