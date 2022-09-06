class grid {
    constructor(cs) {
        let h_divisors = [1]
        let w_divisors = [1]
        
        // obtenhos os divisores das dimensões e pego
        // o primeiro divisor igual ou maior a dimensão exigida
        // pelo usuário.. ou seja, a dimensão de cada célular
        // não necessariamente será cs x cs
        for(var i = 2; i <= Math.sqrt(height); i++) {
            if(height % i == 0) {
                h_divisors.push(i)
                if(i != height/i) {
                    h_divisors.push(height/i)
                }
            }
        }
        
        for(i = 2; i <= Math.sqrt(width); i++) {
            if(width % i == 0) {
                w_divisors.push(i)
                if(i != width/i) {
                    w_divisors.push(width/i)
                }
            }
        }
        
        h_divisors.sort((a, b) => {
            return a > b ? 1 : a < b ? -1 : 0
        })
        
        w_divisors.sort((a, b) => {
            return a > b ? 1 : a < b ? -1 : 0
        })
        
        this.cell_h = h_divisors.filter((e) => e >= cs)[0]
        this.cell_w = w_divisors.filter((e) => e >= cs)[0]
        
        this.cells = Array((height/this.cell_h) * (width/this.cell_w)).fill(0)
        console.log(this.cells)
    }

    // essa callback function é chamada passando-se o label da célula, as coordenadas necessárias
    // para se desenhar o rect e o tamanho do rect
    draw(color_pixel) {
        // desenha a grade
        for(var i = 0 ; i <= width; i += this.cell_w) {
            line(i, 0, i, height);
        }

        for(i = 0 ; i <= height; i += this.cell_h) {
            line(0, i, width, i);
        }

        let [x, y] = [Math.ceil(winMouseX/this.cell_w)-1, Math.ceil(winMouseY/this.cell_h)-1]
        
        if(mouseIsPressed === true) {
            if (mouseButton === LEFT) {
                this.cells[this.w * y + x] = 1;
            } else if(mouseButton === RIGHT) {
                this.cells[this.w * y + x] = 0;
            }
        }

        for(i = 0; i < this.cells.length; i++) {
            color_pixel(this.cells[i], (i % this.w) * this.cell_w,
                        Math.floor(i / this.w) * this.cell_h, this.cell_h, this.cell_w);
        }
    }

    set_pos(x, y, val) {
        this.cells[this.w * y + x] = val;
    }

    get_pos(x, y) {
        return this.cells[this.w * y + x];
    }

    get w() {
        return width/this.cell_w;
    }

    get h() {
        return height/this.cell_h;
    }
}   

let cells

let ok = 0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let source;
let destine;

async function dfs(sx, sy, dx, dy) {
    if(sx == dx && sy == dy) {
        cells.set_pos(sx, sy, 3);
        ok = 1
        return;
    }

    if(sx >= cells.w || sy >= cells.h || sx < 0 || sy < 0 || ok || 
           cells.get_pos(sx, sy) == 2 || cells.get_pos(sx, sy) == 1) {
        return;
    }

    if(sx != source[0] || sy != source[1]) {
        cells.set_pos(sx, sy, 2); 
    }

    await sleep(100);

    dfs(sx+1, sy, dx, dy);
    dfs(sx, sy+1, dx, dy);
    dfs(sx-1, sy, dx, dy);
    dfs(sx, sy-1, dx, dy);
}

function setup() {
    createCanvas(window.screen.width-100, window.screen.height-200);
    cells   = new grid(20)
  
    source  = [Math.floor(random(cells.w)), Math.floor(random(cells.w))]
    destine = [Math.floor(random(cells.w)), Math.floor(random(cells.w))]
  
    console.log(source)
  
    cells.set_pos(...source, 4);
    cells.set_pos(...destine, 3);
  
    dfs(...source, ...destine);
}

function draw() {
    background(220);
    cells.draw((c, x, y, h, w) => {
        switch(c) {
            case 0: {
                fill(color(220));
                rect(x, y, w, h);
                break;
            }
            
            case 1: {
                fill(color(65));
                rect(x, y, w, h);
                break;
            }

            case 2: {
                fill(color(120, 0, 120));
                rect(x, y, w, h);
                break;
            }

            case 3: {
                fill(color(0, 220, 0));
                rect(x, y, w, h);
                break;
            }
            
            case 4: {
                fill(color(200, 220, 0));
                rect(x, y, w, h);
                break;
            }
        }
    })
}