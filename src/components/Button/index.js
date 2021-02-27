import React from 'react';
import { Button as ButtonPaper } from 'react-native-paper';
import { theme } from '../../config/theme';
 
export default function Button(props) {
 const { children, loading, backgroundColor } = props;
 
 return (
 <ButtonPaper
 style={{
 marginTop: 15,
 marginBottom: 5,
 
 }}
 contentStyle={{
 backgroundColor: backgroundColor,// || theme.colors.primary,
 borderRadius: 7,
 padding: 5,
 
 }}
 {...props}
 color="white"
 loading={loading}
 >
 {children}
 </ButtonPaper>
 );
}

/* import React from 'react';
import { ButtonStyled, TextButtonStyled } from './styles';
import Loading from '../Loading';

export default function Button(props) {
  const { children, loading } = props;

  return (
    <ButtonStyled {...props}>
      {loading ? (
        <Loading size="small" />
      ) : (
        <TextButtonStyled {...props}> {children} </TextButtonStyled>
      )}
    </ButtonStyled>
  );
} */
