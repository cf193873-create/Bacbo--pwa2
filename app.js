let history = [];

function addResult(result) {
  history.push(result);
  updateInterface();
}

function undoResult() {
  if (history.length > 0) {
    history.pop();
    updateInterface();
  }
}

function clearHistory() {
  if (history.length === 0) return;

  if (confirm("Apagar todo o histórico?")) {
    history = [];
    updateInterface();
  }
}

function countResult(result) {
  return history.filter(item => item === result).length;
}

function updateInterface() {
  updateStatistics();
  updateHistory();
  updateSignal();
}

function updateStatistics() {
  document.getElementById("playerCount").textContent =
    countResult("P");

  document.getElementById("bankerCount").textContent =
    countResult("B");

  document.getElementById("tieCount").textContent =
    countResult("E");
}

function updateHistory() {
  const container = document.getElementById("history");

  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML =
      '<div class="empty">Nenhum resultado</div>';
    return;
  }

  history.forEach(result => {
    const ball = document.createElement("div");

    ball.className = "ball";

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

    container.appendChild(ball);
  });
}

function updateSignal() {
  const signal = document.getElementById("signal");
  const confidence = document.getElementById("confidence");

  if (history.length < 5) {
    signal.textContent = "AGUARDANDO";
    confidence.textContent =
      "Introduza pelo menos 5 resultados";
    return;
  }

  const recent = history.slice(-10);

  const playerRecent =
    recent.filter(x => x === "P").length;

  const bankerRecent =
    recent.filter(x => x === "B").length;

  const playerTotal = countResult("P");
  const bankerTotal = countResult("B");

  if (
    playerRecent > bankerRecent &&
    playerTotal >= bankerTotal
  ) {
    signal.textContent = "PLAYER";
    confidence.textContent =
      "Tendência estatística observada";
  }

  else if (
    bankerRecent > playerRecent &&
    bankerTotal >= playerTotal
  ) {
    signal.textContent = "BANKER";
    confidence.textContent =
      "Tendência estatística observada";
  }

  else {
    signal.textContent = "EQUILÍBRIO";
    confidence.textContent =
      "Sem tendência clara";
  }
}

updateInterface();
