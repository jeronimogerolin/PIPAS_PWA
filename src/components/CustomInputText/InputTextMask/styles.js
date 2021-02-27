import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { theme } from '../../../config/theme';

export const TextInputStyled = styled(TextInput)`
  min-height: ${theme.metrics.doubleBaseSpacing}px;
  background-color: ${theme.colors.white};
`;
