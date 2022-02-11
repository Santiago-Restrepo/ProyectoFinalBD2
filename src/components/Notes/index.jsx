/** LIBRERIAS */
import React, { useRef, useState } from 'react';

/** ESTILOS */
import './estilos.sass';

export const Notes = ({setNotes}) => {
	const [ buttonDisabled, setbuttonDisabled ] = useState(false);

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
				console.log(valorTotalPorcentaje);
				
			} else {
				alert("Ups! Te pasaste del 100% Por favor ingresa los porcentajes correspondientes");
			}
	
		} else {
			alert("Por favor ingrese alguna nota");
		}
	}

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
					onClick={() => getPlans()} >Confirmar</button>
				<button 
					className="newPlan__cancelBtn" 
					title='Cancelar cambios' 
					disabled={!buttonDisabled} 
					onClick={() => setbuttonDisabled(false)} >Cancelar</button>
			</div>
		</section>
	);
};