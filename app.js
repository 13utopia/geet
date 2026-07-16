// Configuration matched from the analysis
const config = {
  curveFrequency: 0.18,
  curveStrength: 0.12,
  depthCurveStrength: 0.2,
  wheelFactor: 5.0,
  wheelDirection: -1,
  groupRotation: [-0.02, 0.28, -0.03],
  groupPosition: [-0.9, 0.1, 0.32],
  cameraFov: 28,
  cameraPosition: [0, 0, 3.3],
  velocityDecay: 0.96,
  touchDragFactor: 0.02,
  touchMomentumScale: 40,
  maxVelocity: 300,
  itemWidth: 0.96,
  itemGap: 0.05,
  bendMultiplier: 0.008
};

const items = [
  {
    "id": "bas",
    "img": "Instagram/BAS/main.webp",
    "name1": "The",
    "name2": "BAS",
    "description": "A showcase of brand aesthetics and visual identity for BAS.",
    "gridImages": [
      "Instagram/BAS/imageye___-_imgi_15_702611919_17875332687656926_6306002636948471957_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_16_703222689_17875328646656926_8258969267493730849_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_17_700944829_17874943077656926_7564662826366586197_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_24_682712158_17871514434656926_2473323111116479470_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_25_685625857_18043503275772830_794317588049842218_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_27_671208268_17869435935656926_1440188570236619620_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_28_670569794_2197369897740702_6303272508388831568_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_29_670907464_17868539790656926_69545622250751508_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_30_670011225_17867744793656926_5117159892628677026_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_31_670798392_17867196468656926_7637219639190345373_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_32_658917936_17866335720656926_3680965287969897635_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_33_658875491_17865726771656926_6665772073765454214_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_34_657721406_17863205997656926_8892432799549330293_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_35_657338127_17864210859656926_6385571208730464957_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_37_657224581_17863205343656926_6033505245179840393_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_38_655040833_17861923158656926_4823803278884042208_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_39_651915567_17861498805656926_4105209627248856904_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_41_642671046_17860038903656926_1337260317186524064_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_42_643465555_17858127255656926_3484612968622827229_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_43_642934202_17859169098656926_8313415351745638310_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_44_643012105_17858127030656926_8567945687996711751_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_45_642205895_17857914192656926_666730662312844296_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_46_643018839_17857913931656926_1411495749763844386_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_47_642133901_17857723053656926_3720406279398011827_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_48_642506492_17857335030656926_5602666142682753585_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_49_641041115_17857165344656926_6397256299801412388_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_50_641771534_17857159236656926_6067829032570530739_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_51_639508674_17856582333656926_4535809902200117091_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_52_639464051_17856196839656926_2497106449150567782_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_54_631670714_17855244690656926_5010008382959286555_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_55_630056593_17853992688656926_8091281533701675930_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_56_628267748_17853642951656926_4430666524892606534_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_57_628034481_17853642795656926_4833220183724734173_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_58_627986920_17853642687656926_6787106112345224524_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_59_625119182_17853467703656926_3712065156381929913_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_60_625033386_17852709825656926_436930165811436174_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_61_622539132_17852140776656926_947916224068280696_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_62_619813278_17850921948656926_1086270754418158964_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_64_619181773_17850921195656926_401521445298954135_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_9_730713375_17882414064656926_1475436675040090254_n 1.webp"
    ]
  },
  {
    "id": "chintamani-jewellers",
    "img": "Instagram/Chintamani Jewellers/main.webp",
    "name1": "Chintamani Jewellers",
    "name2": "",
    "description": "A showcase of brand aesthetics and visual identity for Chintamani Jewellers.",
    "gridImages": [
      "Instagram/Chintamani Jewellers/1 1.webp",
      "Instagram/Chintamani Jewellers/2 1.webp",
      "Instagram/Chintamani Jewellers/3 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (1) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (10) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (11) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (12) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (13) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (14) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (15) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (16) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (2) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (5) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (6) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post (9) 1.webp",
      "Instagram/Chintamani Jewellers/chintamani post 1.webp"
    ]
  },
  {
    "id": "fujitech-express",
    "img": "Instagram/Fujitech Express/main.webp",
    "name1": "Fujitech",
    "name2": "Express",
    "description": "A showcase of brand aesthetics and visual identity for Fujitech Express.",
    "gridImages": [
      "Instagram/Fujitech Express/fujitech post (13) 1.webp",
      "Instagram/Fujitech Express/fujitech post (14) 1.webp",
      "Instagram/Fujitech Express/fujitech post (15) 1.webp",
      "Instagram/Fujitech Express/fujitech post (16) 1.webp",
      "Instagram/Fujitech Express/fujitech post (17) 1.webp",
      "Instagram/Fujitech Express/fujitech post (18) 1.webp",
      "Instagram/Fujitech Express/fujitech post (19) 1.webp",
      "Instagram/Fujitech Express/fujitech post (2) 1.webp",
      "Instagram/Fujitech Express/fujitech post (20) 1.webp",
      "Instagram/Fujitech Express/fujitech post (21) 1.webp",
      "Instagram/Fujitech Express/fujitech post (22) 1.webp",
      "Instagram/Fujitech Express/fujitech post (24) 1.webp",
      "Instagram/Fujitech Express/fujitech post (25) 1.webp",
      "Instagram/Fujitech Express/fujitech post (26) 1.webp",
      "Instagram/Fujitech Express/fujitech post (27) 1.webp",
      "Instagram/Fujitech Express/fujitech post (29) 1.webp",
      "Instagram/Fujitech Express/fujitech post (30) 1.webp",
      "Instagram/Fujitech Express/image (1) 1.webp",
      "Instagram/Fujitech Express/image (2) 1.webp",
      "Instagram/Fujitech Express/image (3) 1.webp",
      "Instagram/Fujitech Express/image 1.webp"
    ]
  },
  {
    "id": "mayur-dairy-&-sweets",
    "img": "Instagram/Mayur dairy & sweets/main.webp",
    "name1": "Mayur",
    "name2": "Dairy",
    "description": "A showcase of brand aesthetics and visual identity for Mayur dairy & sweets.",
    "gridImages": [
      "Instagram/Mayur dairy & sweets/COLD COCO (3) 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_12_730022164_18108855737475134_2143186600599126744_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_13_721601516_18107077235475134_5663130059738301639_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_14_719532639_18107044058475134_3526992251210383331_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_15_721297609_18106686635475134_1459900652571699642_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_23_702651799_18104193515475134_8955819663875726191_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_24_702910888_18103974770475134_5877624210536826477_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_25_701488257_18103727081475134_8599979599086375547_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_26_696838578_18103343999475134_8794265318795312933_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_27_694252282_18103141133475134_7627302961358324596_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_28_687794313_18102887339475134_2664842998079310630_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_29_688315163_18102861011475134_2336279942479670795_n (1) 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_30_694205715_18102746108475134_3200944946222744507_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_31_684639710_18102306017475134_8167772793243828134_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_33_684218329_18101886422475134_1317534669075412239_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_34_682686898_18101570435475134_7328828659210797625_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_58_687251586_18102861020475134_2942649205672979729_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_58_696812174_18103344011475134_5367116713067863606_n (1) 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_59_688440006_18102860984475134_7368836512935407507_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_59_695178927_18103344020475134_1143006434127306301_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_60_697028307_18103344029475134_109282349123783002_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_61_695777238_18103343990475134_2320933508911349305_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_72_653642647_17968304388039910_7599069161126816130_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_74_655119628_18142926082491049_4947723174941637233_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_76_649227480_17929313118230149_2357627751654841828_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_83_723458205_18107077262475134_5910818730999472322_n 1.webp",
      "Instagram/Mayur dairy & sweets/imageye___-_imgi_88_720444882_18107077250475134_9170602201857846888_n 1.webp",
      "Instagram/Mayur dairy & sweets/mayur bag 1 1.webp",
      "Instagram/Mayur dairy & sweets/mayur bag 2 1.webp",
      "Instagram/Mayur dairy & sweets/mayur bag 3 1.webp",
      "Instagram/Mayur dairy & sweets/Mayur dairy cold coco (10) 1.webp",
      "Instagram/Mayur dairy & sweets/Mayur dairy cold coco (8) 1.webp",
      "Instagram/Mayur dairy & sweets/Mayur dairy cold coco (9) 1.webp",
      "Instagram/Mayur dairy & sweets/Mayur dairy posts (1) 1.webp",
      "Instagram/Mayur dairy & sweets/Mayur dairy posts (3) 1.webp",
      "Instagram/Mayur dairy & sweets/Mayur dairy posts 1.webp"
    ]
  },
  {
    "id": "tqs",
    "img": "Instagram/TQS/main.webp",
    "name1": "The",
    "name2": "TQS",
    "description": "A showcase of brand aesthetics and visual identity for TQS.",
    "gridImages": [
      "Instagram/TQS/557341199_17964710147976601_9209666473512854995_n 1.webp",
      "Instagram/TQS/559360173_17965384598976601_3647502617621417507_n 1.webp",
      "Instagram/TQS/586880834_17970298262976601_8185958099078177584_n 1.webp",
      "Instagram/TQS/589463156_17971428077976601_6957671920795964456_n 1.webp",
      "Instagram/TQS/600423563_17972762843976601_3837142771510741109_n 1.webp",
      "Instagram/TQS/623202860_1388232586435499_8254144096669314854_n 1.webp",
      "Instagram/TQS/658447747_17985247475976601_6889733647435280971_n 1.webp",
      "Instagram/TQS/696688740_17991188888976601_5096435130342919683_n 1.webp",
      "Instagram/TQS/702298597_17991600353976601_7721130217817950624_n 1.webp",
      "Instagram/TQS/705968350_17992828235976601_4136939929557949490_n 1.webp",
      "Instagram/TQS/722314072_17994777767976601_6179146013184362822_n 1.webp",
      "Instagram/TQS/TQS coaster (2) 1.webp",
      "Instagram/TQS/TQS coaster (4) 1.webp",
      "Instagram/TQS/tqs exhibition (1) 1.webp",
      "Instagram/TQS/WhatsApp Image 2026-07-08 at 11.36.32 AM 1.webp",
      "Instagram/TQS/WhatsApp Image 2026-07-08 at 11.36.33 AM (1) 1.webp",
      "Instagram/TQS/WhatsApp Image 2026-07-08 at 11.36.34 AM (1) 1.webp",
      "Instagram/TQS/WhatsApp Image 2026-07-08 at 11.36.34 AM 1.webp"
    ]
  },
  {
    "id": "zaign",
    "img": "Instagram/zaign/main.webp",
    "name1": "zaign",
    "name2": "",
    "description": "A showcase of brand aesthetics and visual identity for zaign.",
    "gridImages": [
      "Instagram/zaign/692467962_17882817552555877_3681406450520331235_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_10_684256833_17883198753555877_456753528007733584_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_13_687047138_17882443350555877_577893229160683883_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_20_670872157_17880505659555877_696643963413879936_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_22_672684649_122127415521009091_4920248825624685763_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_23_671838633_17879990733555877_1701847300538289180_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_24_670917432_1538125564313907_6616166240745711762_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_25_662761269_17879291295555877_1720295383959017934_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_28_670250237_17878814772555877_5201846659965683422_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_35_653512506_17874430698555877_7340168484622429962_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_38_651302846_17873884326555877_8008683658359907284_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_40_650061049_17873404989555877_6068974319194818468_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_41_639491416_17869796850555877_4158482386022243104_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_41_650135370_17873256402555877_8275936293996085432_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_42_650037472_17873088813555877_2952175186229742900_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_43_631795222_17869332558555877_3385298217852320432_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_45_646111139_2792042617803337_2515864415212387770_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_46_632281669_17868699633555877_4377573692309687591_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_52_640417340_17870812125555877_7182984487870472196_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_54_640129573_890741867158636_3267459698344156116_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_55_641763712_1825210051523093_6661716848514144105_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_57_626177797_17867361453555877_9187794954485447547_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_57_671167379_17879990751555877_4103035560412890468_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_58_671225405_17879990742555877_4870925679573029600_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_59_623654356_17866948485555877_3346008337380024450_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_70_619846243_17865820395555877_1723433298164178596_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_71_619846378_17865691875555877_8517305240223553440_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_72_619628233_17865691452555877_8840998055800788630_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_78_587795299_17865018747555877_474289364581373079_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_80_612950963_17864652558555877_1445347191889391216_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_88_610686630_17863690311555877_7339082242980143115_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_99_624471918_17866948488555877_7674327359312499958_n 1.webp",
      "Instagram/zaign/imageye___-_imgi_9_687711091_17883708717555877_2398346108877938041_n 1.webp"
    ]
  }
];

class Slider3D {
  constructor() {
    this.canvas = document.querySelector('#gallery-canvas');
    this.scene = new THREE.Scene();
    
    // Setup Camera
    this.camera = new THREE.PerspectiveCamera(config.cameraFov, window.innerWidth / window.innerHeight, 0.01, 100);
    this.camera.position.set(...config.cameraPosition);
    
    // Setup Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Group
    this.group = new THREE.Group();
    this.group.rotation.set(...config.groupRotation);
    this.group.position.set(...config.groupPosition);
    this.scene.add(this.group);
    
    this.meshes = [];
    
    // Physics / Scroll State
    this.scrollPosition = 0;
    this.velocity = 0;
    
    // Interaction State
    this.isDragging = false;
    this.lastX = 0;
    this.lastTime = 0;
    this.dragDistance = 0;
    this.currentSkew = 0;
    this.targetSkew = 0;

    // Raycaster for clicks
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isDetailOpen = false;
    
    // Bind Detail UI
    this.detailView = document.getElementById('detail-view');
    this.detailTitle = document.getElementById('detail-title');
    this.detailDesc = document.getElementById('detail-desc');
    this.detailGrid = document.getElementById('detail-grid');
    this.closeBtn = document.getElementById('close-detail');
    
    if(this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeDetailView());
    }
    
    // Setup Lenis for detail view
    const detailWrapper = document.getElementById('detail-scroll-wrapper');
    const detailContent = document.getElementById('detail-scroll-content');
    
    if (detailWrapper && detailContent && typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        wrapper: detailWrapper,
        content: detailContent,
        lerp: 0.08,
        smoothWheel: true
      });
      
      this.lenis.on('scroll', (e) => {
        this.targetSkew = Math.max(-8, Math.min(8, e.velocity * -0.15));
      });
    }
    
    this.init();
    this.addEvents();
    this.animate();
  }
  
  init() {
    const textureLoader = new THREE.TextureLoader();
    this.labels = [];
    const labelsLayer = document.getElementById('labels-layer');
    
    // Custom Shader Material that modifies vertex positions based on world X
    const vertexShader = `
      uniform float uCurveFrequency;
      uniform float uCurveStrength;
      uniform float uDepthCurveStrength;
      uniform float uVelocity;
      uniform float uBendMultiplier;
      
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        
        // Convert local position to world position to get actual X
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        float worldX = worldPosition.x;
        
        // 1. The Bend: Sine curve on the Y-axis based on world X
        float yCurve = sin(worldX * uCurveFrequency) * uCurveStrength - uCurveStrength;
        
        // 2. Depth Push: Items further from center push backwards in Z
        float zDepth = -pow(abs(worldX), 1.25) * uDepthCurveStrength;
        
        // Apply deformations
        vec3 deformedPosition = position;
        deformedPosition.y += yCurve;
        deformedPosition.z += zDepth;
        
        // 3. Momentum Pull: Bend X based on scroll velocity and vertical position (uv.y)
        float pullCurve = sin(uv.y * 3.14159);
        deformedPosition.x -= pullCurve * uVelocity * uBendMultiplier;
        
        // Calculate final position
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(deformedPosition, 1.0);
      }
    `;
    
    const fragmentShader = `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      
      void main() {
        vec2 uvCropped = vUv;
        // Object-fit: cover logic for a 1:1 image on a 4:5 plane (aspect ratio 0.8)
        uvCropped.x = (uvCropped.x - 0.5) * 0.8 + 0.5;
        
        vec4 texColor = texture2D(tDiffuse, uvCropped);
        // Soft gradient overlay at edges could be added here
        gl_FragColor = texColor;
      }
    `;
    
    // 4:5 Aspect Ratio (0.96 width, 1.2 height)
    const geometry = new THREE.PlaneGeometry(0.96, 1.2, 32, 32);
    
    items.forEach((item, index) => {
      const texture = textureLoader.load(item.img);
      // texture.colorSpace = THREE.SRGBColorSpace; // If using latest Three.js
      
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          tDiffuse: { value: texture },
          uCurveFrequency: { value: config.curveFrequency },
          uCurveStrength: { value: config.curveStrength },
          uDepthCurveStrength: { value: config.depthCurveStrength },
          uVelocity: { value: 0 },
          uBendMultiplier: { value: config.bendMultiplier }
        },
        side: THREE.DoubleSide
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position items in a row
      mesh.position.x = index * (config.itemWidth + config.itemGap);
      
      this.meshes.push(mesh);
      this.group.add(mesh);
      
      // Create HTML Label
      const labelEl = document.createElement('div');
      labelEl.className = 'photo-label';
      labelEl.innerHTML = `
        <span class="photo-label__line photo-label__line--1">${item.name1}</span>
        <span class="photo-label__line photo-label__line--2">${item.name2}</span>
      `;
      labelsLayer.appendChild(labelEl);
      this.labels.push(labelEl);
    });
    
    // Initial centering
    this.scrollPosition = -2 * (config.itemWidth + config.itemGap);
  }
  
  addEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    
    // Wheel scroll
    window.addEventListener('wheel', (e) => {
      this.velocity += e.deltaY * config.wheelFactor * 0.01;
      this.velocity = Math.max(-config.maxVelocity, Math.min(config.maxVelocity, this.velocity));
      
      const hint = document.getElementById('scroll-hint');
      if (hint) hint.classList.add('hidden');
    }, { passive: true });
    
    // Touch / Pointer Drag
    this.canvas.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.lastX = e.clientX;
      this.lastTime = performance.now();
      this.dragDistance = 0;
      
      const hint = document.getElementById('scroll-hint');
      if (hint) hint.classList.add('hidden');
    });
    
    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      
      const dx = e.clientX - this.lastX;
      this.dragDistance += Math.abs(dx);
      this.velocity -= dx * config.touchDragFactor * 10;
      
      this.lastX = e.clientX;
      this.lastTime = performance.now();
    });
    
    window.addEventListener('pointerup', (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      
      // Calculate flick momentum
      const timeDiff = performance.now() - this.lastTime;
      if (timeDiff < 100) {
        const dx = e.clientX - this.lastX;
        this.velocity -= dx * config.touchDragFactor * config.touchMomentumScale;
      }

      // Check if it was a click (not a drag)
      if (this.dragDistance < 10 && !this.isDetailOpen) {
        this.onClick(e);
      }
    });
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  animate(time) {
    requestAnimationFrame(this.animate.bind(this));
    
    // Lenis loop for detail view
    if (this.lenis && this.isDetailOpen) {
      this.lenis.raf(time);
      
      // Smoothly interpolate the skew
      this.currentSkew += (this.targetSkew - this.currentSkew) * 0.1;
      this.targetSkew *= 0.9; // decay target to 0
      
      const images = this.detailGrid.querySelectorAll('img.scroll-ready');
      if (Math.abs(this.currentSkew) > 0.01) {
        images.forEach(img => {
          img.style.transform = `skewY(${this.currentSkew}deg)`;
        });
      } else {
        images.forEach(img => {
          img.style.transform = `skewY(0deg)`;
        });
      }
    }

    // Momentum / Velocity decay
    this.velocity *= config.velocityDecay;
    
    // Stop completely if very slow
    if (Math.abs(this.velocity) < 0.01) {
      this.velocity = 0;
    }
    
    // Apply velocity to scroll position (Direction inverted for natural feel)
    this.scrollPosition += this.velocity * 0.01 * config.wheelDirection;
    
    // Infinite Loop Logic
    const spacing = config.itemWidth + config.itemGap;
    const totalWidth = this.meshes.length * spacing;
    
    this.meshes.forEach((mesh, i) => {
      // Pass the current velocity to the shader for the pull effect
      mesh.material.uniforms.uVelocity.value = this.velocity;
      
      // Proper infinite wrapping using modulo
      let x = ((i * spacing + this.scrollPosition) % totalWidth + totalWidth) % totalWidth;
      
      // Shift it so 0 is the center of the screen
      mesh.position.x = x - (totalWidth / 2);
      
      // Update HTML Label Projection
      const label = this.labels[i];
      const worldX = mesh.position.x;
      
      // Calculate opacity based on distance from center (0)
      const dist = Math.abs(worldX);
      // Fade in fully if distance < 0.2, fade out fully if distance > 1.0
      let opacity = 1.0 - ((dist - 0.2) / 0.8);
      opacity = Math.max(0, Math.min(1, opacity));
      
      if (opacity > 0) {
        // Project 3D coordinate to 2D screen coordinate
        const worldPos = mesh.position.clone();
        
        // Add curve deformation logic so label tracks mesh exactly
        worldPos.y += Math.sin(worldX * config.curveFrequency) * config.curveStrength - config.curveStrength;
        worldPos.z += -Math.pow(Math.abs(worldX), 1.25) * config.depthCurveStrength;
        
        // Transform by group rotation/position
        worldPos.applyEuler(this.group.rotation);
        worldPos.add(this.group.position);
        
        // Project to screen space
        worldPos.project(this.camera);
        
        const screenX = (worldPos.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = -(worldPos.y * 0.5 - 0.5) * window.innerHeight;
        
        // Slight vertical drop when fading out
        const yOffset = (1 - opacity) * 30;
        
        label.style.opacity = opacity;
        label.style.transform = `translate3d(${screenX}px, ${screenY + yOffset}px, 0) translate(-50%, -50%)`;
      } else {
        label.style.opacity = 0;
      }
    });
    
    this.renderer.render(this.scene, this.camera);
  }

  onClick(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.meshes);
    
    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      const index = this.meshes.indexOf(mesh);
      if (index !== -1) {
        this.openDetailView(items[index]);
      }
    }
  }

  openDetailView(item) {
    if (this.isDetailOpen || !item.gridImages || item.gridImages.length === 0) return;
    this.isDetailOpen = true;
    
    this.detailTitle.innerText = `${item.name1} ${item.name2}`;
    this.detailDesc.innerText = item.description || '';
    
    // Build grid with natural sizes
    this.detailGrid.innerHTML = '';
    
    item.gridImages.forEach((imgSrc, i) => {
      const img = document.createElement('img');
      
      // Staggered load animation - MUST attach before setting src to handle cached images
      img.onload = () => {
        setTimeout(() => {
          img.classList.add('loaded');
          setTimeout(() => img.classList.add('scroll-ready'), 600);
        }, Math.min(i * 80, 800)); // Cap stagger delay
      };

      // Fallback in case of error (so it's not permanently invisible)
      img.onerror = () => {
        console.error("Failed to load image:", imgSrc);
        img.classList.add('loaded'); 
      };

      // Encode URI to handle spaces and special characters like '&'
      img.src = encodeURI(imgSrc);
      
      this.detailGrid.appendChild(img);
    });
    
    this.detailView.classList.remove('hidden');
    
    if (this.lenis) {
      this.lenis.start();
      this.lenis.scrollTo(0, { immediate: true });
    }
  }

  closeDetailView() {
    this.isDetailOpen = false;
    this.detailView.classList.add('hidden');
    
    if (this.lenis) {
      this.lenis.stop();
    }
    
    // Clear grid after transition
    setTimeout(() => {
      this.detailGrid.innerHTML = '';
      this.currentSkew = 0;
      this.targetSkew = 0;
    }, 500);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Slider3D();
});
