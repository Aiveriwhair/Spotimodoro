var States = ["WORK", "PAUSE", "Doing nothing"];
class Pomodoro{
    constructor(){
        this.state = States[2];
        this.first_step = true;
    }

    init(workTime, pauseTime, cycles){
        this.workTime = workTime;
        this.pauseTime = pauseTime;
        this.totcycles = cycles;
        this.remaining = cycles;
        this.time = 0;
        this.first_step = true;
        this.state = States[2];
    }

    reset(){
        this.first_step = true;
        this.state = States[2];
        this.time = 0;
        this.remaining = this.totcycles;
    }

    time_left(){
        switch(this.state){
            case States[0]: // IF WORKING
                return this.workTime - this.time;
                case States[1]: // IF PAUSING
                return this.pauseTime - this.time;
                case States[2]: // IF IDLE
                return this.workTime - this.time;
        }
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
            case States[2]: // IF IDLE
                break;

        }
    }
}