import { Coordinate } from "../model/coordinate";

export class Helper {
    public static get maxWidth(): number {
        return 1400;
    }

    public static get maxHeight(): number {
        return 640;
    }

    public static random(min: number, max: number): number {
        return min + ((Math.random() * 4583) % (max - min));
    }

    public static abs(num: number) {
        return num < 0 ? -num : num;
    }

    public static distance(source: Coordinate, destination: Coordinate): number {
        let xSq = Math.pow((source.x - destination.x), 2);
        let ySq = Math.pow((source.y - destination.y), 2);

        return Math.pow(xSq + ySq, .5);
    }
}
