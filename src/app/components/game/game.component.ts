import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Snake } from '../../model/snake';
import { Food } from '../../model/food';
import { Direction } from '../../DataTypes/direction.enum';
import { Helper } from 'src/app/helper/helper';
import { KeyCode } from 'src/app/DataTypes/key-code.enum';
import { Router } from '@angular/router';

var gameLoop;
var soundLoop;

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {
    public snake: Snake;
    public food: Food;
    public score: number;
    public borderWidth: number = Helper.maxWidth;
    public borderHeight: number = Helper.maxHeight;

    @ViewChild('myCanvas') public canvas: ElementRef;
    @ViewChild('tidda') public snakeImg: ElementRef;
    @ViewChild('snakeRight') public snakeRightImg: ElementRef;
    @ViewChild('bug') public foodImg: ElementRef;
    @ViewChild('boom') public boomImg: ElementRef;
    @ViewChild('tasty') public tastyImg: ElementRef;

    @ViewChild('cricketAudio') snakeAudio: ElementRef;
    @ViewChild('explosionAudio') explosionAudio: ElementRef;
    @ViewChild('yummyAudio') yummyAudio: ElementRef;
    @ViewChild('diceRollAudio') diceRollAudio: ElementRef;

    private context: CanvasRenderingContext2D;
    private snakeImageRef: ElementRef;

    public constructor(private router: Router) { 
        this.score = 0;
        this.snake = new Snake();
        this.food = new Food();
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        switch(event.keyCode) {
            case KeyCode.DOWN_ARROW:
                this.snake.changeDirection(Direction.Down);
                break;
                
            case KeyCode.UP_ARROW:
                this.snake.changeDirection(Direction.Up);
                break;
                
            case KeyCode.RIGHT_ARROW:
                this.snake.changeDirection(Direction.Right);
                this.snakeImageRef = this.snakeRightImg;
                break;
                
            case KeyCode.LEFT_ARROW:
                this.snake.changeDirection(Direction.Left);
                this.snakeImageRef = this.snakeImg;
                break;
        }
    }
  
    public ngAfterViewInit(): void {
        this.setCanvas();

        this.runGame();
        this.playBackgroundAudio();
    }

    // #region Game rules
    private runGame(): void {
        gameLoop = setInterval(() => {
            this.context.clearRect(0, 0, this.borderWidth, this.borderHeight);

            if (this.snake.checkCollision()) {
                this.drawCollision();
                this.playExplosionAudio();
    
                // Stop game.
                setTimeout(() => {
                    clearInterval(gameLoop);
                    clearInterval(soundLoop);
                    this.router.navigate([""]);
                }, 800)
            } else if (this.snake.canEat(this.food)) {
                this.score++;
                this.playYummyAudio();
                this.drawTasty();
                this.playDiceRollAudio();

                setTimeout(() => {
                    this.food.generateNew();
                    this.draw();
                }, 400)
            } else {
                this.snake.move();
                this.draw();
            }
        }, 10);
    }

    // #endregion 

    // #region Play Sound
    private playBackgroundAudio(): void {
        soundLoop = setInterval(() => {
            this.snakeAudio.nativeElement.play();
        }, 10);
    }

    private playExplosionAudio(): void {
        this.explosionAudio.nativeElement.play();
    }

    private playYummyAudio(): void {
        this.yummyAudio.nativeElement.play();
    }

    private playDiceRollAudio(): void {
        this.diceRollAudio.nativeElement.play();
    }
    
    // #endregion

    // #region Draw logic

    private draw(): void {
        if (this.snake.direction == Direction.Right) {
            this.drawSnake();
        } else {
            this.context.drawImage(
                this.snakeImageRef.nativeElement, 
                this.snake.drawPosition.x,
                this.snake.drawPosition.y,
                this.snake.size, 
                this.snake.size);
        }

        this.context.drawImage(
            this.foodImg.nativeElement, 
            this.food.drawPosition.x,
            this.food.drawPosition.y,
            this.food.size, 
            this.food.size);
    }

    private drawCollision(): void {
        this.context.drawImage(
            this.boomImg.nativeElement, 
            this.snake.position.x - 100, 
            this.snake.position.y - 100, 
            200, 
            200);
    }

    private drawTasty(): void {
        this.context.drawImage(
            this.tastyImg.nativeElement, 
            this.food.position.x - 100, 
            this.food.position.y - 100, 
            200, 
            200);
    }

    private setCanvas(): void {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    
        // set the width and height
        canvasEl.width = this.borderWidth;
        canvasEl.height = this.borderHeight;

        this.context = this.canvas.nativeElement.getContext('2d');

        this.snakeImageRef = this.snakeImg;
    }

    private drawSnake(): void {
        //this.context.save();

        // rotate the canvas to the specified degrees
        //this.context.rotate(90 * Math.PI/180);

        // move to the center of the canvas
        //this.context.translate(600, 300);

        // draw the image
        // since the context is rotated, the image will be rotated alsothis.context.drawImage(
        this.context.drawImage(
            this.snakeImageRef.nativeElement,
            this.snake.drawPosition.x,
            this.snake.drawPosition.y,
            this.snake.size,
            this.snake.size);

        // we’re done with the rotating so restore the unrotated context
        //this.context.restore();
    }
    // #endregion
}
