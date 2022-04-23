import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  CodeList,
} from './styles';

//Interfaces para obter posições de scan (BoundingBox)
interface BarCodePoint {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BarCodeBounds {
  origin: BarCodePoint;
  size: BarCodePoint;
}

export function Home() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(true);
  const [productCode, setProductCode] = useState('Nada scanneado ainda');

  //BoundingBox states
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  //Requisitando permissão à câmera
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })
  }

  //Checkando permissões
  if (hasPermission === null) {
    return (
      <CameraWrapper>
        <Label> Requisitando permissão à câmera </Label>
        <Button>
          <ButtonTitle onPress={() => askForCameraPermission()}> Habilitar Câmera </ButtonTitle>
        </Button>
      </CameraWrapper>
    )
  }

  if (hasPermission === false) {
    return (
      <CameraWrapper>
        <Label> Sem acesso à câmera </Label>
        <Button>
          <ButtonTitle onPress={() => askForCameraPermission()}> Habilitar Câmera </ButtonTitle>
        </Button>
      </CameraWrapper>
    )
  }

  function onBarCodeScanned(payload: { type: string, data: string, bounds: BarCodeBounds }) { //type = tipo do código (qrcode, ean, code128) e data é o código em si
    console.log(payload)

    const { origin, size } = payload.bounds;
    setX(origin.x);
    setY(origin.y)
    setWidth(size.width);
    setHeight(size.height);

    setProductCode(payload.data);
  }

  useEffect(() => {
    askForCameraPermission();
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
            height: 400,
            width: 400
          }}
        />
        <View style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          borderColor: 'red',
          borderWidth: 2
        }} />
      </CameraWrapper>
      <Content>
        <Label>
          Seu código de barras:
        </Label>
        <BarCode>
          {productCode}
        </BarCode>
        <Button>
          <ButtonTitle>
            Adicionar à lista
          </ButtonTitle>
        </Button>
        <CodeList>
          Lista de códigos
        </CodeList>
      </Content>
    </Container>
  );
}
