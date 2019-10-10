
/*
let Counter ={
    count: 0,
    add: function(){return this.count+=1;}
};




let Clock = {

    ticktock: function () {

        // this.add.bind(Counter);
        setInterval(() => {
            this.add()
        }, 1000);

        setInterval(this.add.bind(Counter), 1000);// чтобы считалось в Counter

    }
}


//Связка
Object.setPrototypeOf(Clock, Counter);
Counter.count = 3600;

Clock.ticktock();
*/


class Counter{
       static count = 0;

   add(){
        return this.count+=1;
    }
}

class Clock extends Counter{

    ticktock(){
        setInterval(()=>console.log(this.add()), 1000)
    }
}


const counter = new Counter();
const clock = new Clock();


//clock.count = 3600;
clock.ticktock();

console.log(counter);