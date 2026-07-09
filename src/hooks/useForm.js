import { useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function resetForm(newValues = inputValues) {
    setValues(newValues);
  }

  return { values, handleChange, resetForm };
}
