class Mensaje{
    static instancia;
    constructor(){
        if(!!Mensaje.instancia){
            return Mensaje.instancia;
        }
        
        Mensaje.instancia = this;
    }

    depurarElemento(elementoHTMLConMensaje){
        let mensajeEnBruto = " ";
        let indicePosicion = 0;
        let mensajeDepurado = " ";
        let tamanio;
        
        indicePosicion = elementoHTMLConMensaje.elemento.indexOf(elementoHTMLConMensaje.textoAntes);
        //Obtenemos el mensaje que contiene el texto
        mensajeEnBruto = elementoHTMLConMensaje.elemento.slice(indicePosicion + elementoHTMLConMensaje.textoAntes.length);
        //Obtenemos el tamaño del nuevo arreglo
        tamanio = mensajeEnBruto.length;
        //Obtenemos el mensaje
        mensajeDepurado = mensajeEnBruto.slice(0, mensajeEnBruto.indexOf(elementoHTMLConMensaje.textoDespues) - tamanio);
        return mensajeDepurado;
    }

    quitarEmoticones(mensaje){
        let textoEmoticonAntes= '<img crossorigin="anonymous"';
        let textoEmoticon = "";
        let posicionInicioEmoji = 0;
        let existeEmoticon = true;
     
        while(existeEmoticon){
            if(mensaje.indexOf(textoEmoticonAntes) != -1){
                //posicionEmoticonDespues = mensaje.indexOf(textoEmoticonAntes) + textoEmoticonAntes.length;
                posicionInicioEmoji = mensaje.indexOf(textoEmoticonAntes);
               //llegar a la final del elemento que contiene el emoticon
                while(mensaje[posicionInicioEmoji] != '>'){
                    posicionInicioEmoji = posicionInicioEmoji + 1;
                    textoEmoticon = textoEmoticon + mensaje[posicionInicioEmoji]; 
                }
                //Borramos le texto del emoticon
                mensaje=mensaje.replace(textoEmoticon, "");
                
                existeEmoticon = true;
                textoEmoticon = "";
            }
    
            if((mensaje.indexOf(textoEmoticonAntes) == -1)){
                existeEmoticon = false;
            }
            posicionInicioEmoji = 0;
            textoEmoticon = "";
        }
        return mensaje;
    }

    quitarEnlaces(mensaje){

        let inicioEnlace= '<a href=';
        
        let textoEnlace = "";
        let posicionInicioEnlace = 0;
        let existeEnlace = true;
        
        mensaje = mensaje.replaceAll('<strong class="_3-8er selectable-text copyable-text" data-app-text-template="*${appText}*">', "");
        mensaje = mensaje.replaceAll('</strong>', "");
    
        mensaje = mensaje.replaceAll('<em class="_3-8er selectable-text copyable-text" data-app-text-template="_${appText}_">', "");
        mensaje = mensaje.replaceAll('</em>', "");
    
        mensaje = mensaje.replaceAll('<del class="_3-8er selectable-text copyable-text" data-app-text-template="~${appText}~">', "");
        mensaje = mensaje.replaceAll('</del>', "");
    
        mensaje = mensaje.replaceAll('<code class="_3-8er selectable-text copyable-text" data-app-text-template="```${appText}```">', "");
        mensaje = mensaje.replaceAll('</code>', "");
     
        while(existeEnlace){
            if(mensaje.indexOf(inicioEnlace) != -1){
                posicionInicioEnlace = mensaje.indexOf(inicioEnlace);
                while((textoEnlace.indexOf('</a>') == -1)){
                    posicionInicioEnlace = posicionInicioEnlace + 1;
                    textoEnlace = textoEnlace + mensaje[posicionInicioEnlace];
                }
                mensaje=mensaje.replace(textoEnlace, "ENLACE");
                
                existeEnlace = true;
                textoEnlace = "";
            }
            
            if((mensaje.indexOf(inicioEnlace) == -1)){
                existeEnlace = false;
            }
            posicionInicioEnlace = 0;
            
            textoEnlace = "";
        }
        return mensaje;
    
    }
    
    obtenerFecha(fecha){
        let dias = ["DOMINGO","LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SÁBADO", "HOY"];
        let fechaActual = new Date();
        
        if(dias.indexOf(fecha) != -1){
            //En el caso de que exista la fecha
            if(fecha == "HOY"){
                return (fechaActual.getDate()+"/"+(fechaActual.getMonth()+1)+"/"+(fechaActual.getFullYear()));
            }
            return Mensaje.instancia.calcularFecha(dias.indexOf(fecha));
        }else{
            if(fecha.indexOf("/") != -1){
                return fecha;
            }
        }
    }

    calcularFecha(diaMensaje){
        let fechaActual = new Date();
        let fechaDia = 0;
        let numeracionDias = 0;
        let mesAnterior;
        //let nuevaFecha =return (fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+(fecha.getFullYear()));
        
        if(fechaActual.getDate() > diaMensaje){
            numeracionDias = fechaActual.getDay() - diaMensaje;
            //alert("Se activó fechaActual.getDate() > diaMensaje: "+numeracionDias);
            
        }else if(fechaActual.getDate() < diaMensaje){
            numeracionDias =  7 - ((diaMensaje + 1) - (fechaActual.getDay() + 1));
            //alert("Se activó fechaActual.getDate() < diaMensaje: "+numeracionDias);
            
        }else{
            return "IGUAL | ERROR";
        }
    
        mesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - numeracionDias);
        if(numeracionDias < 0){
            mesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() -  numeracionDias);
            //alert("Ingresamos e MES: numeracionDias < 0 "+ mesAnterior);
        }else if(numeracionDias == 0){
            mesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);
            //alert("Ingresamos e MES: numeracionDias >  0 "+ mesAnterior);
        }
    
        //alert("Todo el proceso se cumplió, este es el último eslabon: "+ (mesAnterior.getDate()+"/"+(mesAnterior.getMonth()+1)+"/"+(mesAnterior.getFullYear())));
        return (mesAnterior.getDate()+"/"+(mesAnterior.getMonth()+1)+"/"+(mesAnterior.getFullYear()));
        
    }
    
}