import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Background } from './styles';
import logoPipas from '../../assets/images/logo_pipas.png';
import Loading from '../../components/Loading';
import { theme } from '../../config/theme';

export default function Splash({ navigation }) {
  const { token, user } = useSelector((state) => state.auth);

  const [width] = useState(new Animated.Value(0));
  const [height] = useState(new Animated.Value(0));

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Animated.timing(width, {
      toValue: 280,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    Animated.timing(height, {
      toValue: 150,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      !token ? navigation.replace('Auth') : navigation.replace('Dashboard');
    }, 2200);
  }, []);

  const renderLoadingContainer = () => (
    <View>
      <Loading color={theme.colors.primary} />

      <Text style={{ marginTop: 30 }}>Atualizando as informações...</Text>
    </View>
  );

  return (
    <>
    <Background>
      <Animated.Image source={logoPipas} style={{ width, height }} />

      {isLoading && renderLoadingContainer()}
    </Background>
   </>
  );
}
