//check url id perfil

export const perfil = JSON.parse(localStorage.getItem('perfil'));
//almacen "perfil"
setInterval(() => {
    if(perfil == null){
        localStorage.setItem('perfil',JSON.stringify({}));
    }
}, 3000);

export let estadoSesion = (perfil.user && perfil.uid) ? true : false;