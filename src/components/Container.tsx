import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { getData } from '../redux/actions/researchActions';
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
`;

export default Container;
