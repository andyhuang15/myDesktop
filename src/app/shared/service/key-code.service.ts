interface callBack {
  (ev: keyEv): void;
}
interface keyCodeEv{
  id: string,
  priority: number,
  cb:callBack
}
interface keyEv extends Event {
  keyCode:number
}
export class KeyCodeService {
  // private calback:Function = () => {};
  private static  keyCodeEvs:keyCodeEv[] = [];
  private static instance:KeyCodeService;
  constructor() {
    window.addEventListener('keydown', KeyCodeService.callCallBack);
  }
  public static init ():KeyCodeService {
    if (KeyCodeService.instance) {
      return KeyCodeService.instance;
    }
    KeyCodeService.instance = new KeyCodeService();
    return KeyCodeService.instance;
  }
  add (ev:keyCodeEv) {
    KeyCodeService.keyCodeEvs.push(ev);
    console.log(KeyCodeService.keyCodeEvs);
  }
  static findMaxPriority ():number {
    let index = 0;
    let maxPriority = 0;
    KeyCodeService.keyCodeEvs.forEach((item, curIndex) => {
      if (item.priority > maxPriority) {
        maxPriority = item.priority;
        index = curIndex;
      }
    });
    return index;
  }
  static callCallBack (ev) {
    let index = KeyCodeService.findMaxPriority();
    if (KeyCodeService.keyCodeEvs[index]) {
      KeyCodeService.keyCodeEvs[index].cb(ev as keyEv);
    }
  }
  remove (id:string) {
    for (let i = KeyCodeService.keyCodeEvs.length - 1; i>=0; i--) {
      if (id === KeyCodeService.keyCodeEvs[i].id) {
         KeyCodeService.keyCodeEvs.splice(i, 1);
      }
    }
  }


  destroyed () {
    window.removeEventListener('keydown');
  }
}
