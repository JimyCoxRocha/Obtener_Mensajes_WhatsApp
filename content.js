
let busqueda;
let elementoInicial = '<span></span><div class="_24wtQ _1KcEQ _2kR4B"><div class="_3XpKm"><div role="button"><span><div class="_2tZna"><span data-testid="lock-small" data-icon="lock-small" class=""><svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><path d="M5.008 1.6c1.375 0 2.501 1.074 2.586 2.427l.005.164v1.271h.158c.585 0 1.059.48 1.059 1.07v3.351c0 .59-.474 1.07-1.059 1.07h-5.5c-.582 0-1.057-.48-1.057-1.07V6.531c0-.59.474-1.069 1.058-1.069h.158V4.191c0-1.375 1.075-2.501 2.429-2.586l.163-.005zm0 1.248c-.696 0-1.272.534-1.337 1.214l-.006.129-.002 1.271H6.35l.001-1.271c0-.653-.47-1.2-1.088-1.319l-.126-.018-.129-.006z" fill="currentColor"></path></svg></span></div><span dir="ltr" class="_3-8er">Los mensajes están cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera WhatsApp, puede leerlos ni escucharlos. Haz clic para obtener más información.</span></span></div><span></span></div></div>';


chrome.runtime.onMessage.addListener(function (request){
    //alert(request)
    let panelDeChats = document.getElementsByClassName("_1C2Q3 F-0gY")[0];
    const TAMANIO_INICIAL_MSJ = 1;
    
    if(request == "activar"){
        panelDeChats.addEventListener("click", function(){
          //Si no estamos en el elemento incial
            busqueda = setInterval(function(){
              if(obtenerChat() == "terminarProceso"){
                clearInterval(busqueda);
              }
            }, 2000);
        });

    }else if(request == "resultado"){
        if(mensajesResultadoFinal.length > TAMANIO_INICIAL_MSJ){
          alert("Generando Resultado");
          presentarResultados(mensajesResultadoFinal);
        }else{
          alert("Debe, primero, hacerle click en 'Recolectar Mensajes'.");
        }
        
        
        
    }
})

























