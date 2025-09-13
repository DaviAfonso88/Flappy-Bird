import { novoElemento } from "./novoElemento.js";
import { Barreira } from "./barreira.js";

export class ParDeBarreiras {
  constructor(altura, abertura, x) {
    this.elemento = novoElemento("div", "par-de-barreiras");

    this.superior = new Barreira(true);
    this.inferior = new Barreira(false);

    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);

    this.altura = altura;
    this.abertura = abertura;

    this.sortearAbertura();
    this.setX(x);
  }

  sortearAbertura() {
    const alturaSuperior = Math.random() * (this.altura - this.abertura);
    const alturaInferior = this.altura - this.abertura - alturaSuperior;
    this.superior.setAltura(alturaSuperior);
    this.inferior.setAltura(alturaInferior);
  }

  getX() {
    return parseInt(this.elemento.style.left) || 0;
  }

  setX(x) {
    this.elemento.style.left = `${x}px`;
  }

  getLargura() {
    return this.elemento.clientWidth;
  }
}
