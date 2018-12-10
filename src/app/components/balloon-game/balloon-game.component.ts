import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { KeyCode } from 'src/app/DataTypes/key-code.enum';
import { Direction } from 'src/app/DataTypes/direction.enum';
import { Helper } from 'src/app/helper/helper';
import { Gun } from 'src/app/model/balloonGame/gun';
import { Balloon } from 'src/app/model/balloonGame/balloon';

var gameLoop;
var soundLoop;

@Component({
    selector: 'app-balloon-game',
    templateUrl: './balloon-game.component.html',
    styleUrls: ['./balloon-game.component.css']
})
export class BalloonGameComponent implements OnInit, AfterViewInit, OnDestroy {

    // #region Images and Sound element
    @ViewChild('myCanvas') public canvas: ElementRef;
    @ViewChild('gunImg') public gunImg: ElementRef;
    @ViewChild('bulletImg') public bulletImg: ElementRef;

    @ViewChild('darkRedBalloonImg') public darkRedBalloonImg: ElementRef;
    @ViewChild('redBalloonImg') public redBalloonImg: ElementRef;
    @ViewChild('pinkBalloonImg') public pinkBalloonImg: ElementRef;
    @ViewChild('blueBalloonImg') public blueBalloonImg: ElementRef;
    @ViewChild('darkGreenBalloonImg') public darkGreenBalloonImg: ElementRef;
    @ViewChild('greenBalloonImg') public greenBalloonImg: ElementRef;
    @ViewChild('lightGreenBalloonImg') public lightGreenBalloonImg: ElementRef;
    @ViewChild('goldenBalloonImg') public goldenBalloonImg: ElementRef;
    @ViewChild('heartBalloonImg') public heartBalloonImg: ElementRef;

    @ViewChild('bulletAudio') public bulletAudio: ElementRef;
    @ViewChild('burstAudio') public burstAudio: ElementRef;
    @ViewChild('eggCatchAudio') public eggCatchAudio: ElementRef;

    // #endregion

    private context: CanvasRenderingContext2D;
    private static interval: number = 100;
    private static counter: number = 0;
    private static level: number = 10;

    public gun: Gun;
    public balloons: Balloon[];

    public constructor() {
        this.gun = new Gun();
        this.balloons = [];
    }

    public ngOnInit(): void {
    }

    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        switch (event.keyCode) {
            case KeyCode.UP_ARROW:
                this.gun.move(Direction.Up)
                break;

            case KeyCode.DOWN_ARROW:
                this.gun.move(Direction.Down)
                break;

            case KeyCode.F_KEY:
                if (this.gun.fire()) {
                    this.playBulletAudio();
                } else {
                    this.playEggCatchAudio();
                }

                break;
        }
    }

    public ngAfterViewInit(): void {
        this.setCanvas();

        this.balloons.push(new Balloon(this.darkRedBalloonImg));
        this.runGame();
        //this.playBackgroundAudio();
    }

    // #region Game rules
    private runGame(): void {
        gameLoop = setInterval(() => {
            this.context.clearRect(0, 0, Helper.maxWidth, Helper.maxHeight);

            this.checkAndAddBalloon();

            if (this.gun.bullet) {
                this.gun.moveBullet();
            }

            for (let i = 0; i < this.balloons.length; i++) {
                this.balloons[i].move();
            }

            this.draw();
        }, 10);
    }

    private checkAndAddBalloon() {
        if ((BalloonGameComponent.counter * BalloonGameComponent.level) > BalloonGameComponent.interval) {
            //this.playLayEggAudio();
            this.balloons.push(new Balloon(this.randomBalloon()));
            BalloonGameComponent.counter = 0;
            BalloonGameComponent.interval = Helper.random(100, 1000);
        }

        BalloonGameComponent.counter++;
    }
    // #endregion

    private playBulletAudio(): void {
        this.bulletAudio.nativeElement.play();
    }

    private playEggCatchAudio(): void {
        this.eggCatchAudio.nativeElement.play();
    }

    // #region Draw logic

    private draw(): void {
        this.context.drawImage(
            this.gunImg.nativeElement,
            this.gun.drawPosition.x,
            this.gun.drawPosition.y,
            this.gun.width,
            this.gun.height);

        if (this.gun.bullet) {
            this.context.drawImage(
                this.bulletImg.nativeElement,
                this.gun.bullet.drawPosition.x,
                this.gun.bullet.drawPosition.y,
                this.gun.bullet.width,
                this.gun.bullet.heigth);
        }

        for (let i = 0; i < this.balloons.length; i++) {
            this.context.drawImage(
                this.balloons[i].drawImg.nativeElement,
                this.balloons[i].drawPosition.x,
                this.balloons[i].drawPosition.y,
                this.balloons[i].width,
                this.balloons[i].height);
        }
    }

    private setCanvas(): void {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

        // set the width and height
        canvasEl.width = Helper.maxWidth;
        canvasEl.height = Helper.maxHeight;

        this.context = this.canvas.nativeElement.getContext('2d');
    }

    // #endregion

    public ngOnDestroy() : void {
        clearInterval(gameLoop);
        clearInterval(soundLoop);
    }

    private randomBalloon() : ElementRef {
        let rand: number = Helper.randomInt(0, 8);

        switch(rand) {
            case 0:
                return this.darkRedBalloonImg;
            case 1:
                return this.redBalloonImg;
            case 2:
                return this.pinkBalloonImg;
            case 3:
                return this.blueBalloonImg;
            case 4:
                return this.darkGreenBalloonImg;
            case 5:
                return this.greenBalloonImg;
            case 6:
                return this.lightGreenBalloonImg;
            case 7:
                return this.goldenBalloonImg;
            case 8:
                return this.heartBalloonImg;
        }
    }
}
