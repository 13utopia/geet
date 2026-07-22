document.addEventListener("DOMContentLoaded", (event) => {
  // 1. Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0, 0);

  // 2. Custom Cursor
  const cursorDot = document.getElementById('cursor-dot');
  
  // Set initial cursor position outside viewport
  gsap.set(cursorDot, { x: -100, y: -100 });

  window.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: "power2.out"
    });
  });

  // Scale cursor on interactables
  const interactables = document.querySelectorAll('a, button, .arrow-wrap');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursorDot, { scale: 3, duration: 0.3, ease: "power2.out", backgroundColor: "transparent", border: "1px solid var(--text-color)" });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursorDot, { scale: 1, duration: 0.3, ease: "power2.out", backgroundColor: "var(--text-color)", border: "none" });
    });
  });

  // 3. Magnetic Arrows
  const arrowWraps = document.querySelectorAll('.arrow-wrap');

  arrowWraps.forEach(wrap => {
    const arrow = wrap.querySelector('.magnetic-arrow');
    
    wrap.addEventListener('mouseenter', () => {
      gsap.to(arrow, { scale: 2, duration: 0.3, ease: "power2.out" });
    });

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(arrow, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    wrap.addEventListener('mouseleave', () => {
      gsap.to(arrow, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });

  // 4. Canvas Image Sequence Scrubbing
  const canvas = document.getElementById("packaging-canvas");
  const context = canvas.getContext("2d");

  const frameCount = 240; 
  const currentFrame = (index) => `Packaging/frames_nobg/frame_${String(index).padStart(4, '0')}.png`;

  const images = [];
  const sequenceConfig = {
    frame: 0
  };

  // Preload all images
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  // Draw image like object-fit: cover
  function render(frameIndex) {
    if (!images[frameIndex] || !images[frameIndex].complete) return;
    
    const img = images[frameIndex];
    context.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    
    render(sequenceConfig.frame);
  }
  
  window.addEventListener("resize", resizeCanvas);

  function setupScrubbing() {
    gsap.to(sequenceConfig, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".slider-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5 // 0.5s smoothing effect
      },
      onUpdate: () => render(sequenceConfig.frame)
    });
  }

  // Ensure first frame loads and renders, then setup scrub
  images[0].onload = () => {
    resizeCanvas();
    setupScrubbing();
  };

  // 5. Arrow click simulates video change
  const prevArrow = document.querySelector('.prev-arrow-wrap');
  const nextArrow = document.querySelector('.next-arrow-wrap');

  function simulateVideoChange() {
    gsap.to(canvas, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        lenis.scrollTo(0, { immediate: true });
        sequenceConfig.frame = 0;
        render(0);
        gsap.to(canvas, { opacity: 1, duration: 0.3 });
      }
    });
  }

  prevArrow.addEventListener('click', simulateVideoChange);
  nextArrow.addEventListener('click', simulateVideoChange);
});
