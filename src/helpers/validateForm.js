import * as Yup from 'yup';

export async function ValidateForm(data, shape, formRef) {
  try {
    const schema = Yup.object().shape(shape);
    await schema.validate(data, {
      abortEarly: false,
    });
    formRef.current.setErrors({});
    return true;
  } catch (err) {
    const validationErrors = {};
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      formRef.current.setErrors(validationErrors);
    }
    return false;
  }
}
