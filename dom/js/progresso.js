import { novoElemento } from "./novoElemento.js";

export class Progresso {
  constructor() {
    this.elemento = novoElemento("span", "progresso");
    this.atualizarPontos = (pontos) => {
      this.elemento.innerHTML = pontos;
    };
    this.atualizarPontos(0);
  }
}
