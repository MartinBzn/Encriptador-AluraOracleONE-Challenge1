var texto = document.getElementById("textoIngresado");
var respuesta = document.getElementById("encriptado");
var botonEncriptar = document.getElementById("encriptar");
var botonDesencriptar = document.getElementById("desencriptar");
var botonCopiar = document.getElementById("copiar");
const letras = ['a','e','i','o','u'];
const cambio = ['ai','enter','imes','ober','ufat'];
var ventanaError = document.getElementById("ventana-dialogo");
var botonCerrarVentana = document.getElementById("cerrar-ventana");


function esMayusculaOAcentuada(){
   
    ventanaError.showModal();
    botonCerrarVentana.addEventListener('click',function(){
        ventanaError.close();
    })
    texto.focus();
    return false;
}

function validarTexto(textoAValidar){
    var validacion = true;
    var acentuadas = ['á','é','í','ó','ú'];
    if (textoAValidar != textoAValidar.toLowerCase()){
        validacion = false;
    }
    for (var i = 0; i < acentuadas.length;i++){
        if (textoAValidar.search(acentuadas[i]) != -1){
            validacion = false;
        }
    }
    return validacion;
}

function realizarReemplazos(textoAReemplazar,reemplazables,reemplazos){
    var textoProcesado ='';
    if (validarTexto(textoAReemplazar.value)){
        textoProcesado = (textoAReemplazar.value).replaceAll(reemplazables[1],reemplazos[1]).replaceAll(reemplazables[2],reemplazos[2]).replaceAll(reemplazables[0],reemplazos[0]).replaceAll(reemplazables[3],reemplazos[3]).replaceAll(reemplazables[4],reemplazos[4]);
        respuesta.focus();
        respuesta.value = textoProcesado;
        
    }else{
        esMayusculaOAcentuada();
    }
}

function encriptar(){
    realizarReemplazos(texto,letras,cambio);
}

function desencriptar(){    
    realizarReemplazos(texto,cambio,letras);
}

function copiarAlPortapapeles(){
    respuesta.select();
    document.execCommand('copy');
    window.alert('Elemento copiado al portapapeles')
    texto.focus();
    respuesta.value='';
}

botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;
botonCopiar.onclick = copiarAlPortapapeles;

respuesta.addEventListener('blur',function(event){
    this.classList.add('encriptado-vacio');
})
respuesta.addEventListener('focus',function(event){
    this.classList.remove('encriptado-vacio');
})
