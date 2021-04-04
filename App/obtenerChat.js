const mensajeInicial = '<span></span><div class="_24wtQ _1KcEQ _2kR4B"><div class="_3XpKm"><div role="button"><span><div class="_2tZna"><span data-testid="lock-small" data-icon="lock-small" class=""><svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><path d="M5.008 1.6c1.375 0 2.501 1.074 2.586 2.427l.005.164v1.271h.158c.585 0 1.059.48 1.059 1.07v3.351c0 .59-.474 1.07-1.059 1.07h-5.5c-.582 0-1.057-.48-1.057-1.07V6.531c0-.59.474-1.069 1.058-1.069h.158V4.191c0-1.375 1.075-2.501 2.429-2.586l.163-.005zm0 1.248c-.696 0-1.272.534-1.337 1.214l-.006.129-.002 1.271H6.35l.001-1.271c0-.653-.47-1.2-1.088-1.319l-.126-.018-.129-.006z" fill="currentColor"></path></svg></span></div><span dir="ltr" class="_3-8er">Los mensajes están cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera WhatsApp, puede leerlos ni escucharlos. Haz clic para obtener más información.</span></span></div><span></span></div></div>';
const TEXTOANTESDEFECHA = '<div class="_24wtQ _2kR4B"><span dir="auto" class="_3-8er">';
const TEXTODESPUESDEFECHA = "</span>";
let objMensaje = new Mensaje();

let mensajesResultadoFinal = [];
mensajesResultadoFinal.push(["Chat", "Fecha", "Hora", "Autor", "Mensaje", "Tipo Mensaje", "Citado", "Tipo Mensaje Citado", "Desgloce", "Inicio"]);

function obtenerChat(){
    let mensajesRegistrados = [];
    let mensajesDetectados = document.getElementsByClassName("_11liR")[0];
    let totalMensajesDetectadosEnTexto = " ";
    let numeroChat = " ";
    totalMensajesDetectadosEnTexto = mensajesDetectados.innerHTML;

    let elementoHTMLConNumero = {
        elemento: totalMensajesDetectadosEnTexto,
        textoAntes:'data-id="false_',
        textoDespues: "@c.us"
    };
    subirScroll();
    
    numeroChat = objMensaje.depurarElemento(elementoHTMLConNumero);
    //Funcion


    //Ingresamos aquí si llegamos al mensaje inicial
    if(totalMensajesDetectadosEnTexto.indexOf(mensajeInicial) != -1){
        
        mensajesRegistrados = rellenarMensajes(mensajesDetectados.children);
        //Funcion
    }

    //Si ya registramos el mensaje inicial, finalizamos todo
    if(mensajesRegistrados.indexOf(mensajeInicial) != -1){
        
        contruirDataSet(mensajesRegistrados, numeroChat);
        alert("Hemos llegado al final");

        return "terminarProceso";
    }
    return "repetirProceso";
};

function subirScroll(){
    const contenedorChat = document.getElementsByClassName("_1gL0z")[0];
    contenedorChat.scroll(0,- 10);
}

function rellenarMensajes(mensajes){
    let mensajesNuevos = [];
    const PATRONMENSAJE= '<div class="_24wtQ _2kR4B _15gfz"></div>';
    for(let i=0; i<mensajes.length; i++){
        
        if((mensajes[i].innerHTML.indexOf(PATRONMENSAJE) == -1)){
            //Ingresamos aquí si no están los mensajes previstos de WhatsApp
            mensajesNuevos.push(mensajes[i].innerHTML);
        }
    }
    return mensajesNuevos;
}

function contruirDataSet(mensajes, numeroChat){
    let mensaje = " ";
    let mensajeParaGuardar = [];
    let fechaMensajeEscrito  = " ";
    let infoAdicional = ["", "", ""];
    let guardarDecidir = false;

    let mensajedeInicio = true;

    console.log(numeroChat);
    let elementoHTMLConFecha = {};

    for(let i = 0; i<mensajes.length; i++){
        mensajeParaGuardar = [];
        mensajes[i] = objMensaje.quitarEmoticones(mensajes[i]);
        mensajes[i] = objMensaje.quitarEnlaces(mensajes[i]);
        
        //Proceso para construir el mensaje
        if(mensajes[i].indexOf(TEXTOANTESDEFECHA) != -1 ){
            elementoHTMLConFecha = Object.assign({
                elemento: mensajes[i],
                textoAntes:TEXTOANTESDEFECHA,
                textoDespues: TEXTODESPUESDEFECHA
            });
            fechaMensajeEscrito = objMensaje.obtenerFecha(objMensaje.depurarElemento(elementoHTMLConFecha));
            //Funcion
        }
        
        //Proceso para la construcción de un archivo CSV con los mensajes
        if((mensajes[i].indexOf('<span dir="ltr" class="_3-8er selectable-text copyable-text"><span>') != -1)){
            /****************** */
            var datosMensajeTexto = {
                numeroChat: numeroChat,
                mensaje: mensajes[i],
                fechaMensajeEscrito: fechaMensajeEscrito,

            }
            mensajeParaGuardar = mensajeTextoPlano(datosMensajeTexto, objMensaje);
            
            infoAdicional = [numeroChat, "", ""];
            infoAdicional = getInfoAdicional(mensajes[i], objMensaje);
            console.log("Citado: "+ infoAdicional[0]);
            console.log("Tipo: "+ infoAdicional[1]);
            console.log("Desgloce: "+ infoAdicional[2]);

            mensajeParaGuardar = mensajeParaGuardar.concat(infoAdicional); //AGregar información adicional
            console.log("====================================================");
            
            //**************************************************************************//
            //**************************************************************************//
            if(mensajedeInicio){
                mensajeParaGuardar.push("SI");
                mensajedeInicio = false;
            }
            guardarDecidir = true;

            mensajesResultadoFinal.push(mensajeParaGuardar);

        }else if(((mensajes[i].indexOf('<span data-testid="audio-play"') != -1) || (mensajes[i].indexOf('data-testid="audio-download"')) != -1) && (mensajes[i].indexOf('<span dir="ltr" class="_3-8er selectable-text copyable-text"><span>') == -1)){
            /****************** */
            var datosMensajeAudio = {
                numeroChat: numeroChat,
                mensaje: mensajes[i],
                fechaMensajeEscrito: fechaMensajeEscrito,

            }
            mensajeParaGuardar = mensajeAudio(datosMensajeAudio, objMensaje);

            infoAdicional = [numeroChat, "", ""];
            infoAdicional = getInfoAdicional(mensajes[i], objMensaje);
            console.log("Citado: "+ infoAdicional[0]);
            console.log("Tipo: "+ infoAdicional[1]);
            console.log("Desgloce: "+ infoAdicional[2]);

            mensajeParaGuardar = mensajeParaGuardar.concat(infoAdicional); //AGregar información adicional
            if(mensajedeInicio){
                mensajeParaGuardar.push("SI");
                mensajedeInicio = false;
            }
            guardarDecidir = true;

            mensajesResultadoFinal.push(mensajeParaGuardar);
        }else if((mensajes[i].indexOf('data:image/jpeg') != -1) && ((mensajes[i].indexOf('<span dir="ltr" class="_3-8er selectable-text copyable-text"><span>') == -1)) ){
            console.log("======================IMAGEN==============================");
             /****************** */
            var datosMensajeImagen = {
                numeroChat: numeroChat,
                mensaje: mensajes[i],
                fechaMensajeEscrito: fechaMensajeEscrito,

            }
            mensajeParaGuardar = mensajeImagen(datosMensajeImagen, objMensaje);

            infoAdicional = [numeroChat, "", ""];
            infoAdicional = getInfoAdicional(mensajes[i], objMensaje);
            console.log("Citado: "+ infoAdicional[0]);
            console.log("Tipo: "+ infoAdicional[1]);
            console.log("Desgloce: "+ infoAdicional[2]);
            
            mensajeParaGuardar = mensajeParaGuardar.concat(infoAdicional);
            
            if(mensajedeInicio){
                mensajedeInicio = false;
            }
            guardarDecidir = true;

            mensajesResultadoFinal.push(mensajeParaGuardar);
        }else if(mensajes[i].indexOf('role="button" title="Mensaje a ') != -1){
            
            console.log("======================CONTACTO==============================");
             /****************** */
             var datosMensajeContacto = {
                numeroChat: numeroChat,
                mensaje: mensajes[i],
                fechaMensajeEscrito: fechaMensajeEscrito,

            }
            mensajeParaGuardar = mensajeContacto(datosMensajeContacto, objMensaje);

            infoAdicional = [numeroChat, "", ""];
            infoAdicional = getInfoAdicional(mensajes[i], objMensaje);
            console.log("Citado: "+ infoAdicional[0]);
            console.log("Tipo: "+ infoAdicional[1]);
            console.log("Desgloce: "+ infoAdicional[2]);
            
            mensajeParaGuardar = mensajeParaGuardar.concat(infoAdicional);
            if(mensajedeInicio){
                mensajeParaGuardar.push("SI");
                mensajedeInicio = false;
            }
            guardarDecidir = true;
            
            mensajesResultadoFinal.push(mensajeParaGuardar);
        }

        /*if(guardarDecidir == true){
            mensajesResultadoFinal.push(mensajeParaGuardar);
        }*/
        guardarDecidir = false;
    }
        
    
    /*}catch(Exception){
        console.log("========================");
        console.log("No hemos podido crear el archivo con los datos. A continuación se adjunta los resultados ORDENADOS (SON ACEPTADOS EN EXCEL).");
        console.log(csvContent);
        console.log("========================");
    }*/
    
}

