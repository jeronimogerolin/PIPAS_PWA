import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native';
import logoPipas from '../../../assets/images/logo_pipas.png'
import SpecialText from '../../../components/SpecialText';
import { theme } from '../../../config/theme';
import {
  Container,
  EmptyViewContainer,
  Logo,
  ButtonsWrapper,
  EmptyViewText,
  NewInterviewBtn,
  SyncBtnc,
} from './styles';
import Background from '../../../components/Background';
import { questionnariesApi } from '../../../services/api';
import { toggleToSynced } from '../../../store/ducks/questionnaries';
import QuestionnairesList from './questionnairesList';
import { verifyIsInternet } from '../../../helpers/validations';

export default function Home({ navigation }) {
  const questionnaries = useSelector((state) => state.questionnaries);

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const renderQuestionnariesList = () => (
    <QuestionnairesList data={questionnaries} />
  );

  const saveQuestionnarie = (questionnarie, index) =>
    new Promise((resolve) => {
      questionnariesApi
        .create(questionnarie)
        .then(() => {
          dispatch(toggleToSynced(questionnarie));
          resolve(index);
        })
        .catch(() => {
          resolve(index);
        });
    });

  const synchronize = async () => {
    const hasInternet = await verifyIsInternet();

    if (hasInternet) {
      const questionnariesToSync = questionnaries.filter(
        (item) => !item.synced
      );

      setLoading(true);

      if (questionnariesToSync.length > 0) {
        questionnariesToSync.forEach(async (questionnarie, index) => {
          const processedIndex = await saveQuestionnarie(questionnarie, index);

          if (questionnariesToSync.length === processedIndex + 1) {
            showMessage({
              message: 'Sincronização finalizada.',
              type: 'success',
              icon: 'success',
            });

            setLoading(false);
          }
        });
      } else {
        showMessage({
          message: 'Não há dados a serem sincronizados!',
          type: 'info',
          icon: 'info',
        });

        setLoading(false);
      }
    } else {
      showMessage({
        message: 'Verifique sua conexão com a internet.',
        type: 'warning',
        icon: 'info',
      });

      setLoading(false);
    }
  };

  const renderEmptyView = () => (
    <EmptyViewContainer>
      <EmptyViewText>Não existem dados a serem exibidos.</EmptyViewText>
    </EmptyViewContainer>
  );

  return (
    <>
      <ScrollView
        nestedScrollEnabled
        style={{ backgroundColor: theme.colors.white }}
        keyboardShouldPersistTaps="always"
      >
        {/* <Background> */}
          <Container>
            <Logo
              source={logoPipas}
              style={{
                height: 120,
                width: 230,
              }}
            />

            <SpecialText
              text="Entrevistas"
              styleTitle={{ fontSize: 30, marginTop: 20 }}
            />

            <ButtonsWrapper>
              <NewInterviewBtn
                onPress={() => navigation.navigate('Interview')}
                width={70}
              >
                Nova Entrevista
              </NewInterviewBtn>

              <SyncBtnc
                onPress={() => !isLoading && synchronize()}
                width={20}
                loading={isLoading}
              >
                <Icon name="sync" size={25} color={theme.colors.white} />
              </SyncBtnc>
            </ButtonsWrapper>

            {questionnaries.length > 0
              ? renderQuestionnariesList()
              : renderEmptyView()}
          </Container>
        {/* </Background> */}
      </ScrollView>
    </>
  );
}