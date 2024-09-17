class ComplexNumber {
  x;
  y;
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  square = () => {
    let a = this.x;
    let b = this.y;
    let x = a * a - b * b;
    let y = 2 * a * b;
    return new ComplexNumber(x, y);
  }

  modulus = () => {
    const a = this.x;
    const b = this.y;
    return Math.sqrt(a * a + b * b);
  }

  add = (complexNumber) => {
    const a = complexNumber.x;
    const b = complexNumber.y;
    const x = this.x + a;
    const y = this.y + b;
    return new ComplexNumber(x, y);
  }
}

export { ComplexNumber };