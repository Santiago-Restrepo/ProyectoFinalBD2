/** LIBRERIAS */
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Context } from '../../Context';

/** ESTILOS */
import './estilos.sass';

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
			<td><input type="text" /></td>
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
			data.map((nota) => {
				if(nota.porcentaje != '')
					porcentajes.push(parseInt(nota.porcentaje))});
			
			let valorTotalPorcentaje = 0;
			if(porcentajes.length != 0){
				valorTotalPorcentaje = porcentajes.reduce((valorAnterior, valorActual) => (valorAnterior + valorActual));
			}

			if(valorTotalPorcentaje <= 100){
				setNotes(data);
				setbuttonDisabled(true);
			} else {
				alert("Ups! Te pasaste del 100% Por favor ingresa los porcentajes correspondientes");
			}
		} else {
			alert("Por favor ingrese alguna nota");
		}
	}
	
	useEffect(async () => {
		if(mode){
			/** CUANDO ESTEMOS EN LA PANTALLA VIEWPLAN */
			/** HACER FETCH Y PASAR LOS VALORES DE LA BD CON EL ID QUE VIENE POR URL */

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
										<td><input type="text" defaultValue={nota.nota} /></td>
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