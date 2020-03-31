/*
GUID is xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 Where the allowed values of M and N are 1,2,3,4 and 5
*/

export class GUID {
  private static readonly PATTERN = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx';

  private value: string;

  constructor(value: string = null) {
    if (value) {
      this.value = value;
    } else {
      this.value = GUID.defaultGuid();
    }
  }

  toString() {
    return this.value;
  }
  toSimpleString() {
    return this.value.replace(/\-/g, '');
  }

  private static createUsingRandom(): string {
    return GUID.PATTERN.replace(/[xy]/g, (c: string) => {
      //x => 0 - 15
      //y => 1 - 5
      const r = c === 'x' ? (Math.random() * 16 | 0) : (Math.ceil(Math.random() * 5));
      return r.toString(16);
    });
  }

  private static createUsingCrypto(): string {
    return GUID.PATTERN.replace(/[xy]/g, (c: string) => {
      //x => 0 - 15
      //y => 1 - 5
      const v = crypto.getRandomValues(new Uint8Array(1))[0];
      const r = c === 'x' ? (v & 15) : ((v & 4) + 1);
      return r.toString(16);
    });
  }

  static defaultGuid(): string {
    return GUID.PATTERN.replace(/[xy]/g, (c) => '0');   //default
  }

  static create(): GUID {
    if ('crypto' in window && 'getRandomValues' in window.crypto) {
      return new GUID(GUID.createUsingCrypto());
    } else {
      return new GUID(GUID.createUsingRandom());
    }
  }


}
