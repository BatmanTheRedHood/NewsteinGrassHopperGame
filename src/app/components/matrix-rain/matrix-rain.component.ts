import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BubbleFade } from 'src/app/model/bubblesFade/bubble-fade';
import { Coordinate } from 'src/app/model/coordinate';
import { Helper } from 'src/app/helper/helper';
import { BubbleFadeComponent } from '../bubble-fade/bubble-fade.component';
import { MatrixSymbol } from 'src/app/model/maticx/matrix-symbol';

var gameLoop;
var soundLoop;

@Component({
    selector: 'app-matrix-rain',
    templateUrl: './matrix-rain.component.html',
    styleUrls: ['./matrix-rain.component.css']
})
export class MatrixRainComponent implements OnInit, AfterViewInit, OnDestroy {
    private static colSize: number = 20;
    private static matrixMaxCount: number = Helper.doubleToInt(Helper.maxWidth / MatrixRainComponent.colSize);

    @ViewChild('myCanvas') public canvas: ElementRef;

    public context: CanvasRenderingContext2D;
    public maticxs: MatrixSymbol[];

    public constructor() {
        this.maticxs = [];
    }

    public ngOnInit(): void {
        for (let i = 0; i < MatrixRainComponent.matrixMaxCount; i++)
        this.maticxs.push(new MatrixSymbol(i * MatrixRainComponent.colSize));
    }

    public ngAfterViewInit(): void {
        this.setCanvas();

        this.runGame();
        //this.playBackgroundAudio();
    }

    // #region Game rules
    private runGame(): void {
        gameLoop = setInterval(() => {
            this.context.fillStyle = 'rgba(0, 0, 0, 0.01)';
            this.context.fillRect(0, 0, Helper.maxWidth, Helper.maxHeight);
            //this.context.clearRect(0, 0, Helper.maxWidth, Helper.maxHeight);

            for (let i = this.maticxs.length - 1; i >= 0; i--) {
                this.maticxs[i].update();
            }

            this.drawText();
        }, 10);
    }

    // #endregion

    // #region Draw logic

    private drawText(): void {
        for (let i = 0; i < this.maticxs.length; i++) {
            if (this.maticxs[i].head.y <= Helper.maxHeight + this.maticxs[i].font) {
                // Draw metrix
                if (this.maticxs[i].speedCounter <= 0) {
                    this.context.font = "bold " + this.maticxs[i].font + "px Arial";
                    this.context.fillStyle = Helper.matrixColors[this.maticxs[i].colorIndex];
                    //this.context.f
                    this.context.fillText(this.maticxs[i].nextChar, this.maticxs[i].head.x, this.maticxs[i].head.y);

                    // this.context.fillStyle = 'rgba(255, 255, 255, 1.0)';
                    // this.context.fillRect(
                    //     this.maticxs[i].head.x, this.maticxs[i].head.y , 
                    //     this.maticxs[i].head.x + this.maticxs[i].font, this.maticxs[i].head.y);

                    this.drawCircle(this.maticxs[i].head, this.maticxs[i].font / 2);

                    this.context.font = (this.maticxs[i].font - 2) + "px Arial";
                    this.context.fillStyle = this.context.fillStyle = Helper.matrixColors[this.maticxs[i].colorIndex + 1];
                    this.context.fillText(this.maticxs[i].currentChar, this.maticxs[i].head.x, this.maticxs[i].head.y - this.maticxs[i].font);
                }
            } else if (this.maticxs[i].tail.y <= Helper.maxHeight + 4 * this.maticxs[i].font) {
                // Delete matricx;
                this.context.fillStyle = 'rgba(255, 255, 255, 1.0)';
                this.drawCircle(this.maticxs[i].tail, this.maticxs[i].font);
               
            } else {
                // Remove matrix and add new
                this.maticxs.splice(i, 1, new MatrixSymbol(i * MatrixRainComponent.colSize));
            }
        }
    }

    private drawCircle(position: Coordinate, radius: number): void {
        this.context.beginPath();
        this.context.arc(
            position.x + radius,
            position.y - 3 * radius,
            radius + 4,
            0,
            Math.PI * 2,
            false);

        this.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
        this.context.fill();
        this.context.closePath();
    }

    private setCanvas(): void {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

        // set the width and height
        canvasEl.width = window.innerWidth; //Helper.maxWidth;
        canvasEl.height = window.innerHeight; //Helper.maxHeight;

        this.context = this.canvas.nativeElement.getContext('2d');
    }

    // #endregion


    public ngOnDestroy(): void {
        clearInterval(gameLoop);
        clearInterval(soundLoop);
    }
}