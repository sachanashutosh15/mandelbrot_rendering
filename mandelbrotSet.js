import { ComplexNumber } from "./complexNumberDef.js";
import { colors } from './colors.js';
function createMandelBrotGrid(axi = -2, axf = 2, ayi = -2, ayf = 2, delta, loadedElement) {
  const colorsGrid = []
  console.log(ayi, ayf, delta);
  for (let y = ayi; y < ayf; y += delta) {
    const colorsRow = [];
    // loadedElement.innerText = `${Math.floor((y / ayf) * 100)}`;
    console.log('here');
    // loadedElement.innerHTML = `${Math.floor((y / ayf) * 100)} %`;
    // loadedElement.style.width = `${Math.floor((y / ayf) * 100)}%`;
    for (let x = axi; x < axf; x += delta) {
      const currNum = new ComplexNumber(x, y);
      const color = generateColorString(currNum);
      colorsRow.push(color);
    }
    colorsGrid.push(colorsRow);
  }
  console.log('gridLength', colorsGrid.length);
  return colorsGrid;
}

function generateColorString(number) {
  let z = new ComplexNumber(0, 0);
  let result = "000";
  for (let i = 0; i < colors.length; i++) {
    z = number.add(z.square())
    if (z.modulus() >= 2) {
      result = colors[i];
      break;
    }
  }
  return result;
}

export { createMandelBrotGrid };