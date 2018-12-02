import { Coordinate } from "./coordinate";
import { Direction } from "../DataTypes/direction.enum";
import { Helper } from "../helper/helper";

export class Basket {
    // Properties
    public position: Coordinate;
    public size:number;
    public speed: number;

    public constructor() {
        this.size = 100;
        this.speed = 1;
        this.position = new Coordinate(Helper.maxWidth/2, 40);
    }

    public move(direction: Direction) {
        
    }
}
