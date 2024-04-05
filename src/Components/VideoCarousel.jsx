import { useRef } from "react";
import { hightlightsSlides } from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;


  useGSAP(()=>{
    gsap.to('#video', {
      scrollTrigger:{
        trigger:'#video',
        toggleActions:'restart none none none',
        onComplete:()=>{
          setVideo(pre=>({...pre, startPlay:true, isPlaying:true}))
        }
      }
    })
  }, [isEnd, videoId])


  const handleLoadedMetaData = (i,e) =>{
      setLoadedData((pre)=>[...pre, e])
  }

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };
  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate the progress of the state

      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20 ">
            <div className="video-carousel_container">
              <div className="w-full h-full overflow-hidden bg-black flex-center rounded-3xl ">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                      setVideo((prev) => {
                        return {
                          ...prev,
                          isPlaying: true,
                        };
                      });
                  }}
                  onLoadedMetadata={(e)=>handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10 ">
                {list.textLists.map((text) => (
                  <p className="text-xl font-medium md:text-2xl " key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-10 flex-center">
        <div className="py-5 bg-gray-300 rounded-full flex-center px-7 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              className="relative w-3 h-3 mx-2 bg-gray-200 rounded-full cursor-pointer"
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute w-full h-full rounded-full "
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={isLastVideo?()=>handleProcess('video-reset'):!isPlaying?()=>handleProcess('play'):()=>handleProcess('pause')
          }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
