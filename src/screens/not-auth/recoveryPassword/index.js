import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native';
import { ValidateForm } from '../../../helpers/validateForm';
import { authApi } from '../../../services/api';
import {
  Container,
  SubmitButton,
  ContainerForm,
  ContainerButton,
} from './styles';
import { theme } from '../../../config/theme';
import Border from '../../../components/Border';
import Background from '../../../components/Background';
import SpecialText from '../../../components/SpecialText';
import TextInputMask from '../../../components/CustomInputText/InputTextMask';
import { verifyIsInternet } from '../../../helpers/validations';

export default function RecoveryPassword({ navigation }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function error(err) {
    const hasInternet = await verifyIsInternet();
    setLoading(false);
    if (hasInternet) {
      if (err?.response?.data?.message) {
        showMessage({
          message: `${err?.response?.data?.message}`,
          type: 'danger',
          icon: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Verifique sua conexão com a internet.',
        type: 'warning',
        icon: 'info',
      });
    }
  }
  function success(response) {
    setLoading(false);
    formRef.current.reset();
    setDisabled(true);
    showMessage({
      message: response.data.message,
      type: 'success',
      icon: 'success',
    });

    navigation.goBack();
  }

  async function handleSubmit(data) {
    setLoading(true);
    const shape = {
      cpf: Yup.string().label('CPF').required(),
    };

    if (await ValidateForm(data, shape, formRef)) {
      const cpfFormatted = data.cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');
      data.cpf = cpfFormatted;
      authApi
        .recoveryPassword(data)
        .then((response) => {
          success(response);
        })
        .catch((err) => error(err));
    } else {
      setLoading(false);
    }
  }

  return (
    <>
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: theme.colors.white }}
      >
        {/* <Background> */}
          <Border />

          <Container>
            <SpecialText text="Recuperar Senha" styleTitle={{ fontSize: 30 }} />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <ContainerForm style={{ marginTop: 30 }}>
                <TextInputMask
                  name="cpf"
                  label="CPF"
                  type="cpf"
                  returnKeyType="next"
                  maxLength={14}
                  countInvisible
                  style={{ flex: 1 }}
                />
              </ContainerForm>
              <ContainerButton>
                <SubmitButton
                  onPress={() => navigation.goBack()}
                  style={{ backgroundColor: theme.colors.darkGrey }}
                  width={45}
                >
                  Voltar
                </SubmitButton>
                <SubmitButton
                  onPress={() => !disabled && formRef.current.submitForm()}
                  disabled={loading}
                  loading={loading}
                  width={45}
                >
                  Enviar
                </SubmitButton>
              </ContainerButton>
            </Form>
          </Container>
        {/* </Background> */}
      </ScrollView>
    </>
  );
}
