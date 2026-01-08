"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as PIXI from "pixi.js";
import gsap from "gsap";

interface DisplacementCanvasProps {
  imageUrl: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function DisplacementCanvas({ imageUrl, className = "", onLoad, onError }: DisplacementCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const displacementSpriteRef = useRef<PIXI.Sprite | null>(null);
  const imageContainerRef = useRef<PIXI.Container | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const setupPixi = useCallback(async () => {
    if (!containerRef.current || appRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Create PixiJS application
    const app = new PIXI.Application();
    await app.init({
      width,
      height,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      antialias: true,
    });

    container.appendChild(app.canvas as HTMLCanvasElement);
    appRef.current = app;

    // Create container for the image
    const imageContainer = new PIXI.Container();
    app.stage.addChild(imageContainer);
    imageContainerRef.current = imageContainer;

    // Load the main image
    try {
      const texture = await PIXI.Assets.load(imageUrl);
      const sprite = new PIXI.Sprite(texture);

      // Cover the entire canvas
      const scaleX = width / sprite.texture.width;
      const scaleY = height / sprite.texture.height;
      const scale = Math.max(scaleX, scaleY);

      sprite.scale.set(scale);
      sprite.anchor.set(0.5);
      sprite.x = width / 2;
      sprite.y = height / 2;

      imageContainer.addChild(sprite);

      // Load displacement texture - using a noise/wave pattern
      const displacementTexture = await PIXI.Assets.load("/displacement-wave.jpg");
      const displacementSprite = new PIXI.Sprite(displacementTexture);

      displacementSprite.texture.source.wrapMode = "repeat";
      displacementSprite.scale.set(2);
      displacementSprite.anchor.set(0.5);
      displacementSprite.x = width / 2;
      displacementSprite.y = height / 2;

      displacementSpriteRef.current = displacementSprite;
      app.stage.addChild(displacementSprite);

      // Create displacement filter
      const displacementFilter = new PIXI.DisplacementFilter({
        sprite: displacementSprite,
        scale: { x: 0, y: 0 },
      });

      imageContainer.filters = [displacementFilter];

      // Animate the displacement texture for wave effect
      let time = 0;
      app.ticker.add((ticker) => {
        time += ticker.deltaTime * 0.005;

        // Slow wave animation
        displacementSprite.x = width / 2 + Math.sin(time * 0.5) * 20;
        displacementSprite.y = height / 2 + Math.cos(time * 0.3) * 15;
        displacementSprite.rotation = Math.sin(time * 0.2) * 0.02;
      });

      // Mouse interaction
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate distance from center
        const centerX = width / 2;
        const centerY = height / 2;
        const distX = (mouseX - centerX) / width;
        const distY = (mouseY - centerY) / height;

        // Apply displacement based on mouse position
        gsap.to(displacementFilter.scale, {
          x: distX * 30,
          y: distY * 30,
          duration: 0.8,
          ease: "power2.out",
        });

        // Move displacement sprite towards mouse
        gsap.to(displacementSprite, {
          x: mouseX,
          y: mouseY,
          duration: 1,
          ease: "power2.out",
        });
      };

      const handleMouseEnter = () => {
        gsap.to(displacementFilter.scale, {
          x: 20,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(displacementFilter.scale, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(displacementSprite, {
          x: width / 2,
          y: height / 2,
          duration: 1,
          ease: "power2.out",
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup functions
      (app as unknown as { _cleanup: () => void })._cleanup = () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };

      // Mark as loaded successfully
      setIsLoaded(true);
      onLoad?.();

    } catch (error) {
      console.error("Failed to load textures:", error);
      onError?.();
    }
  }, [imageUrl, onLoad, onError]);

  useEffect(() => {
    setupPixi();

    return () => {
      if (appRef.current) {
        const cleanup = (appRef.current as unknown as { _cleanup?: () => void })._cleanup;
        if (cleanup) cleanup();
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, [setupPixi]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!appRef.current || !containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      appRef.current.renderer.resize(width, height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${className}`}
      style={{
        touchAction: "none",
        opacity: isLoaded ? 1 : 0,
        pointerEvents: isLoaded ? "auto" : "none"
      }}
    />
  );
}
