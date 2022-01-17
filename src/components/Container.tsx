import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { getData } from '../redux/actions/researchActions';
import ScoreBoard from './ScoreBoard';
import StoresTable from './StoresTable';
const { TabPane } = Tabs;

const Container: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <Div>
      <Title>Pesquisa</Title>

      <TabCard type='card'>
        <TabPane tab='Pontos de venda' key='1'>
          <SubTitle>Consolidado das lojas</SubTitle>

          <Center>
            <ScoreBoard />
          </Center>

          <SubTitle>Lojas</SubTitle>
          <Center>
            <StoresTable />
          </Center>
        </TabPane>
      </TabCard>
    </Div>
  );
};
const Div = styled.div`
  background-color: #ffffff;
  height: 90vh;
  width: 50%;
`;

const Title = styled.h1`
  margin-left: 20px;
`;

const SubTitle = styled.h3`
  margin-left: 20px;
`;

const TabCard = styled(Tabs)`
  & .ant-tabs-nav-list {
    border-top: 1px solid #2cb67d;
  }

  & .ant-tabs-nav-wrap {
    background-color: #eff0f3;
  }
  & #rc-tabs-0-tab-1 {
    color: gray;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Container;
