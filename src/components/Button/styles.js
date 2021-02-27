import styled from 'styled-components/native';

export const TextButtonStyled = styled.Text`
  color: ${(props) => props.textColor || props.theme.colors.white};
  text-align: center;
  font-weight: bold;
  font-size: 22px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.primary};
  width: ${(props) => props.width || 100}%;
  height: ${(props) => props.theme.metrics.doubleBaseSpacing}px;
  padding: ${(props) => props.theme.metrics.baseRadius}px;
  justify-content: center;
  align-self: center;
  margin: 5px 0;
  border-radius: 7px;
`;
