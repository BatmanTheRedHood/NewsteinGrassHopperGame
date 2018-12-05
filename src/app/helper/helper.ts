import { Coordinate } from "../model/coordinate";

export class Helper {
    public static get maxWidth(): number {
        return 1400;
    }

    private static colors: string[] = [
        "#92a8d1", "#034f84", "#f7cac9", "#f7786b",
        "#d5f4e6", "#80ced6", "#fefbd8", "#618685",
        "#618685", "#36486b", "#4040a1"
    ];

    public static randomColor(): string {
        let rand: number = Helper.random(0, Helper.colors.length -7);
        return Helper.colors[rand - (rand % 1)];
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
