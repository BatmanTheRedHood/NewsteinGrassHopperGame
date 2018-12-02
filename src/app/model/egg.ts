import { Coordinate } from "./coordinate";

export class Egg {
    // Properties
    public position: Coordinate;
    public size:number;
    public speed: number;

    public constructor(chickenPostion: Coordinate) {
        this.size = 50;
        this.speed = 1;
        this.position = new Coordinate(chickenPostion.x, chickenPostion.y);
    }

    public move() {
        this.position.y += this.speed; 
    }
}
