

//SECCION-index.html-headers_sliders 
let headers = [
    `
    <img src="./src/img/slider/1.png" alt="">
    <div class="card__content overflow-auto">
      <p class="card__title">GESTION TOTAL DE CUALQUIER DOCUMENTACION</p>
      <p class="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    </div>
    `,
    `<img src="./src/img/slider/2.jpg" alt="">
    <div class="card__content  overflow-auto">
      <p class="card__title">EXPEDIENTES QUE TRAMITAMOS</p>
      <p class="card__description">Visados, Documentacion de vehiculos,legalizaciones, etc</p>
    </div>
    `,
    `<img src="./src/img/slider/4.jpg" alt="">
    <div class="card__content  overflow-auto">
        <p class="card__title">REALIZA UN SEGUIMIENTO DE TUS EXPEDIENTES</p>
        <p class="card__description">Puedes ver cuando quieras el estado de tus expedientes y ver con todo detalle cada uno de los procesos</p>
    </div>
    `
];

let docTypes = ['pasaporte', 'visado', 'antecedente penal', 'titulo de porpiedad de terreno', 'documentacion de veihiculo', 'nazza'];

let gestorias = ['nazza services', 'etoho, well well'];

document.addEventListener('DOMContentLoaded',()=>{
    //inyectar header
    let card = 1
    headers.forEach(header=>{
        document.querySelectorAll(`.card-${card}`).forEach(cardSelect=>{
            cardSelect.innerHTML = header
        });
        card++
    })

    // menu-sidebar
    document.querySelectorAll('.menu-sidebar').forEach(menu=>{
        //nombre de la gestoria
        let subtituloPagina = '';
        if(innerWidth >= 768){
            subtituloPagina = '<h4 class="p-2 text-light">GESTION DOCUMENTACION<h4>';
        }
        // buscador de documentos
        let buscadorDocMovil = '';
        if(innerWidth < 768){
            buscadorDocMovil = `
                <form class="d-flex" role="search">
                    <input class="form-control me-2 doc-seach-input" type="search" placeholder="Buscar expediente" aria-label="Search">
                    <button class="btn btn-info doc-seach-btn text-light" type="submit">Buscar</button>
                </form>
            `
        }

        //menu sidebar movil
        menu.innerHTML = `
            <div>
                ${subtituloPagina}
            </div>
            <ul class="ul">
                <li class="li">
                    <button class="button"><p class="p">
                        <a href="./" class="text-light text-decoration-none">Inicio<a/>
                    </p></button>
                </li>
                <li class="li perfil-activo">
                    <button class="button"><p class="p" data-bs-toggle="modal" data-bs-target="#cargar-perfil">Cargar perfil</p></button>
                </li>
                <li class="li">
                    <button class="button check-doc"><p class="p">Hacer seguimiento</p></button>
                </li>
                <li class="li">
                    <a href="./?view=historial">
                        <button class="button">
                            <p class="p historial">Mis tramitaciones</p>
                        </button>
                    <a/>
                </li>
                <li class="li">
                    <button class="button info-perfil">
                        <p class="p nombre-usuario">
                            Perfil
                        </p>
                    </button>
                </li>  
                <li class="li">
                    <button class="button"><p class="p">Gestorias</p></button>
                </li>              
                ${buscadorDocMovil}
            </ul>
        `
    });

    //select doc type
    document.querySelectorAll('.doc-type select').forEach(select=>{
        let options = `<option selected value="x" disabled>Selecione el tipo de documento`;
        docTypes.forEach(docType=>{
            options += `<option>${docType}</option>`
        });

        select.innerHTML = `
            ${options}
        `;
    });

    //selec gestoria
    document.querySelectorAll('.doc-gestion select').forEach(select =>{
        let options = `<option selected value="x" disabled>Selecione la gestoria</option>`;
        gestorias.forEach(gestoria => {
            options += `<option>${gestoria}</option>`
        });
        select.innerHTML = `
            ${options}
        `;
    });

    // TIMELINE-INYECTION
    if(document.querySelectorAll('.check-doc')){
        document.querySelectorAll('.check-doc').forEach(btnCheckDoc=>{
            btnCheckDoc.addEventListener('click',()=>{
                location.href='./?view=check_doc'
            })
        })
        
    }
});

timeline();
historial();

//SECCCION-index.html?view=check_doc
function timeline(){    
    new URLSearchParams(location.search).forEach((value,key)=>{
        // console.log(value, key);
        if(value == 'check_doc'){
            document.querySelectorAll('.contenido-main').forEach(mainContent => {
                mainContent.innerHTML=`
                <div class="seguimiento my-2">
                    <h3 class="text-center">SEGUMIENTO DE EXPEDIENTES</h3>
                    <div class="my-5">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 doc-seach-input" type="search" placeholder="Id de expediente" aria-label="Search">
                            <button class="btn btn-info doc-seach-btn text-light">Buscar</button>

                            <div class="spinner-border text-info mx-2 d-none snipper-search-doc" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>                            
                        </form>
                        <small class="text-center fs-7 text-danger error-id-doc"></small>
                    </div>       
        
                    <!-- Vertical Timeline -->
                    <section id="conference-timeline">
                        <div class="timeline-start">Incio</div>
                        
                        <div class="conference-center-line"></div>
                        <div class="conference-timeline-content">
                    
                            <!-- Article -->  
                            
                            <!-- // Article -->
                            
                        </div>

                        <div class="timeline-end">Expediente no selecionado</div>
                    </section>
                </div>
                `;
            });
        }
    });
    
}

//SECCCION-index.html?view=historial
function historial(){
    new URLSearchParams(location.search).forEach((value, key) => {
        if(value == 'historial'){
            //borrar etiquetas del main
            document.querySelectorAll('.contenido-main').forEach(main => {
                main.innerHTML= `
                <h3 class="text-center mt-3">HISTORIAL DE TRAMITACIONES</h3>
                <p class="text-danger text-center estado-sesion">
                    <span>Cargue su perfil para ver el historial</span>
                </p>
                <div class="overflow-x-auto">
                    <div class="tabla d-flex justify-content-center mt-4">                
                        <table class="table justify-content-center">
                            <thead class="bg-info">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Gestoria</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Accion</th>
                                </tr>
                            </thead>
                            <tbody class="historial bg-light">
                            </tbody>
                        </table>
                    </div>
                </div>
                `
            });
        }
    });
}


