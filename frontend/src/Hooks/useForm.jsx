import { useState } from "react";

const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeImage = (event, fieldName) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageBase64 = reader.result;
            setFormState((prev) => ({ ...prev, [fieldName]: imageBase64 }));
        };
        reader.readAsDataURL(file);
    };

    return {
        formState,
        handleChange,
        handleChangeImage,
    };
};

export default useForm;