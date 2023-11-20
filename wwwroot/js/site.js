function openWindow() {
    window.location.href = '/';
}

function openStatsWindow() {
    window.location.href = '/Stats';
}

function openCalWindow() {
    window.location.href = '/Calendar';
}

function openScoreWindow() {
    window.location.href = '/Score';
}

function openUserWindow() {
    window.location.href = '/User';
}



const landing = {
    el: '#capa',
    data() {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate());
        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + 2);
        return {
            showFoot: -1,
            showCric: -1,
            showBask: -1,
            showTen: -1,
            showF1: -1,
            footballScores: [],
            basketballScores: [],
            cricketScores: [],
            tennisScores: [],
            f1Table: [],
            footballTable: [],
            eastBasketballTable: [],
            westBasketballTable: [],
            cricketTable: [],
            tennisTable: [],
            selectedConference: 'east',
            showUpcoming: true,
            showRecent: false,
            footballUpcoming: [],
            footballRecent:[],
            basketballUpcoming: [],
            basketballRecent: [],
            cricketRecent: [],
            cricketUpcoming: [],
            tennisUpcoming: [],
            tennisRecent: [],
            currentDate,
            startDate,
            endDate,
            f1Calendar: [],
            news:[]


        }
    },
    methods: {


        async fetchData(callback, url) {
            const options = {
                method: 'GET',
                headers: {
                    authority: 'api.sofascore.com',
                    accept: '*/*',
                    'accept-language': 'en-US,en;q=0.8',
                    'cache-control': 'max-age=0',
                    'if-none-match': 'W/^\^30ec587741^^',
                    origin: 'https://www.sofascore.com',
                    referer: 'https://www.sofascore.com/',
                    'sec-ch-ua': '^\^Brave^^;v=^\^119^^, ^\^Chromium^^;v=^\^119^^, ^\^Not?A_Brand^^;v=^\^24^^',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '^\^Windows^^',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'sec-gpc': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
                }
            };


            try {
                const response = await fetch(url, options)
                const data = await response.json()
                callback(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async fetchCalendarData(callback, url,date) {
            const options = {
                method: 'GET',
                headers: {
                    authority: 'api.sofascore.com',
                    accept: '*/*',
                    'accept-language': 'en-US,en;q=0.8',
                    'cache-control': 'max-age=0',
                    'if-none-match': 'W/^\^30ec587741^^',
                    origin: 'https://www.sofascore.com',
                    referer: 'https://www.sofascore.com/',
                    'sec-ch-ua': '^\^Brave^^;v=^\^119^^, ^\^Chromium^^;v=^\^119^^, ^\^Not?A_Brand^^;v=^\^24^^',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '^\^Windows^^',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'sec-gpc': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
                }
            };


            try {
                const response = await fetch(url, options)
                const data = await response.json()
                callback(data,date);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async fetchNewsData() {
            const formattedEvents = []
            let data = [];
            try {
                const response = await fetch("https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=cb89d562db954214aaee997be7534bb7")
                data = await response.json()
                console.log(data);
                
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            for (const article of data.articles) {
                if (article.title !== '[Removed]' && article.urlToImage != null && article.content != null) {
                    const title = article.title;
                    const url = article.url;
                    const image = article.urlToImage;
                    const passage = article.content;
                    const indexOfSquareBracket = passage.indexOf('[');
                    const content = indexOfSquareBracket !== -1
                        ? passage.substring(0, indexOfSquareBracket)
                        : passage;
                    formattedEvents.push({
                        title, url, content, image
                    });
                }
            }
            console.log(formattedEvents[0]);
            this.news = formattedEvents;

        },

        getTeamImageURL(teamId) {
            return 'https://api.sofascore.app/api/v1/team/' + teamId + '/image';
        },


        formatBasketballScore(response) {
            const formattedEvents = [];
            for (const event of response.events) {
                const period = event.status.description;
                const tournament = event.tournament.name;
                const home = event.homeTeam.name;
                const away = event.awayTeam.name;
                const homeId = event.homeTeam.id;
                const awayId = event.awayTeam.id;
                const homeImg = this.getTeamImageURL(homeId);
                const awayImg = this.getTeamImageURL(awayId);
                const homeScore = event.homeScore.current;
                const awayScore = event.awayScore.current;
                formattedEvents.push({
                    period,
                    tournament,
                    home,
                    homeScore,
                    away,
                    awayScore,
                    homeId,
                    awayId,
                    homeImg,
                    awayImg
                });
            }
            this.basketballScores = formattedEvents;
            console.log(this.basketballScores[0]);
        },

        formatFootballScore(response) {
            const formattedEvents = [];
            for (const event of response.events) {
                const period = event.status.description;
                const tournament = event.tournament.name;
                const home = event.homeTeam.name;
                const away = event.awayTeam.name;
                const homeId = event.homeTeam.id;
                const awayId = event.awayTeam.id;
                const homeImg = this.getTeamImageURL(homeId);
                const awayImg = this.getTeamImageURL(awayId);
                const homeScore = event.homeScore.current;
                const awayScore = event.awayScore.current;
                formattedEvents.push({
                    period,
                    tournament,
                    home,
                    homeScore,
                    away,
                    awayScore,
                    homeId,
                    awayId,
                    homeImg,
                    awayImg
                });
            }
            this.footballScores = formattedEvents;
            console.log(this.footballScores[0]);
        },

        formatCricketScore(response) {
            const formattedEvents = [];
            for (const match of response['events']) {
                const tournament = match.tournament.name;
                const homeTeam = match.homeTeam.shortName;
                const awayTeam = match.awayTeam.shortName;
                const homeScore = match.homeScore;
                const awayScore = match.awayScore;
                const homeId = match.homeTeam.id;
                const awayId = match.awayTeam.id;
                const homeImg = this.getTeamImageURL(homeId);
                const awayImg = this.getTeamImageURL(awayId);

                if (!awayScore.innings && homeScore.innings) {
                    awayScore.innings = { inning1: { score: '0', wickets: '0', overs: '0', runRate: '0' } };
                } else if (!homeScore.innings && awayScore.innings) {
                    homeScore.innings = { inning1: { score: '0', wickets: '0', overs: '0', runRate: '0' } };
                }

                const homeRuns = homeScore.innings.inning1.score;
                const homeWickets = homeScore.innings.inning1.wickets;
                const homeOvers = homeScore.innings.inning1.overs;
                const homeRR = homeScore.innings.inning1.runRate;
                const awayRuns = awayScore.innings.inning1.score;
                const awayWickets = awayScore.innings.inning1.wickets;
                const awayOvers = awayScore.innings.inning1.overs;
                const awayRR = awayScore.innings.inning1.runRate;


                formattedEvents.push({
                    homeTeam, homeRuns, homeWickets, homeOvers, homeRR, homeImg,
                    awayTeam, awayRuns, awayWickets, awayOvers, awayRR, awayImg,
                    tournament

                });
            }
            this.cricketScores = formattedEvents;
            console.log(this.cricketScores[0]);
        },

        formatTennisScore(response) {

            const formattedEvents = [];
            for (const match of response.events) {

                const tournament = match.tournament.name;
                const homeTeam = match.homeTeam.name;
                const awayTeam = match.awayTeam.name;
                const homeScore = match.homeScore.current || '';
                const homePoint = match.homeScore.point || '';
                const awayScore = match.awayScore.current || '';
                const awayPoint = match.awayScore.point || '';
                var homePeriod1 = match.homeScore.period1 || '';
                var homePeriod2 = match.homeScore.period2 || '';
                var homePeriod3 = match.homeScore.period3 || '';
                var homePeriod4 = match.homeScore.period4 || '';
                var homePeriod5 = match.homeScore.period5 || '';
                var awayPeriod1 = match.awayScore.period1 || '';
                var awayPeriod2 = match.awayScore.period2 || '';
                var awayPeriod3 = match.awayScore.period3 || '';
                var awayPeriod4 = match.awayScore.period4 || '';
                var awayPeriod5 = match.awayScore.period5 || '';



                const homeId = match.homeTeam.id;
                const awayId = match.awayTeam.id;
                const homeImg = this.getTeamImageURL(homeId);
                const awayImg = this.getTeamImageURL(awayId);

                formattedEvents.push({
                    tournament,
                    homeTeam, homeScore, homePoint, homeImg, homePeriod1, homePeriod2, homePeriod3, homePeriod4, homePeriod5,
                    awayTeam, awayScore, awayPoint, awayImg, awayPeriod1, awayPeriod2, awayPeriod3, awayPeriod4, awayPeriod5
                });

            }
            this.tennisScores = formattedEvents;
            console.log(formattedEvents[0]);


        },

        formatF1Table(response) {
            const formattedEvents = [];
            for (const player of response.standings) {
                let name = player.team.name;
                let teamName = player.team.parentTeam.name;
                if (!('victories' in player)) {
                    player.victories = 0;
                }
                if (!('podiums' in player)) {
                    player.podiums = 0;
                }
                if (!('points' in player)) {
                    player.points = 0;
                }

                const wins = player.victories;
                const podiums = player.podiums;
                const points = player.points;
                const position = player.position;
                const playerId = player.team.id;
                const playerImg = this.getTeamImageURL(playerId);

                formattedEvents.push({
                    position,
                    name,
                    teamName,
                    wins,
                    podiums,
                    points,
                    playerImg
                });
            }
            this.f1Table = formattedEvents;
            console.log(formattedEvents[0]);
        },

        formatTennisTable(response) {
            var i = 0;
            const formattedEvents = [];
            for (const player of response.rankings) {
                const rank = player.ranking;
                const playerName = player.rowName;
                const country = player.team.country.name;
                const points = player.points;

                const playerId = player.team.id;
                const playerImg = this.getTeamImageURL(playerId);

                i = i + 1;

                formattedEvents.push({
                    rank, playerName, country, points, playerImg
                });

                if (i == 50) {
                    break;
                }
            }
            this.tennisTable = formattedEvents;
            console.log(formattedEvents[0]);
        },

        formatFootballTable(response) {
            const formattedEvents = [];
            for (const standing of response.standings) {
                const tournament = standing.name;

                for (const event of standing.rows) {
                    const teamName = event.team.name;
                    const position = event.position;
                    const wins = event.wins;
                    const played = event.matches;
                    const losses = event.losses;
                    const draws = event.draws;
                    const points = event.points;

                    const teamId = event.team.id;
                    const teamImg = this.getTeamImageURL(teamId);

                    formattedEvents.push({
                        position, teamName, played, wins, losses, draws, points, teamImg
                    });
                }
            }
            this.footballTable = formattedEvents;
            console.log(formattedEvents[0]);
        },

        formatCricketTable(response) {
            const standing = response.standings;
            formattedEvents = [];
            for (const team of standing[0].rows) {
                const pos = team.position;
                const teamName = team.team.name;
                const matches = team.matches;
                const wins = team.wins;
                const losses = team.losses;
                const NRR = team.netRunRate;

                const teamId = team.team.id;
                const teamImg = this.getTeamImageURL(teamId);

                formattedEvents.push({
                    pos, teamName, matches, wins, losses, NRR, teamImg
                });
            }
            this.cricketTable = formattedEvents;
            console.log(formattedEvents[0]);

        },

        formatBasketballTable(response) {

            const easternConference = [];
            const east = response['standings'][0];  // 0->Eastern Conference, 1->Western Conference 2,3,4->Central div........
            for (const team of east.rows) {
                const pos = team.position;
                const teamName = team.team.name;
                const wins = team.wins;
                const losses = team.losses;
                const gb = team.gamesBehind;

                const teamId = team.team.id;
                const teamImg = this.getTeamImageURL(teamId);

                easternConference.push({
                    pos, teamName, wins, losses, gb, teamImg
                });
            }

            const westernConference = [];

            const west = response['standings'][1];  // 0->Eastern Conference, 1->Western Conference 2,3,4->Central div........
            for (const team of west.rows) {
                const pos = team.position;
                const teamName = team.team.name;
                const wins = team.wins;
                const losses = team.losses;
                const gb = team.gamesBehind;

                const teamId = team.team.id;
                const teamImg = this.getTeamImageURL(teamId);

                westernConference.push({
                    pos, teamName, wins, losses, gb, teamImg
                });
            }
            this.eastBasketballTable = easternConference;
            this.westBasketballTable = westernConference;
            console.log(easternConference[0]);
            console.log(westernConference[0]);
        },

        formatBasketballUpcoming(response,date) {
            const formattedEvents = [];
            const top_football_leagues = ["NBA"];

            for (const match of response.events) {
                if (match.homeScore !== {} && top_football_leagues.includes(match.tournament.uniqueTournament.name)) {
                    const homeTeam = match.homeTeam.name;
                    const awayTeam = match.awayTeam.name;
                    let homeScore = match.homeScore.display;
                    let awayScore = match.awayScore.display;
                    const tournament = match.tournament.name;
                    const timestamp = match.startTimestamp;
                    if (typeof homeScore === 'undefined') {
                        homeScore = 0;
                    }

                    if (typeof awayScore === 'undefined') {
                        awayScore = 0;
                    }

                    const homeId = match.homeTeam.id;
                    const awayId = match.awayTeam.id;
                    const homeImg = this.getTeamImageURL(homeId);
                    const awayImg = this.getTeamImageURL(awayId);
                    const matchDate = date.toLocaleDateString('en-UK');
                    const matchDay = date.toDateString().substring(0, 4);
                    
                    formattedEvents.push({ homeTeam, awayTeam, homeScore, awayScore, homeImg, awayImg, tournament, timestamp, matchDate, matchDay});
                }


            }
            this.basketballUpcoming = this.basketballUpcoming.concat(formattedEvents);
            console.log(formattedEvents[0]);


        },

        formatBasketballRecent(response,date) {
            const formattedEvents = [];
            const top_football_leagues = ["NBA"];

            for (const match of response.events) {
                if (match.homeScore !== {} && top_football_leagues.includes(match.tournament.uniqueTournament.name)) {
                    const homeTeam = match.homeTeam.name;
                    const awayTeam = match.awayTeam.name;
                    let homeScore = match.homeScore.display;
                    let awayScore = match.awayScore.display;
                    const tournament = match.tournament.name;
                    const timestamp = match.startTimestamp;
                    if (typeof homeScore === 'undefined') {
                        homeScore = 0;
                    }

                    if (typeof awayScore === 'undefined') {
                        awayScore = 0;
                    }

                    var winnerMsg = '';
                    var winnerCode = '';
                    if (match.winnerCode !== undefined) {
                        winnerCode = match.winnerCode;
                        var winnerMsg = '';
                        if (winnerCode === 1) {
                            winnerMsg = `${homeTeam} Won`;
                        }
                        else if (winnerCode === 2) {
                            winnerMsg = `${awayTeam} Won`;
                        }
                        else {
                            winnerMsg = "Draw";
                        }


                        const homeId = match.homeTeam.id;
                        const awayId = match.awayTeam.id;
                        const homeImg = this.getTeamImageURL(homeId);
                        const awayImg = this.getTeamImageURL(awayId);


                        formattedEvents.push({
                            homeTeam, awayTeam, homeScore, awayScore, homeImg, awayImg, tournament, winnerMsg,
                        });

                    }

                }
            }
                this.basketballRecent = this.basketballRecent.concat(formattedEvents);
                console.log(formattedEvents[0]);


            },

            formatFootballUpcoming(response,date) {
                const formattedEvents = [];
                const top_football_leagues = ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1", "Major League Soccer", "UEFA Champions League", "Indian Super League", "European Championship, Qualification"];
                const country = ['England', 'Italy', 'Germany', 'Spain', 'France', 'United States of America', 'Category', 'India', "Europe"];
                for (const match of response.events) {
                    if (top_football_leagues.includes(match.tournament.uniqueTournament.name) && country.includes(match.tournament.category.name)) {
                        const homeTeam = match.homeTeam.name;
                        const awayTeam = match.awayTeam.name;
                        const tournament = match.tournament.name;
                        const homeId = match.homeTeam.id;
                        const awayId = match.awayTeam.id;
                        const homeImg = this.getTeamImageURL(homeId);
                        const awayImg = this.getTeamImageURL(awayId);
                        const matchDate = date.toLocaleDateString('en-UK');
                        const matchDay = date.toDateString().substring(0, 4);

                        formattedEvents.push({
                            homeTeam, homeImg, awayTeam, awayImg, tournament, matchDate, matchDay
                        });
                    }
                }
                this.footballUpcoming = this.footballUpcoming.concat(formattedEvents);
                console.log(formattedEvents[0]);
            },

            formatFootballRecent(response,date) {
                const formattedEvents = [];
                const top_football_leagues = ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1", "Major League Soccer", "UEFA Champions League", "Indian Super League", "European Championship, Qualification"];
                const country = ['England', 'Italy', 'Germany', 'Spain', 'France', 'United States of America', 'Category', 'India', "Europe"];
                for (const match of response.events) {
                    if (top_football_leagues.includes(match.tournament.uniqueTournament.name) && country.includes(match.tournament.category.name)) {
                        const homeTeam = match.homeTeam.name;
                        const awayTeam = match.awayTeam.name;
                        const tournament = match.tournament.name;
                        const homeId = match.homeTeam.id;
                        const awayId = match.awayTeam.id;
                        const homeImg = this.getTeamImageURL(homeId);
                        const awayImg = this.getTeamImageURL(awayId);

                        var homeScore = '';
                        var awayScore = '';
                        var winnerCode = '';
                        var winnerMsg = '';

                        if (match.winnerCode !== undefined) {
                            homeScore = match.homeScore.display;
                            awayScore = match.awayScore.display;
                            winnerCode = match.winnerCode;
                            var winnerMsg = '';
                            if (winnerCode === 1) {
                                winnerMsg = `${homeTeam} Won`;
                            } else if (winnerCode === 2) {
                                winnerMsg = `${awayTeam} Won`;
                            } else {
                                winnerMsg = "Draw"
                            }

                        }
                        formattedEvents.push({
                            homeTeam, homeScore, homeImg, awayTeam, awayScore, awayImg, winnerMsg, tournament, date
                        })
                    }
                }
                this.footballRecent = this.footballRecent.concat(formattedEvents);
                console.log(formattedEvents[0]);
        },

                formatTennisUpcoming(response,date) {

                        const formattedEvents = [];
                        var i = 0;
                        for (const match of response.events) {
        
                            const tournament = match.tournament.name;
                            const homeTeam = match.homeTeam.name;
                            const awayTeam = match.awayTeam.name;

                            const homeId = match.homeTeam.id;
                            const awayId = match.awayTeam.id;
                            const homeImg = this.getTeamImageURL(homeId);
                            const awayImg = this.getTeamImageURL(awayId);

                            const matchDate = date.toLocaleDateString('en-UK');
                            const matchDay = date.toDateString().substring(0, 4);

                            formattedEvents.push({
                            tournament,
                            homeTeam, homeImg, awayTeam, awayImg,matchDate,matchDay
                            });
                            i = i+1;
                            if(i>10){
                            break;
                            }
        
                        }
                        this.tennisUpcoming = this.tennisUpcoming.concat(formattedEvents);
                        console.log(formattedEvents[0]);

             },

            formatTennisRecent(response,date) {

                const formattedEvents = [];
                var i = 0;
                for (const match of response.events) {
        
                    const tournament = match.tournament.name;
                    const homeTeam = match.homeTeam.name;
                    const awayTeam = match.awayTeam.name;

                    const homeScore = match.homeScore.current || '';
                    const homePoint = match.homeScore.point || '';
                    const awayScore = match.awayScore.current || '';
                    const awayPoint = match.awayScore.point || '';
                    var homePeriod1 = match.homeScore.period1 || '';
                    var homePeriod2 = match.homeScore.period2 || '';
                    var homePeriod3 = match.homeScore.period3 || '';
                    var homePeriod4 = match.homeScore.period4 || '';
                    var homePeriod5 = match.homeScore.period5 || '';
                    var awayPeriod1 = match.awayScore.period1 || '';
                    var awayPeriod2 = match.awayScore.period2 || '';
                    var awayPeriod3 = match.awayScore.period3 || '';
                    var awayPeriod4 = match.awayScore.period4 || '';
                    var awayPeriod5 = match.awayScore.period5 || '';

                    var winnerNote = '';
        
                    if(match.winnerCode !== undefined){
                      const winnerCode = match.winnerCode;
                      if(winnerCode == 1){
                      winnerNote = `${homeTeam} won`;
                      }
                      else{
                      winnerNote = `${awayTeam} won`;
                      }
                    }

                    const homeId = match.homeTeam.id;
                    const awayId = match.awayTeam.id;
                    const homeImg = this.getTeamImageURL(homeId);
                    const awayImg = this.getTeamImageURL(awayId);

                    formattedEvents.push({
                    tournament,
                    homeTeam, homeScore, homePoint, homeImg, homePeriod1, homePeriod2, homePeriod3, homePeriod4, homePeriod5,
                    awayTeam, awayScore, awayPoint, awayImg, awayPeriod1, awayPeriod2, awayPeriod3, awayPeriod4, awayPeriod5,
                    winnerNote,date
                    });
                    i = i+1;
                    if(i>10){
                    break;
                    }
        
                }
                this.tennisRecent = this.tennisRecent.concat(formattedEvents);
                console.log(formattedEvents[0]);

        },

        formatCricketRecent(response,date){
              const formattedEvents = [];
              for (const match of response['events']) {
                  const tournament = match.tournament.name;
                  const homeTeam = match.homeTeam.shortName;
                  const awayTeam = match.awayTeam.shortName;
                  const homeScore = match.homeScore;
                  const awayScore = match.awayScore;
                  const homeId = match.homeTeam.id;
                  const awayId = match.awayTeam.id;
                  const homeImg = this.getTeamImageURL(homeId);
                  const awayImg = this.getTeamImageURL(awayId);

                  var homeRuns = '';
                  var homeWickets = '';
                  var homeOvers = '';
                  var homeRR = '';
                  var awayRuns = '';
                  var awayWickets = '';
                  var awayOvers = '';
                  var awayRR = '';
                  var winNote = '';

                  if(homeScore && awayScore && homeScore.innings && awayScore.innings){
  
                    if (!awayScore.innings && homeScore.innings) {
                        awayScore.innings = { inning1: { score: '0', wickets: '0', overs: '0', runRate: '0' } };
                    } else if (!homeScore.innings && awayScore.innings) {
                        homeScore.innings = { inning1: { score: '0', wickets: '0', overs: '0', runRate: '0' } };
                    }
    
                    homeRuns = homeScore.innings.inning1.score || '';
                    homeWickets = homeScore.innings.inning1.wickets || '';
                    homeOvers = homeScore.innings.inning1.overs || '';
                    homeRR = homeScore.innings.inning1.runRate || '';
                    awayRuns = awayScore.innings.inning1.score || '';
                    awayWickets = awayScore.innings.inning1.wickets || '';
                    awayOvers = awayScore.innings.inning1.overs || '';
                    awayRR = awayScore.innings.inning1.runRate || '';
                    winNote = match.note || '';
    

                  }
                  formattedEvents.push({
                    tournament,
                    homeTeam, homeRuns, homeWickets, homeOvers, homeRR, homeImg,
                    awayTeam, awayRuns, awayWickets, awayOvers, awayRR, awayImg,
                    winNote,date
                  });
    
    
            }
              this.cricketRecent=this.cricketRecent.concat(formattedEvents);
              console.log(formattedEvents[0]);
  
        },

        formatCricketUpcoming(response,date) {
            const formattedEvents = [];
            for (const match of response['events']) {
                const tournament = match.tournament.name;
                const homeTeam = match.homeTeam.shortName;
                const awayTeam = match.awayTeam.shortName;
                const homeId = match.homeTeam.id;
                const awayId = match.awayTeam.id;
                const homeImg = this.getTeamImageURL(homeId);
                const awayImg = this.getTeamImageURL(awayId);

                const matchDate = date.toLocaleDateString('en-UK');
                const matchDay = date.toDateString().substring(0, 4);

               
                formattedEvents.push({
                    tournament,
                    homeTeam, homeImg,
                    awayTeam, awayImg,matchDay,matchDate
                });


            }
            this.cricketUpcoming = this.cricketUpcoming.concat(formattedEvents);
            console.log(formattedEvents[0]);
        },




            toggleFoot() {
                if (this.showFoot == -1) {
                    this.showFoot = 1;
                    this.showCric = 0;
                    this.showBask = 0;
                    this.showTen = 0;
                    this.showF1 = 0;
                }
                else if (this.showFoot == 0) {
                    this.showFoot = 1;
                }
                else {
                    this.showFoot = 0;
                }
            },
            toggleCric() {
                if (this.showCric == -1) {
                    this.showFoot = 0;
                    this.showCric = 1;
                    this.showBask = 0;
                    this.showTen = 0;
                    this.showF1 = 0;
                }
                else if (this.showCric == 0) {
                    this.showCric = 1;
                }
                else {
                    this.showCric = 0;
                }
            },
            toggleBask() {
                if (this.showBask == -1) {
                    this.showFoot = 0;
                    this.showCric = 0;
                    this.showBask = 1;
                    this.showTen = 0;
                    this.showF1 = 0;
                }
                else if (this.showBask == 0) {
                    this.showBask = 1;
                }
                else {
                    this.showBask = 0;
                }
            },
            toggleTen() {
                if (this.showTen == -1) {
                    this.showFoot = 0;
                    this.showCric = 0;
                    this.showBask = 0;
                    this.showTen = 1;
                    this.showF1 = 0;
                }
                else if (this.showTen == 0) {
                    this.showTen = 1;
                }
                else {
                    this.showTen = 0;
                }
            },
            toggleF1() {
                if (this.showF1 == -1) {
                    this.showFoot = 0;
                    this.showCric = 0;
                    this.showBask = 0;
                    this.showTen = 0;
                    this.showF1 = 1;
                }
                else if (this.showF1 == 0) {
                    this.showF1 = 1;
                }
                else {
                    this.showF1 = 0;
                }
            },

            selectUpcoming() {
                this.showUpcoming = true;
                this.showRecent = false;
            },

            selectRecent() {
                this.showUpcoming = false;
                this.showRecent = true;
            }

        },

    mounted() {
            this.fetchNewsData();
            this.fetchData(this.formatBasketballScore, 'https://api.sofascore.com/api/v1/sport/basketball/events/live');
            this.fetchData(this.formatFootballScore, 'https://api.sofascore.com/api/v1/sport/football/events/live');
            this.fetchData(this.formatCricketScore, 'https://api.sofascore.com/api/v1/sport/cricket/events/live');
            this.fetchData(this.formatTennisScore, 'https://api.sofascore.com/api/v1/sport/tennis/events/live');
            this.fetchData(this.formatF1Table, 'https://api.sofascore.com/api/v1/stage/203647/standings/competitor');
            this.fetchData(this.formatTennisTable, 'https://api.sofascore.com/api/v1/rankings/type/5');
            this.fetchData(this.formatFootballTable, 'https://api.sofascore.com/api/v1/unique-tournament/17/season/52186/standings/total');
            this.fetchData(this.formatCricketTable, 'https://api.sofascore.com/api/v1/unique-tournament/20661/season/52509/standings/total');
            this.fetchData(this.formatBasketballTable, 'https://api.sofascore.com/api/v1/unique-tournament/132/season/54105/standings/total');
            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() + i);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatBasketballUpcoming,
                    `https://api.sofascore.com/api/v1/category/15/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() - i);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatBasketballRecent,
                    `https://api.sofascore.com/api/v1/category/15/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() - i);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatFootballRecent,
                    `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() + i);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatFootballUpcoming,
                    `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() + i);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatTennisUpcoming,
                    `https://api.sofascore.com/api/v1/sport/tennis/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() - i);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatTennisRecent,
                    `https://api.sofascore.com/api/v1/sport/tennis/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() - i);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatCricketRecent,
                    `https://api.sofascore.com/api/v1/sport/cricket/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

            for (let i = 1; i < 3; i++) {
                // Adjust startDate based on the loop variable i
                const adjustedStartDate = new Date(this.startDate);
                adjustedStartDate.setDate(this.startDate.getDate() + i);
                console.log(adjustedStartDate);

                // Use adjustedStartDate in the fetchData call
                this.fetchCalendarData(
                    this.formatCricketUpcoming,
                    `https://api.sofascore.com/api/v1/sport/cricket/scheduled-events/${adjustedStartDate.toISOString().split('T')[0]}`,
                    adjustedStartDate
                );
            }

        }
    }
