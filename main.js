let div_state = document.getElementById("state")
let div_timer = document.getElementById("timer")
let div_progress = document.getElementById("progress")
let div_total = document.getElementById("total")

let workT_settings = document.getElementById("workT-setting")
let pauseT_settings = document.getElementById("pauseT-setting")
let cycles_settings = document.getElementById("cycles-setting")

let btn_start = document.getElementById("start")
let btn_pause = document.getElementById("pause")
let btn_reset = document.getElementById("reset")

defaultUI()

let pause = false
let loop = null;
let running = false;
let pomodoro = new Pomodoro();
btn_start.onclick = () => {
    if(running) return
    let workT = min_to_seconds(workT_settings.value);
    let pauseT = min_to_seconds(pauseT_settings.value);
    let cycles = cycles_settings.value;

    
    running = true;
    pomodoro.init(workT, pauseT, cycles)
    lastT = Date.now() / 1000;

    loop = setInterval(function() {
        if(pause) return
        currT = Date.now() / 1000;
        dt = currT - lastT

        pomodoro.step(dt);

        lastT = currT;

        updateUI()
        if(pomodoro.state == States[2]) {
            if(loop == null) return
            clearInterval(loop)
        
            updateUI()
            running = false;
        }
    }, 100)
}

btn_pause.onclick = () => {
    pause = !pause;
    updateUI()
}


btn_reset.onclick = () => {
    if(loop == null) return
    clearInterval(loop)

    pause = false
    pomodoro.reset()
    updateUI()
    running = false;
}

function defaultUI(){
    div_state.innerHTML = "WORK";
    div_timer.innerHTML = "25:00";
    div_progress.innerHTML  = "0/0"
    div_total.innerHTML = "0"
}

function updateUI(){
    if(pause) btn_pause.innerText = "Resume";
    if(!pause) btn_pause.innerText = "Pause";
    div_state.innerHTML = pomodoro.state;
    div_timer.innerHTML = seconds_to_min_str(pomodoro.time_left()).substring(0, 5);
    console.log(pomodoro.cycles - pomodoro.remaining + "/" + pomodoro.cycles);
    div_progress.innerHTML  = (pomodoro.cycles - pomodoro.remaining) + "/" + pomodoro.cycles
    div_total.innerHTML = pomodoro.totcycles
}


function seconds_to_min_str(seconds){
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