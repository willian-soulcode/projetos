//CONTROLE DE INTERFACE
let seuVotoPara = document.querySelector('.tela-superior-1 span');
let cargo = document.querySelector('.tela-superior-cargo span');
let descricao = document.querySelector('.tela-superior-infor');
let aviso = document.querySelector('.tela-inferior');
let lateral = document.querySelector('.tela-superior-direita');
let numeros = document.querySelector('.tela-superior-numero');

//CONTROLE DE AMBIENTE
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

//FUNÇÕES
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    // console.log("Atualizando Interface");
    // console.log(numero);
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        // console.log("Candidato", candidato);
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="tela-superior-imagem small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="tela-superior-imagem"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        fotosHtml += `<span>Imagens retiradas do site: https://arteref.com/desenho/os-38-desenhos-animados-que-marcaram-sua-infancia/</span>`;
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let num = document.querySelector('.numero.pisca');
    if (num !== null) {
        num.innerHTML = n;
        numero = `${numero}${n}`;

        num.classList.remove('pisca');
        if (num.nextElementSibling !== null) {
            num.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        console.log("Confirmando como BRANCO...");
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confirmando como " + numero);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        // console.log(etapas[etapaAtual]);
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            // console.log("FIM");
            document.querySelector('.tela').innerHTML='<div class="aviso-gigante">FIM</div>';;
            console.log(votos);
        }
    }
}

comecarEtapa();