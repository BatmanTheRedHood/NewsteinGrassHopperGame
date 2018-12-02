import { Coordinate } from "./coordinate";
import { Direction } from "../DataTypes/direction.enum";
import { Egg } from "./egg";
import { Helper } from "../helper/helper";

export class Chicken {
    // Properties
    public position: Coordinate;
    public size:number;
    private speed: number;
    private direction: Direction;

    public eggs: Egg[];

    public constructor() {
        this.size = 100;
        this.speed = 1;
        this.direction = Direction.Left;
        this.position = new Coordinate(
            Helper.random(Helper.maxWidth - 400, Helper.maxWidth - this.size/2), 
            Helper.maxHeight - this.size/2);

        this.eggs = [];
    }

    public move() {
        switch (this.direction) {
            case Direction.Left:
                this.position.x -= this.speed;
                break; 

            case Direction.Right:
                this.position.x += this.speed;
                break;  
        }

        this.checkBoundary();
    }

    public changeDirection() : void {
        if (this.direction == Direction.Left) {
            this.direction = Direction.Right;
        } else {
            this.direction = Direction.Left;
        }
    }

    public layEgg(): void {
        let egg = new Egg(this.position);
        this.eggs.splice(0, 0, egg); // Add egg at start;
    }

    private checkBoundary() : void {
        if (this.position.x < this.size/2) {
            this.changeDirection();
        } else if (this.position.x > (Helper.maxWidth - this.size/2)) {
            this.changeDirection();
        }
    }
}
