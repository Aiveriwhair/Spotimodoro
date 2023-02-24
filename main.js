let div_state = document.getElementById("state")
let div_timer = document.getElementById("timer")
let div_progress = document.getElementById("progress")
let div_total = document.getElementById("total")

let workT_settings = document.getElementById("workT-setting")
let pauseT_settings = document.getElementById("pauseT-setting")
let lpauseT_settings = document.getElementById("lpauseT_setting")
let cycles_settings = document.getElementById("cycles-setting")

let btn_start = document.getElementById("start")
let btn_reset = document.getElementById("reset")

function seconds_to_min_str(seconds){
    seconds = Math.floor(seconds);
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return min + ":" + sec;
}

function min_to_seconds(tmin){
    return tmin * 60;
}

function min_str_to_seconds(tmin){
    let res = tmin.split(":");
    return res[0] * 60 + res[1];
}


class PomodoroUI {
    constructor(btn_start, btn_reset, div_state,
                div_timer, div_progress, div_total,
                workT_settings, pauseT_settings, lpauseT_settings,
                cycles_settings)
    {
        // BTN
        this.btn_start = btn_start;
        btn_start.onclick = () => {
            if(this.isRunning){
                this.stop();
                this.updateUI();
            } else {
                this.start();
            }
        };
        this.btn_reset = btn_reset;
        btn_reset.onclick = () => {
            this.reset();
        };
        // DIV TIMER
        this.div_state = div_state;
        this.div_timer = div_timer;
        this.div_progress = div_progress;
        this.div_total = div_total;
        
        // SETTINGS
        this.workT_settings = workT_settings;
        workT_settings.onchange = () => {this.loadSettings();};
        this.pauseT_settings = pauseT_settings;
        pauseT_settings.onchange = () => {this.loadSettings();};
        this.cycles_settings = cycles_settings;
        cycles_settings.onchange = () => {this.loadSettings();};
        this.lpauseT_settings = lpauseT_settings;
        lpauseT_settings.onchange = () => {this.loadSettings();};

        this.pomodoro = new Pomodoro();
        this.loadSettings();
        this.isRunning = false;
        this.updateUI();
    }

    updateUI(){
        if(this.isRunning){
            this.btn_start.innerHTML = "Stop";
        } 
        else {
            this.btn_start.innerHTML = "Start";
        }
        this.div_state.innerHTML = this.pomodoro.getState();
        this.div_timer.innerHTML = seconds_to_min_str(this.pomodoro.time_left());
        this.div_progress.innerHTML = this.pomodoro.getProgress();
        this.div_total.innerHTML = this.pomodoro.totcycles;
    }

    start(){
        this.isRunning = true;
        this.lastT = Date.now() / 1000;
        this.interval = setInterval(() => {
            let dt = Date.now() / 1000 - this.lastT;
            this.pomodoro.step(dt);
            this.lastT = Date.now() / 1000;
            this.updateUI();
        }, 100);
    }

    stop(){
        if(!this.isRunning) return;
        clearInterval(this.interval);
        this.isRunning = false;
    }

    reset(){
        this.stop();
        this.pomodoro = new Pomodoro();
        this.loadSettings();
        this.updateUI();
    }

    loadSettings(){
        if(this.isRunning) return;
        let workT = min_to_seconds(this.workT_settings.value);
        let pauseT = min_to_seconds(this.pauseT_settings.value);
        let lpauseT = min_to_seconds(this.lpauseT_settings.value);
        let cycles = this.cycles_settings.value;
        this.pomodoro = new Pomodoro();
        this.pomodoro.init(workT, pauseT, lpauseT, cycles);
        this.updateUI();
    }
}

ui = new PomodoroUI(btn_start, btn_reset, div_state, div_timer, div_progress, div_total, workT_settings, pauseT_settings, lpauseT_settings, cycles_settings);