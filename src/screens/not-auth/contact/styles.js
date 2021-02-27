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

export const SubmitButton = styled(Button)`
  margin: ${theme.metrics.smallSpacing}px 0;
  background: ${theme.colors.primary};
`;

export const ContainerForm = styled.View`
  margin-top: 20px;
`;
export const ContainerBackText = styled.View`
  margin-top: 15px;
  align-items: flex-end;
`;

export const ContainerButton = styled.View`
  margin-top: 15px;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
`;
