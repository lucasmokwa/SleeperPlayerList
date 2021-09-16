import React from "react";

class LeagueList extends React.Component {
  state = { selectedLeague: "" };

  render() {
    if (this.props.userId === "") {
      return null;
    }
    if (this.props.userId !== "" && this.props.leagues.length === 0) {
      return <div>This user has no active leagues!</div>;
    }

    this.props.leagues.sort((a, b) => (a.name > b.name ? 1 : -1));

    const listAll = this.props.leagues.map((league) => {
      return (
        <option value={league.league_id} key={league.league_id}>
          {league.name}
        </option>
      );
    });

    return (
      <select
        onChange={this.props.onChange}
        className='ui search dropdown'
        style={{ width: "290px" }}>
        <option value='' selected disabled hidden>
          Choose the League
        </option>
        {listAll}
      </select>
    );
  }
}

export default LeagueList;
