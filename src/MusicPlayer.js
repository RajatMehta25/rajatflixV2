import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX, Download, ListMusic } from "lucide-react";

/**
 * React Music Player – normal CSS version (no Tailwind)
 *
 * Usage:
 *   1) Create MusicPlayer.css with the CSS at the bottom of this file.
 *   2) Import it where you use this component: `import "./MusicPlayer.css"`.
 *   3) <MusicPlayer songs={yourArray} />
 */

const fallbackSongs = [
  {
    image: "https://i.ytimg.com/vi/v71R0MesbSg/mqdefault.jpg",
    downloadLink: "https://p320.djpunjab.is/data/48/58312/308777/God%20Bless%20-%20Diljit%20Dosanjh.mp3",
    name: "God Bless",
  },
  {
    image: "https://i.ytimg.com/vi/tgbNymZ7vqY/mqdefault.jpg",
    downloadLink: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    name: "Sample 12s",
  },
  {
    image: "https://i.ytimg.com/vi/V-_O7nl0Ii0/mqdefault.jpg",
    downloadLink: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
    name: "Sample 6s",
  },
];

function formatTime(sec) {
  if (!isFinite(sec)) return "0:00";
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ songs }) {
  const playlist = useMemo(() => (songs?.length ? songs : fallbackSongs), [songs]);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0=off, 1=one, 2=all

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);

  const lastVolumeRef = useRef(0.9);
  const audioRef = useRef(null);

  // Refs to avoid stale closures in event handlers
  const indexRef = useRef(0);
  const repeatRef = useRef(0);
  const shuffleRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    repeatRef.current = repeatMode;
    if (audioRef.current) audioRef.current.loop = repeatMode === 1;
  }, [repeatMode]);
  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      // Delegate to next logic with a flag so we can stop at end when repeat is off
      handleNext(true);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    // initial volume/mute
    audio.volume = volume;
    audio.muted = muted;
    audio.loop = repeatRef.current === 1;

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[index]?.downloadLink || "";
    audio.load();
    setCurrentTime(0);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [index, playlist, isPlaying]);

  // Keep audio playing/paused in sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (["input", "textarea"].includes(tag)) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seekRelative(5);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekRelative(-5);
      } else if (e.key.toLowerCase() === "s") {
        setShuffle((s) => !s);
      } else if (e.key.toLowerCase() === "l") {
        setRepeatMode((m) => (m + 1) % 3);
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentTime, duration]);

  const current = playlist[index];

  const handleNext = (fromEnded = false) => {
    const len = playlist.length;
    const i = indexRef.current;
    const rep = repeatRef.current;
    const shuf = shuffleRef.current;

    // Repeat one: the audio element loops, nothing to change
    if (rep === 1) {
      if (!isPlaying) setIsPlaying(true);
      return;
    }

    // If we're at the last track, no repeat-all, no shuffle, and ended naturally -> stop
    if (fromEnded && rep === 0 && !shuf && i === len - 1) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }

    if (shuf) {
      let rand = Math.floor(Math.random() * len);
      if (len > 1 && rand === i) rand = (rand + 1) % len;
      setIndex(rand);
      return;
    }

    // Repeat-all advances and wraps; Next button when repeat off just advances and wraps to start visually
    setIndex((prev) => (prev + 1) % len);
  };

  const handlePrev = () => {
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
  };

  const onSeek = (e) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) audioRef.current.currentTime = val;
  };

  const seekRelative = (delta) => {
    const t = Math.min(Math.max(0, currentTime + delta), duration || 0);
    setCurrentTime(t);
    if (audioRef.current) audioRef.current.currentTime = t;
  };

  const toggleMute = () => {
    if (!muted) {
      lastVolumeRef.current = volume;
      setMuted(true);
      setVolume(0);
    } else {
      setMuted(false);
      setVolume(lastVolumeRef.current || 0.9);
    }
  };

  const cycleRepeat = () => setRepeatMode((m) => (m + 1) % 3);

  return (
    <div className="mp-root">
      {/* animated liquid background */}
      <div className="mp-liquid-bg">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      <div className="mp-card glass">
        {/* Header */}
        <div className="mp-header">
          <div className="mp-header-left">
            <ListMusic className="mp-icon" />
            <h1 className="mp-title">React Music Player</h1>
          </div>
          <div className="mp-count">
            {index + 1} / {playlist.length}
          </div>
        </div>

        {/* Artwork + Title */}
        <div className="mp-hero">
          <div className="mp-art-wrap">
            <img src={current?.image} alt={current?.name} className="mp-art" />
            <div className="mp-art-shine" />
          </div>
          <div className="mp-hero-right">
            <div>
              <div className="mp-track-name">{current?.name || "Untitled"}</div>
              <div className="mp-track-file">{current?.downloadLink?.split("/").pop()?.replace(/%20/g, " ")}</div>
            </div>

            {/* Progress */}
            <div>
              <div className="mp-timebar">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(1, Math.floor(duration || 0))}
                value={Math.floor(currentTime || 0)}
                onChange={onSeek}
                className="mp-range glass-track"
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mp-controls">
          <div className="mp-transport">
            <button
              onClick={() => setShuffle((s) => !s)}
              className={`mp-btn chip ${shuffle ? "is-active" : ""}`}
              title="Shuffle (S)"
            >
              <Shuffle className={`mp-icon ${shuffle ? "is-accent" : ""}`} />
            </button>
            <button onClick={handlePrev} className="mp-btn chip" title="Previous">
              <SkipBack className="mp-icon-lg" />
            </button>
            <button onClick={() => setIsPlaying((p) => !p)} className="mp-btn-primary pill" title="Play/Pause (Space)">
              {isPlaying ? <Pause className="mp-icon-lg" /> : <Play className="mp-icon-lg" />}
            </button>
            <button onClick={() => handleNext(false)} className="mp-btn chip" title="Next">
              <SkipForward className="mp-icon-lg" />
            </button>
            <button
              onClick={cycleRepeat}
              className={`mp-btn chip ${repeatMode ? "is-active" : ""}`}
              title={`Repeat (${["Off", "One", "All"][repeatMode]})  (L)`}
            >
              <Repeat className={`mp-icon ${repeatMode ? "is-info" : ""}`} />
            </button>
          </div>

          <div className="mp-right">
            <button onClick={toggleMute} className="mp-btn chip" title="Mute (M)">
              {muted || volume === 0 ? <VolumeX className="mp-icon" /> : <Volume2 className="mp-icon" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                setMuted(v === 0);
                if (v > 0) lastVolumeRef.current = v;
              }}
              className="mp-range mp-range-sm glass-track"
              title="Volume"
            />
            <a href={current?.downloadLink} download className="mp-btn chip" title="Download">
              <Download className="mp-icon" />
            </a>
          </div>
        </div>

        {/* Playlist */}
        <div className="mp-list">
          {playlist.map((s, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`mp-list-item glass ${i === index ? "is-selected" : ""}`}>
              <img src={s.image} alt={s.name} className="mp-list-thumb" />
              <div className="mp-list-text">
                <div className="mp-list-title">{s.name}</div>
                <div className="mp-list-sub">{s.downloadLink?.split("/").pop()?.replace(/%20/g, " ")}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
