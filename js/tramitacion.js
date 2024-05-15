import { dbDocId, expediente } from "./export-data.js";
import { spinner, mostrarModal, urlSearchValues } from "./app.js";
import { perfil } from "./sec.js";

//comprobar busqueda desde url
urlSearchValues.forEach((value,key) => {
    if(key == 'id'){
        console.log('Busqueda activa del doc ', value)
        //solicitamos busqueda al server
        const dataDoc =  expediente(value);
        if(dataDoc){
            crearComTimeline(dataDoc)
        }
        else{
            alert('El expediente que ha solicitado, no se ha encontrado')
        }
    }
});

// datos de perfil
if(perfil != null){
    let {uid} = perfil;
    //buscar doc
    document.querySelectorAll('.doc-seach-btn').forEach(btnBuscarDoc =>{
        btnBuscarDoc.addEventListener('click',e=>{
            e.preventDefault();  
            //mostrear load
            if(uid == undefined){
                console.log('no user')
                let msgAlerta = 'Para poder buscar su expediente, debe cargar su perfil primero o solicitar a su gestor un token de busqueda';

                mostrarModal('ERROR DE ACCESO',msgAlerta);
            }
            else{
                let idDoc;
                document.querySelectorAll('.doc-seach-input').forEach(searchId => {  
                    if(searchId.value){
                        idDoc = searchId.value;
                    }            
                });

                // console.log(idDoc)
                dbDocId.forEach(doc=>{
                    if(doc === idDoc){
                        spinner('snipper-search-doc','hide');//show load
                        // console.log('existe');
                        //crear componente
                        const dataDoc =  expediente(idDoc);
                        // console.log(dataDoc);
                        if(dataDoc){
                            crearComTimeline(dataDoc)
                        }
                    }
                    else{//expediente 404                
                        spinner('snipper-search-doc','hide');//hide load
                        //remove old timeline
                        document.querySelectorAll('.conference-timeline-content').forEach(oldtimeline => {
                            oldtimeline.innerHTML = '';
                        });

                        document.querySelectorAll('.timeline-end').forEach(timelineEndtxt => {
                                timelineEndtxt.textContent = 'Expediente no selecionado';
                        
                        });
                        //mensaje de error
                        document.querySelectorAll('.error-id-doc').forEach(docNotFound => {
                            docNotFound.textContent = 'No se ha encontrado el expediente solicitado';
                            setTimeout(() => {
                                docNotFound.textContent = '';
                            }, 3000);
                        })
                        // console.log('No existe')
                    }
                });
            }
            
        });
    });
}


function crearComTimeline(data){
//    console.log(data.fases);
   let componente = '';
   let posicion = 'left';
    let borderType = '';
    let tramitacionCompleta = true;

   data.fases.forEach(fase => {
        let {asunto, datos, estado, numFase, fecha, lugar} = fase;

        //verificar el estado
        if(estado === 'completado'){
            borderType = 'success'
        }
        else if(estado === 'en proceso'){
            borderType = 'warning'
        }
        else if(estado === 'esperando'){
            borderType = 'danger'
        }

        //estructura de visualizacion de los datos
        let compDatos = '';
        datos.forEach(dato => {
            compDatos += `<span>- ${dato}</span><br>`
        });

        //formato fecha circulo
        let fechaCirculoNum = '';
        let fechaCirculoMes = ''

        if(fecha.split(' ')[2]){
            if(borderType == 'success' || borderType == 'warning'){
                fechaCirculoNum = fecha.split(' ')[2];
            }
        }
        if(fecha.split(' ')[1]){
            if(borderType == 'success' || borderType == 'warning'){
                fechaCirculoMes = fecha.split(' ')[1];
            }
        }

        if(borderType == 'danger'){
            fecha = '';
            lugar = '';
            //estado de tramitacion
            tramitacionCompleta = false;
        }

        //crear componente principal
        componente += `
            <div class="timeline-article"> 
                <div class="content-${posicion}-container">
                    <div class="content-${posicion} border border-${borderType}  border-4">

                    <p class="text-dark">
                        <span class="text-decoration-underline">
                            ASUNTO: ${asunto.toUpperCase()};
                        </span>
                        <span><br>
                            ${compDatos}
                        </span>
                        <span class="article-number">F${numFase}</span>
                    </p>
                    </div>
                    <span class="timeline-author">
                        <small class="text-info">
                            ${lugar}
                        </small>
                        |
                        <small class="text-${borderType}">
                            ${estado}
                        </small>
                        |
                        <small>
                            ${fecha}
                        </small>
                    </span>
                </div>

                <div class="meta-date">
                    <span class="date">${fechaCirculoNum}</span>
                    <span class="month">${fechaCirculoMes}</span>
                </div>                                
            </div>
        `;
        //alternando la posicion de visualizacion
        if(posicion === 'left'){
            posicion = 'right';
        }
        else if(posicion === 'right'){
            posicion = 'left';
        };
   });
   //inyectar el timeline
   document.querySelectorAll('.conference-timeline-content').forEach(timeLine => {
    timeLine.innerHTML = componente;
    document.querySelectorAll('.timeline-end').forEach(timelineEndtxt => {
        if(tramitacionCompleta){
            timelineEndtxt.textContent = 'Tramitacion completada: pude pasar a retirar el expediente';
        }
        else{
            timelineEndtxt.textContent = 'Tramitacion en proceso';
        }
        
    });
   });   
}

//new Date(Date.now()).toDateString() --> comando date
//'Mon May 13 2024'
// console.log('Mon May 13 2024'.split(' '))
