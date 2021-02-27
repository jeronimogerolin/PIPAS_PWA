import React, { useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native';
import TextInput from '../../../components/CustomInputText/InputText';
import { verifyIsInternet } from '../../../helpers/validations';
import { contactApi } from '../../../services/api';
import { ValidateForm } from '../../../helpers/validateForm';
import {
  SubmitButton,
  Container,
  ContainerForm,
  ContainerButton,
} from './styles';
import Border from '../../../components/Border';
import { theme } from '../../../config/theme';
import Background from '../../../components/Background';
import TextInputMask from '../../../components/CustomInputText/InputTextMask';
import SpecialText from '../../../components/SpecialText';

export default function Contact({ navigation }) {
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
  function handleBack() {
    setDisabled(false);
    formRef.current.reset();
    navigation.goBack();
  }
  function success(response) {
    setLoading(false);
    setDisabled(true);
    showMessage({
      message: response.data.message,
      type: 'success',
      icon: 'success',
    });
    handleBack();
  }

  async function handleSubmit(data) {
    setLoading(true);
    const shape = {
      name: Yup.string().label('nome completo').max(80).required(),
      phoneNumber: Yup.string().label('telefone').min(10).required(),
      email: Yup.string().label('email').max(80).required(),
      message: Yup.string().label('menssagem').max(230).required(),
    };

    if (await ValidateForm(data, shape, formRef)) {
      contactApi
        .create(data)
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
        style={{ backgroundColor: theme.colors.white }}
        nestedScrollEnabled
        keyboardShouldPersistTaps="always"
      >
        {/* <Background> */}
          <Border />
          <Container>
            <SpecialText
              text="Entrar em Contato"
              styleTitle={{ fontSize: 30 }}
            />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <ContainerForm>
                <TextInput
                  name="name"
                  label="Nome completo"
                  autoCapitalize="words"
                  maxLength={80}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef('phoneNumber').focus()
                  }
                />
                <TextInputMask
                  name="phoneNumber"
                  label="Telefone"
                  type="cel-phone"
                  countInvisible
                  returnKeyType="next"
                  maxLength={16}
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef('email').focus()
                  }
                />
                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={80}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef('message').focus()
                  }
                />
                <TextInput
                  name="message"
                  label="Messagem"
                  autoCorrect
                  maxLength={230}
                  numberOfLines={5}
                  multiline
                  onSubmitEditing={() => formRef.current.submitForm()}
                  returnKeyType="send"
                />
                <ContainerButton>
                  <SubmitButton
                    onPress={() => handleBack()}
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
              </ContainerForm>
            </Form>
          </Container>
        {/* </Background> */}
      </ScrollView>
    </>
  );
}
