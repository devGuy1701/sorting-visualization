let width = 600;
let height = 600;
let w;
let n = 200;

let v = [];

function setup() {
    createCanvas(width, height);
    w = width / n;
    for(let i = 0; i < n; i++){
        let h = random(height - 100);
        v.push({h, color: 255});
    }
}

function draw() {
    background(0);

    for(let i = 0; i < n; i++) {
        fill(v[i].color);
        strokeWeight(0);
        //stroke(125);
        rect(i*w,height-v[i].h,w,v[i].h);
        
    }

    sequential();
    //bubble();

}

function sleep(ms)  {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}


async function swappingElement(i, j) {
    let tmp = v[i];
    v[i] = v[j];
    v[j] = tmp;
    await sleep(100)
}

async function sequential() {
    let iter, count, max;

    for(iter = 0; iter < n - 1; iter++) {
        for(count = 1, max = 0; count < n -iter; count++)
            if(v[count].h > v[max].h)
                max = count;
        await swappingElement(max, n - iter - 1);
    }

}

async function bubble() {
    let iter, count;
    let swap;
    iter = 0;

    do {
        for(count = 0, swap = 0; count < n - iter - 1;count++) {
            if(v[count].h > v[count+1].h) {
                swap = 1;
                await swappingElement(count, count+1);
            }
        }
        iter++;
    } while(swap == 1);

}