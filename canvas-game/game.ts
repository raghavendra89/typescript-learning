type Brick = {
    x: number,
    y: number,
    status: number
}

type UiParams = {
    // Ball radius is constant
    ballRadius: 10,
    brickColumnCount: number,
    brickRowCount: number,
    brickWidth: number,
    brickHeight: number,
    brickPadding: number,
    bricks: Array<Array<Brick>>,
    paddleWidth: number,
    paddleHeight: number
}

type GameState = {
    x: number,
    y: number,
    dx: number,
    dy: number,
    paddleX: number,
    rightPressed: boolean,
    leftPressed: boolean,
    score: number,
    lives: number
}

interface GameBoard {
    draw(): void,
    play(): void,
    resetGame(): void,
    updateStats(): void
}

class Game implements GameBoard {
    gameState!: GameState;

    defaultParams: UiParams = {
        ballRadius: 10,
        brickColumnCount: 8,
        brickRowCount: 5,
        brickWidth: 59,
        brickHeight: 20,
        brickPadding: 1,
        bricks: [],
        paddleWidth: 75,
        paddleHeight: 10
    }
    params: UiParams;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, params: UiParams) {
        this.canvas = canvas;
        this.params = {...this.defaultParams, ...params};

        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("mousemove", this.mouseMoveHandler, false);

        this.resetGame();
    }

    keyDownHandler: (e: KeyboardEvent) => void = (e) =>  {
        if(e.code  == "ArrowRight") {
            this.gameState.rightPressed = true;
        }
        else if(e.code == 'ArrowLeft') {
            this.gameState.leftPressed = true;
        }
    }

    keyUpHandler: (e: KeyboardEvent) => void = (e) =>  {
        if(e.code == 'ArrowRight') {
            this.gameState.rightPressed = false;
        }
        else if(e.code == 'ArrowLeft') {
            this.gameState.leftPressed = false;
        }
    }

    mouseMoveHandler: (e: MouseEvent) => void = (e) =>  {
        var relativeX = e.clientX - this.canvas.offsetLeft;
        if(relativeX > 0 && relativeX < this.canvas.width) {
            this.gameState.paddleX = relativeX - this.params.paddleWidth/2;
        }
    }

    resetGame: () => void = () => {
        this.gameState = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 20,
            dx: 4,
            dy: -4,
            paddleX: (this.canvas.width - this.params.paddleWidth) / 2,
            rightPressed: false,
            leftPressed: false,
            score: 0,
            lives: 3
        };

        for(var c=0; c<this.params.brickRowCount; c++) {
            this.params.bricks[c] = [];
            for(var r=0; r<this.params.brickColumnCount; r++) {
                this.params.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    updateStats: () => void = () => {
        (document.getElementById('score') as HTMLElement)
                .innerText = this.gameState.score.toString();

        (document.getElementById('lives') as HTMLElement)
                .innerText = this.gameState.lives.toString();
    }

    draw: () => void = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.updateStats();
    }

    play: () => void = () => {
        this.draw();

        if (! this.gameState.lives) {
            alert("GAME OVER");
            return;
        }

        if (this.gameState.score == this.params.brickColumnCount*this.params.brickRowCount) {
            // If there are no bricks left, then the game is won
            alert("YOU WIN, CONGRATS!");
            return;
        }

        this.collisionDetection();

        if(this.gameState.x + this.gameState.dx > this.canvas.width-this.params.ballRadius || this.gameState.x + this.gameState.dx < this.params.ballRadius) {
            this.gameState.dx = -this.gameState.dx;
        }
        if(this.gameState.y + this.gameState.dy < this.params.ballRadius) {
            this.gameState.dy = -this.gameState.dy;
        }
        else if(this.gameState.y + this.gameState.dy > this.canvas.height-this.params.ballRadius) {
            if(this.gameState.x > this.gameState.paddleX && this.gameState.x < this.gameState.paddleX + this.params.paddleWidth) {
                this.gameState.dy = -this.gameState.dy;
            }
            else {
                this.gameState.lives--;
                if(this.gameState.lives) {
                    this.gameState.x = this.canvas.width/2;
                    this.gameState.y = this.canvas.height-30;
                    this.gameState.dx = 4;
                    this.gameState.dy = -4;
                    this.gameState.paddleX = (this.canvas.width-this.params.paddleWidth)/2;
                }
            }
        }

        if(this.gameState.rightPressed && this.gameState.paddleX < this.canvas.width-this.params.paddleWidth) {
            this.gameState.paddleX += 7;
        }
        else if(this.gameState.leftPressed && this.gameState.paddleX > 0) {
            this.gameState.paddleX -= 7;
        }

        this.gameState.x += this.gameState.dx;
        this.gameState.y += this.gameState.dy;
        requestAnimationFrame(this.play);
    }

    drawBricks: () => void = () => {
        for(var c=0; c<this.params.brickRowCount; c++) {
            for(var r=0; r<this.params.brickColumnCount; r++) {
                if(this.params.bricks[c][r].status == 1) {
                    var brickX = (r*(this.params.brickWidth+this.params.brickPadding));
                    var brickY = (c*(this.params.brickHeight+this.params.brickPadding));
                    this.params.bricks[c][r].x = brickX;
                    this.params.bricks[c][r].y = brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, this.params.brickWidth, this.params.brickHeight);
                    this.ctx.fillStyle = "#C26B41";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    drawBall: () => void = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.gameState.x, this.gameState.y, this.params.ballRadius, 0, Math.PI*2);
        this.ctx.fillStyle = "#263238";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPaddle: () => void = () => {
        this.ctx.beginPath();

        this.ctx.rect(
            this.gameState.paddleX,
            this.canvas.height-this.params.paddleHeight,
            this.params.paddleWidth,
            this.params.paddleHeight
        );

        this.ctx.fillStyle = "#263238";
        this.ctx.fill();
        this.ctx.closePath();
    }

    collisionDetection: () => void = () => {
        for(var c=0; c<this.params.brickRowCount; c++) {
            for(var r=0; r<this.params.brickColumnCount; r++) {
                var b = this.params.bricks[c][r];
                if(b.status == 1) {
                    if(this.gameState.x > b.x && this.gameState.x < b.x+this.params.brickWidth && this.gameState.y > b.y && this.gameState.y < b.y+this.params.brickHeight) {
                        this.gameState.dy = -this.gameState.dy;
                        b.status = 0;
                        this.gameState.score++;
                    }
                }
            }
        }
    }
}

const canvas: HTMLCanvasElement = document.getElementById('my-canvas') as HTMLCanvasElement;

const game: Game = new Game(
                        canvas,
                        {
                            ballRadius: 10,
                            brickColumnCount: 8,
                            brickRowCount: 5,
                            brickWidth: 59,
                            brickHeight: 20,
                            brickPadding: 1,
                            bricks: [],
                            paddleWidth: 75,
                            paddleHeight: 10
                        }
                    );
game.draw();

(document.getElementById('start-game') as HTMLElement)
        .addEventListener('click', () => {
            game.resetGame();
            game.play();
        });