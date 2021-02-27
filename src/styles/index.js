import styled from 'styled-components/native';

export const BackgroundToolBar = styled.View`
  background-color: ${(props) => props.theme.colors.lightGrey};
  flex: 1;
`;

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.lightGrey};
  flex: 1;
  align-items: center;
  padding: ${(props) => props.theme.metrics.baseSpacing}px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSize.medium}px;
  padding-left: ${(props) => props.theme.metrics.smallSpacing}px;
  font-weight: bold;
  padding-bottom: ${(props) => props.theme.metrics.smallSpacing}px;
`;
