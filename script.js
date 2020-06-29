'use strict';

document.addEventListener('DOMContentLoaded', loaded);

function loaded() {

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var anim;
    var button = document.querySelector('button');
    var toggle = true;
    var number = .8;
    var playTime;

    var dx;
    var dy;
    var dx1;
    var dy1;

    var time;
    var interval;
    var p = document.querySelector('p');

    var Time = function() {
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
    }

    Time.prototype.addMilliSecond = function () {

        this.milliseconds ++;
        
        if( this.milliseconds == 10 ){
    
            this.milliseconds = 0 ;
            this.seconds ++;
    
            if( this.seconds == 60 ){
    
                this.seconds = 0 ;
                this.minutes ++;
        
                if ( this.minutes == 60 ){
        
                    this.minutes = 0;
                    this.hours ++;
                }
            }
        }
    }

    Time.prototype.addSecond = function () {

        this.seconds ++;
        
        if( this.seconds == 60 ){
    
            this.seconds = 0 ;
            this.minutes ++;
    
            if ( this.minutes == 60 ){
    
                this.minutes = 0;
                this.hours ++;
            }
        }
    }

    var ball = {
        x : 250,
        y : 200,
        vx : 0,
        vy : 5,
        radius: 10,
        color : 'goldenrod',
        draw : function() {

            ctx.beginPath();
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
            ctx.fill();
        },
        fall: function() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ball.draw();

            for (let i = 0; i < rewards.length; i++) {

                rewards[i].draw();
            }

            for (let i = 0; i < traps.length; i++) {

                traps[i].draw();
            }

            ball.y += ball.vy;
            ball.x += ball.vx;
            anim = window.requestAnimationFrame(ball.fall);

            playTime = time.minutes + ':' + time.seconds + ':' + time.milliseconds;
            p.innerHTML = playTime;

            if (ball.y + ball.vy + ball.radius > canvas.height) {
                
                if (ball.vy < .3) {

                    ball.vy = 0;
                }
                else {
                    
                    ball.vy = -ball.vy;
                    ball.vy *= .8;
                }
            }

            //SIDE BOUNDARIES
            if (ball.x + ball.vx + ball.radius > canvas.width || ball.x + ball.vx - ball.radius < 0) {
                
                if (ball.vx < 2 && ball.vx > -2) {

                    ball.vx = 0;
                }
                else {

                    ball.vx *= number;
                    ball.vx = -ball.vx;
                    number -= .3;
                }  
            }

            if (ball.x + ball.radius > canvas.width) {

                ball.x = canvas.width - ball.radius;
            }
            else if (ball.x - ball.radius < 0) {

                ball.x = 0 + ball.radius;
            }

            if (ball.vy != 0) {

                ball.vy += .3;
            }

            //COLLISION Ball - Rewards
            for( let i = 0; i < rewards.length; i++) {

                dx = ball.x - rewards[i].x;
                dy = ball.y - rewards[i].y;
        
                let distance = Math.sqrt(dx * dx + dy * dy);
        
                if (distance < ball.radius + rewards[i].radius) {
                    //console.log(rewards);

                    rewards.splice(i, 1);
                }
            }

            //COLLISION Ball - Traps
            for( let i = 0; i < traps.length; i++) {

                dx1 = ball.x - traps[i].x;
                dy1 = ball.y - traps[i].y;
        
                let distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
                if (distance < ball.radius + traps[i].radius) {

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.fillStyle = 'teal';
                    //ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.font = "72px Arial" ;
                    ctx.fillText('You Lose', 500, canvas.height / 2);
                    ctx.fill();

                    clearInterval(interval);
                    cancelAnimationFrame(anim);
                    return;
                }
            }

            if (rewards.length == 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.fillStyle = 'teal';
                //ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = "72px Arial" ;
                ctx.fillText('You Win', 500, canvas.height / 2);
                ctx.fill();

                $('form').show();

                $('#time').val(playTime);
                
                clearInterval(interval);
                cancelAnimationFrame(anim);
                return;
            }
        }
    }

    var rewards = []; 
    var traps = [];
    
    function getRandomInteger( min , max ) {

        return Math.floor(Math.random() * (max - min)  +min); 
    }

    function onClickLaunch() {

        if (toggle) {

            time = new Time();
            interval = setInterval(time.addMilliSecond.bind(time), 100);

            ball.draw();

            for (let i = 0; i < rewards.length; i++) {

                rewards[i].draw();
            }

            for (let i = 0; i < traps.length; i++) {

                traps[i].draw();
            }

            ball.fall();
            toggle = false;
        }
    }

    function onKeyMove(e) {

        //console.log(e);

        switch (e.key) {

            case 'ArrowRight':
                ImpulseRight();
                break;
            case 'ArrowLeft':
                ImpulseLeft();
                break;
            case 'ArrowUp':
                ImpulseUp();
                break;
            case ' ':
                onClickLaunch();
                break;
        } 
    }

    function ImpulseRight() {

        ball.vy = -2;
        ball.vx = 3;
    }

    function ImpulseLeft() {

        ball.vy = -2;
        ball.vx = -3;
    }

    function ImpulseUp() {

        ball.vy = -5;
        ball.vx *= .7;
    }


    button.addEventListener('click', onClickLaunch);
    document.addEventListener('keydown', onKeyMove);

    for (let i = 0; i < 15; i++) {
        rewards[i] = {
            x : getRandomInteger(0, 1000),
            y: getRandomInteger(0, 500),
            radius: 3.25,
            color : 'forestgreen',
            draw: function() {
    
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
                ctx.fill();
            }
        }
    }

    for (let i = 0; i < 10; i++) {

        traps[i] = {
            x : getRandomInteger(0, 1000),
            y: getRandomInteger(0, 500),
            radius: 5,
            color: 'firebrick',
            draw: function() {

                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
                ctx.fill();
            } 
        }
    }
}