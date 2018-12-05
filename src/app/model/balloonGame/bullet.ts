import { Coordinate } from "../coordinate";
import { Helper } from "src/app/helper/helper";

export class Bullet {
    // Properties
    public position: Coordinate;
    public width: number;
    public heigth: number
    public speed: number;

    // Properties
    public get drawPosition(): Coordinate {
        if (this.position)
            return new Coordinate(this.position.x - this.width / 2, this.position.y - this.heigth / 2);

        return null;
    }

    public constructor(gunPostion: Coordinate, gunWidth: number, gunHeight: number) {
        this.width = 50;
        this.heigth = 20;
        this.speed = 2;
        this.position = new Coordinate(gunPostion.x + gunWidth/2, gunPostion.y - 1 * gunHeight/3);
    }

    public move(): void {
        this.position.x += this.speed;
    }

    public isHittingGround(): boolean {
        return this.position.x >= Helper.maxWidth - this.width / 2;
    }
}
