"use client";

import { useEffect, useRef } from "react";

type DisposableObject = import("three").Object3D & {
  geometry?: import("three").BufferGeometry;
  material?: import("three").Material | import("three").Material[];
};

export function SignalPlanet({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let root: import("three").Group | null = null;
    let planet: import("three").Mesh | null = null;
    let wireframe: import("three").LineSegments | null = null;
    let relayRing: import("three").Group | null = null;
    let stars: import("three").Points | null = null;
    let glowShell: import("three").Mesh | null = null;
    let dots: import("three").Mesh[] = [];
    let disposePointerHandlers = () => {};

    const targetTilt = { x: 0, y: 0 };
    const currentTilt = { x: 0, y: 0 };

    const setup = async () => {
      const THREE = await import("three");

      if (cancelled || !containerRef.current || !canvasRef.current) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      const clock = new THREE.Clock();

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0.1, 7);

      const ambientLight = new THREE.AmbientLight(0xeaffff, 1.25);
      const keyLight = new THREE.DirectionalLight(0x9df7f1, 2.5);
      keyLight.position.set(4, 2, 4);

      const warmLight = new THREE.PointLight(0xffcaa7, 16, 20, 2);
      warmLight.position.set(-3.4, -2.2, 3.4);

      const rimLight = new THREE.PointLight(0xdfffff, 12, 24, 2);
      rimLight.position.set(0, 2.6, -2);

      scene.add(ambientLight, keyLight, warmLight, rimLight);

      root = new THREE.Group();
      scene.add(root);

      const planetGeometry = new THREE.SphereGeometry(1.56, 54, 54);
      const planetMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#13262f"),
        emissive: new THREE.Color("#88f7f1"),
        emissiveIntensity: 0.26,
        metalness: 0.08,
        roughness: 0.24,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        transparent: true,
        opacity: 0.96,
      });

      planet = new THREE.Mesh(planetGeometry, planetMaterial);
      root.add(planet);

      wireframe = new THREE.LineSegments(
        new THREE.WireframeGeometry(planetGeometry),
        new THREE.LineBasicMaterial({
          color: new THREE.Color("#d7fffc"),
          transparent: true,
          opacity: 0.14,
        })
      );
      wireframe.scale.setScalar(1.018);
      root.add(wireframe);

      glowShell = new THREE.Mesh(
        new THREE.SphereGeometry(1.82, 42, 42),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#9ffaf4"),
          transparent: true,
          opacity: 0.08,
        })
      );
      root.add(glowShell);

      const dustPositions: number[] = [];
      for (let index = 0; index < 220; index += 1) {
        const point = new THREE.Vector3()
          .randomDirection()
          .multiplyScalar(2.25 + Math.random() * 1.35);
        dustPositions.push(point.x, point.y, point.z);
      }

      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(dustPositions, 3)
      );

      stars = new THREE.Points(
        dustGeometry,
        new THREE.PointsMaterial({
          color: new THREE.Color("#ecffff"),
          size: 0.032,
          transparent: true,
          opacity: 0.6,
        })
      );
      scene.add(stars);

      relayRing = new THREE.Group();
      scene.add(relayRing);

      const ringColors = ["#86f3ee", "#ffd2b8", "#d8ffff", "#86f3ee", "#ffd2b8"];

      ringColors.forEach((hex, index) => {
        const arc = new THREE.Mesh(
          new THREE.TorusGeometry(2.48 + index * 0.045, 0.016, 12, 140, Math.PI / 2.25),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(hex),
            transparent: true,
            opacity: index % 2 === 0 ? 0.54 : 0.34,
          })
        );

        arc.rotation.x = Math.PI / (2.55 - index * 0.08);
        arc.rotation.y = index * 1.06;
        arc.rotation.z = index * 0.44;
        relayRing?.add(arc);
      });

      dots = Array.from({ length: 5 }, (_, index) => {
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(index === 0 ? 0.12 : 0.095, 18, 18),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(index % 2 === 0 ? "#f8ffff" : "#fff1e7"),
            emissive: new THREE.Color(index % 2 === 0 ? "#86f3ee" : "#ffbb95"),
            emissiveIntensity: 1.8,
            roughness: 0.18,
            metalness: 0.1,
          })
        );

        scene?.add(dot);
        return dot;
      });

      const resize = () => {
        if (!renderer || !camera || !containerRef.current) {
          return;
        }

        const { clientWidth, clientHeight } = containerRef.current;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      };

      const onPointerMove = (event: PointerEvent) => {
        const bounds = container.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        targetTilt.x = (x - 0.5) * 0.9;
        targetTilt.y = (y - 0.5) * 0.8;
      };

      const onPointerLeave = () => {
        targetTilt.x = 0;
        targetTilt.y = 0;
      };

      window.addEventListener("resize", resize);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);

      disposePointerHandlers = () => {
        window.removeEventListener("resize", resize);
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
      };

      resize();

      const animate = () => {
        if (
          cancelled ||
          !renderer ||
          !scene ||
          !camera ||
          !root ||
          !planet ||
          !wireframe ||
          !relayRing ||
          !stars ||
          !glowShell
        ) {
          return;
        }

        const elapsed = clock.getElapsedTime();
        const spin = prefersReducedMotion ? 0.001 : 0.0032;

        currentTilt.x += (targetTilt.x - currentTilt.x) * 0.045;
        currentTilt.y += (targetTilt.y - currentTilt.y) * 0.045;

        planet.rotation.y += spin;
        planet.rotation.x = Math.sin(elapsed * 0.28) * 0.06 + currentTilt.y * 0.14;

        wireframe.rotation.y -= spin * 1.45;
        wireframe.rotation.z = Math.cos(elapsed * 0.26) * 0.05 + currentTilt.x * 0.12;

        glowShell.scale.setScalar(1 + Math.sin(elapsed * 1.7) * 0.015);

        root.rotation.z = currentTilt.x * 0.08;
        root.rotation.x = currentTilt.y * 0.05;

        relayRing.rotation.y = elapsed * (prefersReducedMotion ? 0.08 : 0.18);
        relayRing.rotation.z = Math.sin(elapsed * 0.24) * 0.12;
        relayRing.rotation.x = Math.PI / 14 + currentTilt.y * 0.08;

        stars.rotation.y = elapsed * 0.03;
        stars.rotation.x = Math.cos(elapsed * 0.12) * 0.08;

        dots.forEach((dot, index) => {
          const angle = elapsed * 0.5 + index * ((Math.PI * 2) / dots.length);
          const radiusX = 2.68 + (index % 2) * 0.18;
          const radiusZ = 2.12 + (index % 2) * 0.24;

          dot.position.set(
            Math.cos(angle) * radiusX,
            Math.sin(angle * 1.8) * 0.48,
            Math.sin(angle) * radiusZ
          );

          const scale = 1 + Math.sin(elapsed * 2.2 + index) * 0.18;
          dot.scale.setScalar(scale);
        });

        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      animate();
    };

    void setup();

    return () => {
      cancelled = true;
      disposePointerHandlers();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      if (scene) {
        scene.traverse((object) => {
          const disposable = object as DisposableObject;

          if (disposable.geometry) {
            disposable.geometry.dispose();
          }

          if (disposable.material) {
            const materials = Array.isArray(disposable.material)
              ? disposable.material
              : [disposable.material];

            materials.forEach((material) => material.dispose());
          }
        });
      }

      dots = [];
      renderer?.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full"
      />
    </div>
  );
}
