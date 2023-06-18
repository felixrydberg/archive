//Användare object
export default class User {
  private readonly bio;
  private readonly img;
  private readonly pwd;
  private readonly username;
  constructor(bio, img, pwd, username) {
    this.bio = bio;
    this.img = img;
    this.pwd = pwd;
    this.username = username;
  }
  getName() {
    return this.username;
  }
}
