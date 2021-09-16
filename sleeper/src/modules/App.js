import React from "react";
import axios from "axios";
//import express from "express";

import SearchBar from "./SearchBar";
import LeagueList from "./LeagueList";
import Loading from "./Loading";
import FileDownload from "./FileDownload";

import "./App.css";

class App extends React.Component {
  state = {
    userName: "",
    userId: "",
    leagues: [],
    selectedLeagueId: "",
    noUser: false,
    fileReady: false,
  };

  getLeagues = async (userId) => {
    const response = await axios.get(
      `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/${this.getNFLYear()}`
    );
    this.setState({ leagues: response.data, userId });
  };

  onSearchSubmit = async (term) => {
    this.setState({
      noUser: false,
      leagues: [],
      leagueId: "",
      userId: "",
      fileReady: false,
      selectedLeagueId: "",
    });
    const response = await axios.get(`https://api.sleeper.app/v1/user/${term}`);
    try {
      this.getLeagues(response.data.user_id);
      this.setState({ userName: term });
    } catch (any) {
      this.setState({
        userName: term,
        userId: "",
        noUser: true,
        selectedLeagueId: "",
      });
    }
  };

  onLeagueSelected = async (id) => {
    this.setState({ selectedLeagueId: id.target.value, fileReady: false });
    const response = await axios.get("/api/prepareFile", {
      params: { leagueId: id.target.value },
    });
    if (response.status === 200) {
      this.setState({ fileReady: true });
    } else {
      this.onSearchSubmit(this.state.userName);
    }
  };

  renderHelper() {
    return (
      <div
        style={{
          minWidth: "320px",
          maxWidth: "320px",
          paddingBottom: "5px",
          paddingRight: "10px",
          backgroundColor: "#124e70",
          border: "4px solid #124e70",
          borderRadius: "20px",
        }}>
        <div
          className={"ui container"}
          style={{
            paddingLeft: "10px",
            paddingTop: "10px",
          }}>
          <div className='ui container'>
            <SearchBar
              onSubmit={this.onSearchSubmit}
              noUser={this.state.noUser}
            />
          </div>
          <div className='ui container' style={{ marginTop: "10px" }}>
            <LeagueList
              userId={this.state.userId}
              leagues={this.state.leagues}
              onChange={this.onLeagueSelected}
            />
          </div>
          <div className='ui container' style={{ marginTop: "10px" }}>
            <Loading
              leagueId={this.state.selectedLeagueId}
              fileReady={this.state.fileReady}
            />
          </div>
          <div>
            <FileDownload
              fileReady={this.state.fileReady}
              leagueId={this.state.selectedLeagueId}
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div
        style={{
          paddingLeft: "15px",
          paddingTop: "5px",
        }}>
        <h2 style={{ paddingLeft: "5px" }}>Sleeper Roster Downloader</h2>
        {this.renderHelper()}
      </div>
    );
  }

  getNFLYear() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    if (month > 8) {
      return year + 1;
    } else {
      return year;
    }
  }
}

export default App;
