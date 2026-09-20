import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './LightPillar.css';

const LightPillar = ({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  className = '',
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = 'screen',
  pillarRotation = 0,
  quality = 'high',
  lightMode = false
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const geometryRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const timeRef = useRef(0);
  const rotationSpeedRef = useRef(rotationSpeed);
  const isVisibleRef = useRef(true);
  const isTabActiveRef = useRef(true);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    let isCancelled = false;
    let observer = null;
    let idleId = null;
    let timeoutId = null;

    const initWebGL = () => {
      if (isCancelled || !containerRef.current) return;

      const container = containerRef.current;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      sceneRef.current = scene;
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      cameraRef.current = camera;

      const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEndDevice = isMobile || (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

      let effectiveQuality = quality;
      if (isLowEndDevice && quality === 'high') effectiveQuality = 'medium';
      if (isMobile && quality !== 'low') effectiveQuality = 'low';

      const qualitySettings = {
        low: { iterations: 24, waveIterations: 1, pixelRatio: 0.5, precision: 'mediump', stepMultiplier: 1.5 },
        medium: { iterations: 40, waveIterations: 2, pixelRatio: 0.65, precision: 'mediump', stepMultiplier: 1.2 },
        high: {
          iterations: 80,
          waveIterations: 4,
          pixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
          precision: 'highp',
          stepMultiplier: 1.0
        }
      };

      const settings = qualitySettings[effectiveQuality] || qualitySettings.medium;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
          powerPreference: effectiveQuality === 'high' ? 'high-performance' : 'low-power',
          precision: settings.precision,
          stencil: false,
          depth: false
        });
      } catch (error) {
        setWebGLSupported(false);
        return;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(settings.pixelRatio);

      // Clean up any existing canvas in container before attaching
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const parseColor = hex => {
        const color = new THREE.Color(hex);
        return new THREE.Vector3(color.r, color.g, color.b);
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision ${settings.precision} float;

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        uniform float uIntensity;
        uniform bool uInteractive;
        uniform float uGlowAmount;
        uniform float uPillarWidth;
        uniform float uPillarHeight;
        uniform float uNoiseIntensity;
        uniform float uLightMode;
        uniform float uRotCos;
        uniform float uRotSin;
        uniform float uPillarRotCos;
        uniform float uPillarRotSin;
        uniform float uWaveSin;
        uniform float uWaveCos;
        varying vec2 vUv;

        const float STEP_MULT = ${settings.stepMultiplier.toFixed(1)};
        const int MAX_ITER = ${settings.iterations};
        const int WAVE_ITER = ${settings.waveIterations};

        void main() {
          vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
          uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y, uPillarRotSin * uv.x + uPillarRotCos * uv.y);

          vec3 ro = vec3(0.0, 0.0, -10.0);
          vec3 rd = normalize(vec3(uv, 1.0));

          float rotC = uRotCos;
          float rotS = uRotSin;
          if(uInteractive && (uMouse.x != 0.0 || uMouse.y != 0.0)) {
            float a = uMouse.x * 6.283185;
            rotC = cos(a);
            rotS = sin(a);
          }

          vec3 col = vec3(0.0);
          float t = 0.1;
          
          for(int i = 0; i < MAX_ITER; i++) {
            vec3 p = ro + rd * t;
            p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

            vec3 q = p;
            q.y = p.y * uPillarHeight + uTime;
            
            float freq = 1.0;
            float amp = 1.0;
            for(int j = 0; j < WAVE_ITER; j++) {
              q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
              q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
              freq *= 2.0;
              amp *= 0.5;
            }
            
            float d = length(cos(q.xz)) - 0.2;
            float bound = length(p.xz) - uPillarWidth;
            float k = 4.0;
            float h = max(k - abs(d - bound), 0.0);
            d = max(d, bound) + h * h * 0.0625 / k;
            d = abs(d) * 0.15 + 0.01;

            float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
            col += mix(uBottomColor, uTopColor, grad) / d;

            t += d * STEP_MULT;
            if(t > 50.0) break;
          }

          float widthNorm = uPillarWidth / 3.0;
          col = tanh(col * uGlowAmount / widthNorm);
          
          col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;
          
          vec3 result = clamp(col * uIntensity, 0.0, 1.0);
          if (uLightMode > 0.5) {
            float energy = max(result.r, max(result.g, result.b));
            vec3 hue = result / max(energy, 0.001);
            float coverage = smoothstep(0.025, 0.95, energy);
            hue = pow(clamp(hue, 0.0, 1.0), vec3(1.25));
            result = mix(vec3(1.0), hue, coverage * 0.94);
          }
          gl_FragColor = vec4(result, 1.0);
        }
      `;

      const pillarRotRad = (pillarRotation * Math.PI) / 180;
      const waveSin = Math.sin(0.4);
      const waveCos = Math.cos(0.4);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uMouse: { value: mouseRef.current },
          uTopColor: { value: parseColor(topColor) },
          uBottomColor: { value: parseColor(bottomColor) },
          uIntensity: { value: intensity },
          uInteractive: { value: interactive },
          uGlowAmount: { value: glowAmount },
          uPillarWidth: { value: pillarWidth },
          uPillarHeight: { value: pillarHeight },
          uNoiseIntensity: { value: noiseIntensity },
          uLightMode: { value: lightMode ? 1 : 0 },
          uRotCos: { value: 1.0 },
          uRotSin: { value: 0.0 },
          uPillarRotCos: { value: Math.cos(pillarRotRad) },
          uPillarRotSin: { value: Math.sin(pillarRotRad) },
          uWaveSin: { value: waveSin },
          uWaveCos: { value: waveCos }
        },
        transparent: true,
        depthWrite: false,
        depthTest: false
      });
      materialRef.current = material;

      const geometry = new THREE.PlaneGeometry(2, 2);
      geometryRef.current = geometry;
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const renderSingleFrame = () => {
        if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        const t = timeRef.current;
        materialRef.current.uniforms.uTime.value = t;
        materialRef.current.uniforms.uRotCos.value = Math.cos(t * 0.3);
        materialRef.current.uniforms.uRotSin.value = Math.sin(t * 0.3);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };

      let lastTime = performance.now();
      const targetFPS = effectiveQuality === 'low' ? 30 : 60;
      const frameTime = 1000 / targetFPS;

      const startAnimation = () => {
        if (rafRef.current) return;
        if (prefersReducedMotion) {
          renderSingleFrame();
          return;
        }

        lastTime = performance.now();
        const animate = currentTime => {
          if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

          if (isVisibleRef.current && isTabActiveRef.current) {
            const deltaTime = currentTime - lastTime;
            if (deltaTime >= frameTime) {
              timeRef.current += 0.016 * rotationSpeedRef.current;
              renderSingleFrame();
              lastTime = currentTime - (deltaTime % frameTime);
            }
            rafRef.current = requestAnimationFrame(animate);
          } else {
            rafRef.current = null;
          }
        };
        rafRef.current = requestAnimationFrame(animate);
      };

      const stopAnimation = () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };

      // Initial render & animation start
      if (prefersReducedMotion) {
        renderSingleFrame();
      } else {
        startAnimation();
      }

      // Mark ready to trigger smooth fade-in
      setIsReady(true);

      // IntersectionObserver to pause rendering when off-screen
      if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(
          entries => {
            for (const entry of entries) {
              isVisibleRef.current = entry.isIntersecting;
              if (entry.isIntersecting) {
                if (isTabActiveRef.current && !prefersReducedMotion) {
                  startAnimation();
                }
              } else {
                stopAnimation();
              }
            }
          },
          { threshold: 0.01 }
        );
        observer.observe(container);
      }
    };

    // Defer initialization to idle callback / next frame after initial paint
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(initWebGL, { timeout: 100 });
    } else {
      timeoutId = setTimeout(initWebGL, 30);
    }

    let mouseMoveTimeout = null;
    const handleMouseMove = event => {
      if (!interactive || !containerRef.current) return;
      if (mouseMoveTimeout) return;
      mouseMoveTimeout = window.setTimeout(() => {
        mouseMoveTimeout = null;
      }, 16);
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);
    };

    if (interactive && containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Tab visibility handling
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
      if (!document.hidden && isVisibleRef.current) {
        if (rendererRef.current && materialRef.current) {
          const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!prefersReducedMotion && !rafRef.current) {
            let lastTime = performance.now();
            const targetFPS = 60;
            const frameTime = 1000 / targetFPS;
            const animate = currentTime => {
              if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
              if (isVisibleRef.current && isTabActiveRef.current) {
                const deltaTime = currentTime - lastTime;
                if (deltaTime >= frameTime) {
                  timeRef.current += 0.016 * rotationSpeedRef.current;
                  const t = timeRef.current;
                  materialRef.current.uniforms.uTime.value = t;
                  materialRef.current.uniforms.uRotCos.value = Math.cos(t * 0.3);
                  materialRef.current.uniforms.uRotSin.value = Math.sin(t * 0.3);
                  rendererRef.current.render(sceneRef.current, cameraRef.current);
                  lastTime = currentTime - (deltaTime % frameTime);
                }
                rafRef.current = requestAnimationFrame(animate);
              } else {
                rafRef.current = null;
              }
            };
            rafRef.current = requestAnimationFrame(animate);
          }
        }
      } else if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let resizeTimeout = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        if (newWidth > 0 && newHeight > 0) {
          rendererRef.current.setSize(newWidth, newHeight);
          materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
          const t = timeRef.current;
          materialRef.current.uniforms.uTime.value = t;
          materialRef.current.uniforms.uRotCos.value = Math.cos(t * 0.3);
          materialRef.current.uniforms.uRotSin.value = Math.sin(t * 0.3);
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isCancelled = true;
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) {
        observer.disconnect();
      }
      if (interactive && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) materialRef.current.dispose();
      if (geometryRef.current) geometryRef.current.dispose();

      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGLSupported, quality]);

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = hex => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uTopColor.value = parseColor(topColor);
  }, [topColor]);

  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = hex => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uBottomColor.value = parseColor(bottomColor);
  }, [bottomColor]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uIntensity.value = intensity;
  }, [intensity]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uInteractive.value = interactive;
  }, [interactive]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uGlowAmount.value = glowAmount;
  }, [glowAmount]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarWidth.value = pillarWidth;
  }, [pillarWidth]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarHeight.value = pillarHeight;
  }, [pillarHeight]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uNoiseIntensity.value = noiseIntensity;
  }, [noiseIntensity]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uLightMode.value = lightMode ? 1 : 0;
  }, [lightMode]);

  useEffect(() => {
    if (!materialRef.current) return;
    const pillarRotRad = (pillarRotation * Math.PI) / 180;
    materialRef.current.uniforms.uPillarRotCos.value = Math.cos(pillarRotRad);
    materialRef.current.uniforms.uPillarRotSin.value = Math.sin(pillarRotRad);
  }, [pillarRotation]);

  if (!webGLSupported) {
    return (
      <div className={`light-pillar-fallback ${className}`} style={{ mixBlendMode }}>
        WebGL not supported
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`light-pillar-container transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ mixBlendMode }}
    />
  );
};

export default LightPillar;
