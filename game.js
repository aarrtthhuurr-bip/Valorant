// ============================================================
//  TACTIC FPS — game.js (VALORANT STYLE)
//  COM SUPORTE A MÚLTIPLOS IDIOMAS (PT/EN/ES)
//  Áudio procedural DESATIVADO (opcional, descomente para ativar)
// ============================================================

import * as THREE from 'three';

'use strict';

// ==================== SISTEMA DE IDIOMAS ====================
let currentLang = 'pt'; // 'pt', 'en', 'es'

const LANGUAGES = {
    pt: {
        title: "TACTIC FPS",
        subtitle: "SIMULADOR DE COMBATE EM ARENA",
        buy_phase: "FASE DE COMPRA",
        select_weapon: "SELECIONE SEU ARMAMENTO",
        enter_match: "▶ ENTRAR NA RODADA",
        your_team: "SEU TIME",
        enemies: "INIMIGOS",
        vs: "VS",
        vitality: "❤ VITALIDADE",
        credits_label: "💰 CRÉDITOS",
        pistol: "PISTOLA",
        smg: "SMG",
        rifle: "RIFLE",
        sniper: "SNIPER",
        shotgun: "SHOTGUN",
        lmg: "LMG",
        melee: "MELEE",
        reloading: "RECARREGANDO",
        low_ammo: "⚠ BAIXA MUNIÇÃO",
        spectator: "ESPECTADOR",
        killed_enemy: "→ Inimigo eliminado",
        you_died: "💀 Você foi eliminado",
        ally_kill: "🤝 Aliado → Inimigo eliminado",
        headshot: "💀 HEADSHOT",
        victory: "✅ VITÓRIA! +$1900",
        defeat: "❌ DERROTA. +$1400",
        slot: "SLOT",
        shop_pistol: "PISTOLAS",
        shop_smg: "SMGs",
        shop_rifle: "RIFLES",
        shop_sniper: "SNIPER",
        shop_shotgun: "SHOTGUN",
        shop_lmg: "LMG",
        dmg: "DMG",
        cd: "CD",
        mag: "Pente",
        primary_empty: "PRIMARIA",
        buy_timer: "COMPRA",
        buy_closed: "LOJA FECHADA",
        admin_on: "ADMIN ATIVO: CREDITOS $16000",
        admin_off: "ADMIN DESATIVADO",
        ammo_pickup: "+ MUNICAO",
        medkit_pickup: "+ VIDA",
        match_victory: "PARTIDA VENCIDA",
        match_defeat: "PARTIDA PERDIDA",
        restart_match: "REINICIAR PARTIDA"
    },
    en: {
        title: "TACTIC FPS",
        subtitle: "ARENA COMBAT SIMULATOR",
        buy_phase: "BUY PHASE",
        select_weapon: "SELECT YOUR WEAPON",
        enter_match: "▶ JOIN MATCH",
        your_team: "YOUR TEAM",
        enemies: "ENEMIES",
        vs: "VS",
        vitality: "❤ HEALTH",
        credits_label: "💰 CREDITS",
        pistol: "PISTOL",
        smg: "SMG",
        rifle: "RIFLE",
        sniper: "SNIPER",
        shotgun: "SHOTGUN",
        lmg: "LMG",
        melee: "MELEE",
        reloading: "RELOADING",
        low_ammo: "⚠ LOW AMMO",
        spectator: "SPECTATOR",
        killed_enemy: "→ Enemy eliminated",
        you_died: "💀 You were eliminated",
        ally_kill: "🤝 Ally → Enemy eliminated",
        headshot: "💀 HEADSHOT",
        victory: "✅ VICTORY! +$1900",
        defeat: "❌ DEFEAT. +$1400",
        slot: "SLOT",
        shop_pistol: "PISTOLS",
        shop_smg: "SMGs",
        shop_rifle: "RIFLES",
        shop_sniper: "SNIPER",
        shop_shotgun: "SHOTGUN",
        shop_lmg: "LMG",
        dmg: "DMG",
        cd: "ROF",
        mag: "Mag",
        primary_empty: "PRIMARY",
        buy_timer: "BUY",
        buy_closed: "SHOP CLOSED",
        admin_on: "ADMIN ON: CREDITS $16000",
        admin_off: "ADMIN OFF",
        ammo_pickup: "+ AMMO",
        medkit_pickup: "+ HEALTH",
        match_victory: "MATCH WON",
        match_defeat: "MATCH LOST",
        restart_match: "RESTART MATCH"
    },
    es: {
        title: "TACTIC FPS",
        subtitle: "SIMULADOR DE COMBATE EN ARENA",
        buy_phase: "FASE DE COMPRA",
        select_weapon: "SELECCIONA TU ARMA",
        enter_match: "▶ ENTRAR EN LA RONDA",
        your_team: "TU EQUIPO",
        enemies: "ENEMIGOS",
        vs: "VS",
        vitality: "❤ VITALIDAD",
        credits_label: "💰 CRÉDITOS",
        pistol: "PISTOLA",
        smg: "SUB",
        rifle: "FUSIL",
        sniper: "SNIPER",
        shotgun: "ESCOPETA",
        lmg: "AMETRALLADORA",
        melee: "CUERPO A CUERPO",
        reloading: "RECARGANDO",
        low_ammo: "⚠ MUNICIÓN BAJA",
        spectator: "ESPECTADOR",
        killed_enemy: "→ Enemigo eliminado",
        you_died: "💀 Has sido eliminado",
        ally_kill: "🤝 Aliado → Enemigo eliminado",
        headshot: "💀 TIRO EN LA CABEZA",
        victory: "✅ VICTORIA! +$1900",
        defeat: "❌ DERROTA. +$1400",
        slot: "RANURA",
        shop_pistol: "PISTOLAS",
        shop_smg: "SUB",
        shop_rifle: "FUSILES",
        shop_sniper: "SNIPER",
        shop_shotgun: "ESCOPETAS",
        shop_lmg: "AMETRALLADORAS",
        dmg: "DAÑO",
        cd: "CADENCIA",
        mag: "Cargador",
        primary_empty: "PRIMARIA",
        buy_timer: "COMPRA",
        buy_closed: "TIENDA CERRADA",
        admin_on: "ADMIN ACTIVO: CREDITOS $16000",
        admin_off: "ADMIN DESACTIVADO",
        ammo_pickup: "+ MUNICION",
        medkit_pickup: "+ VIDA",
        match_victory: "PARTIDA GANADA",
        match_defeat: "PARTIDA PERDIDA",
        restart_match: "REINICIAR PARTIDA"
    }
};

function t(key) {
    return LANGUAGES[currentLang][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    // Atualizar botões ativos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    updateAllUITexts();
    renderShopGrid(activeShopCat);
    updateHUD(); // Força atualização de textos dinâmicos
    updateSlotsHUD();
}

function updateAllUITexts() {
    document.getElementById("logo-text").textContent = t('title');
    document.getElementById("logo-sub").textContent = t('subtitle');
    document.getElementById("match-title").textContent = t('buy_phase');
    document.getElementById("blocker-desc").textContent = t('select_weapon');
    document.getElementById("start-button").textContent = t('enter_match');
    const buyStatus = document.getElementById("buy-phase-status");
    if (buyStatus && roundState === 'buy') buyStatus.textContent = `${t('buy_timer')} ${formatTimer((buyPhaseEndsAt - performance.now()) / 1000)}`;
    document.querySelector("#hud-left .hud-team").textContent = t('your_team');
    document.querySelector("#hud-right .hud-team").textContent = t('enemies');
    document.querySelector("#hud-center .vs-text").textContent = t('vs');
    document.getElementById("hp-label").textContent = t('vitality');
    document.getElementById("money-label").textContent = t('credits_label');
    // Tabs da loja
    const tabs = document.querySelectorAll(".shop-tab");
    if (tabs.length >= 6) {
        tabs[0].textContent = t('shop_pistol');
        tabs[1].textContent = t('shop_smg');
        tabs[2].textContent = t('shop_rifle');
        tabs[3].textContent = t('shop_sniper');
        tabs[4].textContent = t('shop_shotgun');
        tabs[5].textContent = t('shop_lmg');
    }
    // reload label
    const reloadLabel = document.getElementById("reload-label");
    if (reloadLabel) reloadLabel.textContent = t('reloading');
    // low ammo warn
    const lowAmmoWarn = document.getElementById("low-ammo-warn");
    if (lowAmmoWarn && lowAmmoWarn.classList.contains('visible')) {
        lowAmmoWarn.textContent = t('low_ammo');
    }
    // weapon slot label será atualizado em updateHUD
}

// ==================== ÁUDIO (DESATIVADO POR PADRÃO) ============
// Para reativar, descomente as seções abaixo e substitua o objeto sound.
const sound = {
    resume: () => {},
    shoot: () => {},
    reload: () => {},
    hit: () => {},
    kill: () => {},
    headshot: () => {}
};

// ==================== CONFIGURAÇÕES GLOBAIS ====================
let teamScore = 0;
let enemyScore = 0;
let credits = 800;
let roundNumber = 0;
const MAP_LIMIT = 78;
const BASE_FOV = 75;
const ADS_FOV = 64;
const BUY_PHASE_DURATION = 20;
const MATCH_POINT = 5;
const MAX_CREDITS = 16000;
let isBuyPhase = true;
let buyPhaseEndsAt = 0;
let roundState = 'buy';
let roundEndLocked = false;
let isAdminMode = false;

// ==================== ARSENAL ================================
const WEAPON_SHOP = {
    "Classic": { category:"pistol", type:"pistol", isAutomatic:false, cost:0, fireRate:380, damage:26, magSize:12, reserve:36, reloadTime:1100, bSpeed:2.5, spread:0.02, pellets:1, color:0x5a5a5a, width:0.06, length:0.30, hasScope:false, zoomFov:70, desc:"Pistola padrão.", autoFire:false, soundType:'pistol' },
    "Shorty": { category:"pistol", type:"pistol", isAutomatic:false, cost:150, fireRate:700, damage:14, magSize:2, reserve:14, reloadTime:1400, bSpeed:1.8, spread:0.12, pellets:5, color:0x3a2a1a, width:0.08, length:0.20, hasScope:false, zoomFov:70, desc:"Pistola curta.", autoFire:false, soundType:'shotgun' },
    "Frenzy": { category:"pistol", type:"pistol", isAutomatic:true, cost:450, fireRate:85, damage:26, magSize:13, reserve:39, reloadTime:1200, bSpeed:2.2, spread:0.05, pellets:1, color:0x1a3a2a, width:0.06, length:0.26, hasScope:false, zoomFov:70, desc:"Pistola automática.", autoFire:true, soundType:'smg' },
    "Ghost": { category:"pistol", type:"pistol", isAutomatic:false, cost:500, fireRate:400, damage:32, magSize:15, reserve:45, reloadTime:1300, bSpeed:2.6, spread:0.015, pellets:1, color:0x2a2a3a, width:0.06, length:0.35, hasScope:false, zoomFov:70, desc:"Pistola silenciada.", autoFire:false, soundType:'pistol' },
    "Sheriff": { category:"pistol", type:"pistol", isAutomatic:false, cost:800, fireRate:600, damage:60, magSize:6, reserve:18, reloadTime:1800, bSpeed:3.0, spread:0.01, pellets:1, color:0xc9a227, width:0.10, length:0.40, hasScope:false, zoomFov:68, desc:"Revólver pesado.", autoFire:false, soundType:'rifle' },
    "Stinger": { category:"smg", type:"smg", isAutomatic:true, cost:950, fireRate:55, damage:27, magSize:20, reserve:80, reloadTime:1300, bSpeed:2.4, spread:0.06, pellets:1, color:0x334455, width:0.08, length:0.50, hasScope:false, zoomFov:68, desc:"SMG rápida.", autoFire:true, soundType:'smg' },
    "Spectre": { category:"smg", type:"smg", isAutomatic:true, cost:1600, fireRate:80, damage:28, magSize:30, reserve:90, reloadTime:1500, bSpeed:2.5, spread:0.04, pellets:1, color:0x1a1a1a, width:0.10, length:0.60, hasScope:true, zoomFov:55, desc:"SMG com mira.", autoFire:true, soundType:'smg' },
    "Bucky": { category:"shotgun", type:"shotgun", isAutomatic:false, cost:900, fireRate:750, damage:20, magSize:5, reserve:15, reloadTime:2000, bSpeed:2.0, spread:0.16, pellets:8, color:0x5a3a2a, width:0.14, length:0.65, hasScope:false, zoomFov:70, desc:"Shotgun pump.", autoFire:false, soundType:'shotgun' },
    "Judge": { category:"shotgun", type:"shotgun", isAutomatic:true, cost:1850, fireRate:360, damage:18, magSize:7, reserve:21, reloadTime:2200, bSpeed:1.9, spread:0.18, pellets:8, color:0x2a1a1a, width:0.16, length:0.60, hasScope:false, zoomFov:70, desc:"Shotgun auto.", autoFire:true, soundType:'shotgun' },
    "Bulldog": { category:"rifle", type:"rifle", isAutomatic:true, cost:2050, fireRate:110, damage:35, magSize:24, reserve:72, reloadTime:2000, bSpeed:3.0, spread:0.03, pellets:1, color:0x2a4a2a, width:0.12, length:0.75, hasScope:true, zoomFov:55, desc:"Rifle de assalto.", autoFire:true, soundType:'rifle' },
    "Guardian": { category:"rifle", type:"rifle", isAutomatic:false, cost:2250, fireRate:450, damage:70, magSize:12, reserve:36, reloadTime:2100, bSpeed:3.5, spread:0.003, pellets:1, color:0x3a3a5a, width:0.12, length:0.85, hasScope:true, zoomFov:45, desc:"Rifle semi-auto.", autoFire:false, soundType:'sniper' },
    "Phantom": { category:"rifle", type:"rifle", isAutomatic:true, cost:2900, fireRate:100, damage:39, magSize:30, reserve:90, reloadTime:2100, bSpeed:3.2, spread:0.02, pellets:1, color:0x1e3a1e, width:0.13, length:0.88, hasScope:true, zoomFov:50, desc:"Rifle silenciado.", autoFire:true, soundType:'rifle' },
    "Vandal": { category:"rifle", type:"rifle", isAutomatic:true, cost:2900, fireRate:105, damage:40, magSize:25, reserve:75, reloadTime:2300, bSpeed:3.2, spread:0.025, pellets:1, color:0x600000, width:0.13, length:0.90, hasScope:true, zoomFov:50, desc:"Rifle pesado.", autoFire:true, soundType:'rifle' },
    "Marshal": { category:"sniper", type:"sniper", isAutomatic:false, cost:950, fireRate:1000, damage:110, magSize:5, reserve:15, reloadTime:2800, bSpeed:5.0, spread:0.001, pellets:1, color:0x5a4a2a, width:0.10, length:1.15, hasScope:true, zoomFov:25, desc:"Sniper leve.", autoFire:false, soundType:'sniper' },
    "Operator": { category:"sniper", type:"sniper", isAutomatic:false, cost:4700, fireRate:1300, damage:200, magSize:5, reserve:10, reloadTime:3500, bSpeed:6.0, spread:0.0, pellets:1, color:0x3a0a4a, width:0.16, length:1.40, hasScope:true, zoomFov:20, desc:"Sniper pesada.", autoFire:false, soundType:'sniper' },
    "Ares": { category:"lmg", type:"lmg", isAutomatic:true, cost:1600, fireRate:100, damage:32, magSize:50, reserve:100, reloadTime:3500, bSpeed:2.6, spread:0.07, pellets:1, color:0x4a3a1a, width:0.16, length:0.95, hasScope:false, zoomFov:65, desc:"LMG leve.", autoFire:true, soundType:'lmg' },
    "Odin": { category:"lmg", type:"lmg", isAutomatic:true, cost:3200, fireRate:90, damage:40, magSize:100, reserve:200, reloadTime:5000, bSpeed:2.6, spread:0.08, pellets:1, color:0x1a1a1a, width:0.20, length:1.05, hasScope:true, zoomFov:55, desc:"LMG pesada.", autoFire:true, soundType:'lmg' },
    "Faca": { category:"melee", type:"melee", isAutomatic:false, cost:0, fireRate:500, damage:65, magSize:1, reserve:0, reloadTime:0, bSpeed:0, spread:0, pellets:1, color:0xbbbbbb, width:0.04, length:0.36, hasScope:false, zoomFov:75, desc:"Corpo a corpo.", autoFire:false, soundType:'melee' }
};
const SLOT_CATS = { pistol:1, smg:2, rifle:2, sniper:2, shotgun:2, lmg:2, melee:3 };

// ==================== INVENTÁRIO DO JOGADOR ====================
let inventory = { 1: "Classic", 2: null, 3: "Faca" };
let currentSlot = 1;
let currentWeaponName = "Classic";
let isMouseDown = false;
let ammoSlots = {
    1: { inMag: 12, reserve: 36 },
    2: { inMag: 0, reserve: 0 },
    3: { inMag: 1, reserve: 0 }
};

let isReloading = false;
let lastShotTime = 0;
let isAiming = false;
let currentRecoil = 0;
let weaponBob = 0;
let isMoving = false;
let weaponSway = { x: 0, y: 0 };
let knifeSlashAnim = 0;
let smoothYaw = 0, smoothPitch = 0, targetYaw = 0, targetPitch = 0;

// ==================== DASH ====================================
let dashCharges = 2;
let maxDashCharges = 2;
let dashCooldown = 0;
let isDashing = false;
let dashVelocity = { x: 0, z: 0 };
const DASH_SPEED = 0.5;
const DASH_DURATION = 0.12;
const DASH_COOLDOWN_TIME = 3.0;

// ==================== THREE.JS SETUP ==========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a1520);
scene.fog = new THREE.FogExp2(0x0a1520, 0.007);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);
document.addEventListener('contextmenu', e => e.preventDefault());

// Iluminação
const ambientLight = new THREE.AmbientLight(0x6f87a8, 2.1);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xd8eeff, 1.15);
sunLight.position.set(40, 80, 40);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0xffd0aa, 0.55);
fillLight.position.set(-40, 20, -40);
scene.add(fillLight);

const arenaLights = [
    new THREE.PointLight(0x00ffcc, 0.7, 70),
    new THREE.PointLight(0xff4655, 0.55, 70),
    new THREE.PointLight(0xffffff, 0.45, 55)
];
arenaLights[0].position.set(-35, 10, 25);
arenaLights[1].position.set(35, 10, -25);
arenaLights[2].position.set(0, 12, 0);
arenaLights.forEach(light => scene.add(light));

// Grupo da arma (acoplado à câmera)
const weaponGroup = new THREE.Group();
camera.add(weaponGroup);
scene.add(camera);

// ==================== MAPA E OBSTÁCULOS =======================
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 160),
    new THREE.MeshStandardMaterial({ color: 0x111820, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

let obstacles = [];
let obstacleMeshes = [];
let decorMeshes = [];
let coverSpots = [];
let currentMapLayout = null;
let nextMapIndex = 0;

const obsMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x1a2535, roughness: 0.7, metalness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x2a1a1a, roughness: 0.6, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0x1a2a1a, roughness: 0.8, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x2a2535, roughness: 0.5, metalness: 0.4 })
];

function buildObstacle(x, z, w, h, d, matIdx = 0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), obsMaterials[matIdx % 4]);
    mesh.scale.set(w, h, d);
    mesh.position.set(x, h / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    obstacles.push({ x, z, w, d });
    obstacleMeshes.push(mesh);

    if (w > 2.5 && d > 2.5) {
        coverSpots.push(
            { x: x + w / 2 + 1.2, z: z, occupied: false },
            { x: x - w / 2 - 1.2, z: z, occupied: false },
            { x: x, z: z + d / 2 + 1.2, occupied: false },
            { x: x, z: z - d / 2 - 1.2, occupied: false }
        );
    }
    return mesh;
}

function buildCrates(cx, cz) {
    for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
            const s = 1.4 + Math.random() * 0.3;
            buildObstacle(
                cx + c * 1.6 - 0.8,
                cz + (Math.random() - 0.5) * 0.5,
                s, s, s,
                Math.floor(Math.random() * 4)
            );
        }
    }
}

function buildArenaShell() {
    buildObstacle(0, 80, 160, 10, 2);
    buildObstacle(0, -80, 160, 10, 2);
    buildObstacle(80, 0, 2, 10, 160);
    buildObstacle(-80, 0, 2, 10, 160);
}

function addPickupSpot(list, type, x, z) {
    list.push({ type, x, z });
}

const MAP_LAYOUTS = [
    {
        name: "Split Gate",
        playerSpawn: { x: 0, z: 62 },
        allySpawns: [{ x: -10, z: 54 }, { x: 10, z: 54 }, { x: 0, z: 48 }, { x: -22, z: 42 }],
        enemySpawns: [{ x: -28, z: -54 }, { x: 0, z: -60 }, { x: 28, z: -54 }, { x: -8, z: -42 }, { x: 18, z: -38 }],
        build(p) {
            buildArenaShell();
            buildObstacle(-28, 8, 8, 8, 86, 1);
            buildObstacle(28, -8, 8, 8, 86, 1);
            buildObstacle(0, 0, 18, 7, 16, 2);
            buildObstacle(-10, 31, 32, 5, 5, 0);
            buildObstacle(12, -31, 32, 5, 5, 0);
            buildCrates(-42, 20);
            buildCrates(42, -22);
            addPickupSpot(p, 'ammo', -48, 42);
            addPickupSpot(p, 'ammo', 48, -42);
            addPickupSpot(p, 'medkit', 0, 25);
            addPickupSpot(p, 'medkit', 0, -25);
        }
    },
    {
        name: "Haven Triad",
        playerSpawn: { x: -52, z: 54 },
        allySpawns: [{ x: -44, z: 50 }, { x: -55, z: 42 }, { x: -34, z: 55 }, { x: -22, z: 45 }],
        enemySpawns: [{ x: 48, z: -52 }, { x: 28, z: -58 }, { x: 58, z: -34 }, { x: 14, z: -42 }, { x: 42, z: -20 }],
        build(p) {
            buildArenaShell();
            buildObstacle(-12, 30, 70, 7, 5, 1);
            buildObstacle(18, -28, 70, 7, 5, 1);
            buildObstacle(-42, -8, 6, 7, 54, 0);
            buildObstacle(42, 10, 6, 7, 54, 0);
            buildObstacle(0, 0, 12, 7, 12, 2);
            buildObstacle(-18, -48, 24, 5, 6, 3);
            buildObstacle(18, 48, 24, 5, 6, 3);
            addPickupSpot(p, 'ammo', -58, -18);
            addPickupSpot(p, 'ammo', 58, 18);
            addPickupSpot(p, 'ammo', 0, 0);
            addPickupSpot(p, 'medkit', -20, 18);
            addPickupSpot(p, 'medkit', 20, -18);
        }
    },
    {
        name: "Bind Cross",
        playerSpawn: { x: 52, z: 58 },
        allySpawns: [{ x: 44, z: 52 }, { x: 58, z: 44 }, { x: 34, z: 58 }, { x: 24, z: 44 }],
        enemySpawns: [{ x: -52, z: -58 }, { x: -35, z: -56 }, { x: -58, z: -36 }, { x: -26, z: -34 }, { x: -44, z: -18 }],
        build(p) {
            buildArenaShell();
            buildObstacle(0, 0, 7, 8, 120, 0);
            buildObstacle(0, 0, 120, 8, 7, 0);
            buildObstacle(28, 28, 18, 6, 18, 2);
            buildObstacle(-28, -28, 18, 6, 18, 2);
            buildObstacle(-42, 38, 8, 6, 28, 1);
            buildObstacle(42, -38, 8, 6, 28, 1);
            addPickupSpot(p, 'ammo', 54, -10);
            addPickupSpot(p, 'ammo', -54, 10);
            addPickupSpot(p, 'medkit', 18, -18);
            addPickupSpot(p, 'medkit', -18, 18);
        }
    },
    {
        name: "Ascent Mid",
        playerSpawn: { x: 0, z: 62 },
        allySpawns: [{ x: -14, z: 56 }, { x: 14, z: 56 }, { x: -28, z: 48 }, { x: 28, z: 48 }],
        enemySpawns: [{ x: -14, z: -58 }, { x: 14, z: -58 }, { x: -34, z: -44 }, { x: 34, z: -44 }, { x: 0, z: -34 }],
        build(p) {
            buildArenaShell();
            buildObstacle(-52, 0, 7, 8, 90, 1);
            buildObstacle(52, 0, 7, 8, 90, 1);
            buildObstacle(0, 30, 42, 7, 6, 0);
            buildObstacle(0, -30, 42, 7, 6, 0);
            buildObstacle(-18, 0, 10, 6, 24, 2);
            buildObstacle(18, 0, 10, 6, 24, 2);
            buildCrates(0, 0);
            addPickupSpot(p, 'ammo', -36, 0);
            addPickupSpot(p, 'ammo', 36, 0);
            addPickupSpot(p, 'medkit', 0, 44);
            addPickupSpot(p, 'medkit', 0, -44);
        }
    },
    {
        name: "Lotus Loop",
        playerSpawn: { x: -58, z: 0 },
        allySpawns: [{ x: -54, z: -12 }, { x: -54, z: 12 }, { x: -42, z: 0 }, { x: -34, z: 18 }],
        enemySpawns: [{ x: 56, z: -10 }, { x: 56, z: 10 }, { x: 40, z: -28 }, { x: 38, z: 28 }, { x: 22, z: 0 }],
        build(p) {
            buildArenaShell();
            buildObstacle(0, -46, 94, 7, 6, 1);
            buildObstacle(0, 46, 94, 7, 6, 1);
            buildObstacle(-24, 0, 7, 7, 58, 0);
            buildObstacle(24, 0, 7, 7, 58, 0);
            buildObstacle(0, 0, 18, 6, 18, 2);
            buildObstacle(-52, -28, 18, 5, 8, 3);
            buildObstacle(52, 28, 18, 5, 8, 3);
            addPickupSpot(p, 'ammo', -52, 34);
            addPickupSpot(p, 'ammo', 52, -34);
            addPickupSpot(p, 'ammo', 0, 52);
            addPickupSpot(p, 'medkit', 0, -18);
            addPickupSpot(p, 'medkit', 0, 18);
        }
    }
];

function generateRandomMap() {
    obstacleMeshes.forEach(m => scene.remove(m));
    decorMeshes.forEach(m => scene.remove(m));
    obstacles = [];
    obstacleMeshes = [];
    decorMeshes = [];
    coverSpots = [];
    const pickupPlan = [];
    currentMapLayout = MAP_LAYOUTS[nextMapIndex % MAP_LAYOUTS.length];
    nextMapIndex++;
    currentMapLayout.build(pickupPlan);
    currentMapLayout.pickups = pickupPlan;

    if (coverSpots.length === 0) {
        for (let i = -60; i <= 60; i += 40) {
            for (let j = -60; j <= 60; j += 40) {
                if (!checkCollision(i, j, 0.5)) {
                    coverSpots.push({ x: i, z: j, occupied: false });
                }
            }
        }
    }
}

// ==================== FUNÇÕES AUXILIARES =======================
function checkCollision(x, z, size = 0.7) {
    if (Math.abs(x) > MAP_LIMIT || Math.abs(z) > MAP_LIMIT) return true;
    for (let obs of obstacles) {
        const hw = obs.w / 2 + size;
        const hd = obs.d / 2 + size;
        if (x > obs.x - hw && x < obs.x + hw && z > obs.z - hd && z < obs.z + hd) return true;
    }
    return false;
}

const losRaycaster = new THREE.Raycaster();
const aimRaycaster = new THREE.Raycaster();

function hasLineOfSight(x1, z1, x2, z2) {
    const from = new THREE.Vector3(x1, 1.55, z1);
    const to = new THREE.Vector3(x2, 1.55, z2);
    const dir = to.clone().sub(from);
    const dist = dir.length();
    if (dist <= 0.01) return true;
    losRaycaster.set(from, dir.normalize());
    losRaycaster.far = dist;
    return losRaycaster.intersectObjects(obstacleMeshes, false).length === 0;
}

function formatTimer(seconds) {
    const safe = Math.max(0, Math.ceil(seconds));
    return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

function getPrimarySlotLabel() {
    return inventory[2] || t('primary_empty');
}

function setCredits(value) {
    credits = isAdminMode ? MAX_CREDITS : Math.min(MAX_CREDITS, Math.max(0, value));
}

function applyAimState(active) {
    const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
    isAiming = !!(active && d && d.type !== 'melee' && !isReloading && player.hp > 0 && roundState === 'live');
    camera.fov = isAiming && d ? (d.hasScope ? d.zoomFov : Math.min(d.zoomFov || ADS_FOV, ADS_FOV)) : BASE_FOV;
    camera.updateProjectionMatrix();
    updateCrosshair();
}

function updateScopeOverlay() {
    const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
    const scoped = !!(isAiming && d && d.hasScope && d.category === 'sniper');
    const overlay = document.getElementById("scope-overlay");
    if (overlay) overlay.classList.toggle("visible", scoped);
    const crosshair = document.getElementById("crosshair");
    if (crosshair) crosshair.classList.toggle("scoped", scoped);
}

function getEnemyUnderCrosshair(maxDistance = 90) {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    aimRaycaster.set(camera.position, dir.normalize());
    aimRaycaster.far = maxDistance;
    for (const enemy of enemies) {
        if (!enemy.alive || enemy.dying) continue;
        if (!hasLineOfSight(player.x, player.z, enemy.x, enemy.z)) continue;
        const hits = aimRaycaster.intersectObject(enemy.model, true);
        if (hits.length > 0) return enemy;
    }
    return null;
}

function getKnifeTarget() {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    aimRaycaster.set(camera.position, dir.normalize());
    aimRaycaster.far = 3.0;
    for (const enemy of enemies) {
        if (!enemy.alive || enemy.dying) continue;
        const hits = aimRaycaster.intersectObject(enemy.model, true);
        if (hits.length > 0 && hits[0].distance <= 3.0) return enemy;
    }
    return null;
}

function showBlocker(titleKey, descKey) {
    const blocker = document.getElementById('blocker');
    if (blocker) blocker.style.display = 'flex';
    const title = document.getElementById('match-title');
    const desc = document.getElementById('blocker-desc');
    if (title && titleKey) title.textContent = t(titleKey);
    if (desc && descKey) desc.textContent = t(descKey);
    setupShopInterface();
}

function hideBlocker() {
    const blocker = document.getElementById('blocker');
    if (blocker) blocker.style.display = 'none';
}

function clearPickups() {
    pickups.forEach(p => scene.remove(p.mesh));
    pickups = [];
}

function createPickup(type, x, z) {
    if (checkCollision(x, z, 0.9)) return;
    const group = new THREE.Group();
    const isMedkit = type === 'medkit';
    const bodyMat = new THREE.MeshStandardMaterial({
        color: isMedkit ? 0xffffff : 0x2b3c4c,
        emissive: isMedkit ? 0x331111 : 0x003322,
        emissiveIntensity: 0.35,
        roughness: 0.45,
        metalness: isMedkit ? 0.05 : 0.4
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.28, 0.55), bodyMat);
    body.castShadow = true;
    body.position.y = 0.22;
    group.add(body);

    const stripeMat = new THREE.MeshBasicMaterial({ color: isMedkit ? 0xff4655 : 0x00ffcc });
    const stripeA = new THREE.Mesh(new THREE.BoxGeometry(isMedkit ? 0.18 : 0.62, 0.02, 0.58), stripeMat);
    stripeA.position.y = 0.38;
    group.add(stripeA);
    if (isMedkit) {
        const stripeB = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.021, 0.18), stripeMat);
        stripeB.position.y = 0.385;
        group.add(stripeB);
    }

    group.position.set(x, 0, z);
    scene.add(group);
    pickups.push({ type, mesh: group, x, z, spin: Math.random() * Math.PI * 2 });
}

function spawnRoundPickups() {
    clearPickups();
    const fixed = currentMapLayout?.pickups?.length ? currentMapLayout.pickups : [
        { type: 'medkit', x: -18, z: 18 },
        { type: 'ammo', x: 18, z: -18 }
    ];
    fixed.forEach(p => createPickup(p.type, p.x, p.z));
}

function findNearestPickup(type, x, z) {
    let best = null;
    let bestDist = Infinity;
    for (const p of pickups) {
        if (p.type !== type) continue;
        const dist = Math.hypot(x - p.x, z - p.z);
        if (dist < bestDist) {
            bestDist = dist;
            best = p;
        }
    }
    return best;
}

function consumePickupAt(index) {
    const pickup = pickups[index];
    if (!pickup) return null;
    scene.remove(pickup.mesh);
    pickups.splice(index, 1);
    return pickup;
}

function collectPickups(delta) {
    for (let i = pickups.length - 1; i >= 0; i--) {
        const p = pickups[i];
        p.spin += delta * 2.5;
        p.mesh.rotation.y = p.spin;
        p.mesh.position.y = Math.sin(p.spin * 2) * 0.05;
        if (Math.hypot(player.x - p.x, player.z - p.z) > 1.35) continue;

        if (p.type === 'medkit') {
            if (player.hp >= player.maxHp) continue;
            player.hp = Math.min(player.maxHp, player.hp + 35);
            addKillFeed(t('medkit_pickup'));
        } else {
            const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
            if (!d || d.type === 'melee') continue;
            ammoSlots[currentSlot].reserve += Math.max(d.magSize, Math.ceil(d.magSize * 1.5));
            addKillFeed(t('ammo_pickup'));
        }
        consumePickupAt(i);
        updateHUD();
    }
}

function collectBotPickup(bot) {
    for (let i = pickups.length - 1; i >= 0; i--) {
        const p = pickups[i];
        if (p.type !== 'ammo') continue;
        if (Math.hypot(bot.x - p.x, bot.z - p.z) > 1.4) continue;
        bot.reserve += bot.assignedWeapon.reserve;
        bot.ammo = Math.min(bot.assignedWeapon.magSize, bot.ammo + Math.ceil(bot.assignedWeapon.magSize * 0.5));
        bot.state = 'chase';
        bot.resourceTarget = null;
        consumePickupAt(i);
        return true;
    }
    return false;
}

// ==================== ARMA 3D =================================
function buildWeaponMesh(name) {
    const group = new THREE.Group();
    if (!name) return group;
    const d = WEAPON_SHOP[name];
    if (d.type === "melee") {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.05, d.length), new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95 }));
        blade.rotation.x = Math.PI / 4;
        group.add(blade);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.02), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        guard.position.set(0, -0.02, 0.1);
        group.add(guard);
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.015, 0.16, 8), new THREE.MeshStandardMaterial({ color: 0x220000 }));
        handle.rotation.x = Math.PI / 2;
        handle.position.set(0, -0.03, 0.18);
        group.add(handle);
        return group;
    }
    const W = d.width;
    const L = d.length;
    const body = new THREE.Mesh(new THREE.BoxGeometry(W, W * 1.3, L), new THREE.MeshStandardMaterial({ color: d.color, metalness: 0.55, roughness: 0.25 }));
    group.add(body);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.1, W * 0.08, L * 0.85, 10), new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.9 }));
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, W * 0.1, -L * 0.35);
    group.add(barrel);
    const mag = new THREE.Mesh(new THREE.BoxGeometry(W * 0.7, W * 1.4, L * 0.18), new THREE.MeshStandardMaterial({ color: 0x101010 }));
    mag.position.set(0, -W * 1.05, L * 0.1);
    group.add(mag);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(W * 0.55, W * 1.1, L * 0.09), new THREE.MeshStandardMaterial({ color: 0x0a0a0a }));
    grip.position.set(0, -W * 1.0, L * 0.28);
    group.add(grip);
    if (d.hasScope) {
        const scope = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.2, W * 0.2, L * 0.3, 12), new THREE.MeshStandardMaterial({ color: 0x080808, metalness: 0.9 }));
        scope.rotation.x = Math.PI / 2;
        scope.position.set(0, W * 0.9, -L * 0.05);
        group.add(scope);
    }
    return group;
}

function updateWeaponVisual() {
    while (weaponGroup.children.length > 0) weaponGroup.remove(weaponGroup.children[0]);
    if (player.hp <= 0 || !currentWeaponName) return;
    weaponGroup.add(buildWeaponMesh(currentWeaponName));
    resetWeaponPosition();
}

function resetWeaponPosition() {
    if (!currentWeaponName) return;
    const d = WEAPON_SHOP[currentWeaponName];
    weaponGroup.rotation.set(0, 0, 0);
    if (isAiming && d.hasScope) {
        weaponGroup.position.set(0, -0.12, -0.30);
    } else if (d.type === "melee") {
        weaponGroup.position.set(0.20, -0.32, -0.35);
    } else {
        weaponGroup.position.set(0.28, -0.24, -0.55);
    }
}

// ==================== MODELOS HUMANOIDES ======================
function createHumanoid(color, emissive) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.3, roughness: 0.6 });
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.40, 1.0, 8), mat);
    torso.position.y = 1.2;
    group.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), mat);
    head.position.y = 1.95;
    group.add(head);
    for (let s = -1; s <= 1; s += 2) {
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.8, 6), mat);
        arm.position.set(s * 0.45, 1.3, 0);
        group.add(arm);
    }
    for (let s = -1; s <= 1; s += 2) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.9, 6), mat);
        leg.position.set(s * 0.15, 0.4, 0);
        group.add(leg);
    }
    group.castShadow = true;
    return group;
}

// ==================== JOGADOR E ENTIDADES =====================
let player = { x: 0, z: 62, hp: 100, maxHp: 100, speed: 0.16, yaw: 0, pitch: 0 };
camera.position.set(player.x, 1.9, player.z);

let allies = [];
let enemies = [];
let bullets = [];
let pickups = [];

const BOT_WEAPON_SETS = [
    ["Classic", "Ghost"],
    ["Spectre", "Bulldog", "Phantom"],
    ["Vandal", "Operator", "Odin"]
];

function spawnBot(type, x, z) {
    const color = type === 'ally' ? 0x00ffcc : 0xff4655;
    const emissive = type === 'ally' ? 0x004433 : 0x330000;
    const model = createHumanoid(color, emissive);
    model.position.set(x, 0, z);
    scene.add(model);

    const tier = Math.min(Math.floor(roundNumber / 2), 2);
    const weapons = BOT_WEAPON_SETS[tier];
    const wName = weapons[Math.floor(Math.random() * weapons.length)];
    const assignedWeapon = { ...WEAPON_SHOP[wName], name: wName };
    const wGroup = buildWeaponMesh(wName);
    wGroup.scale.setScalar(0.55);
    wGroup.position.set(0.35, 1.1, -0.3);
    model.add(wGroup);

    const bot = {
        type, model, weaponMesh: wGroup,
        x, z, hp: 100, lastShot: 0,
        speed: type === 'enemy' ? 0.07 + roundNumber * 0.005 : 0.06,
        weapon: wName, assignedWeapon,
        ammo: assignedWeapon.magSize,
        reserve: assignedWeapon.reserve,
        isReloading: false,
        reloadTimer: 0,
        seesTarget: false,
        reactionTimer: 0,
        reactionDelay: 0.3 + Math.random() * 0.2,
        resourceTarget: null,
        walkTime: Math.random() * Math.PI * 2,
        strafeTimer: 0, strafeDir: 1, state: 'idle',
        coverPos: null, coverTimer: 0, alive: true, dying: false, deathTimer: 0
    };
    if (type === 'ally') allies.push(bot);
    else enemies.push(bot);
}

function removeBot(bot, list, idx) {
    if (bot.type === 'enemy' && Math.random() < 0.65) {
        createPickup('ammo', bot.x, bot.z);
    }
    bot.alive = false;
    bot.dying = true;
    bot.removeIdx = idx;
    bot.deathTimer = 3 + Math.random() * 2;
    if (bot.coverPos) bot.coverPos.occupied = false;
}

function updateDyingBots(delta) {
    [allies, enemies].forEach(list => {
        for (let i = list.length - 1; i >= 0; i--) {
            const bot = list[i];
            if (!bot.dying) continue;
            const total = Math.max(0.001, bot.deathTotal || bot.deathTimer);
            if (!bot.deathTotal) bot.deathTotal = bot.deathTimer;
            bot.deathTimer -= delta;
            const progress = 1 - Math.max(0, bot.deathTimer / total);
            bot.model.rotation.x = Math.min(Math.PI / 2, progress * 2.2);
            bot.model.position.y = Math.max(0, 0.25 * Math.sin(progress * Math.PI));
            bot.model.traverse(child => {
                if (child.material) {
                    child.material.transparent = true;
                    child.material.opacity = Math.max(0, 1 - progress);
                }
            });
            if (bot.deathTimer <= 0) {
                scene.remove(bot.model);
                list.splice(i, 1);
            }
        }
    });
}

// ==================== TIRO E BALAS ============================
function createBullet(pos, dir, owner, weaponData) {
    const color = owner === 'player' ? 0x00ffcc : 0xff8800;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), new THREE.MeshBasicMaterial({ color }));
    mesh.position.copy(pos);
    scene.add(mesh);
    bullets.push({
        mesh,
        dir: dir.clone().normalize(),
        velocity: weaponData.bSpeed,
        life: 180,
        owner,
        damage: weaponData.damage
    });
}

function shootCurrentWeapon() {
    if (isReloading || player.hp <= 0 || !currentWeaponName) return;
    const d = WEAPON_SHOP[currentWeaponName];
    const now = Date.now();
    if (now - lastShotTime < d.fireRate) return;

    if (d.type === "melee") {
        lastShotTime = now;
        knifeSlashAnim = 1;
        sound.shoot('melee');
        const target = getKnifeTarget();
        if (target) {
            const j = enemies.indexOf(target);
            target.hp -= 150;
            flashHitMarker();
            sound.hit();
            addKillFeed(`${currentWeaponName} ${t('killed_enemy')}`);
            if (target.hp <= 0 && j >= 0) {
                sound.kill();
                removeBot(target, enemies, j);
                setCredits(credits + 300);
                updateHUD();
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
    currentRecoil = 0.04;
    sound.shoot(d.soundType || d.type);
    updateHUD();

    const crosshair = document.getElementById("crosshair");
    if (crosshair) {
        crosshair.classList.add("shooting");
        setTimeout(() => crosshair.classList.remove("shooting"), 80);
    }

    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const spread = d.spread * (isAiming ? 0.2 : 1.0);
    for (let p = 0; p < d.pellets; p++) {
        const shotDir = dir.clone();
        if (spread > 0) {
            shotDir.x += (Math.random() - 0.5) * spread;
            shotDir.y += (Math.random() - 0.5) * spread;
            shotDir.z += (Math.random() - 0.5) * spread;
        }
        shotDir.normalize();
        const spawnPos = camera.position.clone();
        if (isAiming && d.hasScope) spawnPos.y -= 0.15;
        else spawnPos.y -= 0.22;
        createBullet(spawnPos, shotDir, 'player', d);
    }
}
// ==================== RECARGA =================================
function reloadWeapon() {
    if (player.hp <= 0 || !currentWeaponName || currentWeaponName === "Faca") return;
    const d = WEAPON_SHOP[currentWeaponName];
    const ammo = ammoSlots[currentSlot];
    if (isReloading || ammo.inMag === d.magSize || ammo.reserve <= 0) return;
    isReloading = true;
    applyAimState(false);
    isMouseDown = false;
    sound.reload();

    const barWrap = document.getElementById("reload-bar-wrap");
    const bar = document.getElementById("reload-bar");
    if (barWrap) barWrap.style.display = "block";
    if (bar) {
        bar.style.transition = `width ${d.reloadTime}ms linear`;
        bar.style.width = "0%";
        setTimeout(() => { bar.style.width = "100%"; }, 30);
    }
    updateHUD();

    setTimeout(() => {
        if (!isReloading) return;
        const need = d.magSize - ammo.inMag;
        const take = Math.min(need, ammo.reserve);
        ammo.inMag += take;
        ammo.reserve -= take;
        isReloading = false;
        if (bar) { bar.style.transition = "none"; bar.style.width = "0%"; }
        if (barWrap) barWrap.style.display = "none";
        updateHUD();
    }, d.reloadTime);
}

// ==================== DASH ====================================
function performDash() {
    if (dashCharges <= 0 || isDashing || player.hp <= 0) return;
    dashCharges--;
    isDashing = true;
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();
    let dashDir = dir.clone();
    if (keys['a']) dashDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    if (keys['d']) dashDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    if (keys['s']) dashDir.multiplyScalar(-1);
    dashVelocity.x = dashDir.x * DASH_SPEED;
    dashVelocity.z = dashDir.z * DASH_SPEED;
    updateDashHUD();
    setTimeout(() => {
        isDashing = false;
        dashVelocity.x = 0;
        dashVelocity.z = 0;
    }, DASH_DURATION * 1000);
    if (dashCharges < maxDashCharges) dashCooldown = DASH_COOLDOWN_TIME;
}

function updateDashCooldown(delta) {
    if (dashCharges < maxDashCharges && dashCooldown > 0) {
        dashCooldown -= delta;
        if (dashCooldown <= 0) {
            dashCharges = Math.min(maxDashCharges, dashCharges + 1);
            dashCooldown = dashCharges < maxDashCharges ? DASH_COOLDOWN_TIME : 0;
            updateDashHUD();
        }
    }
}

// ==================== IA DOS BOTS =============================
function getBotTarget(bot) {
    if (bot.type === 'enemy') {
        if (player.hp > 0) return { x: player.x, z: player.z, hp: player.hp, model: null, isPlayer: true };
        return allies.find(a => a.alive && !a.dying) || null;
    }
    return enemies.find(e => e.alive && !e.dying) || null;
}

function updateBotReload(bot, delta) {
    if (!bot.isReloading) return false;
    bot.reloadTimer -= delta;
    if (bot.reloadTimer <= 0) {
        const need = bot.assignedWeapon.magSize - bot.ammo;
        const take = Math.min(need, bot.reserve);
        bot.ammo += take;
        bot.reserve -= take;
        bot.isReloading = false;
    }
    return bot.isReloading;
}

function startBotReload(bot) {
    if (bot.isReloading || bot.reserve <= 0) return false;
    bot.isReloading = true;
    bot.reloadTimer = bot.assignedWeapon.reloadTime / 1000;
    bot.state = 'reload';
    return true;
}

function runBotAI(bot, delta) {
    if (!bot.alive || bot.dying) return;
    const isEnemy = bot.type === 'enemy';
    const weaponData = bot.assignedWeapon;
    updateBotReload(bot, delta);
    collectBotPickup(bot);

    const target = getBotTarget(bot);
    if (!target) return;

    const reserveLow = bot.reserve < weaponData.reserve * 0.2;
    const ammoTarget = reserveLow ? findNearestPickup('ammo', bot.x, bot.z) : null;
    const tx = ammoTarget ? ammoTarget.x : target.x;
    const tz = ammoTarget ? ammoTarget.z : target.z;
    const dx = tx - bot.x;
    const dz = tz - bot.z;
    const dist = Math.max(0.001, Math.hypot(dx, dz));
    const targetLos = !ammoTarget && hasLineOfSight(bot.x, bot.z, target.x, target.z);

    if (targetLos) {
        bot.reactionTimer = bot.seesTarget ? Math.max(0, bot.reactionTimer - delta) : bot.reactionDelay;
        bot.seesTarget = true;
    } else {
        bot.seesTarget = false;
        bot.reactionTimer = bot.reactionDelay;
    }

    if (ammoTarget) bot.state = 'seek_ammo';
    else if (bot.isReloading) bot.state = 'reload';

    bot.coverTimer -= delta;
    if (!targetLos && !ammoTarget && bot.coverTimer <= 0 && coverSpots.length > 0) {
        let bestCover = null;
        let bestScore = -Infinity;
        for (let s of coverSpots) {
            if (s.occupied && s.occupied !== bot) continue;
            const distToCover = Math.hypot(bot.x - s.x, bot.z - s.z);
            if (distToCover < 20 && !hasLineOfSight(s.x, s.z, target.x, target.z) && Math.hypot(s.x - target.x, s.z - target.z) > 10) {
                const score = -distToCover + Math.hypot(s.x - target.x, s.z - target.z) * 0.5;
                if (score > bestScore) {
                    bestScore = score;
                    bestCover = s;
                }
            }
        }
        if (bestCover) {
            if (bot.coverPos) bot.coverPos.occupied = false;
            bot.coverPos = bestCover;
            bestCover.occupied = bot;
            bot.state = 'take_cover';
            bot.coverTimer = 3;
        }
    }

    if (targetLos && bot.state === 'take_cover') {
        bot.state = 'chase';
        if (bot.coverPos) {
            bot.coverPos.occupied = false;
            bot.coverPos = null;
        }
    }

    let mx = 0, mz = 0;
    if (bot.state === 'take_cover' && bot.coverPos && !ammoTarget) {
        const cvx = bot.coverPos.x - bot.x;
        const cvz = bot.coverPos.z - bot.z;
        const cvd = Math.hypot(cvx, cvz);
        if (cvd > 0.5) {
            mx = cvx / cvd;
            mz = cvz / cvd;
        } else {
            bot.state = 'idle';
        }
    } else if (ammoTarget) {
        mx = dx / dist;
        mz = dz / dist;
    } else if (dist < 6 && targetLos) {
        mx = -dx / dist;
        mz = -dz / dist;
    } else {
        mx = dx / dist;
        mz = dz / dist;
    }

    bot.strafeTimer -= delta;
    if (bot.strafeTimer <= 0) {
        bot.strafeTimer = 0.45 + Math.random() * 0.75;
        bot.strafeDir = Math.random() > 0.5 ? 1 : -1;
    }
    if (targetLos && !ammoTarget && dist < 45) {
        mx += (-dz / dist) * bot.strafeDir * 0.55;
        mz += (dx / dist) * bot.strafeDir * 0.55;
        const len = Math.hypot(mx, mz);
        if (len > 0) { mx /= len; mz /= len; }
    }

    let spd = bot.speed;
    if (bot.state === 'take_cover') spd *= 1.4;
    if (bot.state === 'seek_ammo') spd *= 1.25;
    if (bot.isReloading) spd *= 0.45;
    const nx = bot.x + mx * spd;
    const nz = bot.z + mz * spd;
    const moved = Math.hypot(nx - bot.x, nz - bot.z) > 0.001;
    if (!checkCollision(nx, nz, 1.0)) {
        bot.x = nx;
        bot.z = nz;
    } else {
        bot.strafeDir *= -1;
    }

    bot.walkTime += moved ? delta * 12 : delta * 2;
    bot.model.position.set(bot.x, moved ? Math.sin(bot.walkTime) * 0.08 : 0, bot.z);
    bot.model.rotation.y = Math.atan2(target.x - bot.x, target.z - bot.z);

    if (bot.ammo <= 0) {
        if (!startBotReload(bot) && bot.reserve <= 0) {
            bot.resourceTarget = findNearestPickup('ammo', bot.x, bot.z);
        }
        return;
    }
    if (bot.isReloading || ammoTarget) return;

    const now = Date.now();
    if (now - bot.lastShot > weaponData.fireRate * (isEnemy ? 1.5 : 2.2) && targetLos && bot.reactionTimer <= 0) {
        const accuracy = isEnemy ? 0.05 : 0.08;
        const shotDist = Math.max(0.001, Math.hypot(target.x - bot.x, target.z - bot.z));
        const verticalAim = ((1.55 - 1.6) / shotDist) + (Math.random() - 0.5) * accuracy * 0.25;
        const shotDir = new THREE.Vector3(
            (target.x - bot.x) / shotDist + (Math.random() - 0.5) * accuracy,
            verticalAim,
            (target.z - bot.z) / shotDist + (Math.random() - 0.5) * accuracy
        ).normalize();
        const spawnPos = new THREE.Vector3(bot.x, 1.6, bot.z);
        createBullet(spawnPos, shotDir, bot.type, weaponData);
        bot.ammo--;
        bot.lastShot = now;
    }
}

// ==================== HUD E UI ================================
function updateHUD() {
    if (isAdminMode) setCredits(MAX_CREDITS);
    document.getElementById("hp").textContent = Math.max(0, Math.ceil(player.hp));
    const hpPct = Math.max(0, (player.hp / player.maxHp) * 100);
    const hpBar = document.getElementById("hp-bar");
    if (hpBar) {
        hpBar.style.width = hpPct + "%";
        hpBar.style.background = hpPct > 50 ? 'var(--teal)' : (hpPct > 25 ? '#ffaa00' : 'var(--red)');
    }
    document.getElementById("money").textContent = "$" + credits;
    document.getElementById("buy-credits-val").textContent = "$" + credits;

    if (player.hp <= 0 || !currentWeaponName) {
        document.getElementById("weapon-name").textContent = t('spectator');
        document.getElementById("ammo-mag").textContent = "--";
        document.getElementById("ammo-res").textContent = "--";
        return;
    }

    const d = WEAPON_SHOP[currentWeaponName];
    document.getElementById("weapon-name").textContent = currentWeaponName;
    const cats = { pistol: t('pistol'), smg: t('smg'), rifle: t('rifle'), sniper: t('sniper'), shotgun: t('shotgun'), lmg: t('lmg'), melee: t('melee') };
    document.getElementById("weapon-slot-label").textContent = `${t('slot')} ${currentSlot} · ${cats[d.category] || d.type.toUpperCase()}`;
    if (isReloading) {
        document.getElementById("reload-bar-wrap").style.display = "block";
        document.getElementById("ammo-mag").textContent = "--";
    } else {
        document.getElementById("reload-bar-wrap").style.display = "none";
        const ammo = ammoSlots[currentSlot];
        document.getElementById("ammo-mag").textContent = d.type === "melee" ? "∞" : ammo.inMag;
        document.getElementById("ammo-res").textContent = d.type === "melee" ? "" : ammo.reserve;
        const warn = document.getElementById("low-ammo-warn");
        if (d.type !== "melee" && ammo.inMag <= Math.ceil(d.magSize * 0.25) && ammo.inMag > 0) {
            warn.textContent = t('low_ammo');
            warn.classList.add("visible");
        } else {
            warn.classList.remove("visible");
        }
    }
}

function updateSlotsHUD() {
    [1, 2, 3].forEach(i => {
        const slotEl = document.getElementById(`slot-${i}`);
        const nameEl = document.getElementById(`sn${i}`);
        if (slotEl) slotEl.classList.toggle("active", currentSlot === i);
        if (nameEl) nameEl.textContent = inventory[i] || (i === 2 ? t('primary_empty') : "-");
    });
    document.getElementById("ld-slot1").textContent = `${t('slot')} 1: ${inventory[1] || "Classic"}`;
    document.getElementById("ld-slot2").textContent = `${t('slot')} 2: ${getPrimarySlotLabel()}`;
}
function updateDashHUD() {
    // Elementos opcionais, se existirem
    const dash1 = document.getElementById("dash1");
    const dash2 = document.getElementById("dash2");
    if (dash1) dash1.classList.toggle("used", dashCharges < 1);
    if (dash2) dash2.classList.toggle("used", dashCharges < 2);
}

function flashHitMarker() {
    const hm = document.getElementById("hit-marker");
    if (hm) { hm.classList.add("flash"); setTimeout(() => hm.classList.remove("flash"), 120); }
}

function flashDamage() {
    const ov = document.getElementById("damage-overlay");
    if (ov) { ov.classList.add("hit"); setTimeout(() => ov.classList.remove("hit"), 400); }
}

function addKillFeed(text) {
    const feed = document.getElementById("kill-feed");
    if (!feed) return;
    const entry = document.createElement("div");
    entry.className = "kill-entry";
    entry.textContent = text;
    feed.appendChild(entry);
    setTimeout(() => { entry.style.opacity = "0"; setTimeout(() => entry.remove(), 500); }, 2500);
    while (feed.children.length > 4) feed.removeChild(feed.firstChild);
}

function updateCrosshair() {
    const ch = document.getElementById("crosshair");
    if (ch) {
        ch.classList.toggle("moving", isMoving && !isAiming);
        ch.classList.toggle("aiming", isAiming);
        ch.classList.toggle("target", !!getEnemyUnderCrosshair());
    }
    updateScopeOverlay();
}

function drawMinimap() {
    const canvas = document.getElementById("minimap");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const S = W / (MAP_LIMIT * 2);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(10,20,30,0.8)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#1a2535";
    obstacles.forEach(o => {
        ctx.fillRect((o.x + MAP_LIMIT) * S - o.w * S / 2, (o.z + MAP_LIMIT) * S - o.d * S / 2, o.w * S, o.d * S);
    });
    ctx.fillStyle = "#00f0ff";
    allies.forEach(a => {
        ctx.beginPath();
        ctx.arc((a.x + MAP_LIMIT) * S, (a.z + MAP_LIMIT) * S, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.fillStyle = "#ff4455";
    enemies.forEach(e => {
        ctx.beginPath();
        ctx.arc((e.x + MAP_LIMIT) * S, (e.z + MAP_LIMIT) * S, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    if (player.hp > 0) {
        const px = (player.x + MAP_LIMIT) * S;
        const py = (player.z + MAP_LIMIT) * S;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== LOJA ====================================
let activeShopCat = "pistol";

function setupShopInterface() {
    const tabs = document.querySelectorAll(".shop-tab");
    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            activeShopCat = tab.dataset.cat;
            renderShopGrid(activeShopCat);
        };
    });
    renderShopGrid(activeShopCat);
}

function renderShopGrid(cat) {
    const grid = document.getElementById("shop-grid");
    if (!grid) return;
    grid.innerHTML = "";
    Object.entries(WEAPON_SHOP).forEach(([name, w]) => {
        if (w.category !== cat || name === "Faca") return;
        const targetSlot = SLOT_CATS[w.category] || 1;
        const isEquipped = inventory[targetSlot] === name;
        const cantAfford = credits < w.cost && !isEquipped;
        const card = document.createElement("div");
        card.className = "shop-card" + (isEquipped ? " equipped" : "") + (cantAfford ? " cant-afford" : "");
        card.innerHTML = `
            <div class="sc-name">${name}</div>
            <div class="sc-cost">$${w.cost}</div>
            <div class="sc-stats">${t('dmg')} ${w.damage} · ${t('cd')} ${w.fireRate}ms · ${t('mag')} ${w.magSize}</div>
        `;
        if (!cantAfford) {
            card.onclick = () => {
                if (!isBuyPhase || roundState !== 'buy') return;
                if (isEquipped) return;
                if (!isAdminMode) setCredits(credits - w.cost);
                inventory[targetSlot] = name;
                ammoSlots[targetSlot].inMag = w.magSize;
                ammoSlots[targetSlot].reserve = w.reserve;
                currentSlot = targetSlot;
                currentWeaponName = name;
                isReloading = false;
                applyAimState(false);
                isMouseDown = false;
                updateHUD();
                updateWeaponVisual();
                updateSlotsHUD();
                renderShopGrid(cat);
            };
        }
        grid.appendChild(card);
    });
}

// ==================== TROCA DE ARMA E ANIMAÇÕES ===============
let weaponSwitchAnim = 0;
let aimTransition = 0;

function switchSlot(n) {
    if (player.hp <= 0 || isReloading || !inventory[n] || currentSlot === n) return;
    applyAimState(false);
    currentSlot = n;
    currentWeaponName = inventory[n];
    isMouseDown = false;
    animWeaponSwitch();
    updateHUD();
    updateSlotsHUD();
    updateWeaponVisual();
}

function animWeaponSwitch() { weaponSwitchAnim = 1; }

function updateWeaponAnims(delta) {
    if (!currentWeaponName) return;
    const d = WEAPON_SHOP[currentWeaponName];
    const aimTarget = (isAiming && d.hasScope) ? 1 : 0;
    aimTransition += (aimTarget - aimTransition) * Math.min(1, delta * 20);
    if (isMoving && !isAiming) {
        weaponBob += delta * 8;
        weaponGroup.position.y += Math.sin(weaponBob) * 0.008;
        weaponGroup.position.x += Math.cos(weaponBob * 0.5) * 0.004;
    } else {
        weaponBob *= 0.9;
    }
    if (currentRecoil > 0) {
        currentRecoil -= delta * 6;
        if (currentRecoil < 0) currentRecoil = 0;
    }
    weaponGroup.position.z += currentRecoil;
    if (knifeSlashAnim > 0) {
        weaponGroup.position.z -= Math.sin(knifeSlashAnim * Math.PI) * 0.38;
        weaponGroup.rotation.x -= Math.sin(knifeSlashAnim * Math.PI) * 0.5;
        knifeSlashAnim -= delta * 8;
        if (knifeSlashAnim < 0) knifeSlashAnim = 0;
    }
    if (weaponSwitchAnim > 0) {
        weaponGroup.position.y -= weaponSwitchAnim * 0.12;
        weaponSwitchAnim -= delta * 10;
        if (weaponSwitchAnim <= 0) {
            weaponSwitchAnim = 0;
            resetWeaponPosition();
        }
    }
    let targetPos;
    if (isAiming && d.hasScope) targetPos = new THREE.Vector3(0, -0.12, -0.30);
    else if (d.type === "melee") targetPos = new THREE.Vector3(0.20, -0.32, -0.35);
    else targetPos = new THREE.Vector3(0.28, -0.24, -0.55);
    weaponGroup.position.lerp(targetPos, Math.min(1, delta * 18));
    weaponGroup.rotation.set(0, 0, 0);
}

// ==================== RESET DE RODADA =========================
function clearCombatEntities() {
    bullets.forEach(b => { scene.remove(b.mesh); if (b.trail) scene.remove(b.trail); });
    bullets = [];
    allies.forEach(a => { if (a.coverPos) a.coverPos.occupied = false; scene.remove(a.model); });
    enemies.forEach(e => { if (e.coverPos) e.coverPos.occupied = false; scene.remove(e.model); });
    allies = [];
    enemies = [];
    clearPickups();
}

function activeEnemyCount() {
    return enemies.filter(e => e.alive && !e.dying).length;
}

function updateRoundTimer(now = performance.now()) {
    const timer = document.getElementById("round-timer");
    const status = document.getElementById("buy-phase-status");
    if (roundState === 'buy') {
        const remaining = Math.max(0, (buyPhaseEndsAt - now) / 1000);
        if (timer) timer.textContent = formatTimer(remaining);
        if (status) status.textContent = `${t('buy_timer')} ${formatTimer(remaining)}`;
        if (remaining <= 0) beginCombatRound();
    } else if (roundState === 'live') {
        if (timer) timer.textContent = t('buy_closed');
        if (status) status.textContent = "";
    } else if (roundState === 'matchOver') {
        if (timer) timer.textContent = "GG";
        if (status) status.textContent = "";
    }
}

function beginBuyPhase() {
    roundState = 'buy';
    isBuyPhase = true;
    roundEndLocked = false;
    buyPhaseEndsAt = performance.now() + BUY_PHASE_DURATION * 1000;
    showBlocker('buy_phase', 'select_weapon');
    document.getElementById("start-button").textContent = t('enter_match');
    updateRoundTimer();
}

function beginCombatRound() {
    if (roundState !== 'buy') return;
    roundState = 'live';
    isBuyPhase = false;
    hideBlocker();
    updateRoundTimer();
}

function resetRound() {
    clearCombatEntities();

    generateRandomMap();
    spawnRoundPickups();
    roundNumber++;

    player.x = currentMapLayout?.playerSpawn?.x ?? 0;
    player.z = currentMapLayout?.playerSpawn?.z ?? 62;
    player.hp = 100;
    camera.position.set(player.x, 1.9, player.z);
    targetYaw = 0;
    targetPitch = 0;
    camera.rotation.order = "YXZ";
    camera.rotation.set(0, 0, 0);
    isReloading = false;
    applyAimState(false);
    isMouseDown = false;
    isDashing = false;
    dashCharges = maxDashCharges;
    dashCooldown = 0;
    camera.fov = BASE_FOV;
    camera.updateProjectionMatrix();

    for (let slot in inventory) {
        if (inventory[slot]) {
            const w = WEAPON_SHOP[inventory[slot]];
            ammoSlots[slot].inMag = w.magSize;
            ammoSlots[slot].reserve = w.reserve;
        }
    }
    currentSlot = inventory[1] ? 1 : (inventory[2] ? 2 : 3);
    currentWeaponName = inventory[currentSlot] || "Faca";
    updateHUD();
    updateWeaponVisual();
    updateSlotsHUD();
    updateDashHUD();

    const allyCount = 2 + Math.min(roundNumber - 1, 2);
    const enemyCount = 3 + Math.min(roundNumber - 1, 4);
    const allySpawns = currentMapLayout?.allySpawns || [];
    const enemySpawns = currentMapLayout?.enemySpawns || [];
    for (let i = 0; i < allyCount; i++) {
        const spawn = allySpawns[i % allySpawns.length] || { x: (Math.random() - 0.5) * 30, z: 55 - Math.random() * 10 };
        spawnBot('ally', spawn.x + (Math.random() - 0.5) * 2, spawn.z + (Math.random() - 0.5) * 2);
    }
    for (let i = 0; i < enemyCount; i++) {
        const spawn = enemySpawns[i % enemySpawns.length] || { x: (Math.random() - 0.5) * 30, z: -55 + Math.random() * 10 };
        spawnBot('enemy', spawn.x + (Math.random() - 0.5) * 2, spawn.z + (Math.random() - 0.5) * 2);
    }
    setupShopInterface();
    drawMinimap();
    beginBuyPhase();
}

function handleRoundEnd(victory) {
    if (roundEndLocked || roundState === 'matchOver') return;
    roundEndLocked = true;
    roundState = 'ended';
    isBuyPhase = false;
    isMouseDown = false;
    applyAimState(false);
    document.exitPointerLock();
    clearCombatEntities();
    if (victory) {
        teamScore++;
        setCredits(credits + 1900);
        showBlocker(null, 'select_weapon');
        document.getElementById('match-title').textContent = t('victory');
    } else {
        enemyScore++;
        setCredits(credits + 1400);
        inventory[1] = "Classic";
        inventory[2] = null;
        ammoSlots[1].inMag = WEAPON_SHOP.Classic.magSize;
        ammoSlots[1].reserve = WEAPON_SHOP.Classic.reserve;
        ammoSlots[2].inMag = 0;
        ammoSlots[2].reserve = 0;
        showBlocker(null, 'select_weapon');
        document.getElementById('match-title').textContent = t('defeat');
    }
    document.getElementById("team-score").textContent = teamScore;
    document.getElementById("enemy-score").textContent = enemyScore;
    updateHUD();
    updateSlotsHUD();

    if (teamScore >= MATCH_POINT || enemyScore >= MATCH_POINT) {
        roundState = 'matchOver';
        document.getElementById('match-title').textContent = teamScore >= MATCH_POINT ? t('match_victory') : t('match_defeat');
        document.getElementById('blocker-desc').textContent = `${teamScore} - ${enemyScore}`;
        document.getElementById("start-button").textContent = t('restart_match');
        return;
    }

    setTimeout(() => {
        if (roundState === 'ended') resetRound();
    }, 2200);
}

function resetMatch() {
    teamScore = 0;
    enemyScore = 0;
    roundNumber = 0;
    setCredits(800);
    inventory[1] = "Classic";
    inventory[2] = null;
    inventory[3] = "Faca";
    document.getElementById("team-score").textContent = teamScore;
    document.getElementById("enemy-score").textContent = enemyScore;
    resetRound();
}

// ==================== CONTROLES ===============================
const keys = {};

function setMoveKey(e, pressed) {
    const codeMap = {
        KeyW: 'w',
        KeyA: 'a',
        KeyS: 's',
        KeyD: 'd',
        ShiftLeft: 'shift',
        ShiftRight: 'shift'
    };
    const mapped = codeMap[e.code];
    if (mapped) keys[mapped] = pressed;
    keys[e.key.toLowerCase()] = pressed;
}

window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    setMoveKey(e, true);
    if (e.code === 'F8') {
        isAdminMode = !isAdminMode;
        setCredits(isAdminMode ? MAX_CREDITS : credits);
        addKillFeed(isAdminMode ? t('admin_on') : t('admin_off'));
        updateHUD();
        renderShopGrid(activeShopCat);
        e.preventDefault();
        return;
    }
    if (key === '1') switchSlot(1);
    if (key === '2') switchSlot(2);
    if (key === '3') switchSlot(3);
    if (key === 'r') reloadWeapon();
    if (key === 'escape') {
        if (isBuyPhase || roundState !== 'live') document.exitPointerLock();
        else hideBlocker();
    }
    if (key === 'shift') performDash();
});

window.addEventListener('keyup', e => { setMoveKey(e, false); });

document.addEventListener('mousemove', e => {
    if (document.pointerLockElement !== document.body) return;
    const sens = isAiming ? 0.0008 : 0.002;
    targetYaw -= e.movementX * sens;
    targetPitch -= e.movementY * sens;
    targetPitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetPitch));
});

window.addEventListener('mousedown', e => {
    if (document.pointerLockElement !== document.body || player.hp <= 0 || roundState !== 'live') return;
    if (e.button === 0) {
        isMouseDown = true;
        const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
        if (d && !d.isAutomatic) shootCurrentWeapon();
    } else if (e.button === 2) {
        const d = currentWeaponName ? WEAPON_SHOP[currentWeaponName] : null;
        if (d && d.type !== 'melee' && !isReloading) applyAimState(true);
    }
});

window.addEventListener('mouseup', e => {
    if (e.button === 0) isMouseDown = false;
    if (e.button === 2) applyAimState(false);
});

document.getElementById('start-button').addEventListener('click', () => {
    if (roundState === 'matchOver') {
        resetMatch();
        return;
    }
    if (roundState !== 'buy') return;
    beginCombatRound();
    sound.resume();
    document.body.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
    const blocker = document.getElementById('blocker');
    if (document.pointerLockElement !== document.body) {
        isMouseDown = false;
        applyAimState(false);
        if (isBuyPhase || roundState !== 'live') {
            if (blocker) blocker.style.display = 'flex';
            setupShopInterface();
        } else {
            hideBlocker();
        }
    } else {
        if (blocker) blocker.style.display = 'none';
    }
});

document.getElementById('canvas-container').addEventListener('click', () => {
    if (roundState === 'live' && document.pointerLockElement !== document.body) {
        document.body.requestPointerLock();
    }
});

window.addEventListener('wheel', e => {
    if (document.pointerLockElement !== document.body) return;
    const order = e.deltaY > 0 ? [1, 2, 3] : [3, 2, 1];
    const currentIndex = order.indexOf(currentSlot);
    for (let k = 1; k <= 3; k++) {
        const next = order[(currentIndex + k) % 3];
        if (inventory[next]) {
            switchSlot(next);
            break;
        }
    }
});

// Idioma buttons
document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-es').addEventListener('click', () => setLanguage('es'));

// ==================== GAME LOOP ===============================
let lastTime = 0;

function gameLoop(now) {
    requestAnimationFrame(gameLoop);
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    updateRoundTimer(now);

    if (document.pointerLockElement === document.body && roundState === 'live') {
        smoothYaw += (targetYaw - smoothYaw) * 0.25 * 60 * delta;
        smoothPitch += (targetPitch - smoothPitch) * 0.25 * 60 * delta;
        camera.rotation.order = "YXZ";
        camera.rotation.set(smoothPitch, smoothYaw, 0);

        if (player.hp > 0) {
            let mx = 0, mz = 0;
            const spd = isAiming ? player.speed * 0.5 : player.speed;
            const forwardX = -Math.sin(smoothYaw);
            const forwardZ = -Math.cos(smoothYaw);
            const rightX = Math.cos(smoothYaw);
            const rightZ = -Math.sin(smoothYaw);
            if (keys['w']) { mx += forwardX; mz += forwardZ; }
            if (keys['s']) { mx -= forwardX; mz -= forwardZ; }
            if (keys['a']) { mx -= rightX; mz -= rightZ; }
            if (keys['d']) { mx += rightX; mz += rightZ; }
            const len = Math.hypot(mx, mz);
            isMoving = len > 0;
            if (isMoving) {
                mx = mx / len * spd;
                mz = mz / len * spd;
                if (!checkCollision(player.x + mx + dashVelocity.x, player.z)) player.x += mx + dashVelocity.x;
                if (!checkCollision(player.x, player.z + mz + dashVelocity.z)) player.z += mz + dashVelocity.z;
            }
            if (isDashing) {
                if (!checkCollision(player.x + dashVelocity.x, player.z)) player.x += dashVelocity.x;
                if (!checkCollision(player.x, player.z + dashVelocity.z)) player.z += dashVelocity.z;
            }
            updateDashCooldown(delta);
            camera.position.x = player.x;
            camera.position.z = player.z;
            camera.position.y += (1.9 + (isMoving ? Math.sin(weaponBob * 2) * 0.01 : 0) - camera.position.y) * Math.min(1, delta * 15);
            if (isMouseDown && WEAPON_SHOP[currentWeaponName]?.isAutomatic) shootCurrentWeapon();
            collectPickups(delta);
        } else {
            const speed = 0.1;
            if (keys['w']) { camera.position.x -= Math.sin(smoothYaw) * speed; camera.position.z -= Math.cos(smoothYaw) * speed; }
            if (keys['s']) { camera.position.x += Math.sin(smoothYaw) * speed; camera.position.z += Math.cos(smoothYaw) * speed; }
        }

        updateCrosshair();
        updateWeaponAnims(delta);
        updateDyingBots(delta);

        // Atualiza balas
        for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            b.mesh.position.addScaledVector(b.dir, b.velocity);
            b.life--;
            const bp = b.mesh.position;
            let hit = checkCollision(bp.x, bp.z, 0.2);
            if (!hit && (b.owner === 'player' || b.owner === 'ally')) {
                for (let j = enemies.length - 1; j >= 0; j--) {
                    const en = enemies[j];
                    if (!en.alive || en.dying) continue;
                    if (Math.hypot(bp.x - en.x, bp.z - en.z) < 1.2 && Math.abs(bp.y - 1.4) < 1.8) {
                        en.hp -= b.damage;
                        hit = true;
                        if (b.owner === 'player') flashHitMarker();
                        sound.hit();
                        if (en.hp <= 0) {
                            sound.kill();
                            addKillFeed(b.owner === 'player' ? `${currentWeaponName} ${t('killed_enemy')}` : t('ally_kill'));
                            removeBot(en, enemies, j);
                            if (b.owner === 'player') setCredits(credits + 300);
                            updateHUD();
                        }
                        break;
                    }
                }
            } else if (!hit && b.owner === 'enemy') {
                if (player.hp > 0 && Math.hypot(bp.x - player.x, bp.z - player.z) < 1.0 && Math.abs(bp.y - 1.8) < 1.5) {
                    player.hp -= b.damage * 0.6;
                    hit = true;
                    flashDamage();
                    sound.hit();
                    updateHUD();
                    if (player.hp <= 0) {
                        player.hp = 0;
                        updateWeaponVisual();
                        sound.kill();
                        addKillFeed(t('you_died'));
                        handleRoundEnd(false);
                        break;
                    }
                }
                if (!hit) {
                    for (let j = allies.length - 1; j >= 0; j--) {
                        const ally = allies[j];
                        if (!ally.alive || ally.dying) continue;
                        if (Math.hypot(bp.x - ally.x, bp.z - ally.z) < 1.2 && Math.abs(bp.y - 1.4) < 1.8) {
                            ally.hp -= b.damage;
                            hit = true;
                            if (ally.hp <= 0) removeBot(ally, allies, j);
                            break;
                        }
                    }
                }
            }
            if (hit || b.life <= 0) {
                scene.remove(b.mesh);
                bullets.splice(i, 1);
            }
        }
        allies.forEach(a => runBotAI(a, delta));
        enemies.forEach(e => runBotAI(e, delta));

        if (activeEnemyCount() === 0) {
            handleRoundEnd(true);
            return;
        }

        drawMinimap();
    }

    renderer.render(scene, camera);
}

// ==================== PARTÍCULAS DE FUNDO (MENU) ==============
(function initBgCanvas() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
    }));
    function animateBg() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,240,255,${0.1 + Math.sin(Date.now() * 0.001 + p.r) * 0.05})`;
            ctx.fill();
        });
        requestAnimationFrame(animateBg);
    }
    animateBg();
})();

// ==================== RESIZE ==================================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const bgCanvas = document.getElementById("bg-canvas");
    if (bgCanvas) {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
});

// ==================== INICIALIZAÇÃO ===========================
resetRound();
updateDashHUD();
requestAnimationFrame(gameLoop);
