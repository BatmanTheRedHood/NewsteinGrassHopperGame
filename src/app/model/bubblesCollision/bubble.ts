import { Coordinate } from "../coordinate";
import { Helper } from "src/app/helper/helper";

export class Bubble {

    // Properties
    public position: Coordinate;
    public radius: number;
    public speed: number;
    public dx: number;
    public dy: number;
    public color: string;

    public constructor() {
        this.radius = Helper.random(50, 100);
        this.color = Helper.randomColor();

        this.dx = 1;
        this.dy = 1;
        this.speed = Helper.random(0.1, 1.5);
        this.position = new Coordinate(Helper.random(2 * this.radius, Helper.maxWidth - 2 * this.radius), Helper.random(2 * this.radius, Helper.maxHeight - 2 * this.radius));
    }

    public move(): void {
        this.checkBoundary();

        this.position.x += (this.dx * this.speed);
        this.position.y += (this.dy * this.speed);
    }

    private checkBoundary(): void {
        if (this.position.x < this.radius || this.position.x > (Helper.maxWidth - this.radius)) {
            this.dx = -this.dx;
        }

        if (this.position.y < this.radius || this.position.y > (Helper.maxHeight - this.radius)) {
            this.dy = -this.dy;
        }
    }
}
