"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  HOME_TILES,
  descriptionClasses,
  tileSizeClasses,
  titleClasses,
  type TileData,
  type TileSize,
  useTiles,
} from "@/lib/constants";
import type { TileKey, ThemeName } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { MetroIcon } from "./MetroIcon";
import { useTileFlyover } from "./TileFlyoverProvider";
import { useTheme } from "./ThemeProvider";

const TEXT_COLOR = {
  light: "text-[var(--metro-tile-light-text)]",
  dark: "text-[var(--metro-tile-dark-text)]",
} as const;

const DESCRIPTION_COLOR = {
  light: "text-[var(--metro-tile-light-text)] opacity-80",
  dark: "text-[var(--metro-tile-dark-text)] opacity-80",
} as const;

const TILE_KEYS = HOME_TILES.map((tile) => tile.key) as TileKey[];
const TILE_SIZES: TileSize[] = ["medium", "wide", "large", "hero"];
const TILE_SPANS: Record<TileSize, { cols: number; rows: number }> = {
  medium: { cols: 1, rows: 1 },
  wide: { cols: 2, rows: 1 },
  large: { cols: 2, rows: 2 },
  hero: { cols: 4, rows: 2 },
};

const MAX_ESTIMATED_INSTANCES = 48;

const TILE_THEME_CLASSES: Record<ThemeName, string> = {
  pastel: "tile-theme-pastel",
  metro: "tile-theme-metro",
  neon: "tile-theme-neon",
  solar: "tile-theme-solar",
  retro: "tile-theme-retro",
  glass: "tile-theme-glass",
  orchid: "tile-theme-orchid",
};

type ResolvedTile = {
  instanceId: string;
  baseKey: TileKey;
  tile: TileData;
  size: TileSize;
};

type TileInstance = {
  id: string;
  key: TileKey;
  size: TileSize;
};

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function estimateInstanceCount(width: number, height: number) {
  const baseTileWidth = 160;
  const baseTileHeight = 160;
  const cols = Math.max(1, Math.ceil(width / baseTileWidth));
  const rows = Math.max(1, Math.ceil(height / baseTileHeight));
  const estimated = cols * rows * 1.4;
  const capped = Math.min(estimated, MAX_ESTIMATED_INSTANCES);
  return Math.max(Math.round(capped), TILE_KEYS.length * 3);
}

function createTileInstances(): TileInstance[] {
  const width = typeof window !== "undefined" ? window.innerWidth : 1280;
  const height = typeof window !== "undefined" ? window.innerHeight : 720;
  const total = estimateInstanceCount(width, height);
  const timestamp = Date.now();

  const ensureCoverage = TILE_KEYS.map((key, index) => ({
    id: `${key}-${timestamp}-base-${index}`,
    key,
    size: randomItem(TILE_SIZES),
  }));

  const instances: TileInstance[] = [...ensureCoverage];
  for (let index = ensureCoverage.length; index < total; index += 1) {
    const key = randomItem(TILE_KEYS);
    instances.push({
      id: `${key}-${timestamp}-extra-${index}-${Math.random().toString(36).slice(2, 6)}`,
      key,
      size: randomItem(TILE_SIZES),
    });
  }

  return shuffle(instances);
}

function Tile({
  tile,
}: {
  tile: ResolvedTile;
}) {
  const isExternal = tile.tile.href ? /^https?:\/\//.test(tile.tile.href) : false;
  const { openTile } = useTileFlyover();
  const { theme } = useTheme();
  const isGlassTheme = theme.name === "glass";
  const supportsPointerGlow =
    isGlassTheme || theme.name === "neon" || theme.name === "orchid" || theme.name === "pastel" || theme.name === "metro";

  const textClass = TEXT_COLOR[tile.tile.contrast];
  const descriptionClass = DESCRIPTION_COLOR[tile.tile.contrast];
  const iconClass = tile.tile.contrast === "light" ? TEXT_COLOR.light : TEXT_COLOR.dark;

  const [altContent, setAltContent] = useState(false);
  useEffect(() => {
    const minDelay = 4000;
    const maxDelay = 20000;
    const intervalTime = minDelay + Math.random() * (maxDelay - minDelay);
    
    const interval = setInterval(() => {
      setAltContent((prev) => !prev);
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = (event: ReactMouseEvent) => {
    event.preventDefault();
    openTile(tile.tile);
  };

  const baseColor = tile.tile.color;

  const style: CSSProperties & Record<string, string | number | undefined> = {};

  if (isGlassTheme) {
    style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06)), ${baseColor}`;
    style.backdropFilter = "blur(18px) saturate(140%)";
    style.backgroundBlendMode = "overlay";
    style.borderColor = "rgba(255,255,255,0.24)";
  } else {
    style.backgroundColor = baseColor;
  }

  if (supportsPointerGlow) {
    style["--hover-x"] = "50%";
    style["--hover-y"] = "50%";
  }

  const handlePointerEnter = undefined;

  const handlePointerMove = supportsPointerGlow
    ? (event: React.PointerEvent<HTMLElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = rect.width ? ((event.clientX - rect.left) / rect.width) * 100 : 50;
      const y = rect.height ? ((event.clientY - rect.top) / rect.height) * 100 : 50;
      target.style.setProperty("--hover-x", `${x}%`);
      target.style.setProperty("--hover-y", `${y}%`);
      const normalizedX = (x / 100 - 0.5) * 2;
      const normalizedY = (y / 100 - 0.5) * 2;
      target.style.setProperty("--hover-shift-x", normalizedX.toFixed(3));
      target.style.setProperty("--hover-shift-y", normalizedY.toFixed(3));
    }
    : undefined;

  const handlePointerLeave = supportsPointerGlow
    ? (event: React.PointerEvent<HTMLElement>) => {
      const target = event.currentTarget;
      target.style.setProperty("--hover-x", "50%");
      target.style.setProperty("--hover-y", "50%");
      target.style.setProperty("--hover-shift-x", "0");
      target.style.setProperty("--hover-shift-y", "0");
    }
    : undefined;

  const spans = TILE_SPANS[tile.tile.size];
  const article = (
    <motion.article
      style={style}
      className={cn(
        "group relative flex h-full overflow-hidden text-left transition-transform duration-150 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--metro-foreground]",
        isGlassTheme
          ? "rounded-[14px] border bg-white/5 px-3 py-3"
          : "rounded-[2px] border border-transparent px-3 py-3 shadow-none",
        TILE_THEME_CLASSES[theme.name],
        tileSizeClasses[tile.tile.size],
      )}
      data-theme-ripple-item
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.015, y: -2, zIndex: 10 }}
      whileTap={{ scale: 0.94, rotateX: 4, rotateY: -4 }}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <TileSurface
        tile={tile.tile}
        iconClassName={iconClass}
        titleClassName={`${titleClasses[tile.tile.size]} ${textClass}`}
        descriptionColorClass={descriptionClass}
        isDynamicActive={altContent}
        textClass={textClass}
      />
      {isExternal ? (
        <span
          className="sr-only"
          id={`tile-${tile.tile.key}-external-note`}
        >
          Opens in a new tab
        </span>
      ) : null}
    </motion.article>
  );

  if (tile.tile.href) {
    if (isExternal) {
      return (
        <a
          href={tile.tile.href}
          className="contents"
          target="_blank"
          rel="noreferrer"
          aria-describedby={`tile-${tile.tile.key}-external-note`}
          onClick={handleClick}
        >
          {article}
        </a>
      );
    }

    return (
      <Link
        href={tile.tile.href}
        className="contents"
        onClick={handleClick}
      >
        {article}
      </Link>
    );
  }

  return article;
}

const MOBILE_BATCH_SIZE = 24;
const SCROLL_THRESHOLD = 300;

function DraggableGrid() {
  const { theme } = useTheme();
  const themedTiles = useTiles();
  const [instances, setInstances] = useState<ResolvedTile[]>([]);
  const [isReady, setIsReady] = useState(false);
  const parallaxWrapperRef = useRef<HTMLDivElement | null>(null);
  const parallaxFrameRef = useRef<number | null>(null);
  const parallaxValuesRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [parallaxEnabled, setParallaxEnabled] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    return () => {
      if (parallaxFrameRef.current !== null) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
        parallaxFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const applyPreference = () => {
      window.requestAnimationFrame(() => {
        setParallaxEnabled(!motionQuery.matches && !mobileQuery.matches);
        setIsMobile(mobileQuery.matches);
      });
    };

    applyPreference();

    const handleChange = () => applyPreference();

    motionQuery.addEventListener("change", handleChange);
    mobileQuery.addEventListener("change", handleChange);

    return () => {
      motionQuery.removeEventListener("change", handleChange);
      mobileQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Infinite Scroll Logic for Mobile
  useEffect(() => {
    if (!isMobile || !isReady) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - SCROLL_THRESHOLD
      ) {
        appendMobileTiles();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isReady, themedTiles]); // themedTiles dependency to access current tiles

  const appendMobileTiles = useCallback(() => {
    setInstances((current) => {
      if (current.length > 200) return current; // Cap to prevent memory issues
      const timestamp = Date.now();
      const newTiles: ResolvedTile[] = [];

      for (let i = 0; i < MOBILE_BATCH_SIZE; i++) {
        const key = randomItem(TILE_KEYS);
        // Mobile prefers smaller tiles, fewer large ones
        const size: TileSize = Math.random() > 0.85 ? "wide" : "medium";
        const baseTile = themedTiles.find(t => t.key === key);
        if (!baseTile) continue;

        newTiles.push({
          instanceId: `${key}-${timestamp}-append-${i}-${Math.random().toString(36).slice(2, 6)}`,
          baseKey: key,
          tile: { ...baseTile, size },
          size,
        });
      }
      return [...current, ...newTiles];
    });
  }, [themedTiles]);

  useEffect(() => {
    if (typeof window === "undefined" || themedTiles.length === 0) {
      return;
    }

    const baseMap = new Map<TileKey, TileData>(themedTiles.map((tile) => [tile.key, tile]));
    const width = typeof window !== "undefined" ? window.innerWidth : 1280;
    const height = typeof window !== "undefined" ? window.innerHeight : 720;

    // Initial Generation
    const isSmallScreen = width < 768;
    // Force more initial tiles on mobile to ensure scrollability immediately
    const total = isSmallScreen ? 40 : estimateInstanceCount(width, height);

    // Re-implement createTileInstances logic inline or call modified version
    // For simplicity, adapting logic here:
    const timestamp = Date.now();
    const generated: TileInstance[] = [];

    // Ensure coverage first (at least one of each)
    TILE_KEYS.forEach((key, index) => {
      generated.push({
        id: `${key}-${timestamp}-base-${index}`,
        key,
        size: isSmallScreen ? (Math.random() > 0.8 ? "wide" : "medium") : randomItem(TILE_SIZES),
      });
    });

    // Fill the rest
    for (let index = generated.length; index < total; index += 1) {
      const key = randomItem(TILE_KEYS);
      generated.push({
        id: `${key}-${timestamp}-extra-${index}-${Math.random().toString(36).slice(2, 6)}`,
        key,
        size: isSmallScreen ? (Math.random() > 0.8 ? "wide" : "medium") : randomItem(TILE_SIZES),
      });
    }

    const shuffled = shuffle(generated);

    const resolved: ResolvedTile[] = [];
    for (const instance of shuffled) {
      const baseTile = baseMap.get(instance.key);
      if (!baseTile) continue;
      const tileWithSize =
        instance.size !== baseTile.size ? { ...baseTile, size: instance.size } : baseTile;
      resolved.push({
        instanceId: instance.id,
        baseKey: instance.key,
        tile: tileWithSize,
        size: instance.size,
      });
    }

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        setInstances(resolved);
        setIsReady(true);
      });
    }
  }, [themedTiles]);

  const placeholderTiles = useMemo(() => {
    return Array.from({ length: Math.max(16, TILE_KEYS.length * 2) }, (_, index) => ({
      key: `placeholder-${index}`,
      size: TILE_SIZES[index % TILE_SIZES.length],
    }));
  }, []);

  const isGlassTheme = theme.name === "glass";
  const gridTransformStyle = useMemo<CSSProperties>(
    () => ({
      transform: parallaxEnabled
        ? "translate3d(calc(var(--grid-parallax-x) * 20px), calc(var(--grid-parallax-y) * 20px), 0)"
        : "translate3d(0, 0, 0)",
    }),
    [parallaxEnabled],
  );

  const setParallaxValues = useCallback(
    (nextX: number, nextY: number) => {
      if (!parallaxEnabled) return;
      const wrapper = parallaxWrapperRef.current;
      if (!wrapper) return;
      const previous = parallaxValuesRef.current;
      if (Math.abs(previous.x - nextX) < 0.002 && Math.abs(previous.y - nextY) < 0.002) {
        return;
      }
      parallaxValuesRef.current = { x: nextX, y: nextY };
      if (parallaxFrameRef.current !== null) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
      }
      parallaxFrameRef.current = window.requestAnimationFrame(() => {
        wrapper.style.setProperty("--grid-parallax-x", nextX.toFixed(3));
        wrapper.style.setProperty("--grid-parallax-y", nextY.toFixed(3));
        parallaxFrameRef.current = null;
      });
    },
    [parallaxEnabled],
  );

  const handleGridPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!parallaxEnabled) return;
      const target = event.currentTarget;
      if (event.pointerType === "touch") {
        return;
      }
      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      const clampedX = Math.max(-0.5, Math.min(0.5, relativeX));
      const clampedY = Math.max(-0.5, Math.min(0.5, relativeY));
      const normalizedX = clampedX * 2;
      const normalizedY = clampedY * 2;
      target.style.setProperty("--hover-shift-x", normalizedX.toFixed(3));
      target.style.setProperty("--hover-shift-y", normalizedY.toFixed(3));
      setParallaxValues(normalizedX, normalizedY);
    },
    [parallaxEnabled, setParallaxValues],
  );

  const handleGridPointerLeave = useCallback(() => {
    setParallaxValues(0, 0);
  }, [setParallaxValues]);

  if (!isReady) {
    return (
      <div
        ref={parallaxWrapperRef}
        className="relative flex-1 [--grid-parallax-x:0] [--grid-parallax-y:0]"
        onPointerMove={handleGridPointerMove}
        onPointerLeave={handleGridPointerLeave}
      >
        <div
          className={cn(
            "grid min-h-full grid-flow-row-dense auto-rows-[140px] gap-1 sm:gap-1 lg:gap-2 transition-transform duration-500 ease-out will-change-transform",
            "grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]"
          )}
          style={gridTransformStyle}
        >
          {placeholderTiles.map((tile) => {
            const spans = TILE_SPANS[tile.size];
            return (
              <div
                key={tile.key}
                className={cn(
                  "relative flex h-full overflow-hidden px-3 py-3",
                  tileSizeClasses[tile.size],
                  isGlassTheme
                    ? "rounded-[14px] border border-white/15 bg-white/6 backdrop-blur-md"
                    : "rounded-[2px] border border-transparent bg-(--metro-chrome)/60 animate-pulse",
                  TILE_THEME_CLASSES[theme.name],
                )}
              >
                <div
                  className={cn(
                    "m-auto h-10 w-10 rounded-full",
                    isGlassTheme ? "bg-white/15" : "bg-(--metro-neutral)/70",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={parallaxWrapperRef}
      className="relative flex-1 [--grid-parallax-x:0] [--grid-parallax-y:0]"
      onPointerMove={handleGridPointerMove}
      onPointerLeave={handleGridPointerLeave}
    >
      <div
        className={cn(
          "grid min-h-full grid-flow-row-dense auto-rows-[140px] gap-1 sm:gap-1 lg:gap-2 transition-transform duration-300 ease-out will-change-transform",
          "grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]"
        )}
        style={gridTransformStyle}
      >
        {instances.map((tile) => (
          <Tile key={tile.instanceId} tile={tile} />
        ))}
      </div>
    </div>
  );
}

export default DraggableGrid;

type TileSurfaceProps = {
  tile: TileData;
  iconClassName: string;
  titleClassName: string;
  descriptionColorClass: string;
};

function TileSurface({
  tile,
  iconClassName,
  titleClassName,
  descriptionColorClass,
  isDynamicActive,
  textClass,
}: TileSurfaceProps & { isDynamicActive?: boolean; textClass?: string }) {
  const { theme } = useTheme();
  const isRetro = theme.name === "retro";

  const titleStyle: CSSProperties = {
    fontFamily: "var(--metro-heading-font-family)",
  };

  if (isRetro) {
    titleStyle.fontSize = "6px";
    titleStyle.lineHeight = "1.4";
    titleStyle.letterSpacing = "0.35em";
  }

  const descriptionStyle: CSSProperties = {
    fontFamily: "var(--metro-font-family)",
  };

  if (isRetro) {
    descriptionStyle.fontSize = "6px";
    descriptionStyle.letterSpacing = "0.28em";
    descriptionStyle.lineHeight = "1.4";
  }

  const dynamicTitleClass = {
    medium: isRetro ? "text-[8px]" : "text-sm",
    wide: isRetro ? "text-[10px]" : "text-base",
    large: isRetro ? "text-[12px]" : "text-lg",
    hero: isRetro ? "text-[16px]" : "text-2xl",
  }[tile.size];

  const dynamicDescClass = {
    medium: isRetro ? "text-[6px]" : "text-[10px]",
    wide: isRetro ? "text-[8px]" : "text-xs",
    large: isRetro ? "text-[10px]" : "text-sm",
    hero: isRetro ? "text-[12px]" : "text-base",
  }[tile.size];

  return (
    <>
      <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300", isDynamicActive ? "opacity-0 scale-95" : "opacity-100 scale-100")}>
        <MetroIcon name={tile.icon} className={cn("h-16 w-16", iconClassName)} />
      </div>
      <div className={cn("absolute inset-0 flex flex-col items-center text-center justify-center p-4 transition-all duration-300 tracking-wider", isDynamicActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}>
        {tile.description && (
          <p className={cn("font-bold mb-3 leading-snug tracking-wider", textClass, dynamicTitleClass)}>
            {tile.description}
          </p>
        )}
        {tile.href && (
          <p className={cn("uppercase font-semibold tracking-[0.5em] opacity-80", textClass, dynamicDescClass)}>
            {tile.href.replace(/^https?:\/\//, '').split('/')[0]}
          </p>
        )}
      </div>
    </>
  );
}
