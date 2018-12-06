import { Coordinate } from "../coordinate";
import { Helper } from "src/app/helper/helper";

export class MatrixSymbol {
    public head: Coordinate;
    public tail: Coordinate;

    public currentChar: string;
    public nextChar: string;
    public speed: number;
    public speedCounter: number;
    public colorIndex: number;
    public font: number;

    public constructor(x: number) {
        this.head = new Coordinate(x, Helper.random(10, 100));
        this.tail = new Coordinate(x, this.head.y);
        this.font = Helper.randomInt(10, 21)
        this.colorIndex = Helper.doubleToInt((this.font - 10)/4);
        this.speed = Helper.randomInt(1, 30);
        this.speedCounter = this.speed;

        this.nextChar = Helper.randomSymbol();
        this.currentChar = this.nextChar;
    }

    public update(): void {
        if (this.head.y <= Helper.maxHeight +  this.font) {

            if (this.speedCounter < 0) {
                this.head.y += this.font;

                this.currentChar = this.nextChar;
                this.nextChar = Helper.randomSymbol();
                this.speedCounter = this.speed;
            } else {
                this.speedCounter--;
            }
        } else {
            if (this.speedCounter < 0) {
                this.tail.y += (2 * this.font);
                this.speedCounter = this.speed;
            } else {
                this.speedCounter--;
            }
        }
    }
}
