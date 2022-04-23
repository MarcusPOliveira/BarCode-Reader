import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  Container,
  Header,
  UserPhoto,
  Title,
  CameraWrapper,
  Content,
  BarCode,
  Button,
  Label,
  ButtonTitle,
  CodeList
} from './styles';
import { Text } from 'react-native';

async function askUsersPermissions() {
  const { status } = await BarCodeScanner.requestPermissionsAsync();
  return status === "granted";
}

export function Home() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  if (hasPermission === null) {
    //  return <Text>Obtendo permissões</Text>
  }

  if (hasPermission === false) {
    return <Text>Sem permissões para acessar a câmera</Text>
  }

  if (hasPermission === true) {

  }

  function onBarCodeScanned(payload: { type: string, data: string }) { //type = tipo do código (qrcode, ean, code128) e data é o código em si
    //pegar o data e jogar em um Text para renderizar em tela
    console.log(payload.data)
  }

  useEffect(() => {
    askUsersPermissions().then(setHasPermission);
  }, []);

  return (
    <Container>
      <Header>
        <UserPhoto source={{ uri: 'https://scontent-gru1-1.xx.fbcdn.net/v/t39.30808-6/277767955_662611051664423_8506034269870705079_n.png?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGZatHevCksfFbgvSlCx36JAnqi5kGb9BkCeqLmQZv0GS1mnkSoRzhffnERBts67CS_jwepo4BuDkzYHFpa0bav&_nc_ohc=15-65B1gWsUAX9WxfHq&_nc_ht=scontent-gru1-1.xx&oh=00_AT9Na4YNZdf-5D7-Ok-h_Q60N5KgdSowfLKwSbm5fMZN9g&oe=626906A8' }} />
        <Title> ScanCheck </Title>
      </Header>
      <CameraWrapper>
        <BarCodeScanner
          onBarCodeScanned={onBarCodeScanned}
          style={{
            height: 380,
            width: 380
          }}
        />
      </CameraWrapper>
      <Content>
        <Label>
          Seu código de barras:
        </Label>
        <BarCode>
          78910101010
        </BarCode>
        <Button>
          <ButtonTitle>
            Adicionar à lista
          </ButtonTitle>
        </Button>
        <CodeList>
          código aqui
        </CodeList>
      </Content>
    </Container>
  );
}
