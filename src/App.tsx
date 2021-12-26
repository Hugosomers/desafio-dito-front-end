import React from 'react';
import styled from 'styled-components';
import Container from './components/Container';
import 'antd/dist/antd.css';

const App: React.FC = () => (
  <Main>
    <Container />
  </Main>
);

const Main = styled.main`
  background-color: #eff0f3;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
