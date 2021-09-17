const { writeToPath } = require("fast-csv");
const axios = require("axios");

class csvGenerator {
  allPlayers = [];
  async fetchPlayers() {
    const url = "https://api.sleeper.app/v1/players/nfl";
    const response = await axios.get(url);

    return response.data;
  }

  async generateFile(leagueId) {
    if (this.allPlayers.length === 0) {
      this.allPlayers = await this.fetchPlayers();
    }

    const playersUrl = `https://api.sleeper.app/v1/league/${leagueId}/rosters`;
    const usersUrl = `https://api.sleeper.app/v1/league/${leagueId}/users`;

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const path = `${__dirname}/processedFiles/${leagueId}`;
    const dataArray = await this.getData(playersUrl, usersUrl, this.allPlayers);
    const options = { headers: true, quoteColumns: false };

    const data = [];
    for (let i in dataArray) {
      const name = dataArray[i].display_name;
      for (let j in dataArray[i].detailedPlayerData) {
        const player = dataArray[i].detailedPlayerData[j];
        data.push({
          Username: name,
          Player: player.full_name,
          Position: player.depth_chart_position,
          Team: player.team,
        });
      }
    }
    data.sort((a, b) => a.Player.localeCompare(b.Player));
    data.sort((a, b) => a.Username.localeCompare(b.Username));

    writeToPath(path, data, options);
  }

  async getData(playersUrl, usersUrl, allPlayers) {
    const playerRequest = axios.get(playersUrl);
    const userRequest = axios.get(usersUrl);

    const data = await axios.all([playerRequest, userRequest]).then(
      axios.spread(function (playerResponse, usersResponse) {
        const playerData = playerResponse.data;
        const userData = usersResponse.data;

        const userJoin = equijoin(
          userData,
          playerData,
          "user_id",
          "owner_id",
          ({ display_name }, { players }) => ({ display_name, players })
        );
        for (let i in userJoin) {
          userJoin[i].detailedPlayerData = [];
          userJoin[i].players.map((player) => {
            userJoin[i].detailedPlayerData.push(allPlayers[player]);
          });
        }

        return userJoin;
      })
    );

    return data;
  }
}

const equijoin = (xs, ys, primary, foreign, sel) => {
  const ix = xs.reduce(
    (
      ix,
      row // loop through m items
    ) => ix.set(row[primary], row), // populate index for primary table
    new Map()
  ); // create an index for primary table

  return ys.map(
    (
      row // loop through n items
    ) =>
      sel(
        ix.get(row[foreign]), // get corresponding row from primary
        row
      )
  ); // select only the columns you need
};

module.exports = csvGenerator;
