import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function ThreeCanvas({ theme = 'dark', activeSceneId = 'aurora', shockTrigger = 0 }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    theme,
    mode: activeSceneId,
    shock: 0,
    mx: 0,
    my: 0
  });

  // Keep state updated in refs for the animation loop
  useEffect(() => {
    stateRef.current.theme = theme;
    stateRef.current.mode = activeSceneId;
    stateRef.current.shock = 0.7;
  }, [theme, activeSceneId]);

  useEffect(() => {
    if (shockTrigger > 0) {
      stateRef.current.shock = 1.0;
    }
  }, [shockTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 17.5);

    // Cinematic deep space camera warp glide on entrance
    gsap.to(camera.position, {
      z: 9.5,
      duration: 1.6,
      ease: 'power3.out'
    });

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Dark particle system (Aurora / Helix / Nebula)
    const cols = 42, rows = 28;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(cols * rows * 3);
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xe85d3f, size: 0.075, transparent: true, opacity: 0.75 });
    const darkPoints = new THREE.Points(pGeo, pMat);
    scene.add(darkPoints);

    // Light Mode 1: Vibrant Coral Silk Particle Wave
    const silkGeo = new THREE.BufferGeometry();
    const silkPos = new Float32Array(cols * rows * 3);
    silkGeo.setAttribute('position', new THREE.BufferAttribute(silkPos, 3));
    const silkMat = new THREE.PointsMaterial({ color: 0xd94e28, size: 0.095, transparent: true, opacity: 0.72 });
    const silkPoints = new THREE.Points(silkGeo, silkMat);
    scene.add(silkPoints);

    // Light Mode 2: Concentric 3D Solar Rings
    const ringsGroup = new THREE.Group();
    ringsGroup.position.set(2.4, 0.2, -1);
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.04, 16, 80), new THREE.MeshBasicMaterial({ color: 0xd94e28, transparent: true, opacity: 0.55 }));
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.035, 16, 90), new THREE.MeshBasicMaterial({ color: 0x1e40af, transparent: true, opacity: 0.42 }));
    const r3 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.045, 16, 60), new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.38 }));
    ringsGroup.add(r1, r2, r3);
    scene.add(ringsGroup);

    // Light Mode 3: 3D Prism Sphere Particle Cloud
    const prismCount = 900;
    const prismGeo = new THREE.BufferGeometry();
    const prismPos = new Float32Array(prismCount * 3);
    const prismBase = new Float32Array(prismCount * 3);
    for (let i = 0; i < prismCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / prismCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rad = 3.2;
      const x = rad * Math.sin(phi) * Math.cos(theta) + 2.2;
      const y = rad * Math.cos(phi);
      const z = rad * Math.sin(phi) * Math.sin(theta);
      prismPos[i * 3] = x;
      prismPos[i * 3 + 1] = y;
      prismPos[i * 3 + 2] = z;
      prismBase[i * 3] = x;
      prismBase[i * 3 + 1] = y;
      prismBase[i * 3 + 2] = z;
    }
    prismGeo.setAttribute('position', new THREE.BufferAttribute(prismPos, 3));
    const prismMat = new THREE.PointsMaterial({ color: 0x1e40af, size: 0.085, transparent: true, opacity: 0.68 });
    const prismPoints = new THREE.Points(prismGeo, prismMat);
    scene.add(prismPoints);

    const onMouseMove = (e) => {
      stateRef.current.mx = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const { theme: currentT, mode, mx, my } = stateRef.current;
      let shock = stateRef.current.shock;

      if (shock > 0.005) {
        stateRef.current.shock *= 0.94;
      }

      // Update visibility based on current theme and mode
      darkPoints.visible = currentT === 'dark';
      silkPoints.visible = currentT === 'light' && mode === 'silkwave';
      ringsGroup.visible = currentT === 'light' && mode === 'rings';
      prismPoints.visible = currentT === 'light' && mode === 'prism';

      if (darkPoints.visible) {
        const arr = pGeo.attributes.position.array;
        let idx = 0;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const u = (i / cols - 0.5) * 18;
            const v = (j / rows - 0.5) * 12;
            const dist = Math.sqrt(u * u + v * v);
            const shockOffset = shock * Math.sin(dist * 2.4 - t * 10) * 1.4;

            if (mode === 'aurora') {
              arr[idx] = u;
              arr[idx + 1] = Math.sin(u * 0.5 + t * 1.2) * 1.0 + Math.cos(v * 0.6 + t) * 0.5 + shockOffset;
              arr[idx + 2] = v * 0.6;
            } else if (mode === 'helix') {
              const ang = (i / cols) * Math.PI * 4 + t * 0.9 + (j % 2) * Math.PI;
              arr[idx] = u;
              arr[idx + 1] = Math.sin(ang) * (2.0 + shock * 0.7);
              arr[idx + 2] = Math.cos(ang) * (2.0 + shock * 0.7);
            } else {
              arr[idx] = u;
              arr[idx + 1] = Math.sin(dist * 1.1 - t * 2.2) * 0.8 - 1.0 + shockOffset;
              arr[idx + 2] = v;
            }
            idx += 3;
          }
        }
        pGeo.attributes.position.needsUpdate = true;
        darkPoints.rotation.y += (mx * 0.2 - darkPoints.rotation.y) * 0.05;
        darkPoints.rotation.x += (my * 0.12 - darkPoints.rotation.x) * 0.05;
      }

      if (silkPoints.visible) {
        const arr = silkGeo.attributes.position.array;
        let idx = 0;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const u = (i / cols - 0.5) * 18;
            const v = (j / rows - 0.5) * 12;
            const d = Math.sqrt(u * u + v * v);
            arr[idx] = u;
            arr[idx + 1] = Math.sin(u * 0.5 + t * 1.4) * 1.05 + Math.cos(v * 0.6 + t) * 0.55 + shock * Math.sin(d * 2.4 - t * 10) * 1.4;
            arr[idx + 2] = v * 0.6;
            idx += 3;
          }
        }
        silkGeo.attributes.position.needsUpdate = true;
        silkPoints.rotation.y += (mx * 0.2 - silkPoints.rotation.y) * 0.05;
        silkPoints.rotation.x += (my * 0.12 - silkPoints.rotation.x) * 0.05;
      }

      if (ringsGroup.visible) {
        ringsGroup.scale.setScalar(1 + shock * 0.28);
        r1.rotation.x = t * 0.45 + my * 0.4;
        r1.rotation.y = t * 0.35 + mx * 0.4;
        r2.rotation.x = -t * 0.3 + my * 0.3;
        r2.rotation.z = t * 0.4 + mx * 0.3;
        r3.rotation.y = -t * 0.55;
      }

      if (prismPoints.visible) {
        const arr = prismGeo.attributes.position.array;
        for (let i = 0; i < prismCount; i++) {
          const bx = prismBase[i * 3];
          const by = prismBase[i * 3 + 1];
          const bz = prismBase[i * 3 + 2];
          const ripple = 1 + 0.08 * Math.sin(by * 2 + t * 2.2) + shock * 0.25 * Math.sin(bx * 3 - t * 9);
          arr[i * 3] = (bx - 2.2) * ripple + 2.2;
          arr[i * 3 + 1] = by * ripple;
          arr[i * 3 + 2] = bz * ripple;
        }
        prismGeo.attributes.position.needsUpdate = true;
        prismPoints.rotation.y = t * 0.18 + mx * 0.3;
        prismPoints.rotation.x = my * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      pGeo.dispose();
      pMat.dispose();
      silkGeo.dispose();
      silkMat.dispose();
      r1.geometry.dispose();
      r1.material.dispose();
      r2.geometry.dispose();
      r2.material.dispose();
      r3.geometry.dispose();
      r3.material.dispose();
      prismGeo.dispose();
      prismMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="webglGlobalCanvas" ref={canvasRef} />;
}
