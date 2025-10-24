// app.js - 
const addPointBtn = document.getElementById("addPointBtn");
const pasteCsvBtn = document.getElementById("pasteCsvBtn");
const fileInput = document.getElementById("fileInput");
const calcBtn = document.getElementById("calcBtn");
const clearBtn = document.getElementById("clearBtn");
const csvArea = document.getElementById("csvArea");
const pointsList = document.getElementById("points-list");
const errorDiv = document.getElementById("error");
const equationDiv = document.getElementById("equation");
const downloadCsvBtn = document.getElementById("downloadCsvBtn");
const ctx = document.getElementById("chart").getContext("2d");
let chart = null;

function createPointRow(x = "", y = "") {
  const div = document.createElement("div");
  div.className = "point-row";
  div.innerHTML = `
    <input class="x" placeholder="x" value="${x}">
    <input class="y" placeholder="y" value="${y}">
    <button class="remove">Eliminar</button>
  `;
  const removeBtn = div.querySelector(".remove");
  removeBtn.addEventListener("click", () => div.remove());
  pointsList.appendChild(div);
  return div;
}

function readPointsFromUI() {
  const rows = Array.from(pointsList.querySelectorAll(".point-row"));
  const points = [];
  for (const r of rows) {
    const x = parseFloat(r.querySelector(".x").value);
    const y = parseFloat(r.querySelector(".y").value);
    if (!Number.isNaN(x) && !Number.isNaN(y)) points.push({ x, y });
  }
  return points;
}

function parseCsvText(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  const pts = [];
  for (const ln of lines) {
    const parts = ln.split(",");
    if (parts.length !== 2) continue;
    const x = Number(parts[0].trim());
    const y = Number(parts[1].trim());
    if (Number.isNaN(x) || Number.isNaN(y)) continue;
    pts.push({ x, y });
  }
  return pts;
}

function populatePoints(points) {
  pointsList.innerHTML = "";
  for (const p of points) createPointRow(p.x, p.y);
}

addPointBtn.addEventListener("click", () => createPointRow());

pasteCsvBtn.addEventListener("click", () => {
  const txt = csvArea.value;
  const pts = parseCsvText(txt);
  if (pts.length === 0) {
    errorDiv.textContent = "No se encontraron puntos validos en el area CSV";
    return;
  }
  errorDiv.textContent = "";
  populatePoints(pts);
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    csvArea.value = reader.result;
  };
  reader.readAsText(file);
});

calcBtn.addEventListener("click", async () => {
  errorDiv.textContent = "";
  equationDiv.textContent = "";
  const points = readPointsFromUI();
  if (points.length < 2) {
    errorDiv.textContent = "Se requieren al menos 2 puntos";
    return;
  }

  try {
    const resp = await fetch("/regression", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points })
    });
    const data = await resp.json();
    if (data.error) {
      errorDiv.textContent = data.error;
      return;
    }
    equationDiv.textContent = "Ecuacion: " + data.equation;
    drawChart(points, data.m, data.b);
  } catch (e) {
    errorDiv.textContent = "Error de conexion: " + e.message;
  }
});

clearBtn.addEventListener("click", () => {
  pointsList.innerHTML = "";
  csvArea.value = "";
  errorDiv.textContent = "";
  equationDiv.textContent = "";
  if (chart) { chart.destroy(); chart = null; }
});

downloadCsvBtn.addEventListener("click", () => {
  const points = readPointsFromUI();
  if (points.length === 0) return;
  const csv = points.map(p => `${p.x},${p.y}`).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "points.csv";
  a.click();
  URL.revokeObjectURL(url);
});

function drawChart(points, m, b) {
  const xs = points.map(p => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const lineX = [minX, maxX];
  const lineY = lineX.map(x => m * x + b);

  const scatterData = points.map(p => ({ x: p.x, y: p.y }));

  const data = {
    datasets: [
      {
        label: "Puntos",
        data: scatterData,
        type: 'scatter',
        pointRadius: 5,
      },
      {
        label: "Linea regresion",
        data: lineX.map((x,i) => ({ x: lineX[i], y: lineY[i] })),
        type: 'line',
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        showLine: true
      }
    ]
  };

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: { type: 'linear', position: 'bottom' }
      }
    }
  });
}

// crear 3 filas por defecto
createPointRow(1,2);
createPointRow(2,3.5);
createPointRow(3,5);
