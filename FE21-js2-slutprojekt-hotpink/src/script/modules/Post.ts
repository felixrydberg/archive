export default class Post {
  public readonly timestamp: Date | string;
  // Constructor includes an optional timestamp variable
  constructor(
    public readonly username: string,
    public title: string,
    public message: string,
    public readonly uid: string,
    timestamp?: Date | string | undefined
  ) {
    // if no timestamp (undefined), create Date else take from variable timestamp
    this.timestamp =
      typeof timestamp === 'undefined'
        ? new Date().toLocaleString('sv-SE')
        : timestamp;
  }
}
