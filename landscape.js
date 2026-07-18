// Original data
const originalItems = [
  {
    "id": "13utopia",
    "img": "website/13utopia.webp",
    "websiteUrl": "https://13utopia.com/",
    "name1": "13utopia",
    "name2": "",
    "description": "Website preview for 13utopia",
    "gridImages": []
  },
  {
    "id": "thedietdiary",
    "img": "website/thedietdiary.in.webp",
    "websiteUrl": "https://thedietdiary.in/",
    "name1": "The Diet",
    "name2": "Diary",
    "description": "Website preview for The Diet Diary",
    "gridImages": []
  },
  {
    "id": "lotusimpex",
    "img": "website/lotusimpex.co.in.webp",
    "websiteUrl": "https://lotusimpex.co.in/",
    "name1": "Lotus",
    "name2": "Impex",
    "description": "Website preview for Lotus Impex",
    "gridImages": []
  },
  {
    "id": "taowater",
    "img": "website/taowater.13utopiabizboost.com.webp",
    "websiteUrl": "https://taowater.13utopiabizboost.com/",
    "name1": "Tao",
    "name2": "Water",
    "description": "Website preview for Tao Water",
    "gridImages": []
  },
  {
    "id": "swaadus",
    "img": "website/swaadus.com.webp",
    "websiteUrl": "https://swaadus.com/",
    "name1": "Swaadus",
    "name2": "",
    "description": "Website preview for Swaadus",
    "gridImages": []
  },
  {
    "id": "13utopiabizboost",
    "img": "website/13utopiabizboost.com.webp",
    "websiteUrl": "https://13utopiabizboost.com/",
    "name1": "Biz",
    "name2": "Boost",
    "description": "Website preview for 13utopia BizBoost",
    "gridImages": []
  },
  {
    "id": "kumarcotton",
    "img": "website/kumarcotton.com.webp",
    "websiteUrl": "https://kumarcotton.com/",
    "name1": "Kumar",
    "name2": "Cotton",
    "description": "Website preview for Kumar Cotton",
    "gridImages": []
  },
  {
    "id": "tanyadentalhouse",
    "img": "website/tanyadentalhouse.in.webp",
    "websiteUrl": "https://tanyadentalhouse.in/",
    "name1": "Tanya",
    "name2": "Dental",
    "description": "Website preview for Tanya Dental House",
    "gridImages": []
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
  wheelFactor: 3.5,          // INCREASED: Faster mouse wheel spin
  wheelDirection: -1,
  cameraPosition: [0, 0, 5.0],
  velocityDecay: 0.95,
  maxVelocity: 80,           // INCREASED: Higher max speed cap
  itemWidth: 2.0,
  itemHeight: 1.125,
  touchDragFactor: 0.08,     // INCREASED: Faster touch/drag spin
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
    
    // Animation State
    this.selectedMesh = null;
    this.hoveredMesh = null;
    this.animProgress = 0;
    this.introProgress = 0.0;
    this.isAnimatingToIframe = false;
    this.isAnimatingFromIframe = false;
    
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
    
    // Bind Iframe Lightbox
    this.iframeLightbox = document.getElementById('iframe-lightbox');
    this.iframeContainer = this.iframeLightbox.querySelector('.iframe-lightbox__content');
    this.closeIframeBtn = document.getElementById('close-iframe');
    
    // Map to store preloaded iframes
    this.iframes = {};
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeDetailView());
    }
    if (this.closeIframeBtn) {
      this.closeIframeBtn.addEventListener('click', () => this.closeIframeView());
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
      uniform float uTextureAspect;
      uniform float uMeshAspect;
      uniform float uBlurAmount;
      uniform float uAberration;
      uniform float uHoverState;
      varying vec2 vUv;
      
      // SDF for a rounded box
      float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
          return length(max(abs(CenterPosition) - Size + Radius, 0.0)) - Radius;
      }
      
      // 9-tap Gaussian blur helper
      vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
        vec4 color = vec4(0.0);
        vec2 off1 = vec2(1.3846153846) * direction;
        vec2 off2 = vec2(3.2307692308) * direction;
        color += texture2D(image, uv) * 0.2270270270;
        color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
        color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
        color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
        color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
        return color;
      }
      
      void main() {
        vec2 baseUv = vUv;
        // Inner zoom effect on hover
        if (uHoverState > 0.0) {
            baseUv = (baseUv - 0.5) * (1.0 - uHoverState * 0.03) + 0.5;
        }
        
        vec2 uvCropped = baseUv - 0.5;
        // Dynamic object-fit: cover logic
        if (uTextureAspect > uMeshAspect) {
           uvCropped.x *= uMeshAspect / uTextureAspect;
        } else {
           uvCropped.y *= uTextureAspect / uMeshAspect;
        }
        uvCropped += 0.5;
        
        vec2 uvPixelated = uvCropped;
        
        // Chromatic Aberration & Blur
        vec4 texColor = vec4(0.0);
        if (uBlurAmount > 0.0 || uAberration > 0.0) {
            vec2 res = vec2(1000.0, 1000.0); 
            
            vec4 cR = blur9(tDiffuse, uvPixelated - vec2(uAberration, 0.0), res, vec2(uBlurAmount, uBlurAmount));
            vec4 cG = blur9(tDiffuse, uvPixelated, res, vec2(uBlurAmount, uBlurAmount));
            vec4 cB = blur9(tDiffuse, uvPixelated + vec2(uAberration, 0.0), res, vec2(uBlurAmount, uBlurAmount));
            
            texColor = vec4(cR.r, cG.g, cB.b, cG.a);
        } else {
            texColor = texture2D(tDiffuse, uvPixelated);
        }
        
        // Darken back images
        if (uFrontFactor < 0.6) {
            texColor.rgb *= 0.4 + max(0.0, uFrontFactor) * 0.6;
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
      const uniforms = {
        tDiffuse: { value: null },
        uRadius: { value: config.baseRadius },
        uOpacity: { value: 1.0 },
        uFrontFactor: { value: 1.0 },
        uTextureAspect: { value: 1.0 },
        uMeshAspect: { value: config.itemWidth / config.itemHeight },
        uBlurAmount: { value: 0.0 },
        uAberration: { value: 0.0 },
        uHoverState: { value: 0.0 }
      };

      uniforms.tDiffuse.value = textureLoader.load(item.img, (tex) => {
        if (tex.image && tex.image.width) {
          uniforms.uTextureAspect.value = tex.image.width / tex.image.height;
        }
      });
      
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: uniforms,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.url = item.websiteUrl;
      
      this.meshes.push(mesh);
      this.group.add(mesh);
      
      // Preload iframe if it has a websiteUrl
      if (item.websiteUrl && !this.iframes[item.websiteUrl]) {
          const iframe = document.createElement('iframe');
          iframe.src = item.websiteUrl;
          iframe.frameBorder = "0";
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.display = "none";
          iframe.style.border = "none";
          this.iframeContainer.appendChild(iframe);
          this.iframes[item.websiteUrl] = iframe;
      }
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
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      if (this.isDragging) {
        // Allow both X and Y dragging to spin the tornado
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        const dragAmount = dx - dy; // Dragging left or up spins it one way
        
        this.dragDistance += Math.abs(dx) + Math.abs(dy);
        this.velocity -= dragAmount * config.touchDragFactor;
        
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.lastTime = performance.now();
      } else if (!this.isDetailOpen && !this.selectedMesh) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.meshes);
        if (intersects.length > 0) {
            this.hoveredMesh = intersects[0].object;
            document.body.style.cursor = 'pointer';
        } else {
            this.hoveredMesh = null;
            document.body.style.cursor = 'default';
        }
      }
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
    
    // Stop completely if very slow, or drastically if a mesh is selected
    if (this.selectedMesh || this.isDetailOpen) {
      this.velocity *= 0.5;
    }
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
    
    if (this.introProgress < 1.0) {
        this.introProgress += 0.008; // Intro animation speed
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
      
      let tX = Math.sin(angle) * r;
      let tZ = Math.cos(angle) * r - config.baseRadius;
      let tY = y;
      
      // Aerodynamic Pitch based on scroll speed (clamped to max 30 degrees)
      // Removing the Z-tilt as it breaks the cylinder structure
      let tiltX = Math.max(-0.5, Math.min(0.5, this.velocity * 0.01)); 
      
      let tRotX = y * 0.15 + tiltX;
      let tRotY = angle;
      let tRotZ = 0.05 * Math.sin(angle);
      
      // Fly-in Entrance Animation
      let itemIntro = Math.min(1.0, Math.max(0.0, (this.introProgress - i * 0.02) * 5.0));
      let introEase = itemIntro === 1.0 ? 1.0 : 1.0 - Math.pow(2, -10 * itemIntro); // easeOutExpo
      
      tY = tY * introEase + (1.0 - introEase) * -15.0; // Fly up from bottom
      tRotX += (1.0 - introEase) * Math.PI; // Spin wildly while flying in
      
      // Hover Micro-interaction Lift
      if (mesh.userData.hoverState === undefined) mesh.userData.hoverState = 0.0;
      if (mesh === this.hoveredMesh) {
         mesh.userData.hoverState += (1.0 - mesh.userData.hoverState) * 0.15;
      } else {
         mesh.userData.hoverState += (0.0 - mesh.userData.hoverState) * 0.15;
      }
      let hover = mesh.userData.hoverState;
      tZ += hover * 0.4; // Lift towards camera
      
      let p = 0;
      if (mesh === this.selectedMesh) {
         if (this.isAnimatingToIframe) {
             this.animProgress += 0.025; // Animation speed
             if (this.animProgress >= 1) {
                 this.animProgress = 1;
                 this.isAnimatingToIframe = false;
                 this.openIframeView(mesh.userData.url);
             }
         } else if (this.isAnimatingFromIframe) {
             this.animProgress -= 0.025;
             if (this.animProgress <= 0) {
                 this.animProgress = 0;
                 this.isAnimatingFromIframe = false;
                 this.selectedMesh = null;
             }
         }
         p = this.animProgress;
      }
      
      // Easing function (easeInOutQuad)
      let ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      
      // Calculate dynamic scale to match the 90vw x 90vh iframe perfectly
      let targetZ = 3.3; 
      let dist = config.cameraPosition[2] - targetZ; 
      let vFov = (35 * Math.PI) / 180;
      let visibleHeight = 2.0 * dist * Math.tan(vFov / 2);
      let visibleWidth = visibleHeight * (window.innerWidth / window.innerHeight);
      
      let targetScaleX = (visibleWidth * 0.9) / config.itemWidth;
      let targetScaleY = (visibleHeight * 0.9) / config.itemHeight;
      
      mesh.scale.x = 1.0 + (targetScaleX - 1.0) * ease;
      mesh.scale.y = 1.0 + (targetScaleY - 1.0) * ease;
      
      // Interpolate position
      mesh.position.x = tX + (0 - tX) * ease;
      mesh.position.y = tY + (0 - tY) * ease;
      mesh.position.z = tZ + (targetZ - tZ) * ease;
      
      // Interpolate rotation to perfectly flat
      mesh.rotation.x = tRotX + (0 - tRotX) * ease;
      mesh.rotation.y = tRotY + (0 - tRotY) * ease;
      mesh.rotation.z = tRotZ + (0 - tRotZ) * ease;
      
      // Interpolate bend radius to flat
      let startInvR = 1.0 / config.baseRadius;
      let invR = startInvR * (1.0 - ease);
      let currentRadius = invR > 0.001 ? 1.0 / invR : 1000.0;
      mesh.material.uniforms.uRadius.value = currentRadius;
      
      // Fade out at the top and bottom bounds
      let distFromCenter = Math.abs(centeredT);
      let tOpacity = 1.0 - (distFromCenter / (totalItems / 2.5));
      tOpacity = Math.max(0, Math.min(1, tOpacity));
      
      // If expanding, opacity goes to 1 and it forces to the front
      mesh.material.uniforms.uOpacity.value = (tOpacity + (1.0 - tOpacity) * ease) * introEase;
      mesh.material.uniforms.uFrontFactor.value = Math.cos(angle) + (1.0 - Math.cos(angle)) * ease;
      
      // Hover and Polish Uniforms
      mesh.material.uniforms.uHoverState.value = hover;
      
      // Depth of Field (blur items in the back)
      let depthBlur = Math.max(0.0, 1.0 - Math.cos(angle) * 1.5);
      mesh.material.uniforms.uBlurAmount.value = depthBlur * 8.0 * introEase; 
      
      // Chromatic Aberration based on scroll speed
      mesh.material.uniforms.uAberration.value = Math.abs(this.velocity) * 0.003;
      
      // Render expanded mesh on top
      mesh.renderOrder = ease > 0 ? 999 : (hover > 0 ? 50 : 0);
    });
    
    this.renderer.render(this.scene, this.camera);
  }
  
  onClick(event) {
    if (this.isAnimatingToIframe || this.isAnimatingFromIframe || this.isDetailOpen) return;
    
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.meshes);
    
    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      const index = this.meshes.indexOf(mesh);
      if (index !== -1) {
        const item = items[index];
        if (item.websiteUrl) {
          this.selectedMesh = mesh;
          this.isAnimatingToIframe = true;
          this.animProgress = 0;
        } else {
          this.openDetailView(item);
        }
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

  openIframeView(url) {
    if (this.isDetailOpen) return;
    this.isDetailOpen = true;
    
    // Hide all iframes, then show the requested one
    Object.values(this.iframes).forEach(iframe => {
        iframe.style.display = 'none';
    });
    if (this.iframes[url]) {
        this.iframes[url].style.display = 'block';
    }
    
    this.iframeLightbox.classList.remove('hidden');
    document.querySelector('.header').classList.add('hidden');
  }

  closeIframeView() {
    this.isDetailOpen = false;
    this.iframeLightbox.classList.add('hidden');
    document.querySelector('.header').classList.remove('hidden');
    this.isAnimatingFromIframe = true;
    // We intentionally don't clear the src so it stays preloaded in the background
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TornadoSlider3D();
});
