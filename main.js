let div_state = document.getElementById("state")
let div_timer = document.getElementById("timer")
let div_progress = document.getElementById("progress")


let btn_start = document.getElementById("start")
let btn_pause = document.getElementById("pause")
let btn_reset = document.getElementById("reset")


let workT = 0.25;
let pauseT = 0.125;
let cycles = 1;


let pause = false
let loop = null;
let running = false;
let pomodoro = new Pomodoro();
btn_start.onclick = () => {
    if(running) return
    
    running = true;
    pomodoro.init(workT * 60, pauseT * 60, cycles)
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


function updateUI(){
    if(pause) btn_pause.innerText = "Resume";
    if(!pause) btn_pause.innerText = "Pause";
    div_state.innerHTML = pomodoro.state;
    div_timer.innerHTML = pomodoro.time_left().toString().substring(0, 5);
    div_progress.innerHTML  = (pomodoro.totcycles - pomodoro.remaining) + "/" + pomodoro.totcycles
}