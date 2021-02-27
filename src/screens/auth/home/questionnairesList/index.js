import React from 'react';
import { View, ScrollView } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ChildName,
  InfoWrapper,
  ItemContainer,
  InfoText,
  InfoIcon,
} from './styles';
import { theme } from '../../../../config/theme';

Icon.loadFont();

export default function QuestionnaireesList({ data }) {
  const formatDate = (date) => moment(date).format('DD/MM/YYYY');

  const childAge = (childBirthday) => {
    const days = moment().diff(childBirthday, 'days');
    const months = moment().diff(childBirthday, 'months');
    const years = moment().diff(childBirthday, 'years');

    if (months === 0) return `${days} dias`;
    if (months === 1) return `${months} mês`;
    if (months >= 2 && months < 12) return `${months} meses`;
    if (months === 12) return `${years} ano`;
    return `${years} anos`;
  };

  return (
    <ScrollView nestedScrollEnabled>
      {data.map((questionnarie, index) => (
        <ItemContainer key={index}>
          <View>
            <ChildName>{questionnarie.childName}</ChildName>

            <InfoWrapper>
              <InfoText>
                Idade: {childAge(questionnarie.childBirthDate)} -{' '}
              </InfoText>

              <InfoText>
                Entrevista: {formatDate(questionnarie.interviewDate)}
              </InfoText>
            </InfoWrapper>
          </View>

          <InfoIcon
            style={{
              backgroundColor: questionnarie.synced
                ? theme.colors.green
                : theme.colors.primary,
            }}
          >
            <Icon
              name={questionnarie.synced ? 'done' : 'priority-high'}
              size={30}
              color={theme.colors.white}
            />
          </InfoIcon>
        </ItemContainer>
      ))}
    </ScrollView>
  );
}
