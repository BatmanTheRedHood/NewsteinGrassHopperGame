import { Coordinate } from "../coordinate";
import { Helper } from "src/app/helper/helper";

export class Ball {
    private static overlapFactor: number = 80;
    private static resizeFactor: number = 1;

    // Properties
    public position: Coordinate;
    public radius: number;
    public lastRadius: number;
    public speed: number;
    public dx: number;
    public dy: number;
    public color: string;

    private static colors: string[] = [
        "#92a8d1", "#034f84", "#f7cac9", "#f7786b",
        "#d5f4e6", "#80ced6", "#fefbd8", "#618685"
    ];


    public constructor() {
        this.radius = Helper.random(4, 10);
        this.lastRadius = this.radius;
        this.color = this.randomColor(Helper.random(0, 7));

        this.dx = 1;
        this.dy = 1;
        this.speed = Helper.random(0.5, 2.5);
        this.position = new Coordinate(Helper.random(this.radius, Helper.maxWidth), Helper.random(this.radius, Helper.maxHeight));
    }

    public move(mouse: Coordinate): void {
        this.checkBoundary();

        if (this.mouseOverlap(mouse)) {
            this.radius += Ball.resizeFactor;
        } else {
            this.radius = this.radius > this.lastRadius? this.radius - Ball.resizeFactor : this.lastRadius;
        }

        this.position.x += (this.dx * this.speed);
        this.position.y += (this.dy * this.speed);
    }

    private randomColor(rand: number): string {
        return Ball.colors[rand - (rand % 1)];
    }

    private checkBoundary(): void {
        if (this.position.x < this.radius || this.position.x > (Helper.maxWidth - this.radius)) {
            this.dx = -this.dx;
        }

        if (this.position.y < this.radius || this.position.y > (Helper.maxHeight - this.radius)) {
            this.dy = -this.dy;
        }
    }

    private mouseOverlap(mouse: Coordinate): boolean {
        let distance = Helper.distance(this.position, mouse);

        return distance < Ball.overlapFactor;
    }
}
