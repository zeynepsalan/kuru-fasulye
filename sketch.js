let kurufasulye;
let kurufasulyeler = [];
function preload() {
  kurufasulye = loadImage('kurufasulye.svg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(255, 127, 0);

  for (let kf of kurufasulyeler) {
    push(); // Sadece bu fasulyenin ayarlarını izole et

    // Yumuşak salınımlar:
    let salinimY = sin(frameCount * kf.hiz + kf.faz) * 4;   // 4 piksel yukarı-aşağı
    let salinimAci = sin(frameCount * kf.hiz + kf.faz) * 6; // 6 derece sağa-sola kıpırtı

    // Merkeze git ve hafifçe hareket ettir
    translate(kf.x, kf.y + salinimY);
    rotate(salinimAci);

    image(kurufasulye, 0, 0, kf.w, kf.h);

    pop(); // Ayarları sıfırla ki diğer fasulye etkilenmesin
  }
}

function mousePressed() {
  let rastgeleG = random(45, 90);

  let oran = kurufasulye.height / kurufasulye.width;
  let rastgeleY = rastgeleG * oran;

  kurufasulyeler.push({
    x: mouseX,
    y: mouseY,
    w: rastgeleG,
    h: rastgeleY,
    faz: random(0, 360),       // Her fasulyenin farklı anda hareket etmesi için
    hiz: random(1.5, 2.5)       // Kimi biraz daha yavaş, kimi biraz daha canlı
  })

  // Eğer sınır aşılırsa, en eski (ilk eklenen) fasulyeyi çıkar
  let maksimumSayi = 100; // İstediğin limiti buraya yazabilirsin
  if (kurufasulyeler.length > maksimumSayi) {
    kurufasulyeler.shift(); // En baştaki elemanı siler
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}