import { useCallback, useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  const resetForm = useCallback(
    (newValues = inputValues) => {
      setValues(newValues);
    },
    [inputValues],
  );

  return { values, handleChange, resetForm };
}
