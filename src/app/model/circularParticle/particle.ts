import { Coordinate } from "../coordinate";
import { Helper } from "src/app/helper/helper";

export class Particle {
    // Properties
    public position: Coordinate;
    public lastPosition: Coordinate;
    public radius: number;
    public radians: number;
    public velocity: number;
    public color: string;
    public motionRadius;

    private static colors: string[] = [
        "#92a8d1", "#034f84", "#f7cac9", "#f7786b",
        "#d5f4e6", "#80ced6", "#fefbd8", "#618685"
    ];


    public constructor(center: Coordinate) {
        this.radius = Helper.random(4, 10);
        this.motionRadius = Helper.random(100, 200);
        this.color = this.randomColor(Helper.random(0, 7));

        this.radians = 0;
        this.velocity = Helper.random(0.02, 0.05);
        this.position = new Coordinate(center.x, center.y);
        this.lastPosition = new Coordinate(0, 0);
    }

    public move(center: Coordinate): void {
        this.lastPosition.x = this.position.x;
        this.lastPosition.y = this.position.y;

        this.radians -= this.velocity;
        this.position.x = center.x + (Math.cos(this.radians) * this.motionRadius);
        this.position.y = center.y + (Math.sin(this.radians) * this.motionRadius);
    }

    private randomColor(rand: number): string {
        return Particle.colors[rand - (rand % 1)];
    }
}
