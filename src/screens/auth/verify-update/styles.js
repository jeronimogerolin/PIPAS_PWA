import styled from 'styled-components/native';
import Button from '../../../components/Button';
import { theme } from '../../../config/theme';

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

export const Illustration = styled.Image`
  width: 220px;
  height: 220px;
  margin-top: 30px;
`;

export const ContainerButton = styled.View`
  justify-content: flex-end;
  align-items: center;
  justify-content: space-around;
  margin-top: 60px;
`;

export const SubmitButton = styled(Button)`
  background: ${theme.colors.primary};
  color: #fff;
  margin: 0 10px;
  font-size: 18px;
  margin: 5px 0;
  min-width: 130px;
`;
