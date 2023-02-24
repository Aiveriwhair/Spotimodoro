var States = ["WORK", "PAUSE", "LPAUSE"];
class Pomodoro{
    constructor(){
        this.state = States[0];
        this.first_step = true;
    }

    init(workTime, pauseTime, lpauseTime, cycles){
        this.workTime = workTime;
        this.pauseTime = pauseTime;
        this.lpauseTime = lpauseTime;
        this.cycles = cycles;
        this.remaining = cycles;
        this.totcycles = 0;
        this.time = 0;
        this.first_step = true;
        this.state = States[0];
    }

    reset(){
        this.first_step = true;
        this.state = States[0];
        this.time = 0;
        this.remaining = this.cycles;
    }

    time_left(){
        switch(this.state){
            case States[0]: // IF WORKING
                return this.workTime - this.time;
                case States[1]: // IF PAUSING
                return this.pauseTime - this.time;
                case States[2]: // IF LONG PAUSING
                return this.lpauseTime - this.time;
        }
    }
    time_left_min(){
        return this.time_left() / 60;
    }

    step(dt){
        if(this.first_step){
            this.first_step = false;
            this.state = States[0];
        }
        switch(this.state){
            case States[0]:
                this.time += dt;
                if(this.time >= this.workTime){
                    this.totcycles++;
                    this.remaining--;
                    if(this.remaining == 0){
                        this.state = States[2];
                        return
                    }
                    this.state = States[1];
                    this.time = 0;
                }
                break;
            case States[1]:
                this.time += dt;
                if(this.time >= this.pauseTime){
                    this.state = States[0];
                    this.time = 0;
                }
                break;
            case States[2]:
                this.time += dt;
                if(this.time >= this.lpauseTime){
                    this.state = States[0];
                    this.remaining = this.cycles;
                    this.time = 0;
                }
                break;
        }
    }
}