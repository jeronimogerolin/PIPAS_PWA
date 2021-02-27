import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native';
import { verifyIsInternet } from '../../../helpers/validations';
import { ValidateForm } from '../../../helpers/validateForm';
import { authApi } from '../../../services/api';
import {
  Container,
  SubmitButton,
  Logo,
  TextLinkAction,
  ContainerForm,
  ContainerTextLink,
  ContainerTermsOfUse,
} from './styles';
import TextInputPassword from '../../../components/CustomInputText/InputPassword';
import logoPipas from '../../../assets/images/logo_pipas.png';
import { AddAuthData } from '../../../store/ducks/auth';
import { theme } from '../../../config/theme';
import Border from '../../../components/Border';
import Background from '../../../components/Background';
import TextInputMask from '../../../components/CustomInputText/InputTextMask';
import downloadInformations from '../../../helpers/downloadInformations';

export default function SignIn({ navigation }) {
  const { replace, navigate } = navigation;
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function error(err) {
    const hasInternet = await verifyIsInternet();
    setLoading(false);

    if (hasInternet) {
      if (err?.response?.data?.message) {
        showMessage({
          message:
            `${err?.response?.data?.message}` || 'Algo inesperado aconteceu!',
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
  async function success(response) {
    const auth = response.data.data;
    dispatch(AddAuthData(auth));

    await downloadInformations(dispatch, auth?.user);

    showMessage({
      message: response.data.message,
      type: 'success',
      icon: 'success',
    });

    setLoading(false);
    setDisabled(true);

    replace('Dashboard');
  }

  async function handleSubmit(data) {
    setLoading(true);
    const shape = {
      cpf: Yup.string().label('CPF').min(11).required(),
      password: Yup.string().label('senha').required(),
    };

    if (await ValidateForm(data, shape, formRef)) {
      const cpfFormatted = data.cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');
      data.cpf = cpfFormatted;
      authApi
        .login(data)
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
            <Logo
              source={logoPipas}
              style={{
                height: 120,
                width: 230,
                marginTop: 20,
              }}
            />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <ContainerForm>
                <TextInputMask
                  name="cpf"
                  label="CPF"
                  type="cpf"
                  returnKeyType="next"
                  maxLength={14}
                  countInvisible
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef('password').focus()
                  }
                />

                <TextInputPassword
                  name="password"
                  label="Senha"
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current.submitForm()}
                />

                <ContainerTextLink>
                  <TextLinkAction
                    onPress={() =>
                      navigate('Auth', { screen: 'RecoveryPassword' })
                    }
                    style={{ marginBottom: 20 }}
                  >
                    {' '}
                    Esqueceu sua senha?
                  </TextLinkAction>
                  <TextLinkAction
                    onPress={() => navigate('Auth', { screen: 'Contact' })}
                  >
                    Entrar em contato
                  </TextLinkAction>
                </ContainerTextLink>
              </ContainerForm>

              <SubmitButton
                onPress={() => !disabled && formRef.current.submitForm()}
                disabled={loading}
                loading={loading}
              >
                Entrar
              </SubmitButton>
              {/* <ContainerTermsOfUse>
                <TextLinkAction
                  onPress={() => navigate('Auth', { screen: 'TermsOfUse' })}
                >
                  Termos de uso
                </TextLinkAction>
              </ContainerTermsOfUse> */}
            </Form>
          </Container>
        {/* </Background> */}
      </ScrollView>
    </>
  );
}
