import { estadoSesion } from "./sec.js";
import { tablaHitorial } from "./export-data.js";

// console.log(document.querySelectorAll('.historial'));
document.querySelectorAll('.historial').forEach(historial=>{
    if(!estadoSesion){
        historial.innerHTML=''
    }

    else{
        //ocultar mensaje de "sin perfil activo"
        document.querySelectorAll('.estado-sesion').forEach(msgNoPerfil => {
            msgNoPerfil.innerHTML='';
        });

        //crear componente tablas
        let tabla = '';
        let totalFilas = tablaHitorial.length;
        let btnAcion='';

        tablaHitorial.forEach(fila => {
            let {id, titulo, gestoria, idGestoria, fecha, estado} = fila;

            //color de estado y las acciones de los botones
            let bg; 
            let btCancelBg;//define el color de fondo del boton cacelar
            if(estado == 'en proceso'){bg='warning'; btCancelBg='danger'; btnAcion='Cancelar'}
            else if(estado == 'completado'){bg='success'; btCancelBg='secondary';btnAcion='Terminado'}
            else if(estado == 'cancelado'){bg='secondary'; btCancelBg='info';btnAcion='Reanudar'}

            tabla += `
                <tr>
                    <th>${totalFilas}</th>
                    <td>
                        <a href="./?view=check_doc&id=${id}" class="text-decoration-none">
                            ${titulo}
                        </a>
                    </td>
                    <td>
                        <a href="./view=gestoria&id=${idGestoria}" class="text-decoration-none">
                            ${gestoria}
                        </a>                        
                    </td>
                    <td>${fecha}</td>
                    <td class="bg-${bg}">${estado}</td>
                    <td role="button" class="d-flex justify-content-center">
                        <button type="button" class="btn btn-${btCancelBg} ${btnAcion.toLowerCase()}" id="${id}">
                                ${btnAcion}
                        </button>
                    </td>
                </tr>
            `;
            totalFilas--;
        });
        historial.innerHTML=tabla;
    }
    

})