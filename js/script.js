var texto = document.getElementById("textoIngresado");
var respuesta = document.getElementById("encriptado");
var botonEncriptar=document.getElementById("encriptar");
var botonDesencriptar = document.getElementById("desencriptar");
var botonCopiar = document.getElementById("copiar");
const letras=['a','e','i','o','u'];
const cambio=['ai','enter','imes','ober','ufat'];  

function otrosCaracteres(car){
    if ((car >= 'a' && car <='z') || (car == ' ') || (car >= '0' && car <= '9')){
        return car;
    }else{
        return '';
    }
}

function seCambia(car,letras){
    var encontrado=false;
    for(var j=0; j < letras.length ;j++){
        if (car == letras[j]){
            encontrado=true;
            return j;
            break;
        }
    }
    if(!encontrado){
        return -1;
    }
}


function esMayusculaOAcentuada(){
    alert('Solo se permiten minúsuculas y sin acento.');
    texto.focus();
    return false;
}

function encriptar(){
    
    var textoRespuesta ='';
    var aux ='';
    var pos = 0;
    var pegar = true;
    for (var i=0;i< texto.value.length;i++){
        pos = seCambia(texto.value[i],letras);
        if(pos >= 0){
            textoRespuesta+=cambio[pos];
        }else{
            aux = otrosCaracteres(texto.value[i])
            if (aux == ''){
                pegar=esMayusculaOAcentuada();
                break;
            }else{
                textoRespuesta+=aux;
            }
        }
    }
    if (pegar){
        document.getElementById("encriptado").value = textoRespuesta;
    }
}

function determinarSalto(pos){
    switch (pos){
        case 0:
            return 1;
            break;
        case 1:
            return 4;
            break;
        case 2:
        case 3:
        case 4:
            return 3;
            break;
    }
}

function saltarPosiciones(pos,posTexto){
    var saltar = 0;
    var aux ='';
    var encontrado=false;
    saltar = determinarSalto(pos);
    i=posTexto;
    while (i <= (posTexto + saltar) && i < texto.value.length ){
        aux += texto.value[i];
        if(otrosCaracteres(texto.value[i]) == ''){
            saltar = -1;
            break;
        }
        i++;
    }

    if (saltar > 0){
        for(var i=0; i<=cambio.length;i++){
            if (aux == cambio[i]){
                encontrado=true;
            }
        }
        if (!encontrado){
            saltar = 0;
        }
    }

    return saltar
}

function desencriptar(){
    var textoRespuesta='';
    var pos = 0;
    var saltar = 0;
    var aux='';
    var pegar = true;
    for (var i=0;i < texto.value.length;i++){
        pos = seCambia(texto.value[i],letras);
        if (pos >= 0){
            textoRespuesta+=letras[pos];
            saltar = saltarPosiciones(pos,i);
            if (saltar >= 0){;
                i+=saltar;
            }else{
                pegar = esMayusculaOAcentuada();
                break;
            }
        }else{
            aux = otrosCaracteres(texto.value[i])
            if (aux == ''){
                pegar = esMayusculaOAcentuada();
                break;
            }else{
                textoRespuesta+=aux;
            }
        }
    }
    if (pegar){
        document.getElementById("encriptado").value = textoRespuesta;
    }
}

function copiarAlPortapapeles(){
    respuesta.select();
    document.execCommand('copy');
    window.alert('Elemento copiado al portapapeles')
}
        
botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;
botonCopiar.onclick = copiarAlPortapapeles;
