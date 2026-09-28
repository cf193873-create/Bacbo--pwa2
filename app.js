// ==========================================
// BAC BO SIGNAL
// app.js
// ==========================================

let history = [];

// Número máximo de resultados guardados
const MAX_HISTORY = 100;

// ------------------------------------------
// Inicialização
// ------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    updateInterface();
});

// ------------------------------------------
// Adicionar resultado
// ------------------------------------------

function addResult(result) {

    if (!["P", "B", "E"].includes(result)) {
        return;
    }

    history.push(result);

    if (history.length > MAX_HISTORY) {
        history.shift();
    }

    saveHistory();
    updateInterface();
}

// ------------------------------------------
// Desfazer último resultado
// ------------------------------------------

function undoResult() {

    if (history.length === 0) {
        return;
    }

    history.pop();

    saveHistory();
    updateInterface();
}

// ------------------------------------------
// Limpar histórico
// ------------------------------------------

function clearHistory() {

    if (history.length === 0) {
        return;
    }

    const confirmar = confirm(
        "Tem a certeza que deseja apagar todo o histórico?"
    );

    if (!confirmar) {
        return;
    }

    history = [];

    saveHistory();
    updateInterface();
}

// ------------------------------------------
// Atualizar interface
// ------------------------------------------

function updateInterface() {

    updateHistory();
    updateStats();
    updateSignal();
}

// ------------------------------------------
// Histórico visual
// ------------------------------------------

function updateHistory() {

    const container = document.getElementById("history");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (history.length === 0) {

        container.innerHTML = `
            <div class="empty">
                Nenhum resultado registado
            </div>
        `;

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

        container.appendChild(ball);
    });
}

// ------------------------------------------
// Estatísticas
// ------------------------------------------

function updateStats() {

    const player = countResult("P");
    const banker = countResult("B");
    const tie = countResult("E");

    const playerElement =
        document.getElementById("playerCount");

    const bankerElement =
        document.getElementById("bankerCount");

    const tieElement =
        document.getElementById("tieCount");

    if (playerElement) {
        playerElement.textContent = player;
    }

    if (bankerElement) {
        bankerElement.textContent = banker;
    }

    if (tieElement) {
        tieElement.textContent = tie;
    }
}

// ------------------------------------------
// Contagem
// ------------------------------------------

function countResult(result) {

    return history.filter(item => item === result).length;
}

// ------------------------------------------
// Percentagens
// ------------------------------------------

function percentage(value, total) {

    if (total === 0) {
        return 0;
    }

    return Math.round((value / total) * 100);
}

// ------------------------------------------
// Análise do sinal
// ------------------------------------------

function updateSignal() {

    const signalElement =
        document.getElementById("signal");

    const confidenceElement =
        document.getElementById("confidence");

    if (!signalElement || !confidenceElement) {
        return;
    }

    if (history.length < 5) {

        signalElement.textContent = "AGUARDANDO";

        confidenceElement.textContent =
            "Registe pelo menos 5 resultados";

        return;
    }

    const analysis = analyzeHistory();

    signalElement.textContent =
        analysis.signal;

    confidenceElement.textContent =
        analysis.message;
}

// ------------------------------------------
// Motor de análise estatística
// ------------------------------------------

function analyzeHistory() {

    const total = history.length;

    const player = countResult("P");
    const banker = countResult("B");
    const tie = countResult("E");

    // Últimos resultados sem empates
    const recent = history
        .filter(x => x !== "E")
        .slice(-10);

    if (recent.length === 0) {

        return {
            signal: "SEM SINAL",
            message: "Não existem dados suficientes."
        };
    }

    const recentPlayer =
        recent.filter(x => x === "P").length;

    const recentBanker =
        recent.filter(x => x === "B").length;

    const playerPercent =
        percentage(player, total);

    const bankerPercent =
        percentage(banker, total);

    const recentPlayerPercent =
        percentage(recentPlayer, recent.length);

    const recentBankerPercent =
        percentage(recentBanker, recent.length);

    // --------------------------------------
    // Verificação de sequência
    // --------------------------------------

    const last = recent[recent.length - 1];

    let streak = 1;

    for (let i = recent.length - 2; i >= 0; i--) {

        if (recent[i] === last) {
            streak++;
        } else {
            break;
        }
    }

    // --------------------------------------
    // Pontuação estatística
    // --------------------------------------

    let playerScore = 0;
    let bankerScore = 0;

    // Frequência geral
    if (playerPercent > bankerPercent) {
        playerScore += 1;
    }

    if (bankerPercent > playerPercent) {
        bankerScore += 1;
    }

    // Últimas 10
    if (recentPlayerPercent > recentBankerPercent) {
        playerScore += 2;
    }

    if (recentBankerPercent > recentPlayerPercent) {
        bankerScore += 2;
    }

    // Tendência de sequência
    if (last === "P" && streak >= 2) {
        playerScore += 1;
    }

    if (last === "B" && streak >= 2) {
        bankerScore += 1;
    }

    // --------------------------------------
    // Resultado
    // --------------------------------------

    let signal = "SEM SINAL";
    let confidence = 0;

    if (playerScore > bankerScore) {

        signal = "PLAYER";

        confidence =
            calculateConfidence(
                playerScore,
                bankerScore
            );

    } else if (bankerScore > playerScore) {

        signal = "BANKER";

        confidence =
            calculateConfidence(
                bankerScore,
                playerScore
            );

    } else {

        signal = "EQUILÍBRIO";
        confidence = 50;
    }

    const message =
        `Tendência: ${signal} • Confiança estatística: ${confidence}%`;

    return {
        signal,
        message,
        player,
        banker,
        tie
    };
}

// ------------------------------------------
// Confiança estatística
// ------------------------------------------

function calculateConfidence(mainScore, otherScore) {

    const difference =
        mainScore - otherScore;

    let confidence =
        50 + (difference * 8);

    if (confidence > 75) {
        confidence = 75;
    }

    if (confidence < 50) {
        confidence = 50;
    }

    return confidence;
}

// ------------------------------------------
// LocalStorage
// ------------------------------------------

function saveHistory() {

    try {

        localStorage.setItem(
            "bacbo_history",
            JSON.stringify(history)
        );

    } catch (error) {

        console.log(
            "Não foi possível guardar o histórico."
        );
    }
}

// ------------------------------------------
// Carregar histórico
// ------------------------------------------

function loadHistory() {

    try {

        const saved =
            localStorage.getItem("bacbo_history");

        if (!saved) {
            history = [];
            return;
        }

        const parsed =
            JSON.parse(saved);

        if (Array.isArray(parsed)) {

            history = parsed.filter(
                item =>
                    item === "P" ||
                    item === "B" ||
                    item === "E"
            );

        } else {

            history = [];
        }

    } catch (error) {

        history = [];
    }
}

// ------------------------------------------
// Exportar histórico
// ------------------------------------------

function exportHistory() {

    const data =
        JSON.stringify(history, null, 2);

    const blob =
        new Blob(
            [data],
            { type: "application/json" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = "bacbo-historico.json";

    link.click();

    URL.revokeObjectURL(url);
}

// ------------------------------------------
// Funções globais
// ------------------------------------------

window.addResult = addResult;
window.undoResult = undoResult;
window.clearHistory = clearHistory;
window.exportHistory = exportHistory;
