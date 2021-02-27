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

export const EmptyViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyViewText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.mediumGrey};
`;

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: ${theme.metrics.smallSpacing}px;
`;

export const NewInterviewBtn = styled(Button)`
  margin: ${theme.metrics.smallSpacing}px 0;
  background: ${theme.colors.primary};
  width:60%
`;

export const SyncBtnc = styled(Button)`
  align-items: center;
  justify-content: center;
  backgroundColor: ${theme.colors.black};
  background: ${theme.colors.blue};
`;
