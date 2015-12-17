export default class RandomURL {
  constructor(length = 40, baseURL = "") {
    this.length = length;
    this.baseURL = baseURL
  }

  _byteToHex(byte) {
    return ('0' + byte.toString(16)).slice(-2);
  }

  newURL() {
    let arr = new Uint8Array(this.length / 2);
    window.crypto.getRandomValues(arr);
    return this.baseURL + arr.reduce((a, b) => a + this._byteToHex(b));
  }
}