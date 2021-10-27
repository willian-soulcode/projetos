let totalSlides = document.querySelectorAll('.item').length;
let slide_atual = 0;

//ajustar a largura fixa do painel

// let tamanhoPainel = document.querySelector(".painel").clientWidth;

// document.querySelector('.largura_painel').style.width =
//     `${tamanhoPainel * totalSlides}px`;

// document.querySelector('.controle').style.width =
//     `${tamanhoPainel}px`;


//ajustar a largura dinâmica do painel
document.querySelector('.largura_painel').style.width =
    `calc(100vw * ${totalSlides})`;

//ajuste dos controles do painel com altura dinâmica
document.querySelector('.controle').style.height =
    `${document.querySelector('.painel').clientHeight}px`;


function anterior() {
    slide_atual--;
    if (slide_atual < 0) {
        slide_atual = totalSlides - 1;
    }
    atualizarMargem();
}

function proximo() {
    slide_atual++;
    if (slide_atual > (totalSlides - 1)) {
        slide_atual = 0;
    }
    atualizarMargem();
}

function atualizarMargem() {
    let larguraItem = document.querySelector('.item').clientWidth;
    let novaMargem = (slide_atual * larguraItem);
    document.querySelector('.largura_painel').style.marginLeft =
        `-${novaMargem}px`;
}

setInterval(proximo, 5000);//passa as fotos automaticamente

