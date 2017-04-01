export class Vectors<T> {

  public size:number = 0;
  private keys:string[] = [];
  private valList: any[] = [];
  private cursorIndex:number = 0;
  private readonly PAGE_SIZE = 12;
  constructor () {
    this.init();
  }

  private init () {
    this.size += this.PAGE_SIZE;
    for (let i = this.cursorIndex; i < this.size ; i ++) {
      this.valList[i] = {}
    }
  }
  public getByIndex (index:number):T {
    return this.valList[index];
  }
  public push (arg:T) {
    this.valList[this.cursorIndex++] = arg;

    if (this.cursorIndex >= this.size) {
      this.init();
    }
  }
  public del (index:number) {
    let arr: any[] = this.valList;
    arr.splice(index, 1);
    arr.push({});
    this.cursorIndex --;
    this.size = Math.ceil(arr.length / this.PAGE_SIZE) * this.PAGE_SIZE;
    for (let i = arr.length; i > this.size; i --) {
      arr.splice(i, 1);
    }
  }

  public insert (index:number, val: T) {
    if (index > this.cursorIndex || index < 0) {
      throw new Error(`index ${index} out of range`);
    }
    this.valList[index] = val;
  }
  private isEmptyObj (obj):boolean {
    // let hasProperty = true;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  public getAllList ():any[] {
    return this.valList;
  }
  public toArray ():T[]{
    let result:T[] = [];
    for (let i = 0; i < this.cursorIndex; i++) {
      result.push(this.valList[i]);
    }
    return result;
  }
}
