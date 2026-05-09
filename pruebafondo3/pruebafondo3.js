// ====================================================
// OBRA 5 — Serie
// Click o tecla R = nueva versión
// ====================================================

let manchas = [];

function setup() {
  createCanvas(700, 900);
  noLoop();
  noStroke();
  generarManchas();
}

function draw() {
  fondo();
  capaBordo();
  capaRosa();
  capaCrema();
  gotas();
  grano();
}

// ====================================================
// 1. FONDO
// ====================================================

function fondo() {
  background(242, 232, 222);
}

// ====================================================
// 2. BORDÓ — sólido arriba, llega a la mitad
// ====================================================

function capaBordo() {

  // bloque sólido tope
  for (let i = 0; i < 6000; i++) {
    let x = random(width);
    let y = random(-30, height * 0.35);
    let alpha = map(y, -30, height * 0.35, 60, 20);
    fill(random(92, 128), random(10, 30), random(18, 48), alpha);
    ellipse(x, y, random(20, 90), random(12, 45));
  }

  // bordó que llega hasta la mitad exacta
  for (let i = 0; i < 4000; i++) {
    let x = random(width);
    let y = random(0, height * 0.52);
    let alpha = map(y, 0, height * 0.52, 35, 2);
    fill(random(105, 150), random(18, 45), random(30, 68), alpha);
    ellipse(x, y, random(35, 160), random(18, 70));
  }

  // refuerzo extra tope
  for (let i = 0; i < 3000; i++) {
    let x = random(width);
    let y = random(-30, height * 0.25);
    let alpha = map(y, -30, height * 0.25, 70, 20);
    fill(random(82, 118), random(8, 25), random(15, 42), alpha);
    ellipse(x, y, random(15, 70), random(10, 35));
  }

  // rosa oscuro de transición
  for (let i = 0; i < 2500; i++) {
    let x = random(width);
    let y = random(height * 0.20, height * 0.62);
    let alpha = map(y, height * 0.20, height * 0.62, 18, 2);
    fill(random(160, 198), random(62, 92), random(82, 118), alpha);
    ellipse(x, y, random(45, 190), random(22, 85));
  }
}

// ====================================================
// 3. ROSA — zona media
// ====================================================

function capaRosa() {

  for (let i = 0; i < 2000; i++) {
    let x = random(width);
    let y = random(height * 0.30, height * 0.82);
    let alpha = map(y, height * 0.30, height * 0.82, 16, 3);
    fill(220, 158, 168, alpha);
    ellipse(x, y, random(55, 220), random(28, 100));
  }

  for (let i = 0; i < 1500; i++) {
    let x = random(width);
    let y = random(height * 0.38, height * 0.90);
    let alpha = map(y, height * 0.38, height * 0.90, 10, 3);
    fill(255, 245, 245, alpha);
    ellipse(x, y, random(70, 260), random(35, 115));
  }
}

// ====================================================
// 4. CREMA — aclara abajo
// ====================================================

function capaCrema() {

  for (let i = 0; i < 2000; i++) {
    let x = random(width);
    let y = random(height * 0.52, height);
    let alpha = map(y, height * 0.52, height, 3, 18);
    fill(random(238, 250), random(225, 238), random(225, 238), alpha);
    ellipse(x, y, random(70, 270), random(35, 125));
  }

  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height * 0.60, height);
    let alpha = map(y, height * 0.60, height, 12, 2);
    fill(205, 148, 158, alpha);
    ellipse(x, y, random(50, 190), random(6, 20));
  }
}

// ====================================================
// 5. GOTAS
// ====================================================

function generarManchas() {
  manchas = [];

  for (let i = 0; i < 2200; i++) {
    let y = random(height * 0.68);
    let tamanio = map(y, 0, height * 0.68, 5, 22);
    let alpha   = map(y, 0, height * 0.68, 35, 7);

    let tipo = random();
    let r, g, b;
    if      (tipo < 0.50) { r = random(240,255); g = random(218,242); b = random(218,242); }
    else if (tipo < 0.80) { r = random(222,245); g = random(178,218); b = random(182,220); }
    else                  { r = random(198,228); g = random(138,182); b = random(142,182); }

    manchas.push({ x: random(width), y, tamanio, r, g, b, alpha });
  }

  for (let i = 0; i < 700; i++) {
    let y = random(height * 0.52, height);
    manchas.push({
      x: random(width), y,
      tamanio: random(14, 35),
      r: random(235, 252), g: random(220, 242), b: random(220, 240),
      alpha: random(8, 28)
    });
  }
}

function gotas() {
  noStroke();
  for (let m of manchas) {
    fill(m.r - 30, m.g - 22, m.b - 22, m.alpha * 0.32);
    ellipse(m.x + 1.5, m.y + 1.5, m.tamanio * 0.92, m.tamanio * 0.58);

    fill(m.r, m.g, m.b, m.alpha);
    ellipse(m.x, m.y, m.tamanio, m.tamanio * 0.62);

    fill(255, 255, 255, m.alpha * 0.32);
    ellipse(m.x - m.tamanio * 0.08, m.y - m.tamanio * 0.13,
            m.tamanio * 0.24, m.tamanio * 0.13);
  }
}

// ====================================================
// 6. GRANO de tela
// ====================================================

function grano() {
  noStroke();
  for (let i = 0; i < 20000; i++) {
    fill(255, random(2, 8));
    rect(random(width), random(height), 1, 1);
    fill(0, random(1, 4));
    rect(random(width), random(height), 1, 1);
  }
}

// ====================================================
// REGENERAR
// ====================================================

function mousePressed() {
  generarManchas();
  redraw();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    generarManchas();
    redraw();
  }
}
