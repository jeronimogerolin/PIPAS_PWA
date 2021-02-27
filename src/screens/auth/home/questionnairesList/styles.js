import styled from 'styled-components/native';
import { theme } from '../../../../config/theme';

export const ChildName = styled.Text`
  align-self: flex-start;
  font-size: 22px;
  color: ${theme.colors.black};
  max-width: 220px;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
`;

export const ItemContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.mediumGrey};
  margin: ${theme.metrics.smallSpacing}px 0;
  padding: ${theme.metrics.smallSpacing}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.mediumGrey};
`;

export const InfoIcon = styled.View`
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 35px;
`;
