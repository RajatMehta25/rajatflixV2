const VideoPlayer = ({ playLink }) => {
  return (
    <div>
      <iframe
        className="iframe"
        // ref={iframeRef}
        src={playLink}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
        allowFullScreen
        allowfullscreen="true"
        // onLoad={handleIframeLoad}
        id="myIframe"
      />
    </div>
  );
};

export default VideoPlayer;
