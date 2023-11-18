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
        return {
            showFoot: -1,
            showCric: -1,
            showBask: -1,
            showTen: -1,
            showF1: -1,
            footballScores: [],
            basketballScores: [],
            cricketScores: [],
            tennisScores:[]
        }
    },
    methods: {


        async fetchData(callback,url) {
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

        getTeamImageURL(teamId) {
            return 'https://api.sofascore.app/api/v1/team/'+teamId+'/image';
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

        formatTennisScore(response){

            const formattedEvents = [];
            for (const match of response.events) {
            if ('point' in match.homeScore) {
                const tournament = match.tournament.name;
                const homeTeam = match.homeTeam.name;
                const awayTeam = match.awayTeam.name;
                const homeScore = match.homeScore.current;
                const homePoint = match.homeScore.point;
                const awayScore = match.awayScore.current;
                const awayPoint = match.awayScore.point;
                const homeId = match.homeTeam.id;
                const awayId = match.awayTeam.id;
                const homeImg = this.getTeamImageURL(homeId);
                const awayImg = this.getTeamImageURL(awayId);

                formattedEvents.push({
                    tournament,
                    homeTeam, homeScore, homePoint, homeImg,
                    awayTeam, awayScore, awayPoint, awayImg
                });
            }
        }
        this.tennisScores = formattedEvents;
        console.log(this.tennisScores[0]);

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
            if(this.showTen == -1) {
                this.showFoot = 0;
                this.showCric = 0;
                this.showBask = 0;
                this.showTen = 1;
                this.showF1 = 0;
            }
            else if(this.showTen == 0) {
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

    },

    mounted() {
        this.fetchData(this.formatBasketballScore, 'https://api.sofascore.com/api/v1/sport/basketball/events/live');
        this.fetchData(this.formatFootballScore, 'https://api.sofascore.com/api/v1/sport/football/events/live');
        this.fetchData(this.formatCricketScore, 'https://api.sofascore.com/api/v1/sport/cricket/events/live');
        this.fetchData(this.formatTennisScore, 'https://api.sofascore.com/api/v1/sport/tennis/events/live');


    }
}