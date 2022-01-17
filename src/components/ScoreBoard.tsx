import React, { useState, useEffect } from 'react';
import { Space, Divider, Skeleton } from 'antd';
import { useSelector, RootStateOrAny } from 'react-redux';
import { DataTypes } from '../redux/sagas/sagas';
import styled from 'styled-components';

const ScoreBoard: React.FC = () => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({
    Excelente: 0,
    Muitobom: 0,
    Razoável: 0,
    Ruim: 0,
    Horrível: 0,
  });
  const [satisfaction, setSatisfaction] = useState(0);
  const [loading, setLoading] = useState(true);

  const { data } = useSelector(
    (state: RootStateOrAny) => state.researchReducer
  );

  const ratingTypes: { [key: number]: string } = {
    5: 'Excelente',
    4: 'Muitobom',
    3: 'Razoável',
    2: 'Ruim',
    1: 'Horrível',
  };

  useEffect(() => {
    setLoading(false);
    setRatings(
      data.reduce(
        (acc: { [key: string]: number }, curr: DataTypes) => {
          return {
            ...acc,
            [ratingTypes[curr.score]]: acc[ratingTypes[curr.score]] + 1,
          };
        },
        {
          Excelente: 0,
          Muitobom: 0,
          Razoável: 0,
          Ruim: 0,
          Horrível: 0,
        }
      )
    );

    const countScores: { [key: string]: number } = {
      Excelente: 0,
      Muitobom: 0,
    };

    data.forEach((i: DataTypes) => {
      const type = ratingTypes[i.score];
      countScores[type] += 1;
    });

    setSatisfaction(
      ((countScores.Excelente + countScores.Muitobom) / data.length) * 100
    );
  }, [data]);

  return loading ? (
    <Skeleton active />
  ) : (
    <SpaceComponent
      split={<Divider type='vertical' style={{ height: '130px' }} />}
    >
      <Div>
        <h3>Satisfação</h3>
        <p>{satisfaction}%</p>
      </Div>

      <Div>
        <h3>Avaliações</h3>
        <p>{data.length}</p>
      </Div>

      <Div>
        <h3>Excelente</h3>
        <p>{ratings.Excelente}</p>
      </Div>

      <Div>
        <h3>Muito bom</h3>
        <p>{ratings.Muitobom}</p>
      </Div>

      <Div>
        <h3>Razoável</h3>
        <p>{ratings.Razoável}</p>
      </Div>

      <Div>
        <h3>Ruim</h3>
        <p>{ratings.Ruim}</p>
      </Div>

      <Div>
        <h3>Horrível</h3>
        <p>{ratings.Horrível}</p>
      </Div>
    </SpaceComponent>
  );
};

const SpaceComponent = styled(Space)`
  border: 1px solid #e0e0e0;
  width: 97%;
  height: 130px;
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  width: 130px;
  text-align: center;
`;

export default ScoreBoard;
