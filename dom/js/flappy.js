// Função para criar elementos com classe
function novoElemento(tagName, className) {
  const elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}

class Barreira {
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

class ParDeBarreiras {
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

class Barreiras {
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

class Passaro {
  constructor(alturaJogo) {
    let voando = false;

    this.elemento = novoElemento("img", "passaro");
    this.elemento.src = "imgs/passaro.png";

    this.getY = () => parseInt(this.elemento.style.bottom) || 0;
    this.setY = (y) => (this.elemento.style.bottom = `${y}px`);

    window.onkeydown = () => (voando = true);
    window.onkeyup = () => (voando = false);

    this.animar = () => {
      const novoY = this.getY() + (voando ? 8 : -5);
      const alturaMaxima = alturaJogo - this.elemento.clientHeight;

      if (novoY <= 0) {
        this.setY(0);
      } else if (novoY >= alturaMaxima) {
        this.setY(alturaMaxima);
      } else {
        this.setY(novoY);
      }
    };

    this.setY(alturaJogo / 2);
  }
}

// Classe que mostra a pontuação
class Progresso {
  constructor() {
    this.elemento = novoElemento("span", "progresso");
    this.atualizarPontos = (pontos) => {
      this.elemento.innerHTML = pontos;
    };
    this.atualizarPontos(0);
  }
}

// Função para detectar sobreposição de elementos
function estaoSobrepostos(elementoA, elementoB) {
  const a = elementoA.getBoundingClientRect();
  const b = elementoB.getBoundingClientRect();

  const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
  const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

  return horizontal && vertical;
}

// Função que verifica se o pássaro colidiu com alguma barreira
function colidiu(passaro, barreiras) {
  let colidiu = false;
  barreiras.pares.forEach((par) => {
    if (!colidiu) {
      const superior = par.superior.elemento;
      const inferior = par.inferior.elemento;
      colidiu =
        estaoSobrepostos(passaro.elemento, superior) ||
        estaoSobrepostos(passaro.elemento, inferior);
    }
  });
  return colidiu;
}

// Classe principal do jogo
class FlappyBird {
  constructor() {
    let pontos = 0;

    const areaDoJogo = document.querySelector("[wm-flappy]");
    const botaoRestart = novoElemento("button", "restart");
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const progresso = new Progresso();
    const barreiras = new Barreiras(altura, largura, 200, 400, () =>
      progresso.atualizarPontos(++pontos)
    );
    const passaro = new Passaro(altura);

    areaDoJogo.appendChild(progresso.elemento);
    areaDoJogo.appendChild(passaro.elemento);
    areaDoJogo.appendChild(botaoRestart);
    barreiras.pares.forEach((par) => areaDoJogo.appendChild(par.elemento));

    // Botão de restart
    botaoRestart.innerText = "Restart";

    botaoRestart.onclick = () => {
      // Remove elementos antigos
      areaDoJogo.innerHTML = "";
      // Cria e inicia um novo jogo
      new FlappyBird().start();
    };

    this.start = () => {
      const temporizador = setInterval(() => {
        barreiras.animar();
        passaro.animar();

        if (colidiu(passaro, barreiras)) {
          clearInterval(temporizador);

          // Exibe botão de restart quando o jogo termina
          botaoRestart.style.display = "block";
        }
      }, 20);
    };
  }
}

// Inicializa o jogo
new FlappyBird().start();
