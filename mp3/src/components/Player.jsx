import { useRef, useState, useEffect } from "react";
import {
  AiFillBackward,
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillForward,
} from "react-icons/ai";

import napster from "../services/napster";

import wallpaper from "/img/wallpaper_album.jpg";

import { PlayCard, Title, ButtonNextAndPrev, ButtonPlay } from "../styles";

function Player() {
  // const [song, setSOng] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const music = useRef();
  const key = "ZTVhYTU3MWEtZjRhNy00MmRmLWJiZDAtNjQwNTAwN2E0ODhi";

  useEffect(() => {
    getMusics();
  }, []);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const getMusics = async () => {
    let musics = await napster.get(`top?apikey=${key}`).then((r) => r);
    setTracks(musics.data.tracks);
  };

  const loadSong = (url) => {
    music.current.src = url;
    play();
  };

  const play = () => {
    music.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    music.current.pause();
    setIsPlaying(false);
  };

  const next = () => {
    setCurrentIndex((i) => (i > 19 ? 0 : i + 1));
    loadSong(currentIndex + 1);
  };

  const prev = () => {
    setCurrentIndex((i) => (i < 0 ? 19 : i - 1));
    loadSong(currentIndex - 1);
  };

  return (
    <PlayCard>
      <Title>MP3 Player</Title>

      {isPlaying ? (
        <h2>{tracks[currentIndex]?.name}</h2>
      ) : (
        <h2>A música está pausada</h2>
      )}

      <img src={wallpaper} style={{ width: "70%", height: "50%" }} />
      <h3>{tracks[currentIndex]?.artistName}</h3>
      <p>Album: {tracks[currentIndex]?.albumName}</p>

      <audio
        ref={music}
        src={
          tracks[currentIndex]?.previewURL ||
          "https://listen.hs.llnwd.net/g2/prvw/4/2/4/9/8/911189424.mp3"
        }
      ></audio>

      {/* <p>{tracks[currentIndex]?.playbackSeconds}</p> */}
      <ButtonNextAndPrev onClick={prev}>
        <AiFillBackward />
      </ButtonNextAndPrev>

      <ButtonPlay onClick={isPlaying ? pause : play}>
        {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
      </ButtonPlay>

      <ButtonNextAndPrev onClick={next}>
        <AiFillForward />
      </ButtonNextAndPrev>
    </PlayCard>
  );
}

export default Player;
