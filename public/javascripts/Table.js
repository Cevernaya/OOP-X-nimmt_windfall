class Table {

    constructor(card) {
        this.board = [[], [], [], []]
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].push(card[i])
        }
    }


    setCard(card) {
        let number = card.number
        let gap = []
        for (let i = 0; i < 4; i++) {
            gap.push(number - this.board[i][-1].number)
        }

        let num = gap.indexOf(Math.max(...gap))
        if (Math.max(...gap) > 0) {
            this.board[num].push(card)
            if (this.board[num].length > 6) return this.takeCard(card, num)
            else return 0
        } else {
            num = onInput() // 외부 입력 받기
            return this.takeCard(card, num)
        }
    }

    takeCard(card, num) {
        let ret = 0
        for (let i = 0; i < this.board[num].length; i++) {
            ret += this.board[num][i].point
        }
        this.board[num] = [card]
        return ret
    }
}


exports.Table = Table