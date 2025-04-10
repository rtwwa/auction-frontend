import React from "react";

const MainAd = ({ url }) => {
  console.log(url);

  return (
    <div className="w-full h-80">
      <img src={url} alt="The main advertisement" />
    </div>
  );
};

export default MainAd;
