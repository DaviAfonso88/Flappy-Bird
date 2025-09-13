import { ParDeBarreiras } from "./parDeBarreiras.js";

export class Barreiras {
  constructor(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
      new ParDeBarreiras(altura, abertura, largura),
      new ParDeBarreiras(altura, abertura, largura + espaco),
      new ParDeBarreiras(altura, abertura, largura + espaco * 2),
      new ParDeBarreiras(altura, abertura, largura + espaco * 3),
    ];

    const deslocamento = 3;

    this.animar = () => {
      this.pares.forEach((par) => {
        par.setX(par.getX() - deslocamento);

        if (par.getX() < -par.getLargura()) {
          par.setX(par.getX() + espaco * this.pares.length);
          par.sortearAbertura();
        }

        const meio = largura / 2;
        const cruzouOMeio =
          par.getX() + deslocamento >= meio && par.getX() < meio;

        if (cruzouOMeio) notificarPonto();
      });
    };
  }
}
