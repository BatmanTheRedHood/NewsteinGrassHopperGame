export class Helper {
  public static get maxWidth() : number {
    return 1200;
  }
  
  public static get maxHeight() : number {
    return 600;
  }

  public static random(min: number, max: number) : number {
    return min + ((Math.random() * 4583)  % (max - min));
  }
}
