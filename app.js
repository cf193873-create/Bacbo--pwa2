<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#080d19">
  <title>Bac Bo Signal</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background: #080d19;
      color: white;
      min-height: 100vh;
    }

    .app {
      max-width: 520px;
      margin: auto;
      padding: 15px;
    }

    header {
      text-align: center;
      padding: 18px 0;
    }

    header h1 {
      font-size: 27px;
    }

    header p {
      color: #8793aa;
      margin-top: 6px;
      font-size: 13px;
    }

    .signal {
      background: #111a2d;
      border: 1px solid #293754;
      border-radius: 18px;
      padding: 22px;
      text-align: center;
      margin-bottom: 15px;
    }

    .signal small {
      color: #8793aa;
    }

    #signal {
      font-size: 36px;
      font-weight: bold;
      margin: 10px 0;
    }

    #confidence {
      color: #aeb8cb;
      font-size: 13px;
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 15px;
    }

    button {
      border: 0;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .result {
      height: 70px;
      border-radius: 15px;
      font-size: 28px;
    }

    .player {
      background: #1976d2;
    }

    .banker {
      background: #d32f2f;
    }

    .tie {
      background: #777;
    }

    .card {
      background: #10182a;
      border: 1px solid #24314d;
      border-radius: 17px;
      padding: 16px;
      margin-bottom: 15px;
    }

    .title {
      font-weight: bold;
      margin-bottom: 14px;
    }

    .history {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .ball {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .ball.p {
      background: #1976d2;
    }

    .ball.b {
      background: #d32f2f;
    }

    .ball.e {
      background: #777;
    }

    .empty {
      color: #68758e;
      font-size: 13px;
      width: 100%;
      text-align: center;
      padding: 10px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .stat {
      background: #172239;
      border-radius: 12px;
      text-align: center;
      padding: 13px 5px;
    }

    .number {
      font-size: 22px;
      font-weight: bold;
    }

    .label {
      color: #8793aa;
      font-size: 10px;
      margin-top: 4px;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .control {
      background: #1b263c;
      border: 1px solid #30405e;
      border-radius: 12px;
      padding: 13px;
    }

    .status {
      text-align: center;
      color: #65738c;
      font-size: 11px;
      padding: 5px 0 15px;
    }
  </style>
</head>

<body>

<div class="app">

  <header>
    <h1>🎲 BAC BO SIGNAL</h1>
    <p>Análise estatística</p>
  </header>

  <div class="signal">
    <small>SINAL ATUAL</small>

    <div id="signal">AGUARDANDO</div>

    <div id="confidence">
      Introduza os resultados abaixo
    </div>
  </div>

  <div class="buttons">

    <button class="result player" onclick="addResult('P')">
      P
    </button>

    <button class="result banker" onclick="addResult('B')">
      B
    </button>

    <button class="result tie" onclick="addResult('E')">
      E
    </button>

  </div>

  <div class="card">

    <div class="title">
      HISTÓRICO
    </div>

    <div id="history" class="history">
      <div class="empty">
        Nenhum resultado
      </div>
    </div>

  </div>

  <div class="card">

    <div class="title">
      ESTATÍSTICAS
    </div>

    <div class="stats">

      <div class="stat">
        <div id="playerCount" class="number">0</div>
        <div class="label">PLAYER</div>
      </div>

      <div class="stat">
        <div id="bankerCount" class="number">0</div>
        <div class="label">BANKER</div>
      </div>

      <div class="stat">
        <div id="tieCount" class="number">0</div>
        <div class="label">EMPATE</div>
      </div>

    </div>

  </div>

  <div class="card">

    <div class="title">
      CONTROLO
    </div>

    <div class="controls">

      <button class="control" onclick="undoResult()">
        ↩️ Desfazer
      </button>

      <button class="control" onclick="clearHistory()">
        🗑️ Limpar
      </button>

    </div>

  </div>

  <div class="status">
    Bac Bo Signal • versão nova
  </div>

</div>

<script src="app.js"></script>

</body>
</html>
