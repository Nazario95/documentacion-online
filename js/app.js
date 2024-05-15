//export valor busqueda url
export const urlSearchValues = new URLSearchParams(location.search);

// detect-mobile-tablet-or-pc
document.addEventListener('DOMContentLoaded',()=>{
    if(innerWidth >= 768){
        document.querySelector('.mobile').classList.add('d-none');
        document.querySelector('.pc').classList.remove('d-none');
    }

    // Servicios-gestoria
    let nomGestoria = 'nazza gestiones';
    if(nomGestoria){

    }
});

//ocultar mostrar sniper
export function spinner(idSpinner, accion){
    if(accion == 'hide'){
        document.querySelectorAll(`.${idSpinner}`).forEach(hidenSpinner => {
            hidenSpinner.classList.add('d-none');
        });
    }
    if(accion == 'show'){
        document.querySelectorAll(`.${idSpinner}`).forEach(showSpinner => {
            showSpinner.classList.remove('d-none');
        });
    }    
}

//modal global
export function mostrarModal(titulo,contenido){
    document.querySelector('.modal-titulo').innerHTML = titulo;
    document.querySelector('.contenido-modal-global').innerHTML = contenido;
    $("#modal-global").modal('show');
}

//togle class
export function toogleClass(classId,classToogle,numCLass,toogleType){
    if(numCLass === 'unique'){
        if(toogleType === 'remove'){
            document.querySelector(`.${classId}`).classList.remove(`${classToogle}`);
        }
        else if(toogleType === 'add'){
            document.querySelector(`.${classId}`).classList.add(`${classToogle}`);
        }  
        else if(toogleType === 'rem-put'){
            document.querySelector(`.${classId}`).classList.remove(`${classToogle}`);
            setTimeout(() => {
                document.querySelector(`.${classId}`).classList.add(`${classToogle}`);
            }, 3000);
        }
        else if(toogleType === 'put-load'){
            document.querySelector(`.${classId}`).classList.remove(`${classToogle}`);
            setTimeout(() => {
                location.href='./';
            }, 3000);
        }
    }
    else if(numCLass === 'multi'){
        if(toogleType === 'remove'){
            document.querySelectorAll(`.${classId}`).forEach(removeClass => {
                removeClass.classList.remove(`${classToogle}`);
            });            
        }
        else if(toogleType === 'add'){
            document.querySelectorAll(`.${classId}`).forEach(addClass => {
                addClass.classList.add(`${classToogle}`);
            });
        } 
    }
}