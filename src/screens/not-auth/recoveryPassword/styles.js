import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../../components/Button';

import { theme } from '../../../config/theme';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  margin: ${theme.metrics.baseSpacing}px;
`;
export const Logo = styled.Image`
  align-self: center;
  height: 100px;
`;

export const SubmitButton = styled(Button)`
  margin: ${theme.metrics.smallSpacing}px 0;
  background: ${theme.colors.primary};
`;

export const TextSignUp = styled.Text`
  flex-direction: row;
  margin-top: ${theme.metrics.smallSpacing}px;
  text-align: center;
  color: ${theme.colors.darkGrey};
  font-size: ${theme.fontSize.small}px;
`;

export const SingUpLinkText = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.small}px;
`;

export const TextTitle = styled.Text`
  font-size: ${theme.fontSize.wide}px;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
  font-weight: bold;
`;

export const RecoveryPasswordLinkText = styled.Text`
  text-decoration: underline;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: right;
  font-size: ${theme.fontSize.tiny}px;
  color: ${theme.colors.darkGrey};
  margin-bottom: 90px;
`;

export const ContainerForm = styled.View`
  flex: 1;
`;
export const ContainerButton = styled.View`
  margin-top: 100px;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const ContainerSnack = styled.View`
  margin-top: 60px;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
