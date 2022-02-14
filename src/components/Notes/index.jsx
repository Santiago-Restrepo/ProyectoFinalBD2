/** LIBRERIAS */
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Context } from '../../Context';

/** ESTILOS */
import './estilos.sass';

/** ALERTS */
import Swal from 'sweetalert2';

export const Notes = ({setNotes, mode, desabilitar1, desabilitar2}) => {
	const [ buttonDisabled, setbuttonDisabled ] = useState(false);
	const [ renderNotes, setrenderNotes ] = useState([]);

	const { userAutentication } = useContext(Context);

	const Table = useRef(null);
	let data = [];

	const addHomework = ()=>{
		const row = `
		<tr>
			<td><button class='homework__button--delete' title='Eliminar tarea' id="${Table.current.rows.length}">🪓</button></td>
			<td>${Table.current.rows.length}</td>
			<td><input type="text" /></td>

			<td><input type="text" /></td>
			<td><input type="text" /></td>
			<td><input maxLength="5" type="text" /></td>
		</tr>
		`;
		Table.current.insertRow(-1).innerHTML = row;

		Table.current.rows[Table.current.rows.length-1].cells[0]
		.firstElementChild
		.addEventListener('click', (e) => deleteItem(parseInt(e.target.id)));
	}

	const deleteItem = (index) => {
		Table.current.deleteRow(index);
		
		Array.from(Table.current.rows).forEach(function (fila, ind) {
			if(ind !== 0){
				fila.cells[0].firstElementChild.id = ind;
				fila.cells[1].innerText = ind;
			}
		});
	}

	const getPlans = ()=>{
		data.splice(0, data.length);
		Array.from(Table.current.rows).forEach(function (fila, ind) {
			if(ind !== 0){
				let dataRow = {};
				dataRow.nro = fila.cells[1].textContent;
				dataRow.nombre = fila.cells[2].firstElementChild.value;
				dataRow.descripcion = fila.cells[3].firstElementChild.value;
				dataRow.porcentaje = fila.cells[4].firstElementChild.value;
				dataRow.nota = fila.cells[5].firstElementChild.value;
				data.push(dataRow)
			}
		});

		if(data.length != 0){
			let porcentajes = [];
			let porcentajesValidos = true;
			data.map((nota) => {
				if(nota.porcentaje != '' && parseFloat(nota.porcentaje) > 0 && parseFloat(nota.porcentaje) <= 100) {
					porcentajes.push(parseFloat(nota.porcentaje))
				} else {
					porcentajesValidos = false;
				}
			});
			
			let valorTotalPorcentaje = 0;
			if(porcentajes.length != 0){
				valorTotalPorcentaje = porcentajes.reduce((valorAnterior, valorActual) => (valorAnterior + valorActual));
			}

			let notasValidas = true;
			data.map((nota) => {
				if(parseFloat(nota.nota) > 5.0 || parseFloat(nota.nota) < 0) {
					notasValidas = false;
				}
			});

			if(porcentajesValidos && notasValidas && valorTotalPorcentaje <= 100) {
				setNotes(data);
				setbuttonDisabled(true);
			}
			/** INFO */
			if(valorTotalPorcentaje > 100) {
				Swal.fire({
					icon: 'info',
					title: 'Porcentajes 😢',
					html: 'Ups! Te pasaste del 100%. Por favor ingresa los porcentajes correspondientes',
					confirmButtonColor: '#00923F',
					confirmButtonText: 'Vale',
					iconColor: '#0096d2'
				})
			}

			if(!notasValidas) {
				Swal.fire({
					icon: 'info',
					title: 'Notas 😢',
					html: 'Ups! Tienes alguna nota incorrecta. Por favor revisa que el valor de tus notas esten entre 0.0 y 5.0',
					confirmButtonColor: '#00923F',
					confirmButtonText: 'Vale',
					iconColor: '#0096d2'
				})
			}

			if(!porcentajesValidos) {
				Swal.fire({
					icon: 'info',
					title: 'Porcentajes 😢',
					html: 'Ups! Tienes algún porcentaje incorrecto. Por favor revisa que el valor de los porcentajes sean mayores que 0 y menores o iguales a 100%',
					confirmButtonColor: '#00923F',
					confirmButtonText: 'Vale',
					iconColor: '#0096d2'
				})
			}
		} else {
			/** WARNING */
			Swal.fire({
				icon: 'warning',
				title: 'Ingreso de notas',
				html: 'Por favor ingrese por lo menos una nota',
				confirmButtonColor: '#dc143c',
				confirmButtonText: 'Vale',
				iconColor: '#dc143c'
			})
		}
	}
	
	useEffect(async () => {
		if(mode){
			/** CUANDO ESTEMOS EN LA PANTALLA VIEWPLAN */
			/** HACER FETCH Y PASAR LOS VALORES DE LA BD CON EL ID QUE VIENE POR URL */

			try {
				const responseNotesId = await fetch(`https://paseraspandoapi.vercel.app/notes/${mode}`,{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${userAutentication.token}`
					}
				});
	
				const responseJsonNotesId = await responseNotesId.json();
				// console.log(responseJsonNotesId);
				setrenderNotes(responseJsonNotesId.Notas);
				setbuttonDisabled(true);
			} catch (error) {
				console.error(error);
				/** ERROR */
				let timerInterval
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					html: 'Ha sucedido un error 😫',
					timer: 3000,
					timerProgressBar: true,
					iconColor: '#DC143C',
					confirmButtonColor: '#DC143C',
					confirmButtonText: 'Vale',
					willClose: () => {
						clearInterval(timerInterval)
					}
				})
			}
        }
    }, []);

	return (	
		<section>
			<div className='container__homeworks'>
				<fieldset disabled={buttonDisabled}>
					<table ref={Table} className='homeworks' >
						<tbody>
							<tr>
								<th></th>
								<th>Nro </th>
								<th>Nombre </th>
								<th>Descripción </th>
								<th>Porcentaje (%) </th>
								<th>Nota </th>
							</tr>
							{
								renderNotes.length !== 0 && renderNotes.map((nota, index) => (
									<tr key={index}>
										<td><button 
											className='homework__button--delete' 
											title='Eliminar tarea' 
											id={index+1}
											onClick={(e) => deleteItem(e.target.id)}>🪓</button></td>
										<td>{index+1}</td>
										<td><input type="text" defaultValue={nota.nombre} /></td>
										<td><input type="text" defaultValue={nota.descripcion} /></td>
										<td><input type="text" defaultValue={nota.porcentaje} /></td>
										<td><input type="text" maxLength={5} defaultValue={nota.nota} /></td>
									</tr>	
								))
							}
						</tbody>
					</table>
				</fieldset>
				<div className='homeworks__btn--new'>
					<button title='Nueva tarea' onClick={()=>{addHomework()}} disabled={buttonDisabled} >+ Nuevo</button>
				</div>
			</div>
			<div className="newPlan__buttons">
				<button 
					className="newPlan__submitBtn" 
					title='Confirmar cambios' 
					disabled={buttonDisabled}
					onClick={() => {getPlans(); desabilitar1(true);}} >Confirmar</button>
				<button 
					className="newPlan__cancelBtn" 
					title='Editar cambios' 
					disabled={!buttonDisabled} 
					onClick={() => {setbuttonDisabled(false); desabilitar2(true);}} >Editar</button>
			</div>
		</section>
	);
};