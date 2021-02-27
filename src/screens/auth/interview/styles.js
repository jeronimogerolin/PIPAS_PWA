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
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
export const TouchableOpacityDownload = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerForm = styled.View`
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin: ${theme.metrics.smallSpacing}px 0;
  background: ${theme.colors.primary};
  width: 40%
`;
