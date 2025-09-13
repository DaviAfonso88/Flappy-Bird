import { novoElemento } from "./novoElemento.js";
import { Barreiras } from "./barreiras.js";
import { Passaro } from "./passaro.js";
import { Progresso } from "./progresso.js";
import { colidiu } from "./colisao.js";

export class FlappyBird {
  constructor() {
    let pontos = 0;

    const areaDoJogo = document.querySelector("[wm-flappy]");
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const progresso = new Progresso();
    const barreiras = new Barreiras(altura, largura, 220, 400, () =>
      progresso.atualizarPontos(++pontos)
    );
    const passaro = new Passaro(altura);

    areaDoJogo.appendChild(progresso.elemento);
    areaDoJogo.appendChild(passaro.elemento);
    barreiras.pares.forEach((par) => areaDoJogo.appendChild(par.elemento));

    // botão restart
    const botaoRestart = novoElemento("button", "restart");
    botaoRestart.innerText = "Restart";
    botaoRestart.style.display = "none";
    botaoRestart.onclick = () => {
      areaDoJogo.innerHTML = "";
      inicializarTela();
    };
    areaDoJogo.appendChild(botaoRestart);

    this.start = () => {
      const temporizador = setInterval(() => {
        barreiras.animar();
        passaro.animar();

        if (colidiu(passaro, barreiras)) {
          clearInterval(temporizador);
          botaoRestart.style.display = "block";
          botaoRestart.onclick = () => {
            areaDoJogo.innerHTML = "";
            new FlappyBird().start();
          };
        }
      }, 20);
    };
  }
}

// função que cria a tela inicial
export function inicializarTela() {
  const areaDoJogo = document.querySelector("[wm-flappy]");
  areaDoJogo.innerHTML = "";

  const botaoStart = novoElemento("button", "start");
  botaoStart.innerText = "Start Game";
  botaoStart.onclick = () => {
    areaDoJogo.innerHTML = "";
    new FlappyBird().start();
  };

  areaDoJogo.appendChild(botaoStart);
}

inicializarTela();
