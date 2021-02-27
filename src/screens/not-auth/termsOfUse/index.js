import React from 'react';
import { Text, ScrollView } from 'react-native';
import logoPipas from '../../../assets/images/logo_pipas.png';
import SpecialText from '../../../components/SpecialText';
import { theme } from '../../../config/theme';

import {
  Container,
  SubmitButton,
  ContainerButton,
  Logo,
  ContainerContent,
} from './styles';
import Border from '../../../components/Border';
import Background from '../../../components/Background';

export default function TermsOfUse({ navigation }) {
  return (
    <>
      <ScrollView
        nestedScrollEnabled
        style={{ backgroundColor: theme.colors.white }}
      >
        {/* <Background> */}
          <Border />

          <Container>
            <SpecialText text="Termos de Uso" styleTitle={{ fontSize: 30 }} />
            <Logo
              source={logoPipas}
              style={{
                height: 120,
                width: 230,
                marginTop: 30,
              }}
            />
            <ContainerContent>
              <ScrollView style={{ height: 300 }} nestedScrollEnabled>
                <Text
                  style={{
                    alignItems: 'center',
                    textAlign: 'left',
                    fontSize: 17,
                    margin: 8,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eget ligula eu lectus lobortis condimentum. Aliquam nonummy
                  auctor massa. Pellentesque habitant morbi tristique senectus
                  et netus et malesuada fames ac turpis egestas. Nulla at risus.
                  Quisque purus magna, auctor et, sagittis ac, posuere eu,
                  lectus. Nam mattis, felis ut adipiscing. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu lectus
                  lobortis condimentum. Aliquam nonummy auctor massa.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Nulla at risus. Quisque
                  purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam
                  mattis, felis ut adipiscing. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Etiam eget ligula eu
                </Text>
              </ScrollView>
            </ContainerContent>

            <ContainerButton>
              <SubmitButton
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: theme.colors.darkGrey }}
              >
                Voltar
              </SubmitButton>
            </ContainerButton>
          </Container>
        {/* </Background> */}
      </ScrollView>
    </>
  );
}
