import React from "react";

const HowToDownload = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h2>How To Download The Movie</h2>

      <ol style={{ fontSize: "1.3rem" }}>
        <li>Click Download</li>
        <li>Click here to unlock</li>
        <li>Close Ad and go back to previous page</li>
        <li>Click Download</li>
      </ol>

      <h3>Example</h3>
      <iframe
        className="iframe"
        src="https://drive.google.com/file/d/1G7hoZYQoii-5ikqlzAjNAAG1jK66FSNN/preview"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen ; download"
        allowFullScreen
      />
    </div>
  );
};

export default HowToDownload;
