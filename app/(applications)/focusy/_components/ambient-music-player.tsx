"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

const AmbientMusicPlayer = ({ running }: { running: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState("rain");
  const [volume, setVolume] = useState(0.5);

  const musicRef = useRef<HTMLAudioElement>(null);

  const musicTracks = [
    {
      id: "rain",
      name: "Rain",
      emoji: "🌧️",
      url: "/focusy/ambient-musics/rain.mp3",
    },
    {
      id: "forest",
      name: "Forest",
      emoji: "🌲",
      url: "/focusy/ambient-musics/relaxing-1.mp3",
    },
    {
      id: "ocean",
      name: "Ocean",
      emoji: "🌊",
      url: "/focusy/ambient-musics/ocean.mp3",
    },
    {
      id: "piano",
      name: "Piano",
      emoji: "🎹",
      url: "/focusy/ambient-musics/solitude.mp3",
    },
  ];

  useEffect(() => {
    if (!musicRef.current) return;
    musicRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!musicRef.current) return;

    musicRef.current.load();
    if (isPlaying && running) {
      musicRef.current.play().catch(() => {});
    }
  }, [selectedMusic, isPlaying, running]);

  useEffect(() => {
    if (!musicRef.current) return;
    if (!running && isPlaying) {
      musicRef.current.pause();
    } else if (running && isPlaying) {
      musicRef.current.play().catch(() => {});
    }
  }, [running, isPlaying]);

  const toggleMusic = async () => {
    if (!musicRef.current || !running) return;

    if (!isPlaying) {
      await musicRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      musicRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-4 left-4 right-4"
    >
      <audio ref={musicRef} loop>
        <source
          src={musicTracks.find((t) => t.id === selectedMusic)?.url}
          type="audio/mpeg"
        />
      </audio>

      <motion.div
        className="bg-white/60 backdrop-blur-md rounded-xl p-3 border border-white/50 shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide">
            Ambient Sounds
          </span>
          <motion.button
            onClick={toggleMusic}
            whileTap={{ scale: 0.9 }}
            animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{
              duration: 1,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.5,
            }}
            className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
              isPlaying
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                : "bg-gray-200 text-gray-600"
            } ${!running ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!running}
          >
            {isPlaying ? "Playing" : "Play"}
          </motion.button>
        </div>

        <div className="grid grid-cols-4 gap-1 mb-2">
          {musicTracks.map((track) => (
            <motion.button
              key={track.id}
              onClick={() => setSelectedMusic(track.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 rounded-lg text-center transition-all ${
                selectedMusic === track.id
                  ? "bg-gradient-to-br from-orange-400 to-pink-400 shadow-md"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            >
              <div className="text-lg">{track.emoji}</div>
              <div
                className={`text-[8px] font-medium mt-0.5 ${
                  selectedMusic === track.id ? "text-white" : "text-gray-600"
                }`}
              >
                {track.name}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Volume2 size={12} className="text-gray-600" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(+e.target.value / 100)}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <span className="text-[9px] text-gray-600 font-medium w-7">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AmbientMusicPlayer;
