import React, { useState } from 'react';
import { Notes } from "../components/Notes";

export const Nuevo = () => {
  const [notes, setNotes] = useState({});//estado para guardar la data entre padre e hijo
  const [click, setClick] = useState(false);//estado para saber cuando hacer autoclick en los hijos

  /***no olvidar el setClick(false) */

  console.log(notes);
  return (
    <>
      <Notes setNotes={setNotes} click = {click} setClick={() => setClick()}/>
      <button onClick={()=>{setClick(true)}}>Guardar plan</button>{/**cambia nombre por props */}
    </>
  );
}