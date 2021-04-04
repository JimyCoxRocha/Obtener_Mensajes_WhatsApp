class Tabla{
    static instancia;
    tabla = null;
    constructor(){
        if(!!Tabla.instancia){
            return Tabla.instancia;
        }
        
        Tabla.instancia = this;
    }

    crearTabla(){
        this.tabla = document.createElement("table");
        this.tabla.style.margin = "32px auto 0px auto";
        
        //this.tabla.className = "tabla";
        return this.tabla;
    }

    crearTituloTabla(){
        const COLUMNAS = 10;
        var tblHead = document.createElement("thead");
        var hilera = document.createElement("tr");//Fila
        let columnasTitulos = ["Chat","Fecha","Hora","Autor","Mensaje","Tipo Mensaje",
        "Citado","Tipo Mensaje Citado","Desgloce","Mensaje Inicial"]
        
        for (var j = 0; j < COLUMNAS; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo
        var celda = document.createElement("td");//Celda
        
        var textoCelda = document.createTextNode(columnasTitulos[j]);
            
        celda.appendChild(textoCelda);
        celda.style.fontWeight = "900";
        
        celda.style.textAlign  = "center";
        celda.style.padding = "7px 30px 7px 30px";
        //celda.className = "CeldaEcabezadoTabla";

        celda.style.cursor = "text";
        hilera.appendChild(celda);
        }
        
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblHead.appendChild(hilera);
        
        tblHead.style.backgroundColor = "#95e19c";
        //tblHead.className = "EncabezadoTabla bordeTabla";

        return tblHead;
    }
    
    crearElementoTabla(texto){
        
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");//Fila
        
          for (var j = 0; j < texto.length; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo
            var celda = document.createElement("td");//Celda
            if(j == 0){
                //celda.className ="fondoCantidad centrarTexo";
                celda.style.backgroundColor = "#e6f3e7";
                celda.style.textAlign  = "center";
            }

            var textoCelda = document.createTextNode(texto[j]);

            celda.appendChild(textoCelda);
            //celda.className = celda.className + " _3-8er selectable-text copyable-text";
            celda.style.padding = "2px";
            celda.style.cursor = "text";
            hilera.appendChild(celda);
          }
        
        return hilera;
    }
    
}