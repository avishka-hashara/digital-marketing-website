/**
 * blur-text.js
 * Vanilla JS port of the React Bits BlurText component.
 * Uses the Web Animations API. No dependencies.
 *
 * Usage:
 *   initBlurText(document.querySelector('h1.my-heading'), {
 *     delay: 150,        // ms between each word
 *     stepDuration: 0.35 // seconds per half-step
 *   });
 */

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.initBlurText = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : window, function () {

  /**
   * @param {HTMLElement} el    - The heading element to animate
   * @param {Object}      opts  - Options (all optional)
   */
  function initBlurText(el, opts) {
    if (!el) return;

    /* ── Defaults ── */
    var defaults = {
      delay:               150,   // ms stagger between words
      stepDuration:        0.35,  // seconds for each half-step (total = stepDuration*2 s)
      direction:           'top', // 'top' | 'bottom'
      threshold:           0.1,
      rootMargin:          '0px',
      onAnimationComplete: null,
      animateBy:           'words'
    };
    var o = Object.assign({}, defaults, opts);

    /* ── Reduced-motion check ── */
    var reducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Accessibility: set aria-label to full plain text ── */
    var plainText = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', plainText);

    /* ── Find & replace the inline underline SVG with a CSS ::after ── */
    // The coral span currently contains an <svg> child that draws the wavy underline.
    // We remove it and use the ::after pseudo-element from blur-text.css instead.
    var coralSpan = el.querySelector('span.text-bloom-coral');
    if (coralSpan) {
      // Add our marker class so ::after styles apply
      coralSpan.classList.add('blur-text__coral-span');
      // Remove the inline SVG underline (it's the first/only <svg> child)
      var inlineSvg = coralSpan.querySelector('svg');
      if (inlineSvg) {
        inlineSvg.remove();
      }
    }

    /* ── Word-splitting helper ── */
    /**
     * Splits text nodes inside a container into word <span>s,
     * preserving any child element nodes (like <svg> or nested <span>s).
     * Returns the flat array of word span elements created.
     */
    function splitTextNode(textNode, wordSpans) {
      var text = textNode.textContent;
      // Split on spaces while keeping the delimiter accessible
      var parts = text.split(/( +)/);
      var frag = document.createDocumentFragment();

      parts.forEach(function (part) {
        if (!part) return;
        if (/^ +$/.test(part)) {
          // Pure whitespace – insert as a text node to preserve natural spacing
          frag.appendChild(document.createTextNode(part));
        } else {
          // A real word token
          var span = document.createElement('span');
          span.className = 'blur-text__word';
          span.setAttribute('aria-hidden', 'true');
          span.textContent = part;
          wordSpans.push(span);
          frag.appendChild(span);
        }
      });

      textNode.parentNode.replaceChild(frag, textNode);
    }

    /**
     * Recursively walk child nodes of `container`.
     * Split TEXT nodes; leave element nodes alone (but recurse into them).
     * Returns an array of all .blur-text__word spans created.
     */
    function walkAndSplit(container, wordSpans) {
      // Take a snapshot of child nodes before we start mutating
      var children = Array.prototype.slice.call(container.childNodes);
      children.forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            splitTextNode(node, wordSpans);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Recurse into element children (e.g. the coral span)
          walkAndSplit(node, wordSpans);
        }
      });
      return wordSpans;
    }

    var wordSpans = walkAndSplit(el, []);

    /* ── If reduced-motion, show everything and bail ── */
    if (reducedMotion) {
      wordSpans.forEach(function (w) {
        w.style.opacity  = '1';
        w.style.filter   = 'none';
        w.style.transform = 'none';
      });
      if (coralSpan) {
        coralSpan.classList.add('underline-revealed');
        coralSpan.style.setProperty('--underline-scale', '1');
        // Immediately show underline via direct style
        var after = window.getComputedStyle(coralSpan, '::after');
        coralSpan.style.cssText += ''; // trigger repaint if needed
        // Apply scaleX(1) via direct ::after manipulation (not possible via JS);
        // instead we add a class and handle it in CSS.
        // The @media (prefers-reduced-motion) rule in CSS already sets scaleX(1).
      }
      if (typeof o.onAnimationComplete === 'function') {
        o.onAnimationComplete();
      }
      return;
    }

    /* ── Keyframes ── */
    var translateIn  = o.direction === 'bottom' ? '50px'  : '-50px';
    var translateMid = o.direction === 'bottom' ? '-5px'  : '5px';

    var keyframes = [
      { filter: 'blur(10px)', opacity: 0,   transform: 'translateY(' + translateIn  + ')', offset: 0   },
      { filter: 'blur(5px)',  opacity: 0.5, transform: 'translateY(' + translateMid + ')', offset: 0.5 },
      { filter: 'blur(0px)',  opacity: 1,   transform: 'translateY(0)',                    offset: 1   }
    ];

    var totalDuration = o.stepDuration * 2 * 1000; // ms

    /* ── Function that actually starts the animations ── */
    function startAnimation() {
      var lastIndex = wordSpans.length - 1;

      wordSpans.forEach(function (word, index) {
        var anim = word.animate(keyframes, {
          duration: totalDuration,
          delay:    index * o.delay,
          easing:   'linear',
          fill:     'both'
        });

        // After the last word, animate the underline
        if (index === lastIndex) {
          anim.addEventListener('finish', function () {
            revealUnderline();
            if (typeof o.onAnimationComplete === 'function') {
              o.onAnimationComplete();
            }
          });
        }
      });
    }

    /* ── Underline reveal ── */
    function revealUnderline() {
      if (!coralSpan) return;
      coralSpan.classList.add('underline-revealed');

      // We can't animate ::after directly with the Web Animations API,
      // so we use a tiny real element inserted as the last child of coralSpan.
      var underlineEl = document.createElement('span');
      underlineEl.style.cssText = [
        'position:absolute',
        'left:0',
        'bottom:-6px',
        'width:100%',
        'height:3px',
        'background:currentColor',
        'opacity:0.2',
        'border-radius:2px',
        'pointer-events:none',
        'display:block',
        'transform-origin:left center'
      ].join(';');
      coralSpan.appendChild(underlineEl);

      underlineEl.animate(
        [
          { transform: 'scaleX(0)' },
          { transform: 'scaleX(1)' }
        ],
        {
          duration: 500,
          easing:   'ease-out',
          fill:     'both'
        }
      );
    }

    /* ── IntersectionObserver trigger ── */
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          startAnimation();
        }
      });
    }, {
      threshold:  o.threshold,
      rootMargin: o.rootMargin
    });

    io.observe(el);
  }

  return initBlurText;
}));
