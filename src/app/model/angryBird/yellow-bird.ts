import { Coordinate } from "../coordinate";
import { ElementRef } from "@angular/core";
import { Helper } from "src/app/helper/helper";
import { BirdState } from "src/app/DataTypes/bird-state.enum";

export class YellowBird {
    private static dx: number = 10;
    private static dy: number = 10;

    private xSpeed: number;
    private ySpeed: number;

    // Properties
    public position: Coordinate;
    public width: number;
    public height: number
    public state: BirdState;

    public angle: number;
    public speed: number;
    public imageResourse : ElementRef

    // Properties
    public get drawPosition(): Coordinate {
        if (this.position)
            return new Coordinate(this.position.x - this.width / 2, this.position.y - this.height/2);

        return null;
    }

    constructor(imageRes:ElementRef ) {
        this.height = 40;
        this.width = 60;
        this.position = new Coordinate(this.width/2, Helper.maxHeight - this.height/2);
        this.imageResourse = imageRes;
        this.state = BirdState.STAND_BY;
    }

    public checkLaunchHold(mouse: Coordinate) : void {
        if (this.state == BirdState.READY_TO_LAUNCH && this.onBird(mouse)) {
            this.state = BirdState.HOLD_TO_LAUNCH;
        }
    }

    public chechReadyLaunch(angle: number, mouse: Coordinate, launchCenter: Coordinate, context: CanvasRenderingContext2D) : void {
        if (this.state == BirdState.HOLD_TO_LAUNCH) {
            context.clearRect(0, 0, Helper.maxWidth, Helper.maxHeight);

            this.position.x = mouse.x;
            this.position.y = mouse.y;
            this.draw(context);

            let speed = Helper.distance(mouse, launchCenter)/ 10;

            //console.log(speed);

            this.xSpeed = speed * Math.cos(angle);
            this.ySpeed = speed * Math.sin(angle);

            console.log(speed + " " + this.xSpeed + " " + this.ySpeed);

            this.drawTrajectory(context);
        }
    }

    public checkClickToLaunch(mouse: Coordinate,launchCenter: Coordinate, context: CanvasRenderingContext2D) : void {
        if (this.state == BirdState.STAND_BY && this.onBird(mouse)) {
            this.drawLaunchReady(launchCenter, context);
            this.state = BirdState.READY_TO_LAUNCH;
        }
    }

    public checkLaunch(mouse: Coordinate,launchCenter: Coordinate, context: CanvasRenderingContext2D) : void {
        if (this.state == BirdState.HOLD_TO_LAUNCH && this.onBird(mouse)) {
            
            this.state = BirdState.LAUNCHED;
        }
    }

    public move(time): void {
        this.position.x += YellowBird.dx * this.xSpeed *  time;
        this.position.y -= YellowBird.dy * this.ySpeed * time;

        this.ySpeed = this.ySpeed - Helper.gravity * time;
    }

    public isBoundaryTouching(): boolean {
        if (this.position.x < 0)
            return true;

        if (this.position.x > Helper.maxWidth)
            return true

        if (this.position.y < 0)
            return true;

        if (this.position.y > Helper.maxHeight)
            return true

        return false;
    }

    public draw(context: CanvasRenderingContext2D) : void {
        context.drawImage(
            this.imageResourse.nativeElement,
            this.drawPosition.x,
            this.drawPosition.y,
            this.width,
            this.height);

            console.log(this.position)
    }

    private onBird(mouse: Coordinate) : boolean {
        console.log("DIstance:" + Helper.distance(mouse, this.drawPosition));
        if (Helper.distance(mouse, this.position) < this.width/2) {
            return true;
        }

        return false;
    }

    private drawTrajectory(context: CanvasRenderingContext2D): void {
        let x = this.drawPosition.x;
        let y = this.drawPosition.y;
        let ySpeed = this.ySpeed


        context.fillStyle = Helper.randomColor();
        var game = setInterval(() => { 
            //context.clearRect(0, 0, Helper.maxWidth, Helper.maxHeight);

            if (x > Helper.maxWidth || y > Helper.maxHeight) {
                clearInterval(game);
            }

            context.beginPath();
            context.arc(x + this.width/2, y + this.height/2, 2, 0, Math.PI*2);
            //context.fillStyle = Helper.randomColor();
            context.fill();
            context.closePath();

            x += YellowBird.dx * this.xSpeed *  .01;
            y -= YellowBird.dy * ySpeed * .1;

            ySpeed = ySpeed - Helper.gravity * .01;

            //console.log(x + "  " + y);
        }, 10);
    }

    private drawLaunchReady(launchCenter: Coordinate, context: CanvasRenderingContext2D): void {

        var x = setInterval(() => { 
            context.clearRect(0, 0, Helper.maxWidth, Helper.maxHeight);

            if (this.drawPosition.x < launchCenter.x) {
                this.position.x += 2;
            } else {
                clearInterval(x);
            }

            if (this.drawPosition.y > launchCenter.y) {
                this.position.y -=1;
            }

            this.draw(context);
        }, 10);
    }
}
