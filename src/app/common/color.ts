export interface IColorRgba {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export class ColorRgba implements IColorRgba {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(obj: any = null) {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.alpha = 1;

    if (obj) {
      if (typeof(obj) === 'string') {
        if (obj.indexOf('#') === 0) {
          this.fromHexString(obj);
        } else if (obj.indexOf('rgb') === 0) {
          this.fromRgbString(obj);
        } else {
          throw new Error("ColorRgba - cannot create - unknown string passed to constructor");
        }
      }
      else if ('red' in obj) {
        this.red = obj.red;
        this.green = obj.green;
        this.blue = obj.blue;
        this.alpha = obj.alpha || this.alpha;
      }
      else {
        throw new Error("ColorRgba - cannot create - unknown object passed to constructor");
      }
    }
  }

  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }


  private fromHexString(hex: string) {
    let c: string[];
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        const ret = parseInt('0x' + c.join(''));
        if (!isNaN(ret)) {
          this.red = (ret>>16)&255;
          this.green = (ret>>8)&255;
          this.blue = ret&255;
          this.alpha = 1;

          return this;
        }
    }
    console.warn("Invalid hex string", hex);
    throw new Error('Bad hex string');
  }

  private fromRgbString(rgb: string) {
    let c: string[];
    if(/^rgb(a?)\(([0-9]{1,3}\,?){3,4}\)$/.test(rgb)){
        c= rgb.replace(/^rgb(a?)\(/, '').replace(/\)/, '').split('');
        if(c.length >= 3){
          const numbers = c.map(parseInt);
          if (!numbers.some(isNaN)) {
            this.red = numbers[0];
            this.green = numbers[1];
            this.blue = numbers[2];
            this.alpha = numbers.length > 3 ? numbers[3] : 1;

            return this;
          }
        }
    }
    console.warn("Invalid rgb(a) string", rgb)
    throw new Error('Bad rgb(a) string');
  }

}
