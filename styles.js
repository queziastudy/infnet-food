import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.background};
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.text};
`;