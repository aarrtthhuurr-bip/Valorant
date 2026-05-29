// ============================================================
//  TACTIC FPS — game.js
//  Melhorias: velocidade bala, fireRate, movimentação,
//  IA avançada, mapa, animações smooth, arsenal expandido
// ============================================================

'use strict';

// ─── PLACAR & CRÉDITOS ───────────────────────────────────────
let teamScore  = 0;
let enemyScore = 0;
let credits    = 800;

// ─── ARSENAL COMPLETO ────────────────────────────────────────
// type: pistol | smg | rifle | sniper | shotgun | lmg | melee
// bSpeed: velocity do projétil (aumentada geral)
// spread: cone de dispersão (radianos)
// pellets: quantidade de projéteis por tiro (shotgun)
const WEAPON_SHOP = {

    // ── PISTOLAS ──────────────────────────────────────────────
    "Classic":   {
        category:"pistol",  type:"pistol",  isAutomatic:false,
        cost:0,       fireRate:380,  damage:26,   magSize:12,  reserve:36,
        reloadTime:1100, bSpeed:2.2,  spread:0.03,  pellets:1,
        color:0x5a5a5a, width:0.07, length:0.32,
        hasScope:false, zoomFov:70,
        desc:"Pistola padrão. Precisa e confiável.",
        autoFire: false
    },
    "Shorty":    {
        category:"pistol",  type:"pistol",  isAutomatic:false,
        cost:150,     fireRate:700,  damage:12,   magSize:2,   reserve:14,
        reloadTime:1400, bSpeed:1.6,  spread:0.14,  pellets:5,
        color:0x3a2a1a, width:0.09, length:0.22,
        hasScope:false, zoomFov:70,
        desc:"Pistola dupla de cano curto. Letal a queima-roupa.",
        autoFire: false
    },
    "Frenzy":    {
        category:"pistol",  type:"pistol",  isAutomatic:true,
        cost:450,     fireRate:95,   damage:26,   magSize:13,  reserve:39,
        reloadTime:1200, bSpeed:2.0,  spread:0.06,  pellets:1,
        color:0x1a3a2a, width:0.07, length:0.28,
        hasScope:false, zoomFov:70,
        desc:"Pistola automática de alta cadência.",
        autoFire: true
    },
    "Ghost":     {
        category:"pistol",  type:"pistol",  isAutomatic:false,
        cost:500,     fireRate:400,  damage:30,   magSize:15,  reserve:45,
        reloadTime:1300, bSpeed:2.4,  spread:0.02,  pellets:1,
        color:0x2a2a3a, width:0.07, length:0.38,
        hasScope:false, zoomFov:70,
        desc:"Pistola silenciada. Alta precisão.",
        autoFire: false
    },
    "Sheriff":   {
        category:"pistol",  type:"pistol",  isAutomatic:false,
        cost:800,     fireRate:600,  damage:55,   magSize:6,   reserve:18,
        reloadTime:1800, bSpeed:2.8,  spread:0.015, pellets:1,
        color:0xc9a227, width:0.10, length:0.42,
        hasScope:false, zoomFov:68,
        desc:"Revólver pesado. Máximo dano de pistola.",
        autoFire: false
    },

    // ── SMGs ──────────────────────────────────────────────────
    "Stinger":   {
        category:"smg",     type:"smg",     isAutomatic:true,
        cost:950,     fireRate:60,   damage:27,   magSize:20,  reserve:80,
        reloadTime:1300, bSpeed:2.2,  spread:0.07,  pellets:1,
        color:0x334455, width:0.10, length:0.55,
        hasScope:false, zoomFov:68,
        desc:"SMG compacta e rapidíssima.",
        autoFire: true
    },
    "Spectre":   {
        category:"smg",     type:"smg",     isAutomatic:true,
        cost:1600,    fireRate:90,   damage:26,   magSize:30,  reserve:90,
        reloadTime:1500, bSpeed:2.3,  spread:0.05,  pellets:1,
        color:0x1a1a1a, width:0.12, length:0.65,
        hasScope:true,  zoomFov:52,
        desc:"SMG precisa com mira integrada.",
        autoFire: true
    },

    // ── SHOTGUNS ──────────────────────────────────────────────
    "Bucky":     {
        category:"shotgun",  type:"shotgun", isAutomatic:false,
        cost:900,     fireRate:750,  damage:18,   magSize:5,   reserve:15,
        reloadTime:2000, bSpeed:1.8,  spread:0.18,  pellets:6,
        color:0x5a3a2a, width:0.14, length:0.70,
        hasScope:false, zoomFov:70,
        desc:"Shotgun pump. Devasta a curta distância.",
        autoFire: false
    },
    "Judge":     {
        category:"shotgun",  type:"shotgun", isAutomatic:true,
        cost:1850,    fireRate:370,  damage:17,   magSize:7,   reserve:21,
        reloadTime:2200, bSpeed:1.7,  spread:0.20,  pellets:6,
        color:0x2a1a1a, width:0.16, length:0.65,
        hasScope:false, zoomFov:70,
        desc:"Shotgun automática. Chuva de chumbo.",
        autoFire: true
    },

    // ── RIFLES ────────────────────────────────────────────────
    "Bulldog":   {
        category:"rifle",    type:"rifle",   isAutomatic:true,
        cost:2050,    fireRate:120,  damage:35,   magSize:24,  reserve:72,
        reloadTime:2000, bSpeed:2.8,  spread:0.04,  pellets:1,
        color:0x2a4a2a, width:0.13, length:0.80,
        hasScope:true,  zoomFov:55,
        desc:"Rifle de assalto equilibrado. Burst de 3 tiros.",
        autoFire: true
    },
    "Guardian":  {
        category:"rifle",    type:"rifle",   isAutomatic:false,
        cost:2250,    fireRate:460,  damage:65,   magSize:12,  reserve:36,
        reloadTime:2100, bSpeed:3.2,  spread:0.005, pellets:1,
        color:0x3a3a5a, width:0.13, length:0.90,
        hasScope:true,  zoomFov:45,
        desc:"Rifle semi-automático. Um tiro, um acerto.",
        autoFire: false
    },
    "Phantom":   {
        category:"rifle",    type:"rifle",   isAutomatic:true,
        cost:2900,    fireRate:115,  damage:39,   magSize:30,  reserve:90,
        reloadTime:2100, bSpeed:3.0,  spread:0.025, pellets:1,
        color:0x1e3a1e, width:0.14, length:0.92,
        hasScope:true,  zoomFov:48,
        desc:"Rifle silenciado. O favorito dos profissionais.",
        autoFire: true
    },
    "Vandal":    {
        category:"rifle",    type:"rifle",   isAutomatic:true,
        cost:2900,    fireRate:120,  damage:40,   magSize:25,  reserve:75,
        reloadTime:2300, bSpeed:3.0,  spread:0.03,  pellets:1,
        color:0x600000, width:0.14, length:0.95,
        hasScope:true,  zoomFov:48,
        desc:"Rifle de alto dano. Domina a médio alcance.",
        autoFire: true
    },

    // ── SNIPER ────────────────────────────────────────────────
    "Marshal":   {
        category:"sniper",   type:"sniper",  isAutomatic:false,
        cost:950,     fireRate:1000, damage:101,  magSize:5,   reserve:15,
        reloadTime:2800, bSpeed:4.5,  spread:0.001, pellets:1,
        color:0x5a4a2a, width:0.12, length:1.20,
        hasScope:true,  zoomFov:22,
        desc:"Sniper leve. Rápida entre os tiros.",
        autoFire: false
    },
    "Operator":  {
        category:"sniper",   type:"sniper",  isAutomatic:false,
        cost:4700,    fireRate:1300, damage:200,  magSize:5,   reserve:10,
        reloadTime:3500, bSpeed:5.0,  spread:0.0,   pellets:1,
        color:0x3a0a4a, width:0.18, length:1.42,
        hasScope:true,  zoomFov:18,
        desc:"Sniper pesada. Um tiro = elimina.",
        autoFire: false
    },

    // ── LMG ───────────────────────────────────────────────────
    "Ares":      {
        category:"lmg",      type:"lmg",     isAutomatic:true,
        cost:1600,    fireRate:110,  damage:30,   magSize:50,  reserve:100,
        reloadTime:3500, bSpeed:2.4,  spread:0.08,  pellets:1,
        color:0x4a3a1a, width:0.18, length:1.00,
        hasScope:false, zoomFov:65,
        desc:"Metralhadora leve. Pente de 50 balas.",
        autoFire: true
    },
    "Odin":      {
        category:"lmg",      type:"lmg",     isAutomatic:true,
        cost:3200,    fireRate:100,  damage:38,   magSize:100, reserve:200,
        reloadTime:5000, bSpeed:2.4,  spread:0.09,  pellets:1,
        color:0x1a1a1a, width:0.22, length:1.10,
        hasScope:true,  zoomFov:55,
        desc:"Metralhadora pesada. 100 balas de devastação.",
        autoFire: true
    },

    // ── MELEE ─────────────────────────────────────────────────
    "Faca":      {
        category:"melee",    type:"melee",   isAutomatic:false,
        cost:0,       fireRate:550,  damage:60,   magSize:1,   reserve:0,
        reloadTime:0,    bSpeed:0.0,  spread:0.0,   pellets:1,
        color:0xbbbbbb, width:0.04, length:0.38,
        hasScope:false, zoomFov:75,
        desc:"Sempre disponível. Letal a queima-roupa.",
        autoFire: false
    }
};

const SLOT_CATS = {
    pistol:  2,
    smg:     1,
    rifle:   1,
    sniper:  1,
    shotgun: 1,
    lmg:     1,
    melee:   3
};

// ─── INVENTÁRIO ──────────────────────────────────────────────
let inventory = { 1: null, 2: "Classic", 3: "Faca" };
let currentSlot = 3;
let currentWeaponName = "Faca";
let isMouseDown = false;

let ammoSlots = {
    1: { inMag: 0, reserve: 0 },
    2: { inMag: 12, reserve: 36 },
    3: { inMag: 1,  reserve: 0 }
};

let isReloading      = false;
let reloadStartTime  = 0;
let lastShotTime     = 0;
let isAiming         = false;
let currentRecoil    = 0;
let weaponBob        = 0;
let weaponBobDir     = 1;
let isMoving         = false;
let weaponSway       = { x: 0, y: 0 };
let smoothYaw        = 0;
let smoothPitch      = 0;
let targetYaw        = 0;
let targetPitch      = 0;

// ─── THREE.JS SETUP ──────────────────────────────────────────
const scene    = new THREE.Scene();
scene.background = new THREE.Color(0x080d12);
scene.fog = new THREE.FogExp2(0x0a1520, 0.008);

const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);
document.addEventListener('contextmenu', e => e.preventDefault());

// ─── ILUMINAÇÃO ──────────────────────────────────────────────
const ambient = new THREE.AmbientLight(0x1a2535, 1.0);
scene.add(ambient);

const sunLight = new THREE.DirectionalLight(0xaaccff, 0.6);
sunLight.position.set(40, 80, 40);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far  = 300;
sunLight.shadow.camera.left = -80;
sunLight.shadow.camera.right = 80;
sunLight.shadow.camera.top  = 80;
sunLight.shadow.camera.bottom = -80;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0xff6644, 0.2);
fillLight.position.set(-40, 20, -40);
scene.add(fillLight);

// Luzes pontual decorativas
function addPointLight(x, y, z, color, intensity, dist) {
    const pl = new THREE.PointLight(color, intensity, dist);
    pl.position.set(x, y, z);
    scene.add(pl);
    return pl;
}
const dynamicLights = [];
dynamicLights.push(addPointLight(0,   8, 0,   0x0044ff, 0.5, 40));
dynamicLights.push(addPointLight(35,  6, 35,  0xff4400, 0.5, 35));
dynamicLights.push(addPointLight(-35, 6, -35, 0x00ff88, 0.5, 35));
dynamicLights.push(addPointLight(35,  6, -35, 0xff0044, 0.4, 35));

// ─── GRUPO DA ARMA (acoplado à câmera) ───────────────────────
const weaponGroup = new THREE.Group();
camera.add(weaponGroup);
scene.add(camera);

// ─── MAPA ────────────────────────────────────────────────────
const MAP_LIMIT = 78;

// Piso com textura de grade emissiva
const floorGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
const floorMat = new THREE.MeshStandardMaterial({
    color: 0x111820, roughness: 0.9, metalness: 0.1
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Teto translúcido
const ceilGeo = new THREE.PlaneGeometry(160, 160);
const ceilMat = new THREE.MeshStandardMaterial({ color: 0x0a0e14, transparent: true, opacity: 0.3 });
const ceil = new THREE.Mesh(ceilGeo, ceilMat);
ceil.rotation.x = Math.PI / 2;
ceil.position.y = 12;
scene.add(ceil);

// Grade estilizada
const grid = new THREE.GridHelper(160, 80, 0x0a2030, 0x0a1822);
grid.position.y = 0.02;
scene.add(grid);

let obstacles = [];
let obstacleMeshes = [];
let decorMeshes = [];

// Materiais de obstáculos
const obsMats = [
    new THREE.MeshStandardMaterial({ color: 0x1a2535, roughness: 0.7, metalness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x2a1a1a, roughness: 0.6, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0x1a2a1a, roughness: 0.8, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x2a2535, roughness: 0.5, metalness: 0.4 }),
];

function buildObstacle(x, z, w, h, d, matIdx=0) {
    const geo  = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geo, obsMats[matIdx % obsMats.length]);
    mesh.scale.set(w, h, d);
    mesh.position.set(x, h/2, z);
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    obstacles.push({ x, z, w, d });
    obstacleMeshes.push(mesh);
    return mesh;
}

// Coluna decorativa com luz
function buildColumn(x, z, color=0x00ffcc) {
    const col = buildObstacle(x, z, 1.2, 8, 1.2, 0);
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.3, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x223344, emissive: color, emissiveIntensity: 0.5 })
    );
    top.position.set(x, 8.15, z);
    scene.add(top);
    decorMeshes.push(top);
    addPointLight(x, 9, z, color, 0.6, 18);
}

// Caixas empilhadas
function buildCrates(cx, cz, rows=2, cols=2, matIdx=0) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const s = 1.4 + Math.random() * 0.3;
            const mesh = buildObstacle(
                cx + c * 1.6 - (cols - 1) * 0.8,
                cz + (Math.random() - 0.5) * 0.5,
                s, s, s, matIdx
            );
            mesh.rotation.y = (Math.random() - 0.5) * 0.3;
        }
    }
}

function generateRandomMap() {
    obstacleMeshes.forEach(m => scene.remove(m));
    decorMeshes.forEach(m => scene.remove(m));
    obstacles = []; obstacleMeshes = []; decorMeshes = [];

    // Paredes perimetrais
    buildObstacle(0,   80, 160, 10, 2, 0);
    buildObstacle(0,  -80, 160, 10, 2, 0);
    buildObstacle(80,   0, 2,  10, 160, 0);
    buildObstacle(-80,  0, 2,  10, 160, 0);

    const style = Math.floor(Math.random() * 4);

    if (style === 0) {
        // Mapa urbano com corridors
        buildObstacle(-28, 0, 10, 9, 50, 1);
        buildObstacle( 28, 0, 10, 9, 50, 1);
        buildObstacle(0, 0, 14, 7, 14, 2);
        buildColumn(-55, 22, 0x00ffcc);
        buildColumn( 55,-22, 0xff4655);
        buildColumn(-55,-22, 0x0044ff);
        buildColumn( 55, 22, 0xffaa00);
        buildCrates(-14, 28, 2, 2, 3);
        buildCrates( 14,-28, 2, 2, 2);
        buildObstacle(-55, 0, 8, 5, 24, 2);
        buildObstacle( 55, 0, 8, 5, 24, 2);
        buildCrates(0, 38, 1, 3, 1);
        buildCrates(0,-38, 1, 3, 1);

    } else if (style === 1) {
        // Mapa aberto com cobertura espalhada
        for (let i = 0; i < 18; i++) {
            const rx = (Math.random() - 0.5) * 120;
            const rz = (Math.random() - 0.5) * 120;
            if (Math.hypot(rx, rz) > 15 && Math.abs(rz) > 12) {
                const rw = 3 + Math.random() * 6;
                const rh = 2 + Math.random() * 5;
                buildObstacle(rx, rz, rw, rh, rw, Math.floor(Math.random() * 4));
            }
        }
        buildColumn( 40,  40, 0x00ffcc);
        buildColumn(-40, -40, 0xff4655);
        buildColumn( 40, -40, 0x0044ff);
        buildColumn(-40,  40, 0xffaa00);

    } else if (style === 2) {
        // Mapa simétrico competitivo
        buildObstacle(-35,-15, 38, 7, 6, 1);
        buildObstacle( 35, 15, 38, 7, 6, 1);
        buildObstacle(0, -32, 18, 5, 8, 2);
        buildObstacle(0,  32, 18, 5, 8, 2);
        buildObstacle(-58, 0, 6, 8, 28, 3);
        buildObstacle( 58, 0, 6, 8, 28, 3);
        buildCrates(-18,  0, 2, 3, 0);
        buildCrates( 18,  0, 2, 3, 0);
        buildCrates(-35, 35, 1, 2, 2);
        buildCrates( 35,-35, 1, 2, 2);
        buildColumn(0, 0, 0xffffff);

    } else {
        // Mapa labirinto
        buildObstacle(-20,-50, 4, 8, 45, 0);
        buildObstacle( 20, 50, 4, 8, 45, 0);
        buildObstacle(-55,-20, 45, 8, 4, 1);
        buildObstacle( 55, 20, 45, 8, 4, 1);
        buildObstacle(-40,  20, 4, 6, 22, 2);
        buildObstacle( 40, -20, 4, 6, 22, 2);
        buildColumn(-10,-10, 0xff4655);
        buildColumn( 10, 10, 0x00ffcc);
        buildCrates(-55, 55, 2, 2, 3);
        buildCrates( 55,-55, 2, 2, 3);
        buildCrates(0, 0, 1, 2, 1);
    }
}

// ─── VISUAL DA ARMA (3D) ─────────────────────────────────────
function buildWeaponMesh(name) {
    const group = new THREE.Group();
    if (!name) return group;
    const d = WEAPON_SHOP[name];

    if (d.type === "melee") {
        // Faca
        const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.018, 0.06, d.length),
            new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.05 })
        );
        blade.rotation.x = Math.PI / 4;
        group.add(blade);

        const guard = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.07, 0.015),
            new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.7 })
        );
        guard.position.set(0, -0.01, 0.12);
        group.add(guard);

        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.018, 0.015, 0.15, 8),
            new THREE.MeshStandardMaterial({ color: 0x220000, roughness: 0.9 })
        );
        handle.rotation.x = Math.PI / 2;
        handle.position.set(0, -0.02, 0.19);
        group.add(handle);
        return group;
    }

    const W = d.width, L = d.length;

    // Corpo principal
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, W * 1.3, L),
        new THREE.MeshStandardMaterial({ color: d.color, metalness: 0.55, roughness: 0.25 })
    );
    group.add(body);

    // Trilho superior (rail)
    const rail = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.55, W * 0.22, L * 0.92),
        new THREE.MeshStandardMaterial({ color: 0x282828, metalness: 0.85, roughness: 0.1 })
    );
    rail.position.set(0, W * 0.76, -L * 0.03);
    group.add(rail);

    // Cano
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(W * 0.12, W * 0.1, L * 0.85, 10),
        new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.9, roughness: 0.1 })
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, W * 0.1, -L * 0.35);
    group.add(barrel);

    // Carregador
    const mag = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.7, W * 1.4, L * 0.18),
        new THREE.MeshStandardMaterial({ color: 0x101010, roughness: 0.55 })
    );
    mag.position.set(0, -W * 1.05, L * 0.1);
    group.add(mag);

    // Coronha
    const stock = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.5, W * 0.9, L * 0.25),
        new THREE.MeshStandardMaterial({ color: d.color, roughness: 0.4 })
    );
    stock.position.set(0, -W * 0.05, L * 0.5);
    group.add(stock);

    // Cabo / punho
    const grip = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.55, W * 1.1, L * 0.09),
        new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.9 })
    );
    grip.position.set(0, -W * 1.0, L * 0.28);
    group.add(grip);

    // Boca do cano (flash hider)
    const flash = new THREE.Mesh(
        new THREE.CylinderGeometry(W * 0.15, W * 0.18, W * 0.4, 8),
        new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 })
    );
    flash.rotation.x = Math.PI / 2;
    flash.position.set(0, W * 0.1, -L * 0.52);
    group.add(flash);

    // Mira frontal
    if (d.hasScope) {
        const scopeBody = new THREE.Mesh(
            new THREE.CylinderGeometry(W * 0.22, W * 0.22, L * 0.35, 12),
            new THREE.MeshStandardMaterial({ color: 0x080808, metalness: 0.9 })
        );
        scopeBody.rotation.x = Math.PI / 2;
        scopeBody.position.set(0, W * 0.97, -L * 0.05);
        group.add(scopeBody);

        const lens = new THREE.Mesh(
            new THREE.CircleGeometry(W * 0.18, 12),
            new THREE.MeshStandardMaterial({ color: 0x0022ff, transparent: true, opacity: 0.5, emissive: 0x0044ff, emissiveIntensity: 0.3 })
        );
        lens.position.set(0, W * 0.97, -L * 0.22);
        group.add(lens);
    }

    // Tipos especiais
    if (d.type === "sniper") {
        const bipod1 = new THREE.Mesh(
            new THREE.BoxGeometry(W * 0.08, W * 0.8, W * 0.08),
            new THREE.MeshStandardMaterial({ color: 0x222222 })
        );
        bipod1.position.set(-W * 0.4, -W * 0.45, -L * 0.3);
        group.add(bipod1);
        const bipod2 = bipod1.clone();
        bipod2.position.x = W * 0.4;
        group.add(bipod2);
    }

    if (d.type === "shotgun") {
        const pump = new THREE.Mesh(
            new THREE.BoxGeometry(W * 0.9, W * 0.5, L * 0.22),
            new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 })
        );
        pump.position.set(0, -W * 0.2, -L * 0.2);
        group.add(pump);
    }

    if (d.type === "lmg") {
        const drum = new THREE.Mesh(
            new THREE.CylinderGeometry(W * 0.9, W * 0.9, W * 0.6, 16),
            new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 })
        );
        drum.position.set(0, -W * 1.05, L * 0.18);
        group.add(drum);
    }

    return group;
}

function updateWeaponVisual() {
    while (weaponGroup.children.length > 0) weaponGroup.remove(weaponGroup.children[0]);
    if (player.hp <= 0 || !currentWeaponName) return;
    const mesh = buildWeaponMesh(currentWeaponName);
    weaponGroup.add(mesh);
    resetWeaponPosition();
}

function resetWeaponPosition() {
    if (!currentWeaponName) return;
    const d = WEAPON_SHOP[currentWeaponName];
    if (isAiming && d.hasScope) {
        weaponGroup.position.set(0, -0.17, -0.38);
        weaponGroup.rotation.set(0, 0, 0);
    } else {
        if (d.type === "melee") {
            weaponGroup.position.set(0.22, -0.28, -0.38);
        } else {
            weaponGroup.position.set(0.30, -0.23, -0.58);
        }
        weaponGroup.rotation.set(0, 0, 0);
    }
}

// ─── PLAYER ──────────────────────────────────────────────────
let player = { x: 0, z: 62, hp: 100, maxHp: 100, speed: 0.15, yaw: 0, pitch: 0 };
camera.position.set(player.x, 1.9, player.z);

let allies  = [];
let enemies = [];
let bullets = [];

// ─── BOT WEAPONS POR NÍVEL ───────────────────────────────────
const BOT_WEAPON_SETS = [
    ["Classic","Ghost"],
    ["Spectre","Bulldog","Phantom"],
    ["Vandal","Operator","Odin"]
];

let roundNumber = 0;

function spawnBot(type, x, z) {
    const color    = type === 'ally' ? 0x00ffcc : 0xff4655;
    const emissive = type === 'ally' ? 0x004433 : 0x330000;
    const bodyGeo  = new THREE.CylinderGeometry(0.55, 0.55, 1.8, 12);
    const bodyMat  = new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.3, roughness: 0.6 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    bodyMesh.position.set(x, 0.9, z);
    scene.add(bodyMesh);

    const headGeo  = new THREE.SphereGeometry(0.38, 10, 10);
    const headMat  = new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.4 });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.set(x, 2.1, z);
    headMesh.castShadow = true;
    scene.add(headMesh);

    // Arma do bot (3D)
    const tier   = Math.min(Math.floor(roundNumber / 2), BOT_WEAPON_SETS.length - 1);
    const wSet   = BOT_WEAPON_SETS[tier];
    const wName  = wSet[Math.floor(Math.random() * wSet.length)];
    const wGroup = buildWeaponMesh(wName);
    wGroup.scale.setScalar(0.65);
    wGroup.position.set(0.5, 0.4, -0.2);
    bodyMesh.add(wGroup);

    const bot = {
        type, bodyMesh, headMesh, weaponMesh: wGroup,
        x, z, hp: 100,
        lastShot: 0,
        speed: type === 'enemy' ? (0.07 + roundNumber * 0.005) : 0.06,
        weapon: wName,
        strafeTimer: 0,
        strafeDir: 1,
        state: 'idle',    // idle | chase | strafe | retreat
        coverPos: null,
        alertTimer: 0,
        alive: true
    };

    if (type === 'ally') allies.push(bot); else enemies.push(bot);
}

function removeBot(bot, list, idx) {
    bot.alive = false;
    scene.remove(bot.bodyMesh);
    scene.remove(bot.headMesh);
    list.splice(idx, 1);
}

// ─── RESET DE RODADA ─────────────────────────────────────────
function resetRound() {
    bullets.forEach(b => { scene.remove(b.mesh); if (b.trail) b.trail.forEach(t => scene.remove(t)); });
    bullets = [];
    allies.forEach(a  => { scene.remove(a.bodyMesh); scene.remove(a.headMesh); });
    enemies.forEach(e => { scene.remove(e.bodyMesh); scene.remove(e.headMesh); });
    allies = []; enemies = [];

    generateRandomMap();
    roundNumber++;

    player.x = 0; player.z = 62; player.hp = 100;
    camera.position.set(player.x, 1.9, player.z);
    player.yaw = 0; player.pitch = 0;
    targetYaw = 0; targetPitch = 0;
    camera.rotation.order = "YXZ";
    camera.rotation.set(0, 0, 0);

    isReloading = false;
    isAiming = false;
    isMouseDown = false;
    camera.fov = 75;
    camera.updateProjectionMatrix();

    for (let slot in inventory) {
        if (inventory[slot]) {
            const w = WEAPON_SHOP[inventory[slot]];
            ammoSlots[slot].inMag   = w.magSize;
            ammoSlots[slot].reserve = w.reserve;
        }
    }

    currentSlot = 2;
    currentWeaponName = inventory[2] || "Faca";
    if (!inventory[2]) { currentSlot = 3; currentWeaponName = "Faca"; }

    updateHUD();
    updateWeaponVisual();
    updateSlotsHUD();

    // Spawn balanceado por round
    const allyCount   = 2 + Math.min(roundNumber - 1, 2);
    const enemyCount  = 3 + Math.min(roundNumber - 1, 4);
    const spawnRadius = 55;

    for (let i = 0; i < allyCount; i++) {
        spawnBot('ally', (Math.random() - 0.5) * 30, spawnRadius - Math.random() * 10);
    }
    for (let i = 0; i < enemyCount; i++) {
        const angle = (i / enemyCount) * Math.PI * 2;
        spawnBot('enemy',
            Math.cos(angle) * (20 + Math.random() * 20),
            -spawnRadius + Math.random() * 15
        );
    }

    setupShopInterface();
    drawMinimap();
}

// ─── HUD ─────────────────────────────────────────────────────
function updateHUD() {
    document.getElementById("hp").textContent = Math.max(0, Math.ceil(player.hp));
    const hpPct = Math.max(0, player.hp / player.maxHp * 100);
    const hpBar = document.getElementById("hp-bar");
    hpBar.style.width = hpPct + "%";
    hpBar.style.background = hpPct > 50 ? 'var(--teal)' : hpPct > 25 ? '#ffaa00' : 'var(--red)';
    hpBar.style.boxShadow  = `0 0 8px ${hpPct > 50 ? 'var(--teal)' : hpPct > 25 ? '#ffaa00' : 'var(--red)'}`;

    document.getElementById("money").textContent = "$" + credits;
    document.getElementById("buy-credits-val").textContent = "$" + credits;

    if (player.hp <= 0 || !currentWeaponName) {
        document.getElementById("weapon-name").textContent = "ESPECTADOR";
        document.getElementById("ammo-mag").textContent = "--";
        document.getElementById("ammo-res").textContent = "--";
        return;
    }

    const d = WEAPON_SHOP[currentWeaponName];
    let wLabel = currentWeaponName;
    if (isAiming && d.hasScope) wLabel += " ◉";
    document.getElementById("weapon-name").textContent = wLabel;

    const catNames = {
        pistol:"PISTOLA", smg:"SMG", rifle:"RIFLE",
        sniper:"SNIPER", shotgun:"SHOTGUN", lmg:"LMG", melee:"MELEE"
    };
    document.getElementById("weapon-slot-label").textContent =
        `SLOT ${currentSlot} · ${catNames[d.category] || d.type.toUpperCase()}`;

    if (isReloading) {
        document.getElementById("reload-bar-wrap").style.display = "block";
        document.getElementById("ammo-mag").textContent = "--";
    } else {
        document.getElementById("reload-bar-wrap").style.display = "none";
        const ammo = ammoSlots[currentSlot];
        document.getElementById("ammo-mag").textContent = d.type === "melee" ? "∞" : ammo.inMag;
        document.getElementById("ammo-res").textContent = d.type === "melee" ? "" : ammo.reserve;

        // Alerta de baixa munição
        const warn = document.getElementById("low-ammo-warn");
        if (d.type !== "melee" && ammo.inMag <= Math.ceil(d.magSize * 0.25) && ammo.inMag > 0) {
            warn.textContent = "⚠ BAIXA MUNIÇÃO";
            warn.classList.add("visible");
        } else {
            warn.classList.remove("visible");
        }
    }
}

function updateSlotsHUD() {
    [1,2,3].forEach(i => {
        const el = document.getElementById(`slot-${i}`);
        const sn = document.getElementById(`sn${i}`);
        el.classList.toggle("active", currentSlot === i);
        sn.textContent = inventory[i] || "—";
    });
    const ld1 = document.getElementById("ld-slot1");
    const ld2 = document.getElementById("ld-slot2");
    if (ld1) ld1.textContent = "SLOT 1: " + (inventory[1] || "—");
    if (ld2) ld2.textContent = "SLOT 2: " + (inventory[2] || "Classic");
}

// ─── HIT MARKER ──────────────────────────────────────────────
function flashHitMarker() {
    const hm = document.getElementById("hit-marker");
    hm.classList.add("flash");
    setTimeout(() => hm.classList.remove("flash"), 120);
}

function flashDamage() {
    const ov = document.getElementById("damage-overlay");
    ov.classList.add("hit");
    setTimeout(() => ov.classList.remove("hit"), 400);
}

function addKillFeed(text) {
    const feed = document.getElementById("kill-feed");
    const el   = document.createElement("div");
    el.className = "kill-entry";
    el.textContent = text;
    feed.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity 0.5s"; setTimeout(() => el.remove(), 500); }, 2500);
    while (feed.children.length > 4) feed.removeChild(feed.firstChild);
}

// ─── SHOP ────────────────────────────────────────────────────
const SHOP_CATS = ["pistol","smg","rifle","sniper","shotgun","lmg"];
let activeShopCat = "pistol";

function setupShopInterface() {
    document.getElementById("buy-credits-val").textContent = "$" + credits;
    updateSlotsHUD();
    renderShopGrid(activeShopCat);

    document.querySelectorAll(".shop-tab").forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll(".shop-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            activeShopCat = tab.dataset.cat;
            renderShopGrid(activeShopCat);
        };
    });
}

function renderShopGrid(cat) {
    const grid = document.getElementById("shop-grid");
    grid.innerHTML = "";

    Object.entries(WEAPON_SHOP).forEach(([name, w]) => {
        if (w.category !== cat) return;
        if (name === "Faca") return;

        const targetSlot = SLOT_CATS[w.category] || 1;
        const isEquipped = inventory[targetSlot] === name;
        const cantAfford = credits < w.cost && !isEquipped;

        const card = document.createElement("div");
        card.className = "shop-card" + (isEquipped ? " equipped" : "") + (cantAfford ? " cant-afford" : "");

        const autoLabel = w.isAutomatic ? "AUTO" : "SEMI";
        card.innerHTML = `
            <div class="sc-name">${name}</div>
            <div class="sc-cost">$${w.cost}</div>
            <div class="sc-stats">DMG ${w.damage} · CD ${w.fireRate}ms · Pente ${w.magSize}</div>
            <div class="sc-stats" style="color:var(--text2);font-size:9px">${w.desc}</div>
            <div class="sc-badge ${w.isAutomatic ? 'auto' : ''}">${autoLabel}</div>
        `;

        if (!cantAfford) {
            card.onclick = () => {
                if (isEquipped) return;
                credits -= w.cost;
                inventory[targetSlot] = name;
                ammoSlots[targetSlot].inMag   = w.magSize;
                ammoSlots[targetSlot].reserve = w.reserve;

                currentSlot = targetSlot;
                currentWeaponName = name;
                isReloading = false; isAiming = false; isMouseDown = false;
                camera.fov = 75; camera.updateProjectionMatrix();

                updateHUD();
                updateWeaponVisual();
                updateSlotsHUD();
                renderShopGrid(cat);
            };
        }

        grid.appendChild(card);
    });
}

// ─── TROCA DE SLOT ───────────────────────────────────────────
function switchSlot(n) {
    if (player.hp <= 0 || isReloading) return;
    if (!inventory[n]) return;
    if (currentSlot === n) return;

    isAiming = false; camera.fov = 75; camera.updateProjectionMatrix();
    currentSlot = n;
    currentWeaponName = inventory[n];
    isMouseDown = false;

    // Animação de troca: abaixa e sobe a arma
    animWeaponSwitch();
    updateHUD();
    updateSlotsHUD();
    updateWeaponVisual();
}

// ─── ANIMAÇÕES SMOOTH ─────────────────────────────────────────
let weaponSwitchAnim = 0;   // 0 = normal, >0 = saindo, <0 = entrando
let aimTransition   = 0;    // 0 = hip, 1 = aimed

function animWeaponSwitch() {
    weaponSwitchAnim = 1;
}

function updateWeaponAnims(delta) {
    if (!currentWeaponName) return;
    const d = WEAPON_SHOP[currentWeaponName];

    // Transição de mira suave
    const aimTarget = (isAiming && d.hasScope) ? 1 : 0;
    aimTransition += (aimTarget - aimTransition) * Math.min(1, delta * 18);

    // Bob ao andar
    if (isMoving && !isAiming) {
        weaponBob += delta * 8;
        const bobAmt = 0.012;
        weaponGroup.position.y += Math.sin(weaponBob) * bobAmt;
        weaponGroup.position.x += Math.cos(weaponBob * 0.5) * bobAmt * 0.5;
    } else {
        weaponBob *= 0.9;
    }

    // Sway suave ao mover a câmera
    const swayX = (targetYaw   - smoothYaw)   * 0.04;
    const swayY = (targetPitch - smoothPitch)  * 0.04;
    weaponSway.x += (swayX - weaponSway.x) * 0.1;
    weaponSway.y += (swayY - weaponSway.y) * 0.1;
    weaponGroup.rotation.y += weaponSway.x * 0.5;
    weaponGroup.rotation.x += weaponSway.y * 0.3;

    // Recuo suave
    if (currentRecoil > 0) {
        currentRecoil -= delta * 6;
        if (currentRecoil < 0) currentRecoil = 0;
    }
    weaponGroup.position.z += currentRecoil;

    // Animação de troca de arma
    if (weaponSwitchAnim > 0) {
        weaponGroup.position.y -= weaponSwitchAnim * 0.12;
        weaponSwitchAnim -= delta * 10;
        if (weaponSwitchAnim <= 0) { weaponSwitchAnim = 0; resetWeaponPosition(); }
    }

    // Posição alvo ao mirar (smooth)
    let targetPos;
    if (d.type === "melee") {
        targetPos = new THREE.Vector3(0.22, -0.28, -0.38);
    } else if (aimTransition > 0.01) {
        const hip = new THREE.Vector3(0.30, -0.23, -0.58);
        const aim = new THREE.Vector3(0, -0.17, -0.38);
        targetPos = hip.lerp(aim, aimTransition);
    } else {
        targetPos = new THREE.Vector3(0.30, -0.23, -0.58);
    }
    weaponGroup.position.lerp(targetPos, Math.min(1, delta * 14));
}

// ─── RELOAD ──────────────────────────────────────────────────
function reloadWeapon() {
    if (player.hp <= 0 || !currentWeaponName || currentWeaponName === "Faca") return;
    const d = WEAPON_SHOP[currentWeaponName];
    const ammo = ammoSlots[currentSlot];
    if (isReloading || ammo.inMag === d.magSize || ammo.reserve <= 0) return;

    isReloading = true;
    reloadStartTime = Date.now();
    isAiming = false; isMouseDown = false;
    camera.fov = 75; camera.updateProjectionMatrix();

    document.getElementById("reload-bar-wrap").style.display = "block";
    const bar = document.getElementById("reload-bar");
    bar.style.transition = `width ${d.reloadTime}ms linear`;
    bar.style.width = "0%";
    setTimeout(() => { bar.style.width = "100%"; }, 30);

    // Animação da arma descendo
    weaponGroup.position.y -= 0.08;

    updateHUD();

    setTimeout(() => {
        if (!isReloading) return;
        const need = d.magSize - ammo.inMag;
        const take = Math.min(need, ammo.reserve);
        ammo.inMag   += take;
        ammo.reserve -= take;
        isReloading   = false;
        bar.style.transition = "none";
        bar.style.width = "0%";
        document.getElementById("reload-bar-wrap").style.display = "none";
        updateHUD();
    }, d.reloadTime);
}

// ─── TIRO ─────────────────────────────────────────────────────
function shootCurrentWeapon() {
    if (isReloading || player.hp <= 0 || !currentWeaponName) return;

    const d   = WEAPON_SHOP[currentWeaponName];
    const now = Date.now();
    if (now - lastShotTime < d.fireRate) return;

    if (d.type === "melee") {
        lastShotTime = now;
        // Animação facada
        weaponGroup.position.z -= 0.18;
        setTimeout(() => { if (currentWeaponName === "Faca") resetWeaponPosition(); }, 100);

        for (let j = enemies.length - 1; j >= 0; j--) {
            const en   = enemies[j];
            const dist = Math.hypot(camera.position.x - en.x, camera.position.z - en.z);
            if (dist < 2.8) {
                en.hp -= d.damage;
                flashHitMarker();
                addKillFeed(`🗡 ${currentWeaponName} → Inimigo`);
                if (en.hp <= 0) {
                    removeBot(en, enemies, j);
                    credits += 300;
                    updateHUD();
                }
                break;
            }
        }
        return;
    }

    const ammo = ammoSlots[currentSlot];
    if (ammo.inMag <= 0) {
        isMouseDown = false;
        reloadWeapon();
        return;
    }

    ammo.inMag--;
    lastShotTime = now;
    currentRecoil = 0.045;

    // Recuo visual extra para armas pesadas
    if (d.type === "lmg" || d.type === "sniper") currentRecoil = 0.09;

    updateHUD();

    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);

    const spreadMult = isAiming ? 0.25 : 1.0;
    const sp = d.spread * spreadMult;

    for (let p = 0; p < d.pellets; p++) {
        const shotDir = dir.clone();
        if (sp > 0) {
            shotDir.x += (Math.random() - 0.5) * sp;
            shotDir.y += (Math.random() - 0.5) * sp;
            shotDir.z += (Math.random() - 0.5) * sp;
        }
        shotDir.normalize();

        const spawnPos = camera.position.clone();
        if (isAiming && d.hasScope) {
            spawnPos.y -= 0.18;
        } else {
            const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0,1,0)).normalize();
            spawnPos.addScaledVector(right, 0.30);
            spawnPos.y -= 0.24;
        }

        createBullet(spawnPos, shotDir, 'player', d);
    }

    // Efeito de muzzle flash
    muzzleFlash();
}

function muzzleFlash() {
    const flash = new THREE.PointLight(0xffaa44, 3, 2.5);
    const tip   = new THREE.Vector3(0, 0, -1.5);
    camera.localToWorld(tip);
    flash.position.copy(tip);
    scene.add(flash);
    setTimeout(() => scene.remove(flash), 40);
}

function createBullet(pos, dir, owner, weaponData) {
    const speed  = weaponData.bSpeed;
    const color  = owner === 'player' ? 0x00ffcc : owner === 'enemy' ? 0xff8800 : 0x88ffdd;
    const size   = weaponData.width * 0.3;

    const geo  = new THREE.SphereGeometry(Math.max(0.04, size), 6, 6);
    const mat  = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    scene.add(mesh);

    // Trail (rastro luminoso)
    const trailMat  = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
    const trailGeo  = new THREE.BufferGeometry();
    const trailPts  = [pos.clone(), pos.clone()];
    trailGeo.setFromPoints(trailPts);
    const trail = new THREE.Line(trailGeo, trailMat);
    scene.add(trail);

    const damage = weaponData.damage;
    const maxLife = weaponData.type === "sniper" ? 300 : 180;

    bullets.push({
        mesh, trail, trailPts,
        dir: dir.clone().normalize(),
        velocity: speed,
        life: maxLife,
        owner,
        damage,
        weaponType: weaponData.type
    });
}

// ─── COLISÃO ─────────────────────────────────────────────────
function checkCollision(x, z, size = 0.7) {
    if (Math.abs(x) > MAP_LIMIT || Math.abs(z) > MAP_LIMIT) return true;
    for (let obs of obstacles) {
        const hw = obs.w / 2 + size;
        const hd = obs.d / 2 + size;
        if (x > obs.x - hw && x < obs.x + hw &&
            z > obs.z - hd && z < obs.z + hd) return true;
    }
    return false;
}

// ─── IA DOS BOTS (AVANÇADA) ───────────────────────────────────
function runBotAI(bot, delta) {
    if (!bot.alive) return;

    const isEnemy = (bot.type === 'enemy');
    let targetPos = null;

    if (isEnemy) {
        if (player.hp > 0) targetPos = camera.position;
        else if (allies.length > 0) targetPos = allies[0].bodyMesh.position;
    } else {
        if (enemies.length > 0) targetPos = enemies[0].bodyMesh.position;
    }

    if (!targetPos) return;

    const toX = targetPos.x - bot.x;
    const toZ = targetPos.z - bot.z;
    const dist = Math.hypot(toX, toZ);

    // MACHINE DE ESTADOS
    if (dist > 45)      bot.state = 'chase';
    else if (dist < 6)  bot.state = 'retreat';
    else {
        bot.strafeTimer -= delta;
        if (bot.strafeTimer <= 0) {
            bot.strafeTimer = 0.8 + Math.random() * 1.2;
            bot.strafeDir   = Math.random() > 0.5 ? 1 : -1;
            bot.state = Math.random() > 0.35 ? 'strafe' : 'chase';
        }
    }

    let moveX = 0, moveZ = 0;

    if (bot.state === 'chase') {
        moveX = toX / dist;
        moveZ = toZ / dist;
    } else if (bot.state === 'strafe') {
        // Strafing lateral em relação ao alvo
        const perp = new THREE.Vector3(-toZ / dist, 0, toX / dist);
        moveX = perp.x * bot.strafeDir + (toX / dist) * 0.15;
        moveZ = perp.z * bot.strafeDir + (toZ / dist) * 0.15;
    } else if (bot.state === 'retreat') {
        moveX = -(toX / dist);
        moveZ = -(toZ / dist);
    }

    // Velocidade variável
    let spd = bot.speed;
    if (bot.state === 'retreat') spd *= 1.3;
    if (isEnemy && dist < 20)    spd *= 1.1;

    const nx = bot.x + moveX * spd;
    const nz = bot.z + moveZ * spd;

    if (!checkCollision(nx, nz, 1.0)) {
        bot.x = nx; bot.z = nz;
    } else {
        // Desvio de obstáculo: tenta alternativas
        if (!checkCollision(bot.x + moveX * spd, bot.z, 1.0)) {
            bot.x += moveX * spd;
        } else if (!checkCollision(bot.x, bot.z + moveZ * spd, 1.0)) {
            bot.z += moveZ * spd;
        } else {
            bot.strafeDir *= -1;
            bot.strafeTimer = 0;
        }
    }

    bot.bodyMesh.position.set(bot.x, 0.9, bot.z);
    bot.headMesh.position.set(bot.x, 2.1, bot.z);

    // Rotação suave em direção ao alvo
    const angle = Math.atan2(toX, toZ);
    bot.bodyMesh.rotation.y = angle;

    // DISPARO
    const wData = WEAPON_SHOP[bot.weapon];
    const now   = Date.now();
    // Inimigos atiram mais devagar que o player; aliados ainda menos
    const rateMultiplier = isEnemy ? 1.6 : 2.2;
    if (now - bot.lastShot > wData.fireRate * rateMultiplier) {
        const accuracy = isEnemy
            ? Math.min(0.07, dist * 0.0018)
            : Math.min(0.14, dist * 0.004);

        const shotDir = new THREE.Vector3(
            toX / dist + (Math.random() - 0.5) * accuracy,
            0.1 + (Math.random() - 0.5) * accuracy,
            toZ / dist + (Math.random() - 0.5) * accuracy
        ).normalize();

        const spawnPos = bot.bodyMesh.position.clone();
        spawnPos.y = 1.6;
        createBullet(spawnPos, shotDir, bot.type, wData);
        bot.lastShot = now;
    }
}

// ─── MINIMAP ─────────────────────────────────────────────────
function drawMinimap() {
    const c   = document.getElementById("minimap");
    const ctx = c.getContext("2d");
    const W   = c.width, H = c.height;
    const S   = W / (MAP_LIMIT * 2);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(10,14,20,0.9)";
    ctx.fillRect(0, 0, W, H);

    // Obstáculos
    ctx.fillStyle = "#1a2535";
    obstacles.forEach(obs => {
        const px = (obs.x + MAP_LIMIT) * S - obs.w * S / 2;
        const py = (obs.z + MAP_LIMIT) * S - obs.d * S / 2;
        ctx.fillRect(px, py, obs.w * S, obs.d * S);
    });

    // Aliados
    ctx.fillStyle = "#00ffcc";
    allies.forEach(a => {
        const px = (a.x + MAP_LIMIT) * S;
        const py = (a.z + MAP_LIMIT) * S;
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2); ctx.fill();
    });

    // Inimigos
    ctx.fillStyle = "#ff4655";
    enemies.forEach(e => {
        const px = (e.x + MAP_LIMIT) * S;
        const py = (e.z + MAP_LIMIT) * S;
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2); ctx.fill();
    });

    // Player
    if (player.hp > 0) {
        const px = (player.x + MAP_LIMIT) * S;
        const py = (player.z + MAP_LIMIT) * S;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI*2); ctx.fill();

        // Direção da câmera
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(
            px - Math.sin(player.yaw) * 10,
            py - Math.cos(player.yaw) * 10
        );
        ctx.stroke();
    }
}

// ─── CONTROLES ───────────────────────────────────────────────
const blocker     = document.getElementById('blocker');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => document.body.requestPointerLock());

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === document.body) {
        blocker.style.display = 'none';
    } else {
        blocker.style.display = 'flex';
        document.getElementById('match-title').textContent = "FASE DE COMPRA / PAUSA";
        startButton.textContent = "▶ CONFIRMAR ENTRADA";
        isAiming = false; isMouseDown = false;
        camera.fov = 75; camera.updateProjectionMatrix();
        setupShopInterface();
    }
});

document.addEventListener('mousemove', e => {
    if (document.pointerLockElement !== document.body) return;
    const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
    const sens = (isAiming && d && d.hasScope) ? 0.0010 : 0.0022;
    targetYaw   -= e.movementX * sens;
    targetPitch -= e.movementY * sens;
    targetPitch = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, targetPitch));
});

window.addEventListener('mousedown', e => {
    if (document.pointerLockElement !== document.body || player.hp <= 0) return;
    if (e.button === 0) {
        isMouseDown = true;
        const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
        if (d && !d.isAutomatic) shootCurrentWeapon();
    } else if (e.button === 2) {
        const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
        if (d && d.hasScope && !isReloading) {
            isAiming = !isAiming;
            camera.fov = isAiming ? d.zoomFov : 75;
            camera.updateProjectionMatrix();
            const ch = document.getElementById("crosshair");
            if (isAiming) ch.classList.add("aiming"); else ch.classList.remove("aiming");
            updateHUD();
        }
    }
});

window.addEventListener('mouseup', e => { if (e.button === 0) isMouseDown = false; });

const keys = {};
window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === "1") switchSlot(1);
    if (e.key === "2") switchSlot(2);
    if (e.key === "3") switchSlot(3);
    if (e.key.toLowerCase() === 'r') reloadWeapon();
    if (e.key === 'q' && inventory[1]) switchSlot(currentSlot === 1 ? 2 : 1);
    if (e.key === 'Escape') document.exitPointerLock();
});
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

// Scroll para trocar slot
window.addEventListener('wheel', e => {
    if (document.pointerLockElement !== document.body) return;
    if (e.deltaY > 0) {
        const order = [1,2,3];
        const ci    = order.indexOf(currentSlot);
        for (let k = 1; k <= 3; k++) {
            const next = order[(ci + k) % 3];
            if (inventory[next]) { switchSlot(next); break; }
        }
    } else {
        const order = [3,2,1];
        const ci    = order.indexOf(currentSlot);
        for (let k = 1; k <= 3; k++) {
            const next = order[(ci + k) % 3];
            if (inventory[next]) { switchSlot(next); break; }
        }
    }
});

// ─── GAME LOOP ───────────────────────────────────────────────
let lastTime = 0;

function gameLoop(timestamp) {
    requestAnimationFrame(gameLoop);

    const delta = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    // Luzes pulsantes decorativas
    const t = timestamp * 0.001;
    dynamicLights.forEach((l, i) => {
        l.intensity = 0.3 + Math.sin(t + i * 1.5) * 0.2;
    });

    if (document.pointerLockElement === document.body) {

        // ── CÂMERA SUAVE ──────────────────────────────────────
        const camSmooth = 0.2;
        smoothYaw   += (targetYaw   - smoothYaw)   * camSmooth * 60 * delta;
        smoothPitch += (targetPitch - smoothPitch)  * camSmooth * 60 * delta;
        camera.rotation.order = "YXZ";
        camera.rotation.set(smoothPitch, smoothYaw, 0);

        if (player.hp > 0) {

            // ── MOVIMENTAÇÃO SUAVE ────────────────────────────
            let mX = 0, mZ = 0;
            const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
            const baseSpeed = (d && d.type === "melee") ? player.speed * 1.3 : player.speed;
            const spd       = isAiming ? baseSpeed * 0.55 : baseSpeed;
            const yaw       = smoothYaw;

            if (keys['w']) { mX -= Math.sin(yaw); mZ -= Math.cos(yaw); }
            if (keys['s']) { mX += Math.sin(yaw); mZ += Math.cos(yaw); }
            if (keys['a']) { mX -= Math.cos(yaw); mZ += Math.sin(yaw); }
            if (keys['d']) { mX += Math.cos(yaw); mZ -= Math.sin(yaw); }

            const len = Math.hypot(mX, mZ);
            isMoving = len > 0;

            if (isMoving) {
                mX = (mX / len) * spd;
                mZ = (mZ / len) * spd;
                if (!checkCollision(player.x + mX, player.z))   player.x += mX;
                if (!checkCollision(player.x, player.z + mZ))   player.z += mZ;
            }

            // Suaviza a câmera ao andar (head bob)
            const targetY = 1.9 + (isMoving ? Math.sin(weaponBob * 2) * 0.012 : 0);
            camera.position.x = player.x;
            camera.position.z = player.z;
            camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 12);

            // ── DISPARO AUTOMÁTICO ────────────────────────────
            if (isMouseDown && d && d.isAutomatic) shootCurrentWeapon();

        } else {
            // Modo espectador
            const s = 0.12;
            if (keys['w']) { camera.position.x -= Math.sin(smoothYaw) * s; camera.position.z -= Math.cos(smoothYaw) * s; }
            if (keys['s']) { camera.position.x += Math.sin(smoothYaw) * s; camera.position.z += Math.cos(smoothYaw) * s; }
        }

        // ── ANIMAÇÕES DA ARMA ─────────────────────────────────
        updateWeaponAnims(delta);

        // ── BALAS ─────────────────────────────────────────────
        for (let i = bullets.length - 1; i >= 0; i--) {
            const b   = bullets[i];
            const spd = b.velocity;

            b.mesh.position.addScaledVector(b.dir, spd);
            b.life--;

            // Atualiza trail
            if (b.trail) {
                const pts = [
                    b.mesh.position.clone(),
                    b.mesh.position.clone().addScaledVector(b.dir, -spd * 4)
                ];
                b.trail.geometry.setFromPoints(pts);
            }

            const bp  = b.mesh.position;
            let hit   = checkCollision(bp.x, bp.z, 0.15);

            if (!hit) {
                if (b.owner === 'player') {
                    for (let j = enemies.length - 1; j >= 0; j--) {
                        const en = enemies[j];
                        if (Math.hypot(bp.x - en.x, bp.z - en.z) < 1.2 &&
                            Math.abs(bp.y - 1.4) < 1.6) {
                            en.hp -= b.damage;
                            hit = true;
                            flashHitMarker();
                            if (en.hp <= 0) {
                                addKillFeed(`🎯 ${currentWeaponName} → Inimigo eliminado`);
                                removeBot(en, enemies, j);
                                credits += 300;
                                updateHUD();
                            }
                            break;
                        }
                    }
                } else if (b.owner === 'ally') {
                    for (let j = enemies.length - 1; j >= 0; j--) {
                        const en = enemies[j];
                        if (Math.hypot(bp.x - en.x, bp.z - en.z) < 1.2 &&
                            Math.abs(bp.y - 1.4) < 1.6) {
                            en.hp -= b.damage * 0.7;
                            hit = true;
                            if (en.hp <= 0) {
                                addKillFeed(`🤝 Aliado → Inimigo eliminado`);
                                removeBot(en, enemies, j);
                                credits += 100;
                                updateHUD();
                            }
                            break;
                        }
                    }
                } else if (b.owner === 'enemy') {
                    // Vs aliados
                    let hitAlly = false;
                    for (let j = allies.length - 1; j >= 0; j--) {
                        const al = allies[j];
                        if (Math.hypot(bp.x - al.x, bp.z - al.z) < 1.1 &&
                            Math.abs(bp.y - 1.4) < 1.6) {
                            al.hp -= b.damage * 0.6;
                            hit = true; hitAlly = true;
                            if (al.hp <= 0) {
                                addKillFeed(`💀 Aliado eliminado`);
                                removeBot(al, allies, j);
                            }
                            break;
                        }
                    }
                    // Vs player
                    if (!hitAlly && player.hp > 0) {
                        if (Math.hypot(bp.x - player.x, bp.z - player.z) < 1.0 &&
                            Math.abs(bp.y - camera.position.y) < 1.5) {
                            const dmg = b.damage * 0.65;
                            player.hp -= dmg;
                            hit = true;
                            flashDamage();
                            updateHUD();
                            if (player.hp <= 0) {
                                updateWeaponVisual();
                                addKillFeed(`💀 Você foi eliminado`);
                            }
                        }
                    }
                }
            }

            if (hit || b.life <= 0) {
                scene.remove(b.mesh);
                if (b.trail) scene.remove(b.trail);
                bullets.splice(i, 1);
            }
        }

        // ── IA ────────────────────────────────────────────────
        allies.forEach(a  => runBotAI(a,  delta));
        enemies.forEach(e => runBotAI(e,  delta));

        // ── FIM DE ROUND ──────────────────────────────────────
        if (enemies.length === 0) {
            handleRoundEnd(true);
            return;
        }
        if (player.hp <= 0 && allies.length === 0) {
            handleRoundEnd(false);
            return;
        }

        // ── MINIMAP ───────────────────────────────────────────
        drawMinimap();
    }

    renderer.render(scene, camera);
}

// ─── FIM DE RODADA ───────────────────────────────────────────
function handleRoundEnd(isVictory) {
    document.exitPointerLock();
    blocker.style.display = 'flex';

    if (isVictory) {
        teamScore++;
        credits += 1900;
        document.getElementById('match-title').textContent = "✅ VITÓRIA! +$1900";
    } else {
        enemyScore++;
        credits += 1400;
        inventory[1] = null;
        inventory[2] = "Classic";
        document.getElementById('match-title').textContent = "❌ DERROTA. Equipamento perdido. +$1400";
    }

    if (credits > 9000) credits = 9000;
    document.getElementById("team-score").textContent  = teamScore;
    document.getElementById("enemy-score").textContent = enemyScore;

    resetRound();
}

// ─── PARTÍCULAS DO FUNDO (menu) ───────────────────────────────
(function initBgCanvas() {
    const c   = document.getElementById("bg-canvas");
    const ctx = c.getContext("2d");
    c.width   = window.innerWidth;
    c.height  = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random()
    }));

    function tick() {
        ctx.clearRect(0, 0, c.width, c.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = c.width;
            if (p.x > c.width)  p.x = 0;
            if (p.y < 0) p.y = c.height;
            if (p.y > c.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,255,204,${0.15 + Math.sin(Date.now()*0.001 + p.a)*0.1})`;
            ctx.fill();
        });
        requestAnimationFrame(tick);
    }
    tick();
})();

// ─── RESIZE ──────────────────────────────────────────────────
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const bc = document.getElementById("bg-canvas");
    bc.width  = window.innerWidth;
    bc.height = window.innerHeight;
});

// ─── INICIALIZAÇÃO ───────────────────────────────────────────
resetRound();
requestAnimationFrame(gameLoop);