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
            showFoot: true,
            showCric: true,
            showBask: true,
            showTen: true,
            showF1: true
        }
    },
    methods: {
        toggleFoot() {
            this.showFoot = !this.showFoot;
        },
        toggleCric() {
            this.showCric = !this.showCric;
        },
        toggleBask() {
            this.showBask = !this.showBask;
        },
        toggleTen() {
            this.showTen = !this.showTen;
        },
        toggleF1() {
            this.showF1 = !this.showF1;
        },

    }
}