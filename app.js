let history = [];

function addResult(result) {
  history.push(result);
  update();
}

function undoResult() {
  history.pop();
  update();
}

function clearHistory() {
  if (confirm("Apagar todo o histórico?")) {
    history = [];
    update();
  }
}

function count(value) {
  return history.filter(x => x === value).length;
}

function update() {

  document.getElementById("playerCount").textContent =
    count("P");

  document.getElementById("bankerCount").textContent =
    count("B");

  document.getElementById("tieCount").textContent =
    count("E");

  showHistory();
  calculateSignal();
}

function showHistory() {

  const box = document.getElementById("history");

  box.innerHTML = "";

  if (history.length === 0) {

    box.innerHTML =
      '<div class="empty">Nenhum resultado</div>';

    return;
  }

  history.forEach(result => {

    const ball = document.createElement("div");

    ball.classList.add("ball");

    if (result === "P") {
      ball.classList.add("p");
    }

    if (result === "B") {
      ball.classList.add("b");
    }

    if (result === "E") {
      ball.classList.add("e");
    }

    ball.textContent = result;

    box.appendChild(ball);
  });
}

function calculateSignal() {

  const signal = document.getElementById("signal");
  const confidence = document.getElementById("confidence");

  if (history.length < 5) {

    signal.textContent = "AGUARDANDO";

    confidence.textContent =
      "Introduza pelo menos 5 resultados";

    return;
  }

  const player = count("P");
  const banker = count("B");

  const recent = history.slice(-10);

  const recentPlayer =
    recent.filter(x => x === "P").length;

  const recentBanker =
    recent.filter(x => x === "B").length;

  if (
    recentPlayer > recentBanker &&
    player >= banker
  ) {

    signal.textContent = "PLAYER";

    confidence.textContent =
      "Tendência estatística observada";

  } else if (
    recentBanker > recentPlayer &&
    banker >= player
  ) {

    signal.textContent = "BANKER";

    confidence.textContent =
      "Tendência estatística observada";

  } else {

    signal.textContent = "EQUILÍBRIO";

    confidence.textContent =
      "Sem tendência clara";
  }
}

update();
