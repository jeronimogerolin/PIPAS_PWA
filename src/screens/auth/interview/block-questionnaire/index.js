/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import uuid from 'react-native-uuid';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import Background from '../../../../components/Background';
import Border from '../../../../components/Border';
import { theme } from '../../../../config/theme';
import SpecialText from '../../../../components/SpecialText';
import { setResponseData, clearInterviewData, removeResponseData } from '../../../../store/ducks/interview';
import parameterAgeSelector from '../../../../store/selectors/parameterAgeSelector';
import { setQuestionnaire } from '../../../../store/ducks/questionnaries';
import fieldTypes from '../../../../helpers/fieldTypes';
import { Container, Row, Title, ContainerButton, SubmitButton, Label, QuestionText, InvalidMessage } from './styles';
import { RadioAnswer, NumericAnswer, TextAnswer, DateAnswer, CheckBoxAnswer } from './answers';

const BlockOfQuestionnaire = ({ navigation }) => {
  const dispatch = useDispatch();

  const interview = useSelector((state) => state.interview);
  const scrollViewRef = useRef();

  const blocksOfQuestions = useSelector(parameterAgeSelector());
  const [currentIndexOfBlock, setCurrentIndexOfBlock] = useState(0);

  const isLastBlockOfQuestions = () => currentIndexOfBlock === (blocksOfQuestions.length - 1);
  const isFirstBlockOfQuestions = () => currentIndexOfBlock === 0;

  const [responses, setResponse] = useState({});
  const [invalidAnswers, setInvalidAnswers] = useState([]);
  const [requiredQuestions, setRequiredQuestion] = useState([]);

  const scrollToTop = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }, 500);
  };

  const removeFromInvalidateQuestions = (idQuestion) => {
    setRequiredQuestion(requiredQuestions.filter((question) => question.id !== idQuestion));
  };

  const removeFromInvalidateAnswers = (idAnswer) => {
    setInvalidAnswers(invalidAnswers.filter((id) => id !== idAnswer));
  };

  const handleSubmit = () => {

    const listOfrequiredQuestions = validateRequiredQuestions();

    if (listOfrequiredQuestions.length > 0) {
      showMessage({
        message: 'Alguma questão obrigatória não foi respondida.',
        type: 'danger',
        icon: 'warning',
      });
    } else if (invalidAnswers.length > 0) {
      showMessage({
        message: 'Alguma resposta informada é inválida.',
        type: 'danger',
        icon: 'warning',
      });
    } else {
      const questionnarieData = {
        ...interview,
        identifier: uuid.v4(),
        synced: false,
      };

      dispatch(setQuestionnaire(questionnarieData));

      dispatch(clearInterviewData());

      showMessage({
        message: 'Questionário pronto para ser sincronizado!',
        type: 'success',
        icon: 'success',
      });

      navigation.navigate('Home');
    }
  };

  const handleExit = () => {
    navigation.goBack();
    dispatch(clearInterviewData());
  };

  const handleSetResponseByType = (question, answer) => {
    if (answer.fieldType === fieldTypes.CHECK) {
      setResponse({
        ...responses,
        [question.id]: {
          ...responses[question.id],
          [answer.id]: answer.isChecked,
        },
      });
    } else if (answer.fieldType === fieldTypes.RADIO) {
      setResponse({
        ...responses,
        [question.id]: answer.id,
      });
    } else {
      setResponse({
        ...responses,
        [question.id]: answer.value,
      });
    }
  };

  const setResponseValue = (question, answer) => {
    handleSetResponseByType(question, answer);

    if (!answer.isValid) {
      setInvalidAnswers([...invalidAnswers, answer.id]);
    } else {
      const responseData = {
        idBlock: question.idBlock,
        idQuestion: question.id,
        idAnswer: answer.id,
        number: null,
        label: answer.value,
        result: null,
        isMultiple: answer.fieldType === fieldTypes.CHECK,
      };

      removeFromInvalidateQuestions(responseData.idQuestion);
      removeFromInvalidateAnswers(answer.id);

      dispatch(setResponseData(responseData));
    }
  };

  const showQuestion = (question) => {
    if (question.subQuestion > 0) {
      const match = question.answerToView === responses[question.subQuestion];
      if (match === false) {
        delete responses[question.id];
        dispatch(removeResponseData(question.id));
      }
      return match;
    }

    return true;
  };

  const validateRequiredQuestions = () => {
    const listOfrequiredQuestions = [];

    blocksOfQuestions[currentIndexOfBlock].questions.forEach((question) => {
      if (showQuestion(question) && question.isRequired === 'S' && !responses[question.id]) {
        listOfrequiredQuestions.push(question);
      }
    });

    setRequiredQuestion(listOfrequiredQuestions);
    return listOfrequiredQuestions;
  };

  const nextBlockOfQuestions = () => {
    const listOfrequiredQuestions = validateRequiredQuestions();

    if (listOfrequiredQuestions.length > 0) {
      showMessage({
        message: 'Alguma questão obrigatória não foi respondida.',
        type: 'danger',
        icon: 'warning',
      });
    } else if (invalidAnswers.length > 0) {
      showMessage({
        message: 'Alguma resposta informada é inválida.',
        type: 'danger',
        icon: 'warning',
      });
    } else {
      setCurrentIndexOfBlock(currentIndexOfBlock + 1);
      scrollToTop();
    }
  };

  const previousBlockOfQuestions = () => {
    setRequiredQuestion([]);
    setInvalidAnswers([]);

    setCurrentIndexOfBlock(currentIndexOfBlock - 1);
    scrollToTop();
  };

  const renderAnswers = (answer, question, value) => {
    const answersTypes = {
      [fieldTypes.RADIO]: (
        <RadioAnswer
          answer={answer}
          question={question}
          onChangeValue={setResponseValue}
          value={value}
          key={answer.id}
        />
      ),
      [fieldTypes.TEXT]: (
        <TextAnswer
          answer={answer}
          question={question}
          onChangeValue={setResponseValue}
          value={responses[question.id]}
          key={answer.id}
        />
      ),
      [fieldTypes.NUMERIC]: (
        <NumericAnswer
          answer={answer}
          question={question}
          onChangeValue={setResponseValue}
          value={responses[question.id]}
          key={answer.id}
        />
      ),
      [fieldTypes.DATE]: (
        <DateAnswer
          answer={answer}
          question={question}
          onChangeValue={setResponseValue}
          value={responses[question.id]}
          key={answer.id}
        />
      ),
      [fieldTypes.LONG_TEXT]: (
        <TextAnswer
          answer={answer}
          question={question}
          onChangeValue={setResponseValue}
          value={responses[question.id]}
          key={answer.id}
        />
      ),
      [fieldTypes.CHECK]: (
        <CheckBoxAnswer
          answer={answer}
          question={question}
          value={responses[question.id]}
          onChangeValue={setResponseValue}
          key={answer.id}
        />
      ),
    };

    return answersTypes[answer?.fieldType];
  };

  const renderQuestions = () =>
    blocksOfQuestions[currentIndexOfBlock].questions.sort(item => item.ordination).map((question, key) => {
      if (showQuestion(question)) {
        return (
          <React.Fragment key={key}>
            {question.typeObject === 2
              ? <Label>{question.description}</Label>
              : <QuestionText>
                {question.isRequired &&
                  <Icon
                    name="warning"
                    size={20}
                    color={theme.colors.primary}
                    style={{ marginTop: 10, marginRight: 5 }}
                  />}
                {Number(question.ordination)}){" "}
                {question.description}</QuestionText>
            }

            {question.answers.map((answer) => renderAnswers(answer, question, responses[answer.idQuestion]))}
          </React.Fragment>
        );
      }
    });

  return (
    <>
    {/* <Background> */}
      <ScrollView
        scrollToOverflowEnabled
        style={{ backgroundColor: theme.colors.white }}
        keyboardShouldPersistTaps="always"
        ref={scrollViewRef}
      >
        <Border />

        <SpecialText
          text="Questionário"
          styleTitle={{ fontSize: 30, marginTop: 20 }}
        />

        <Container>
          <Title>{blocksOfQuestions[currentIndexOfBlock].name}</Title>

          <Row>
            <Icon
              name="warning"
              size={20}
              color={theme.colors.primary}
              style={{ marginTop: 6, marginRight: 5 }}
            />

            <Text>Questão obrigatória</Text>
          </Row>

          {renderQuestions()}
        </Container>

        

        
      </ScrollView>
      {requiredQuestions.length > 0 && <InvalidMessage>
          <Text style={{ marginBottom: 20 }}>As seguintes perguntas devem ser respondidas antes de prosseguir: </Text>

          {requiredQuestions.map((question) => <Text key={question.id} style={{ marginBottom: 5 }}>{Number(question.ordination)}) - {question.description}</Text>)}
        </InvalidMessage>}
      <ContainerButton>
          <SubmitButton
            onPress={isFirstBlockOfQuestions() ? handleExit : previousBlockOfQuestions}
            style={{ backgroundColor: theme.colors.darkGrey }}
            width={45}
          >
            {isFirstBlockOfQuestions() ? 'Cancelar' : 'Anterior'}
          </SubmitButton>
          <SubmitButton
            onPress={isLastBlockOfQuestions() ? handleSubmit : nextBlockOfQuestions}
            width={45}
          >
            {isLastBlockOfQuestions() ? 'Finalizar' : 'Próximo'}
          </SubmitButton>
        </ContainerButton>
    </>
    /* </Background> */
    
  );
};

export default BlockOfQuestionnaire;
