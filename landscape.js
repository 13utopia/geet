// Original data
const originalItems = [
  {
    "id": "bas",
    "img": "Instagram/BAS/main.webp",
    "name1": "The",
    "name2": "BAS",
    "description": "A showcase of brand aesthetics and visual identity for BAS.",
    "gridImages": [
      "Instagram/BAS/imageye___-_imgi_15_702611919_17875332687656926_6306002636948471957_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_16_703222689_17875328646656926_8258969267493730849_n 1.webp",
      "Instagram/BAS/imageye___-_imgi_17_700944829_17874943077656926_7564662826366586197_n 1.webp"
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
      "Instagram/Chintamani Jewellers/3 1.webp"
    ]
  },
  {
    "id": "fujitech-express",
    "img": "Instagram/Fujitech Express/main.webp",
    "name1": "Fujitech",
    "name2": "Express",
    "description": "A showcase of brand aesthetics and visual identity for Fujitech Express.",
    "gridImages": [
      "Instagram/Fujitech Express/image (1) 1.webp",
      "Instagram/Fujitech Express/image (2) 1.webp",
      "Instagram/Fujitech Express/image (3) 1.webp"
    ]
  },
  {
    "id": "mayur-dairy-&-sweets",
    "img": "Instagram/Mayur dairy & sweets/main.webp",
    "name1": "Mayur",
    "name2": "Dairy",
    "description": "A showcase of brand aesthetics and visual identity for Mayur dairy & sweets.",
    "gridImages": [
      "Instagram/Mayur dairy & sweets/mayur bag 1 1.webp",
      "Instagram/Mayur dairy & sweets/mayur bag 2 1.webp",
      "Instagram/Mayur dairy & sweets/mayur bag 3 1.webp"
    ]
  },
  {
    "id": "tqs",
    "img": "Instagram/TQS/main.webp",
    "name1": "The",
    "name2": "TQS",
    "description": "A showcase of brand aesthetics and visual identity for TQS.",
    "gridImages": [
      "Instagram/TQS/TQS coaster (2) 1.webp",
      "Instagram/TQS/TQS coaster (4) 1.webp",
      "Instagram/TQS/tqs exhibition (1) 1.webp"
    ]
  }
];

// Duplicate items to create a longer tornado
const items = [];
for (let i = 0; i < 4; i++) {
  items.push(...originalItems);
}

const config = {
  angleStep: Math.PI * 0.25, // Tighter spiral (more items per loop)
  yStep: 0.4,                // Smaller vertical spacing
  baseRadius: 3.2,           // Base radius of the tornado
  radiusGrowth: 0.0,         
  wheelFactor: 2.0,
  wheelDirection: -1,
  cameraPosition: [0, 0, 5.0],
  velocityDecay: 0.95,
  maxVelocity: 50,
  itemWidth: 2.0,
  itemHeight: 1.125,
  touchDragFactor: 0.05,
  touchMomentumScale: 40
};

class TornadoSlider3D {
  constructor() {
    this.canvas = document.querySelector('#gallery-canvas');
    this.scene = new THREE.Scene();
    
    // Setup Camera
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 100);
    this.camera.position.set(...config.cameraPosition);
    
    // Setup Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Group for tornado
    this.group = new THREE.Group();
    // Keep group flat, tilt is handled per-item
    this.group.rotation.set(0, 0, 0);
    this.scene.add(this.group);
    
    this.meshes = [];
    
    // Physics / Scroll State
    this.scrollPosition = 0;
    this.velocity = 0;
    
    // Interaction State
    this.isDragging = false;
    this.lastX = 0;
    this.lastY = 0;
    this.lastTime = 0;
    this.dragDistance = 0;
    
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
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeDetailView());
    }
    
    this.init();
    this.addEvents();
    this.animate();
  }
  
  init() {
    const textureLoader = new THREE.TextureLoader();
    const vertexShader = `
      uniform float uRadius;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        
        // Bend the plane around the Y axis
        float angle = position.x / uRadius;
        vec3 deformedPosition = position;
        deformedPosition.x = sin(angle) * uRadius;
        deformedPosition.z = cos(angle) * uRadius - uRadius;
        
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(deformedPosition, 1.0);
      }
    `;
    
    const fragmentShader = `
      uniform sampler2D tDiffuse;
      uniform float uOpacity;
      uniform float uFrontFactor;
      varying vec2 vUv;
      
      // SDF for a rounded box
      float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
          return length(max(abs(CenterPosition) - Size + Radius, 0.0)) - Radius;
      }
      
      void main() {
        vec2 uvCropped = vUv;
        // Scale UV Y axis by height/width to crop square image to 16:9 without stretching
        uvCropped.y = (vUv.y - 0.5) * 0.5625 + 0.5;
        
        // Pixelation effect for back images
        float pixelSize = 1.0;
        if (uFrontFactor < 0.6) {
            pixelSize = 1.0 + (0.6 - uFrontFactor) * 30.0;
        }
        
        vec2 uvPixelated = uvCropped;
        if (pixelSize > 1.0) {
            vec2 res = vec2(800.0, 800.0);
            uvPixelated = floor(uvCropped * res / pixelSize) * pixelSize / res;
        }
        
        vec4 texColor = texture2D(tDiffuse, uvPixelated);
        
        // Darken back images
        if (uFrontFactor < 0.6) {
            texColor.rgb *= 0.15 + max(0.0, uFrontFactor) * 0.8;
        }
        
        // Calculate rounded corners
        vec2 pos = vUv - 0.5;
        pos.x *= 1.777; // Adjust for 16:9 aspect ratio
        vec2 size = vec2(0.5 * 1.777, 0.5);
        float radius = 0.08; // Corner radius
        
        float distance = roundedBoxSDF(pos, size, radius);
        float alpha = smoothstep(0.005, -0.005, distance); // Anti-aliased edge
        
        gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity * alpha);
      }
    `;
    
    // Geometry with horizontal segments to allow smooth bending
    const geometry = new THREE.PlaneGeometry(config.itemWidth, config.itemHeight, 32, 2);
    
    items.forEach((item, index) => {
      const texture = textureLoader.load(item.img);
      
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          tDiffuse: { value: texture },
          uRadius: { value: config.baseRadius },
          uOpacity: { value: 1.0 },
          uFrontFactor: { value: 1.0 }
        },
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      this.meshes.push(mesh);
      this.group.add(mesh);
    });
  }
  
  addEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    
    // Wheel scroll
    window.addEventListener('wheel', (e) => {
      this.velocity += e.deltaY * config.wheelFactor * 0.005;
      this.velocity = Math.max(-config.maxVelocity, Math.min(config.maxVelocity, this.velocity));
      
      const hint = document.getElementById('scroll-hint');
      if (hint) hint.classList.add('hidden');
    }, { passive: true });
    
    // Touch / Pointer Drag
    this.canvas.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.lastTime = performance.now();
      this.dragDistance = 0;
      
      const hint = document.getElementById('scroll-hint');
      if (hint) hint.classList.add('hidden');
    });
    
    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      
      // Allow both X and Y dragging to spin the tornado
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      const dragAmount = dx - dy; // Dragging left or up spins it one way
      
      this.dragDistance += Math.abs(dx) + Math.abs(dy);
      this.velocity -= dragAmount * config.touchDragFactor;
      
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.lastTime = performance.now();
    });
    
    window.addEventListener('pointerup', (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      
      // Calculate flick momentum
      const timeDiff = performance.now() - this.lastTime;
      if (timeDiff < 100) {
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        const dragAmount = dx - dy;
        this.velocity -= dragAmount * config.touchDragFactor * config.touchMomentumScale;
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
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // Momentum / Velocity decay
    this.velocity *= config.velocityDecay;
    
    // Stop completely if very slow
    if (Math.abs(this.velocity) < 0.01) {
      this.velocity = 0;
    }
    
    // Apply velocity to scroll position
    this.scrollPosition += this.velocity * 0.01 * config.wheelDirection;
    
    const totalItems = this.meshes.length;
    
    // Update counter
    const counterEl = document.getElementById('counter');
    if (counterEl) {
      // Find the item closest to center
      let centerIndex = Math.round(-this.scrollPosition) % totalItems;
      if (centerIndex < 0) centerIndex += totalItems;
      counterEl.innerText = `${(centerIndex + 1).toString().padStart(2, '0')} / ${totalItems}`;
    }
    
    this.meshes.forEach((mesh, i) => {
      // Continuous index mapped around the scroll position
      let t = (i + this.scrollPosition);
      // Wrap t into [0, totalItems)
      t = ((t % totalItems) + totalItems) % totalItems;
      
      // Center t around 0 so it goes from -10 to +10 (for 20 items)
      let centeredT = t - totalItems / 2; 
      
      // Map to height and angle based on center to ensure perfect front alignment
      let y = centeredT * config.yStep;
      let angle = centeredT * config.angleStep;
      
      // Radius can increase as it goes up (tornado effect)
      let r = config.baseRadius + y * config.radiusGrowth;
      // Pass the local radius to the shader so the bend matches the placement
      mesh.material.uniforms.uRadius.value = Math.max(0.1, r);
      
      // Position on the cylinder
      mesh.position.x = Math.sin(angle) * r;
      mesh.position.z = Math.cos(angle) * r - config.baseRadius; // Shift center so front is near 0
      mesh.position.y = y;
      
      // Face outward
      mesh.rotation.y = angle;
      // Pitch dynamically based on Y position (tilt at ends, flat in center)
      mesh.rotation.x = y * 0.15;
      mesh.rotation.z = 0.05 * Math.sin(angle); // slight roll effect based on position
      
      // Fade out at the top and bottom bounds
      let distFromCenter = Math.abs(centeredT);
      let opacity = 1.0 - (distFromCenter / (totalItems / 2.5));
      opacity = Math.max(0, Math.min(1, opacity));
      
      // Apply uniforms
      mesh.material.uniforms.uOpacity.value = opacity;
      mesh.material.uniforms.uFrontFactor.value = Math.cos(angle);
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
      img.onload = () => {
        setTimeout(() => {
          img.classList.add('loaded');
          setTimeout(() => img.classList.add('scroll-ready'), 600);
        }, Math.min(i * 80, 800));
      };
      img.onerror = () => {
        img.classList.add('loaded'); 
      };
      img.src = encodeURI(imgSrc);
      this.detailGrid.appendChild(img);
    });
    
    this.detailView.classList.remove('hidden');
  }

  closeDetailView() {
    this.isDetailOpen = false;
    this.detailView.classList.add('hidden');
    
    setTimeout(() => {
      this.detailGrid.innerHTML = '';
    }, 500);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TornadoSlider3D();
});
