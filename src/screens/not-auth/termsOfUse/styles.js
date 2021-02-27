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

export const ContainerButton = styled.View`
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const ContainerContent = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  align-self: center;
  flex: 1;
  border: 0.5px;
  border-radius: 7px;
`;

export const Logo = styled.Image`
  align-self: center;
  height: 100px;
`;

export const SubmitButton = styled(Button)`
  margin: ${theme.metrics.smallSpacing}px 0;
  background: ${theme.colors.primary};
`;
