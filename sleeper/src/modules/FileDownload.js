import React from "react";
import axios from "axios";

class FileDownload extends React.Component {
  render() {
    if (this.props.fileReady) {
      return (
        <div className='ui placeholder card' style={{ maxWidth: "400px" }}>
          <div className='ui icon header' style={{ marginTop: "10px" }}>
            <i className='alternate file outline icon'></i>
            Your file is ready!
          </div>
          <div onClick={this.onClick} className='ui green button'>
            Download
          </div>
        </div>
      );
    }
    return null;
  }

  onClick = (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:4001/getFile", //your url
      method: "GET",
      responseType: "blob",
      params: { leagueId: this.props.leagueId },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "leagueRosters.csv");
      document.body.appendChild(link);
      link.click();
    });
  };
}

export default FileDownload;
