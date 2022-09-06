class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    [Symbol.for('+')](other) {
        const x = this.x + other.x
        const y = this.y + other.y
        return new Point(x, y);
    }
}

// Built in operators still work.

const x1 = 2
const x2 = 3
const x3 = x1 - x2
console.log(x3)

// Overridden operators work!
const p1 = new Point(5, 5)
const p2 = new Point(2, 3)
const p3 = new Point(4, 2)

const p4 = p1 + p2
const p5 = p4 + p3

console.log(p5.x)