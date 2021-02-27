import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../../../config/theme';
import Button from '../../../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  margin: ${theme.metrics.baseSpacing}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  padding: ${theme.metrics.baseRadius}px 0;
`;

export const Label = styled.Text`
  font-size: 20px;
  margin: ${theme.metrics.doubleBaseSpacing}px 0 ${theme.metrics.smallSpacing}px 0;
  color: ${theme.colors.darkGrey};
`;

export const QuestionText = styled.Text`
  font-size: 18px;
  padding: ${theme.metrics.smallSpacing}px 0;
`;

export const ContainerButton = styled.View`
  margin-top: 15px;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const SubmitButton = styled(Button)`
  margin: ${theme.metrics.smallSpacing}px 0;
  background: ${theme.colors.primary};
  width:40%
`;

export const Row = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

export const InvalidMessage = styled.View`
  border-color: ${theme.colors.invalid};
  padding: ${theme.metrics.baseSpacing}px;
  margin: ${theme.metrics.baseSpacing}px;
  background-color: ${theme.colors.invalid};
`;
