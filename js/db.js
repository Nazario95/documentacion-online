//Simulacion de usuarios en la nube
 let dbUserList = [
    {user:'nazario', uid:'ierk3994jbnjdhx4'},
    {user:'belinda', uid:'iexx00945cnjdh33'},
    {user:'jaftanil', uid:'yacrab345cnjdh33'},
];
guardarDatoCloud(dbUserList);
// console.log(JSON.parse(localStorage.getItem('cloud')))
export function userPerfil(user, q){
    let perfil = {existe:false};

    if(q === 'consulta'){

        JSON.parse(localStorage.getItem('cloud')).forEach(usuario=>{
            if(usuario.user == user){
                perfil = {
                    existe:true,
                    user:usuario.user,
                    uid:usuario.uid
                }
            }
        });
    }

    else if(q === 'crear-nuevo-perfil'){
               
        //guardamos el usuario en la nube
        let dbPerfiles =  JSON.parse(localStorage.getItem('cloud'));
        dbPerfiles.push({user:user,uid:'random-8ei88ri0ei8riie'});
        guardarDatoCloud(dbPerfiles)

        //enviamos la respuesta
        perfil = {
            existe:'ok',
            user:user
        } 
    }

    return perfil;
}

 //guardamos en la nube
 function guardarDatoCloud(dbUserList){
    localStorage.setItem('cloud',JSON.stringify(dbUserList));
}