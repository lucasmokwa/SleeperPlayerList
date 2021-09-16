import React from "react";

const Loading = (props) => {
  if (props.leagueId !== "" && props.fileReady === false) {
    return (
      <div className='ui card header'>
        <div
          className='ui active inline text loader'
          style={{ marginTop: "4px" }}>
          Preparing File
        </div>
      </div>
    );
  }
  return null;
};

export default Loading;
