export default class RandomURL {
  constructor(length = 40) {
    this.length = length;
  }

  _byteToHex(byte) {
    return ('0' + byte.toString(16)).slice(-2);
  }

  newURL() {
    let arr = new Uint8Array(this.length / 2);
    window.crypto.getRandomValues(arr);
    return arr.reduce((a, b, c) => a + this._byteToHex(b));
  }
}