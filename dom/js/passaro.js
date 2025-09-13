import { novoElemento } from "./novoElemento.js";

export class Passaro {
  constructor(alturaJogo) {
    let voando = false;

    this.elemento = novoElemento("img", "passaro");
    this.elemento.src = "/dom/imgs/passaro.png";

    this.getY = () => parseInt(this.elemento.style.bottom) || 0;
    this.setY = (y) => (this.elemento.style.bottom = `${y}px`);

    window.onkeydown = (e) => {
      if (e.code === "Space") voando = true;
    };
    window.onkeyup = () => (voando = false);
    window.ontouchstart = () => (voando = true);
    window.ontouchend = () => (voando = false);

    this.animar = () => {
      const novoY = this.getY() + (voando ? 8 : -5);
      const alturaMaxima = alturaJogo - this.elemento.clientHeight;
      const rotacao = voando ? -30 : 0;
      this.elemento.style.transform = `rotate(${rotacao}deg)`;

      if (novoY <= 0) this.setY(0);
      else if (novoY >= alturaMaxima) this.setY(alturaMaxima);
      else this.setY(novoY);
    };

    this.setY(alturaJogo / 2);
  }
}
