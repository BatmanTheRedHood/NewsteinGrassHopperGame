import { Direction } from "../DataTypes/direction.enum";
import { Coordinate } from "./coordinate";
import { Helper } from "../helper/helper";
import { Food } from "./food";
import { ElementRef } from "@angular/core";

export class Snake {
    // Fields
    public direction: Direction;
    public position: Coordinate;
    private tail: Coordinate; // Will not use for now. Head = Tail
    public size: number; // Will keep fixed size 1 for now.
    
    // Properties
    public get drawPosition() : Coordinate {
        if (this.position)
            return new Coordinate(this.position.x - this.size / 2, this.position.y - this.size / 2);

        return null;
    }
    
    // Constructor
    public constructor() {
        this.size = 100;
        this.direction = Direction.Left;
        this.position = new Coordinate(
            Helper.random(400, Helper.maxWidth - 50), 
            Helper.random(50, Helper.maxHeight - 50));
    }

    // #region Methods
    public move() : void {
        switch (this.direction) {
            case Direction.Up:
                this.position.y -= 1;
                break; 

            case Direction.Down:
                this.position.y += 1;
                break; 

            case Direction.Left:
                this.position.x -= 1;
                break; 

            case Direction.Right:
                this.position.x += 1;
                break;  
        }
    }

    public changeDirection(direction: Direction) {
        this.direction = direction;
    }

    public checkCollision(): boolean {
        if (this.position.x < 0 || 
            this.position.x > Helper.maxWidth ||
            this.position.y < 0 || 
            this.position.y > Helper.maxHeight) {
            return true;
        }

        return false;
    }

    public canEat(food: Food): boolean {
        if (
            Math.abs(this.position.x - food.position.x) < 50 &&
            Math.abs(this.position.y - food.position.y) < 50) {
            return true;
        }

        return false;
    }

    // #endregion
}
