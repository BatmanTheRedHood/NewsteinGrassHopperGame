import { Coordinate } from "./coordinate";
import { Helper } from "../helper/helper";

export class Food {
    // Fields
    public position: Coordinate;
    public size:number

    // Properties
    public get drawPosition(): Coordinate {
        if (this.position)
            return new Coordinate(this.position.x - this.size / 2, this.position.y - this.size / 2);

        return null;
    }

    // Constructor
    public constructor() {
        this.size = 80;
        this.generateNew();
    } 

    // #region Methods
    public generateNew() : void {
        this.position = this.randomCoordinate();
    }

    private randomCoordinate(): Coordinate {
        let x = Helper.random(50, Helper.maxWidth - 50);
        let y = Helper.random(50, Helper.maxHeight - 50);

        return new Coordinate(x, y);
    }

    // #endregion
}
