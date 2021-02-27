import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { theme } from '../../../config/theme';
import SpecialText from '../../../components/SpecialText';
import InputSelect from '../../../components/CustomInputText/InputSelect';
import TextInput from '../../../components/CustomInputText/InputText';
import InputDatePicker from '../../../components/CustomInputText/InputDatePicker';
import { ValidateForm } from '../../../helpers/validateForm';
import {
  Container,
  SubmitButton,
  ContainerButton,
  ContainerForm,
} from './styles';
import Border from '../../../components/Border';
import Background from '../../../components/Background';
import { setInterviewData } from '../../../store/ducks/interview';
import { setCurrentUBS } from '../../../store/ducks/currentUBS';
import { isEmpty } from 'lodash';
import { View } from "react-native";

export default function Interview({ navigation }) {
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const [selectedUBS, setSelectedUBS] = useState({});
  const [selectedInstitution, setSelectedInstitution] = useState({
    basicHealthUnities: [],
  });

  const { user } = useSelector((state) => state.auth);
  const currentUBS = useSelector((state) => state.currentUBS.ubs);
  const institutions = useSelector((state) => state.basicHealthUnit);

  const listInstitution = institutions.map((item) => ({
    value: item.id,
    label: item.description,
    basicHealthUnities: item.basicHealthUnities.map((i) => ({
      value: i.id,
      label: i.description,
      idInstitution: i.idInstitution,
    })),
  }));

  const handleInitialValues = () => {
    const userInstitution = listInstitution.filter(
      (inst) => inst.value === user.idInstitution
    )[0];

    const userUbs = userInstitution.basicHealthUnities.filter(
      (ubs) => ubs.value === user.idUbs
    )[0];

    setSelectedInstitution(userInstitution);
    setSelectedUBS(isEmpty(currentUBS) ? userUbs : currentUBS);
  };

  const handleSelectedInstitution = (institution) => {
    setSelectedInstitution(institution);
    setSelectedUBS(null);
  };

  function handleBack() {
    formRef.current.reset();
    navigation.goBack();
  }

  async function handleSubmit(data) {
    const shape = {
      childName: Yup.string().label('iniciais').max(80).required(),
      institution: Yup.string().label('Instituição').required(),
      ubs: Yup.string().label('UBS').required(),
      childBirthDate: Yup.date()
        .label('data de nascimento')
        .max(data.interviewDate)
        .required(),
      interviewDate: Yup.date().label('data da entrevista').required(),
    };

    if (await ValidateForm(data, shape, formRef)) {
      const childMonths = moment().diff(data.childBirthDate, 'months');
      const childYearsInDays = moment().diff(data.childBirthDate, 'days');
      const FiveYearsInDays = 1827;

      if (childYearsInDays > FiveYearsInDays) {
        showMessage({
          message: 'A criança deve ter no máximo 5 anos.',
          type: 'danger',
          icon: 'danger',
        });

        return;
      }

      const interviewData = {
        childName: data.childName,
        idUser: user.id,
        idInstitution: data.institution.value,
        idUbs: data.ubs.value,
        interviewDate: data.interviewDate,
        childBirthDate: data.childBirthDate,
        blockPipas: childMonths,
      };

      dispatch(setInterviewData(interviewData));
      dispatch(setCurrentUBS(data.ubs))

      navigation.navigate('BlockOfQuestionnaire');
    }
  }

  useEffect(() => {
    handleInitialValues();
  }, [currentUBS]);

  return (
    <>
      {/* <Background> */}
        <Border />
        <Container>
          <SpecialText text="Nova Entrevista" styleTitle={{ fontSize: 30 }} />
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              institution: user.idInstitution,
              ubs: user.idUbs,
              childBirthDate: new Date(),
              interviewDate: new Date(),
            }}
          >
            <ContainerForm>
              <View style={{ zIndex: 2 }}>
                <InputSelect
                  name="institution"
                  label="Selecione uma instituição..."
                  options={listInstitution}
                  initialValue={user.idInstitution}
                  onChangeValue={(value) => handleSelectedInstitution(value)}
                />
              </View>

              <View style={{ zIndex: 1 }}>
                <InputSelect
                  name="ubs"
                  label="Selecione uma UBS..."
                  options={selectedInstitution?.basicHealthUnities}
                  initialValue={selectedUBS}
                  onChangeValue={() => { }}
                />
              </View>
              <TextInput
                name="childName"
                label="Iniciais"
                autoCapitalize="words"
                maxLength={80}
                returnKeyType="next"
              />
              <InputDatePicker
                dateInitial={new Date()}
                name="childBirthDate"
                label="Data de nascimento"
              />
              <InputDatePicker
                disabled
                dateInitial={new Date()}
                name="interviewDate"
                label="Data da entrevista"
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
                  onPress={() => formRef.current.submitForm()}
                  width={45}
                >
                  Iniciar
                </SubmitButton>
              </ContainerButton>
            </ContainerForm>
          </Form>
        </Container>
      {/* </Background> */}
      </>
  );
}
