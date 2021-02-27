import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native';
import { theme } from '../../../config/theme';
import { verifyIsInternet } from '../../../helpers/validations';
import { AddBlockData } from '../../../store/ducks/block';
import { AddUbsData } from '../../../store/ducks/basicHealthUnit';
import {
  ContentWrapper,
  Illustration,
  ContainerButton,
  SubmitButton,
} from './styles';
import Border from '../../../components/Border';
import Background from '../../../components/Background';
import { blockApi, basicHealthUnitApi } from '../../../services/api';
import updateQuestionnaireVector from '../../../assets/images/update_questionnaire.png';
import SpecialText from '../../../components/SpecialText';

export default function VerifyUpdates({ navigation }) {
  const dispatch = useDispatch();

  const [loadingQuestionnarie, setLoadingQuestionnarie] = useState(false);
  const [loadingUBS, setLoadingUBS] = useState(false);
  const [disable, setDisable] = useState(false);

  async function updateQuestionnaries() {
    const hasInternet = await verifyIsInternet();

    if (hasInternet) {
      setDisable(true);
      setLoadingQuestionnarie(true);

      blockApi
        .findAll()
        .then((response) => {
          showMessage({
            message: 'Dados dos questionários atualizados com sucesso',
            type: 'success',
            icon: 'success',
          });

          dispatch(AddBlockData(response.data.data));
        })
        .catch(() => {
          showMessage({
            message: 'Algo inesperado aconteceu ao atualizar o questionário',
            type: 'danger',
            icon: 'danger',
          });
        })
        .finally(() => {
          setDisable(false);
          setLoadingQuestionnarie(false);
        });
    } else {
      showMessage({
        message: 'Verifique sua conexão com a internet.',
        type: 'warning',
        icon: 'info',
      });
    }
  }

  async function updateUBS() {
    const hasInternet = await verifyIsInternet();

    if (hasInternet) {
      setDisable(true);
      setLoadingUBS(true);

      basicHealthUnitApi
        .findAll()
        .then((response) => {
          showMessage({
            message: 'Lista de UBS atualizada com sucesso',
            type: 'success',
            icon: 'success',
          });
          dispatch(AddUbsData(response.data.data));
        })
        .catch(() => {
          showMessage({
            message: 'Algo inesperado aconteceu ao atualizar a lista de UBS',
            type: 'danger',
            icon: 'danger',
          });
        })
        .finally(() => {
          setDisable(false);
          setLoadingUBS(false);
        });
    } else {
      showMessage({
        message: 'Verifique sua conexão com a internet.',
        type: 'warning',
        icon: 'info',
      });
    }
  }

  return (
    <ScrollView
      nestedScrollEnabled
      style={{ backgroundColor: theme.colors.white }}
      keyboardShouldPersistTaps="always"
    >
      {/* <Background> */}
        <Border />

        <SpecialText
          text="Verificar atualizações"
          styleTitle={{ fontSize: 30, marginTop: 20 }}
        />

        <ContentWrapper>
          <Illustration source={updateQuestionnaireVector} />

          <ContainerButton>
            <SubmitButton
              onPress={() => updateQuestionnaries()}
              disabled={disable}
              loading={loadingQuestionnarie}
            >
              Questionários
            </SubmitButton>

            <SubmitButton
              onPress={() => updateUBS()}
              disabled={disable}
              loading={loadingUBS}
            >
              Lista de UBS
            </SubmitButton>

            <SubmitButton
              style={{ backgroundColor: theme.colors.darkGrey }}
              onPress={() => navigation.navigate('Home')}
            >
              Voltar
            </SubmitButton>
          </ContainerButton>
        </ContentWrapper>
      {/* </Background> */}
    </ScrollView>
  );
}
