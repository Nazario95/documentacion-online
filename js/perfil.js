import { toogleClass, spinner, mostrarModal } from "./app.js";
import { userPerfil } from "./db.js";
import { perfilUsuario } from "./export-data.js";

document.addEventListener('DOMContentLoaded',()=>{
    //====== CREAR NUEVO PERFIL
    document.querySelector('.nuevo-perfil').addEventListener('click',()=>{
        spinner('sniper-cargar-perfil','hide');
        let perfil = `${document.querySelector('.cargar-perfil').value}`;
        cargarPefil(perfil, true,'guardar-perfil');
    });

    //MOSTRAR PERFIL ACTIVO EN NAVEGADOR
    if(perfilUsuario.user){
        setTimeout(() => {
            document.querySelectorAll('.nombre-usuario').forEach(perfilUser => {
                perfilUser.innerHTML = `Perfil (${perfilUsuario.user})`
            });
        }, 2000);
    }  
    setTimeout(() => {
         //====== VER INFO PERFIL
        if(document.querySelectorAll('.info-perfil')){
            document.querySelectorAll('.info-perfil').forEach(btnPerfil => {
                btnPerfil.addEventListener('click',()=>{
                    let titulo = '';
                    let contenido = ''
                    if( perfilUsuario.user == undefined){
                        titulo = `NO SE HA ENCONTRADO NINGUN PERFIL`
                         contenido = `
                            <p class="text-dark text-center">Cargue su perfil primero</p>
                        `
                    }
                    else{
                        titulo = `
                            <p class="text-dark">
                                Perfil de ${perfilUsuario.user.toUpperCase()}
                            </p>
                        `;
                         contenido = `
                            <div class="text-center justify-content-center">
                                <p class="text-dark">Id de usuario: 
                                    <span class="fw-bolder">
                                        ${perfilUsuario.uid}
                                    </span>
                                </p>

                                <p class="text-dark">
                                    Total expedientes tramitados:
                                    <span class="fw-bolder">
                                        0
                                    </span>
                                </p>

                                <p class="text-dark">
                                    Total expedientes en tramitacion:
                                    <span class="fw-bolder">
                                        0
                                    </span>
                                </p>
                                
                                <div class="d-flex justify-content-center">
                                    <p>
                                       <button class="btn bg-warning mx-2 cerrar-sesion">
                                            Cerrar perfil
                                        </button>
                                    </p>

                                    <p>
                                       <button class="btn bg-danger">
                                            Borrar perfil
                                        </button>
                                    </p>
                                </div>
                            </div>
                        `;
                        //activar btn cerrar sesion
                        setTimeout(() => {
                            if(document.querySelector('.cerrar-sesion')){
                                document.querySelector('.cerrar-sesion').addEventListener('click',()=>{
                                    sesion('cerrar');
                                }) 
                            }
                        }, 100);
                        
                    }
                    // alert('Mi perfil')
                    mostrarModal(titulo, contenido);
                })
            })
        }
    }, 2000); 
});

//=======CREAR  PERFIL
document.querySelector('.btn-cargar-perfil').addEventListener('click',()=>{    
    spinner('sniper-cargar-perfil','show');

    //verificar  perfil activo
    if(perfilUsuario.user != undefined){
        if(confirm(`El prefil del usuario "${perfilUsuario.user.toUpperCase()}" esta activo. Desea cerralo?`)){            
            localStorage.removeItem('perfil');
            validacionInputUser()//no: indica que el usuario no es nuevo
        };
    }

    else if(perfilUsuario.user == undefined && perfilUsuario.uid == undefined){
        spinner('sniper-cargar-perfil','show');
        validacionInputUser()//no: indica que el usuario no es nuevo
    }
    //valida los nombres de usurio 
    function validacionInputUser(){
        //Validacion de user name
        let access = true;
        //caracteres extraños
        // const charNull = ['@','#','$','%','^','&','*','`','(',')','-','_','+,','=','|'];
        let perfil = `${document.querySelector('.cargar-perfil').value}`;
        console.log(perfil);

        //verifiicar inputs
        if(perfil.length <= 3){
            spinner('sniper-cargar-perfil','hide');
            access = false;
            document.querySelector('.msg-modal-perfil-error').textContent = 'Error: no se admiten menos de 4 caracterees';
            toogleClass('msg-modal-perfil-error','d-none','unique','rem-put');
        }
        else if(perfil.length > 10){
            spinner('sniper-cargar-perfil','hide');
            access = false;
            document.querySelector('.msg-modal-perfil-error').textContent = 'Error: solo se admiten un maximo de 10 caracteres';
            toogleClass('msg-modal-perfil-error','d-none','unique','rem-put');
        }

        //cargar perfil
        else if(access == true){
            console.log('Cargando perfil: nuevo');
            cargarPefil(perfil, access);
        } 
    }
    

    // else if(charNull.includes(perfil)){
    //     access = false;
    //     document.querySelector('.msg-modal-perfil-error').textContent = 'Error: Solo se admiten letras y numeros';
    //     toogleClass('msg-modal-perfil-error','d-none','unique','rem-put');
    // }   
});

 //cargar perfil del usuario
 function cargarPefil(perfil, access, accion){    
    if(access == true){
        //verificar si existe perfil y capturar perfil
        const consultaPerfil = userPerfil(perfil, 'consulta');

        if(consultaPerfil.existe == true && !accion){
           
            guardarPerfilLocal(consultaPerfil);
        }

        else if(consultaPerfil.existe == false){  
            if(!accion) {
                guardarPerfilLocal({uid:undefined});
            }   

            else if(accion == 'guardar-perfil'){
                let nuevoPerfil = userPerfil(perfil, 'crear-nuevo-perfil');
                if(nuevoPerfil.existe == 'ok'){
                    const consultaPerfil = userPerfil(nuevoPerfil.user, 'consulta');
                    guardarPerfilLocal(consultaPerfil);
                }
            } 
        }
    }    
}

//guardar el perfil en local
function guardarPerfilLocal(resPerfil){

    if(resPerfil.uid != undefined){
        //guardar en local
        localStorage.setItem('perfil',JSON.stringify(resPerfil));

        //verficar la carga en local
        if(JSON.parse(localStorage.getItem('perfil'))){
            //chequear datos guardados
            let checkPerfil = JSON.parse(localStorage.getItem('perfil'));
            if(checkPerfil.uid != undefined && checkPerfil.user != undefined){
                toogleClass('msg-modal-perfil-error','d-none','unique','add');
                toogleClass('recuperar-perfil','d-none','unique','add');
                toogleClass('msg-modal-perfil-success','d-none','unique','put-load');
            }
        }
    }
    else if(resPerfil.uid ==  undefined){
        spinner('sniper-cargar-perfil','hide');
        toogleClass('msg-modal-perfil-error','d-none','unique','remove');
        toogleClass('recuperar-perfil','d-none','unique','remove');
    }
}

//Cerrar sesion
function  sesion(accion){
    if(accion == 'cerrar'){
        if(confirm('Estas apunto de cerrar sesion de tu perfil. Continuar?')){
            localStorage.removeItem('perfil');
            location.href="./"
        }
    }
}



