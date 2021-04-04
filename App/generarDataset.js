function mensajeTextoPlano(datosMensajeAnalizar, objMensaje){
    let datosMensaje = [];
    let mensaje = "";
    let mensajeHora = "";
    let mensajeFecha = "";

    datosMensaje.push(datosMensajeAnalizar.numeroChat);
    console.log("======================MEnsaje Plano==============================");    
    //**************************************************************************//
    //                          FECHA Y HORA
    //**************************************************************************//
    
    mensaje = objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'data-pre-plain-text="[', "]"));
    mensaje = "["+mensaje+"]";

    mensajeHora = objMensaje.depurarElemento(crearObjetoADepurar(mensaje,'[', ","));
    mensajeFecha = objMensaje.depurarElemento(crearObjetoADepurar(mensaje,', ', "]"));
    
    console.log("Hora: "+mensajeHora);
    console.log("Fecha: "+datosMensajeAnalizar.fechaMensajeEscrito);

    datosMensaje.push(datosMensajeAnalizar.fechaMensajeEscrito);
    datosMensaje.push(mensajeHora);
    
    //**************************************************************************//
    //                          Obtener Remitente
    //**************************************************************************//
    /*mensaje = depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'data-pre-plain-text="[', ': "><div'));
    mensaje = mensaje+"|";*/

    if(datosMensajeAnalizar.mensaje.indexOf('class="_2nWgr"') != -1){
        console.log("Remitente: Yo");
        datosMensaje.push("Yo");//Autor
    }else{
        console.log("Remitente: "+datosMensajeAnalizar.numeroChat);
        datosMensaje.push(datosMensajeAnalizar.numeroChat);//Autor
    }
    //**************************************************************************//
    //                          MENSAJE
    //**************************************************************************//
    mensaje = objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'<span dir="ltr" class="_3-8er selectable-text copyable-text"><span>', "</span></span>"));
    console.log("Mensaje: "+mensaje);
    datosMensaje.push(mensaje);//Mensaje

    if(datosMensajeAnalizar.mensaje.indexOf('src="data:image/jpeg') != -1){
        datosMensaje.push("Texto Plano + Foto");//Tipo de Mensaje
    }else{
        datosMensaje.push("Texto Plano");//Tipo de Mensaje
    }

    return datosMensaje;
}
function crearObjetoADepurar(totalMensajesDetectadosEnTexto, TEXTOANTES, TEXTODESPUES){
    //alert(totalMensajesDetectadosEnTexto);
    let elementoHTMLDepurar = {
        elemento: totalMensajesDetectadosEnTexto,
        textoAntes:TEXTOANTES,
        textoDespues: TEXTODESPUES
    };
    return elementoHTMLDepurar;
}
function mensajeAudio(datosMensajeAnalizar, objMensaje){
    let datosMensaje = [];
    let mensaje = "";
    let mensajeHora = "";
    let mensajeFecha = "";

    datosMensaje.push(datosMensajeAnalizar.numeroChat);
    console.log("======================AUDIO==============================");    
    //**************************************************************************//
    //                          FECHA Y HORA
    //**************************************************************************//
    mensajeHora = objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'<span class="_17Osw" dir="auto">', '</span>'));
    console.log("Hora: "+mensajeHora);
    datosMensaje.push(datosMensajeAnalizar.fechaMensajeEscrito);
    console.log("Fecha: "+datosMensajeAnalizar.fechaMensajeEscrito);
    datosMensaje.push(mensajeHora);
    //**************************************************************************//
    //                          Obtener Remitente
    //**************************************************************************//
    if(datosMensajeAnalizar.mensaje.indexOf('class="_2nWgr"') != -1){
        datosMensaje.push("Yo");//Autor
    }else{
        datosMensaje.push(datosMensajeAnalizar.numeroChat);//Autor
    }


    //**************************************************************************//
    //                          MENSAJE
    //**************************************************************************//
    mensaje = objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'<div class="_2O_ZT">', "</div>"));
    mensaje = "no descargado";
    console.log("Mensaje: "+mensaje);
    datosMensaje.push(mensaje);//Mensaje

    console.log("Tipo de Mensaje: Mensaje de Voz");
    datosMensaje.push("Mensaje de Voz");//Tipo de Mensaje

    return datosMensaje;
}

function mensajeImagen(datosMensajeAnalizar, objMensaje){
    let datosMensaje = [];
    let mensaje = "";
    let mensajeHora = "";
    let mensajeFecha = "";

    datosMensaje.push(datosMensajeAnalizar.numeroChat);
    //**************************************************************************//
    //                          FECHA Y HORA
    //**************************************************************************//
    mensajeHora = objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'<span class="_17Osw" dir="auto">', '</span>'));
    console.log("Hora: "+mensajeHora);
    console.log("Fecha: "+datosMensajeAnalizar.fechaMensajeEscrito);
    datosMensaje.push(datosMensajeAnalizar.fechaMensajeEscrito);
    datosMensaje.push(mensajeHora);
    
    //**************************************************************************//
    //                          Obtener Remitente
    //**************************************************************************//
    if(datosMensajeAnalizar.mensaje.indexOf('class="_2nWgr"') != -1){
        console.log("Remitente: Yo");
        datosMensaje.push("Yo");//Autor
    }else{
        console.log("Remitente: "+datosMensajeAnalizar.numeroChat);
        datosMensaje.push(datosMensajeAnalizar.numeroChat);//Autor
    }
    
    //**************************************************************************//
    //                          MENSAJE
    //**************************************************************************//
    if((datosMensajeAnalizar.mensaje.indexOf('width: 165px; height: 168px;') != -1) && (datosMensajeAnalizar.mensaje.indexOf('class="qpqWq _3O1wx _1Yoli">') == -1)){
        console.log("Mensaje: 4 Fotos");
        datosMensaje.push("4 Fotos");//Mensaje
    }else if((datosMensajeAnalizar.mensaje.indexOf('width: 165px; height: 168px;') != -1) && (datosMensajeAnalizar.mensaje.indexOf('class="qpqWq _3O1wx _1Yoli">') != -1)){
        try{
            console.log("Mensaje: "+ (3 + parseInt(objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'class="qpqWq _3O1wx _1Yoli">+', '</span>'), 10)) + " Fotos"));
            datosMensaje.push((3 + parseInt(objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'class="qpqWq _3O1wx _1Yoli">+', '</span>'), 10)) + " Fotos"));//Mensa)je
        }catch(Exception){
            console.log("Mensaje: Más de 4 Fotos");
            datosMensaje.push("Más de 4 Fotos");
        }
        
    }else{
        console.log("Mensaje: 1 Foto");
        datosMensaje.push("1 Foto");
    }
    
    console.log("Tipo de Mensaje: Foto");
    datosMensaje.push("Foto");
    
    return datosMensaje;
}

function mensajeContacto(datosMensajeAnalizar, objMensaje){
    let datosMensaje = [];
    let mensaje = "";
    let mensajeHora = "";
    let mensajeFecha = "";

    datosMensaje.push(datosMensajeAnalizar.numeroChat);
    //**************************************************************************//
    //                          FECHA Y HORA
    //**************************************************************************//
    mensajeHora = objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'<span class="_17Osw" dir="auto">', '</span>'));
    console.log("Hora: "+mensajeHora);
    console.log("Fecha: "+datosMensajeAnalizar.fechaMensajeEscrito);
    datosMensaje.push(datosMensajeAnalizar.fechaMensajeEscrito);
    datosMensaje.push(mensajeHora);
    
    //**************************************************************************//
    //                          Obtener Remitente
    //**************************************************************************//
    if(datosMensajeAnalizar.mensaje.indexOf('class="_2nWgr"') != -1){
        console.log("Remitente: Yo");
        datosMensaje.push("Yo");//Autor
    }else{
        console.log("Remitente: "+datosMensajeAnalizar.numeroChat);
        datosMensaje.push(datosMensajeAnalizar.numeroChat);//Autor
    }
    
    console.log("Tipo de Mensaje: Contacto");
    datosMensaje.push("Contacto: "+ objMensaje.depurarElemento(crearObjetoADepurar(datosMensajeAnalizar.mensaje,'_2Zme9 _3-8er selectable-text copyable-text">', '</div>')));
    
    return datosMensaje;
}

function getInfoAdicional(mensaje,objMensaje){
    let informacionAdicional = ["", "", ""];
    let desdeCitacion;//Desgloce
    let citado;//Persona Citada
    let tipoCitacion;//Tipo de Citación

    
    if(mensaje.indexOf('class="quoted-mention _3-8er">') != -1){//Buscamos que haya referencia
        if(mensaje.indexOf('class="quoted-mention _3-8er">') != -1){
            desdeCitacion = objMensaje.depurarElemento(crearObjetoADepurar(mensaje,'class="quoted-mention _3-8er">', "</span>"));
            tipoCitacion =  objMensaje.depurarElemento(crearObjetoADepurar(mensaje,'class="quoted-mention _3-8er">', "</span>"));
        }
        
        if(mensaje.indexOf('class="_3-8er">') != -1){
            citado = objMensaje.depurarElemento(crearObjetoADepurar(mensaje,'class="_3-8er">', "</span>"));

        }else if(mensaje.indexOf('class="_2F1Ns _35k-1 _3-8er">') != -1){
            citado = objMensaje.depurarElemento(crearObjetoADepurar(mensaje,'class="_2F1Ns _35k-1 _3-8er">', "</span>"));
        }
        
        informacionAdicional[0] = (citado);

        if(tipoCitacion == "Foto"){
            informacionAdicional[1]=("Foto");
        }else if ((tipoCitacion != "Foto") && ((tipoCitacion.indexOf(":") == -1))){
            informacionAdicional[1]=("Texto Plano");
        }else if((desdeCitacion.indexOf(":") != -1) && (desdeCitacion[desdeCitacion.length - 3])/*&& ((desdeCitacion.indexOf("</span>")-3) == ":")*/){//En el caso de que exista, sabemos que es un audio la referencia
            //alert("Encontramos una referencia a audio");
            informacionAdicional[1]=("Referencia a audio");
        }
        
        informacionAdicional[2] = (desdeCitacion);

    }else if(mensaje.indexOf('scontent.xx.fbcdn.net') != -1){
        informacionAdicional = ["Facebook", "Publicidad Pagada", ""]
    }

    return informacionAdicional;
}