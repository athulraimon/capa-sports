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
            showF1: -1
        }
    },
    methods: {
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

    }
}