import { estadoSesion } from "./sec.js";

//cargar la lista de expedientes
export const dbDocId = ['xxxxx'];

export function expediente(id){
    //buscar doc por su id 
    // en una update, los datos se buscara en remoto

    //crear estructura de datos
    let dataDoc = {
        id:'xxxxx',
        fases:[
            {
                numFase:1,
                asunto:'legalizacion de terreno',
                datos:[
                    'titulo de propiedad-O/C',
                    'Contrato de compraventa-(O/C)',
                    'Plano situacional-(O/C)',
                    'Certificado de medicion-(O/C)',
                    'DIP del comprador-(O/C)',
                    'DIP del venderdor-(O/C)'
                ],
                lugar:'gestoria naz',
                estado:'completado',
                fecha:'Mon May 13 2024'
            },
            {
                numFase:2,
                asunto:'tramitacion en ministerio de justicia',
                datos:['Los documentos estan siendo tramitados en la Notaria.'],
                lugar:'ministerio de justicia (Notaria)',
                estado:'en proceso',
                fecha:'Mon May 20 2024'
            },
            {
                numFase:3,
                asunto:'tramitacion en registro de propiedades',
                datos:[],
                lugar:'ministerio de justicia (registro de propiedad)',
                estado:'esperando',
                fecha:'Mon May 29 2024'
            },
            {
                numFase:4,
                asunto:'esperando ser retirado',
                datos:['Tramitacion completa, pase a retirar el expediente en nuestras oficinas'],
                lugar:'gestoria nazz',
                estado:'esperando',
                fecha:'Mon May 30 2024'
            },
        ]
    }
    //devolvemos los datos encontrados
    return dataDoc;    
} 


//======= Cargar datos de perfil
let perfilUsuario = {};
 if(JSON.parse(localStorage.getItem('perfil'))){
    perfilUsuario = JSON.parse(localStorage.getItem('perfil'));    
}
export {perfilUsuario};



//======== Historial de tramitaciones
export const tablaHitorial = [
    {
        id:'xxxxx',
        titulo:'Legalizacion de Terreno',
        gestoria:'naza gestions',
        idGestoria:'xxaaxxz',
        fecha:'1/1/2024',
        estado:'en proceso'
    },
    {
        id:'xxxaaa',
        titulo:'Autorizacion de viaje',
        gestoria:'Well Well Nazz',
        idGestoria:'1xaax2z',
        fecha:'2/2/2024',
        estado:'completado'
    },
    {
        id:'xxxaza',
        titulo:'Legalizacion de estatutos',
        gestoria:'Stupefacts',
        idGestoria:'1xa1x21',
        fecha:'2/2/2024',
        estado:'cancelado'
    },
]
