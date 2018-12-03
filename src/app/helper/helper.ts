export class Helper {
  public static get maxWidth() : number {
    return 1400;
  }
  
  public static get maxHeight() : number {
    return 640;
  }

  public static random(min: number, max: number) : number {
    return min + ((Math.random() * 4583)  % (max - min));
  }

  public static abs(num: number) {
    return num < 0 ? -num : num;
  }
}
