export const createControl = (config, validation) => {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  };
};

export const validate = (value, validation = null) => {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
};

export const validateForm = formControls => {
  let isFormValid = true;

  for (const ctrlName in formControls) {
    if (formControls.hasOwnProperty(ctrlName)) {
      isFormValid = formControls[ctrlName].valid && isFormValid;
    }
  }

  return isFormValid;
};
