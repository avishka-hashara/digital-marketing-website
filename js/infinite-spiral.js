/**
 * infinite-spiral.js
 * Vanilla JS port of the React Bits InfiniteSpiral component.
 *
 * Usage:
 *   const spiral = initInfiniteSpiral(rootElement, options);
 *   // Later, if needed:
 *   spiral.destroy();
 */

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.initInfiniteSpiral = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : window, function () {

  /**
   * @param {HTMLElement} rootEl   - The container element (e.g. #hero-spiral)
   * @param {Object}      userOpts - Override options
   * @returns {{ destroy: Function }}
   */
  function initInfiniteSpiral(rootEl, userOpts) {

    /* ── Default options ── */
    const defaults = {
      animationMode: 'all',   // 'auto' | 'scroll' | 'drag' | 'all'
      speed: 0.5,             // auto-travel speed (progress units / second × 60)
      radius: 170,            // spiral radius (px)
      cardWidth: 130,
      cardHeight: 130,
      verticalSpacing: 70,    // vertical gap between cards (px)
      perspective: 1000,
      cardRadius: 16,
      centerScale: 1.2,       // scale of the front-centre card
      edgeBlur: 4,            // max blur (px) at back
      edgeFade: 0.3,          // min opacity at back (0–1)
      cardsPerTurn: 7,        // cards per full 360° rotation
      grayscale: 0,           // max grayscale at back (0–1)
      pauseOnHover: true,
    };

    const opts = Object.assign({}, defaults, userOpts);

    /* ── Items (cards) data – provided via rootEl dataset or constructed by JS ── */
    // Items are read from data-items attribute (JSON) OR from child elements with
    // class="is-card" that already exist in the DOM.
    // In our usage the JS caller creates them externally through opts.items.
    const items = opts.items || [];

    /* ── State ── */
    let progress = 0;
    let targetProgress = 0;
    let rafId = null;
    let isHovered = false;
    let isPaused = false;      // via IntersectionObserver
    let isDragging = false;
    let dragStartY = 0;
    let dragStartProgress = 0;
    let lastScrollY = window.pageYOffset;
    let lastTimestamp = null;
    let didDrag = false;       // click-suppression after drag
    const DRAG_THRESHOLD = 4; // px before we consider it a drag

    /* prefersReducedMotion */
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    motionQuery.addEventListener('change', e => { reducedMotion = e.matches; });

    /* ── Build DOM ── */
    rootEl.style.position = 'relative';
    rootEl.style.overflow = 'hidden';
    rootEl.style.touchAction = 'pan-y';

    const scene = document.createElement('div');
    scene.className = 'is-scene';
    scene.style.perspective = opts.perspective + 'px';
    rootEl.appendChild(scene);

    /* Create card elements */
    const cardEls = items.map((item, i) => {
      const a = document.createElement('a');
      a.className = 'is-card';
      a.href = item.href || '#';
      a.setAttribute('aria-label', item.label || '');
      a.style.width  = opts.cardWidth  + 'px';
      a.style.height = opts.cardHeight + 'px';
      a.style.borderRadius = opts.cardRadius + 'px';

      /* Icon wrapper */
      const iconWrap = document.createElement('div');
      iconWrap.className = 'is-card__icon';
      iconWrap.style.background = item.iconBg || 'rgba(255,127,109,0.1)';
      iconWrap.innerHTML = item.icon || '';
      a.appendChild(iconWrap);

      /* Label */
      const label = document.createElement('div');
      label.className = 'is-card__label';
      label.textContent = item.label || '';
      a.appendChild(label);

      scene.appendChild(a);
      return a;
    });

    const N = cardEls.length;

    /* ── Responsive scale factor ── */
    function getScaleFactor() {
      const w = rootEl.clientWidth;
      if (w < 400) return 0.65;
      if (w < 640) return 0.75;
      if (w < 900) return 0.85;
      return 1;
    }

    /* ── Position a single card ── */
    function positionCard(el, index, prog) {
      const scaleFactor = getScaleFactor();
      const radius      = opts.radius * scaleFactor;
      const vSpacing    = opts.verticalSpacing * scaleFactor;
      const cW          = opts.cardWidth  * scaleFactor;
      const cH          = opts.cardHeight * scaleFactor;

      /* Each card lives at a wrapped offset from progress so the list loops
         infinitely.  We compute the raw offset then fold it into the window
         [-N/2, N/2) so cards re-enter from the opposite end of the spiral. */
      let offset = ((index - prog) % N + N) % N; // always [0, N)
      if (offset >= N / 2) offset -= N;           // re-centre to [-N/2, N/2)

      /* Map offset → angle in radians (one full turn = cardsPerTurn cards) */
      const angle = (offset / opts.cardsPerTurn) * Math.PI * 2;

      /* 3-D coordinates */
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = offset * vSpacing;

      /* Depth normalised -1…1 (front = +1) */
      const depth = z / radius; // cos(angle)

      /* Scale */
      const scaleRange = opts.centerScale - 1;
      const scale = 1 + depth * scaleRange;

      /* Opacity */
      const opacity = opts.edgeFade + (1 - opts.edgeFade) * ((depth + 1) / 2);

      /* Blur */
      const blurAmt = opts.edgeBlur * ((1 - depth) / 2);

      /* Grayscale */
      const grayAmt = opts.grayscale * ((1 - depth) / 2);

      /* z-index: front cards on top */
      const zIdx = Math.round(100 + depth * 100);

      /* Apply */
      el.style.width  = cW + 'px';
      el.style.height = cH + 'px';
      el.style.zIndex = zIdx;
      el.style.opacity = opacity.toFixed(3);

      const filterParts = [];
      if (blurAmt > 0.01) filterParts.push(`blur(${blurAmt.toFixed(2)}px)`);
      if (grayAmt > 0.01) filterParts.push(`grayscale(${(grayAmt * 100).toFixed(1)}%)`);
      el.style.filter = filterParts.join(' ') || 'none';

      el.style.transform =
        `translate(-50%, -50%) ` +
        `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) ` +
        `scale(${scale.toFixed(4)})`;
    }

    /* ── Render all cards ── */
    function render() {
      cardEls.forEach((el, i) => positionCard(el, i, progress));
    }

    /* ── Animation loop ── */
    function animate(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1); // seconds, capped
      lastTimestamp = timestamp;

      /* Auto-travel */
      if (!reducedMotion && !isDragging) {
        const modes = opts.animationMode === 'all'
          ? ['auto', 'scroll']
          : [opts.animationMode];

        if (modes.includes('auto') && !isHovered) {
          targetProgress += opts.speed * dt;
        }

        if (modes.includes('scroll') || opts.animationMode === 'all') {
          const scrollDelta = window.pageYOffset - lastScrollY;
          lastScrollY = window.pageYOffset;
          // Map scroll delta to progress: 1px scroll ≈ 0.005 progress
          targetProgress += scrollDelta * 0.005;
        }
      }

      /* Easing towards target */
      const ease = 0.1;
      progress += (targetProgress - progress) * ease;

      render();

      rafId = requestAnimationFrame(animate);
    }

    /* ── Start / stop RAF ── */
    function startRAF() {
      if (!rafId) {
        lastTimestamp = null;
        rafId = requestAnimationFrame(animate);
      }
    }

    function stopRAF() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    /* ── Hover ── */
    if (opts.pauseOnHover) {
      rootEl.addEventListener('mouseenter', () => { isHovered = true; });
      rootEl.addEventListener('mouseleave', () => { isHovered = false; });
    }

    /* ── Drag (pointer) ── */
    function onPointerDown(e) {
      isDragging = true;
      didDrag = false;
      dragStartY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      dragStartProgress = targetProgress;
      rootEl.setPointerCapture?.(e.pointerId);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      const dy = clientY - dragStartY;
      if (Math.abs(dy) > DRAG_THRESHOLD) didDrag = true;
      // Drag up → spiral goes forward; drag down → backward
      targetProgress = dragStartProgress - dy * 0.01;
    }

    function onPointerUp() {
      isDragging = false;
    }

    rootEl.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    /* ── Click suppression after drag ── */
    rootEl.addEventListener('click', function (e) {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        didDrag = false;
      }
    }, true);

    /* ── Scroll influence (window scroll) ── */
    // Already handled inside the animation loop to stay in sync with RAF.

    /* ── IntersectionObserver (pause off-screen) ── */
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startRAF();
        } else {
          stopRAF();
        }
      });
    }, { threshold: 0 });
    io.observe(rootEl);

    /* ── ResizeObserver ── */
    const ro = new ResizeObserver(() => {
      // Force an immediate render on resize so cards reposition instantly.
      render();
    });
    ro.observe(rootEl);

    /* ── Initial render ── */
    render();
    // RAF will be started by IntersectionObserver when visible.
    // But also start it right away in case observer fires async.
    startRAF();

    /* ── Destroy ── */
    function destroy() {
      stopRAF();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      scene.remove();
    }

    return { destroy };
  }

  return initInfiniteSpiral;
}));
