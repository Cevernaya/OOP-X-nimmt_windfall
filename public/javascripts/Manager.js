const Deck = require("./Deck.js").Deck
const Table = require("./Table.js").Table


class Manager {
    constructor() {
        let startCardNum = 4
        let deck = new Deck()
        this.table = new Table(deck.deckPop(startCardNum))
    }
}