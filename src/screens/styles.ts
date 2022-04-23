import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #DCDCE6;
`;

export const Header = styled.View`
  background-color: #00456B;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 150px;
`;

export const UserPhoto = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const Title = styled.Text`
  font-size: 40px;
  color: #FFF;
`;

export const CameraWrapper = styled.View`
  width: 100%;
  background-color: #000;
`;

export const Content = styled.View`
  margin-top: 15px;
  padding: 20px;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 15px;
  color: #909090;
`;

export const BarCode = styled.Text`
  font-size: 40px;
  color: #000;
`;

export const Button = styled.TouchableOpacity`
  background-color: #23739F;
  height: 53px;
  width: 286px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonTitle = styled.Text`
  font-size: 20px;
  color: #FFF;
`;

export const CodeList = styled.Text`
  font-size: 20px;
  color: red;
`;
