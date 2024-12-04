import React from "react";
import useForm from "../Hooks/useForm";

const Form = ({ children, action, form_fields, initial_state_form }) => {
  const { formState, handleChange, handleChangeImage } =
    useForm(initial_state_form);

  const handleSubmit = (e) => {
    e.preventDefault();
    action(formState); // Enviar el estado del formulario al método de acción
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldList
        form_fields={form_fields}
        handleChange={handleChange}
        handleChangeImage={handleChangeImage}
        form_state={formState || {}}
      />
      {children}
    </form>
  );
};

const FieldList = ({ form_fields, handleChange, handleChangeImage, form_state }) => {
    return form_fields.map((field, index) => (
        <Field
            key={index + field.field_data_props.name}
            field={field}
            handleChange={handleChange}
            handleChangeImage={handleChangeImage}
            state_value={form_state[field.field_data_props.name] || ""} 
        />
    ));
};


const Field = ({ field, handleChange, handleChangeImage, state_value }) => {
  const isFileInput = field.field_data_props.type === "file"; 

  return (
    <div {...field.field_container_props}>
      {field.label_text && <label>{field.label_text}</label>}
      <>
        {field.field_component === "INPUT" ? (
          <input
            onChange={
              isFileInput
                ? (e) => handleChangeImage(e, field.field_data_props.name)
                : handleChange
            }
            value={isFileInput ? undefined : state_value} // No se debe usar value para inputs de tipo file
            {...field.field_data_props}
          />
        ) : (
          <textarea {...field.field_data_props}></textarea>
        )}
      </>
    </div>
  );
};

export default Form;
