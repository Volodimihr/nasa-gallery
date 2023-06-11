import { OverlayTrigger, Popover } from "react-bootstrap";
import { useState, useEffect } from "react";

const Media = ({ item }) => {
  const [media, setMedia] = useState("");

  useEffect(() => {
    const getMedia = async () => {
      //console.log(item);
      const res = await fetch(item.href);
      const data = await res.json();
      let link = '';
      data.forEach(element => {
        if (
          (element.includes('/image/') && element.includes('medium.jpg'))
          || (element.includes('/video/') && element.includes('medium.mp4'))
          || (element.includes('/audio/') && element.includes('64k.m4a'))
        ) {
          link = element;
        }
      });
      setMedia(link);
    };

    getMedia();
  }, [item, media]);

  if (media && item.data[0].media_type === "image") {
    return (
      <div className="">
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={
            <Popover id="popover-trigger-hover-focus" title="Popover bottom">
              {item.data[0].description}
            </Popover>
          } >
          <img className="rounded-1" src={media} alt={item.data[0].title} height={200} />
        </OverlayTrigger>
      </div>
    );
  } else if (media && item.data[0].media_type === "video") {
    return (
      <div>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={
            <Popover id="popover-trigger-hover-focus" title="Popover bottom">
              {item.data[0].description}
            </Popover>
          } >
          <video className="rounded rounded-2" controls height={200} preload="auto">
            <source src={media} type="video/mp4" />
          </video>
        </OverlayTrigger>
      </div>
    );
  } else if (media && item.data[0].media_type === "audio") {
    return (
      <div>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={
            <Popover id="popover-trigger-hover-focus" title="Popover bottom">
              {item.data[0].description}
            </Popover>
          } >
          <audio controls height={200}>
            <source src={media} type="audio/mp4" />
          </audio>
        </OverlayTrigger>
      </div>
    );
  }
};

export default Media;
