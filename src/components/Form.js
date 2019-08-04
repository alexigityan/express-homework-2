import React from 'react';

import AddForm from './AddForm';
import EditForm from './EditForm';

const Form = (props) => {

  const { addTodo, addText, setAddText, ...editFormProps } = props;
  const addFormProps = { addTodo, addText, setAddText };
  
  if (props.isEditModeOn) {
    return <EditForm  { ...editFormProps } /> ;
  }

  return <AddForm { ...addFormProps } /> ;
   
} 

export default Form;