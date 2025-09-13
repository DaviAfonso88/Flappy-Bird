import { novoElemento } from "./novoElemento.js";

export class Barreira {
  constructor(reversa = false) {
    this.elemento = novoElemento("div", "barreira");

    const borda = novoElemento("div", "borda");
    const corpo = novoElemento("div", "corpo");

    this.elemento.appendChild(reversa ? corpo : borda);
    this.elemento.appendChild(reversa ? borda : corpo);

    this.corpo = corpo;
  }

  setAltura(altura) {
    this.corpo.style.height = `${altura}px`;
  }
}
