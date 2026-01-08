"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import type { Artist } from "@/lib/artists";

interface ArtistDisplacementProps {
  artists: Artist[];
  activeIndex: number;
  className?: string;
}

export default function ArtistDisplacement({ artists, activeIndex, className = "" }: ArtistDisplacementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const spriteRef = useRef<PIXI.Sprite | null>(null);
  const texturesRef = useRef<Map<string, PIXI.Texture>>(new Map());
  const displacementFilterRef = useRef<PIXI.DisplacementFilter | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize PixiJS and preload all textures
  const initPixi = useCallback(async () => {
    if (!containerRef.current || appRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Create app
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

    // Preload all artist textures in parallel
    const texturePromises = artists.map(async (artist) => {
      try {
        const texture = await PIXI.Assets.load(artist.photo);
        texturesRef.current.set(artist.slug, texture);
      } catch (e) {
        console.error(`Failed to load texture for ${artist.name}:`, e);
      }
    });

    // Also load displacement texture
    const displacementPromise = PIXI.Assets.load("/displacement-wave.jpg");

    // Wait for all to load
    const [displacementTexture] = await Promise.all([
      displacementPromise,
      ...texturePromises
    ]);

    // Create image container
    const imageContainer = new PIXI.Container();
    app.stage.addChild(imageContainer);

    // Create sprite with first texture
    const firstTexture = texturesRef.current.get(artists[0]?.slug);
    if (firstTexture) {
      const sprite = new PIXI.Sprite(firstTexture);

      // Cover calculation
      const scaleX = width / sprite.texture.width;
      const scaleY = height / sprite.texture.height;
      const scale = Math.max(scaleX, scaleY);

      sprite.scale.set(scale);
      sprite.anchor.set(0.5);
      sprite.x = width / 2;
      sprite.y = height / 2;

      imageContainer.addChild(sprite);
      spriteRef.current = sprite;
    }

    // Displacement setup
    const displacementSprite = new PIXI.Sprite(displacementTexture);
    displacementSprite.texture.source.wrapMode = "repeat";
    displacementSprite.scale.set(2);
    displacementSprite.anchor.set(0.5);
    displacementSprite.x = width / 2;
    displacementSprite.y = height / 2;
    app.stage.addChild(displacementSprite);

    const displacementFilter = new PIXI.DisplacementFilter({
      sprite: displacementSprite,
      scale: { x: 0, y: 0 },
    });
    imageContainer.filters = [displacementFilter];
    displacementFilterRef.current = displacementFilter;

    // Animate displacement
    let time = 0;
    app.ticker.add((ticker) => {
      time += ticker.deltaTime * 0.005;
      displacementSprite.x = width / 2 + Math.sin(time * 0.5) * 20;
      displacementSprite.y = height / 2 + Math.cos(time * 0.3) * 15;
      displacementSprite.rotation = Math.sin(time * 0.2) * 0.02;
    });

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const centerX = width / 2;
      const centerY = height / 2;
      const distX = (mouseX - centerX) / width;
      const distY = (mouseY - centerY) / height;

      gsap.to(displacementFilter.scale, {
        x: distX * 30,
        y: distY * 30,
        duration: 0.8,
        ease: "power2.out",
      });

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

    // Store cleanup
    (app as unknown as { _cleanup: () => void })._cleanup = () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };

    setIsReady(true);
  }, [artists]);

  // Change texture when activeIndex changes (instant!)
  useEffect(() => {
    if (!spriteRef.current || !containerRef.current) return;

    const artist = artists[activeIndex];
    const texture = texturesRef.current.get(artist?.slug);

    if (texture && spriteRef.current) {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Fade out, swap texture, fade in
      gsap.to(spriteRef.current, {
        alpha: 0,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          if (spriteRef.current && texture) {
            spriteRef.current.texture = texture;

            // Recalculate scale for new texture
            const scaleX = width / texture.width;
            const scaleY = height / texture.height;
            const scale = Math.max(scaleX, scaleY);
            spriteRef.current.scale.set(scale);

            gsap.to(spriteRef.current, {
              alpha: 1,
              duration: 0.15,
              ease: "power2.in",
            });
          }
        }
      });
    }
  }, [activeIndex, artists]);

  // Initialize
  useEffect(() => {
    initPixi();

    return () => {
      if (appRef.current) {
        const cleanup = (appRef.current as unknown as { _cleanup?: () => void })._cleanup;
        if (cleanup) cleanup();
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, [initPixi]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!appRef.current || !containerRef.current || !spriteRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      appRef.current.renderer.resize(width, height);

      // Recalculate sprite scale
      const texture = spriteRef.current.texture;
      const scaleX = width / texture.width;
      const scaleY = height / texture.height;
      const scale = Math.max(scaleX, scaleY);
      spriteRef.current.scale.set(scale);
      spriteRef.current.x = width / 2;
      spriteRef.current.y = height / 2;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${className}`}
      style={{
        touchAction: "none",
        opacity: isReady ? 1 : 0,
      }}
    />
  );
}
