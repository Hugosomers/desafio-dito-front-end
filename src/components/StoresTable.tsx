import React, { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import styled from 'styled-components';
import { RootStateOrAny, useSelector } from 'react-redux';
import { DataTypes } from '../redux/sagas/sagas';
const { Search } = Input;

const StoresTable: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [newData, setNewData] = useState<any>([]);

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
    const stores: { [key: string]: { [key: string]: number } } = {};

    const scores = Object.values(ratingTypes).reduce(
      (acc: { [key: string]: number }, curr: string) => ({ ...acc, [curr]: 0 }),
      {}
    );

    data.forEach((i: DataTypes) => {
      if (!stores[i.storeName]) {
        stores[i.storeName] = { ...scores };
      }
      stores[i.storeName][ratingTypes[i.score]] += 1;
    });

    setNewData(
      Object.entries(stores).map((i, index) => {
        const satisfaction =
          (i[1].Excelente + i[1].Muitobom) /
          Object.values(i[1]).reduce((acc, curr) => acc + curr, 0);
        return {
          key: index,
          storeName: i[0],
          satisfaction: `${satisfaction * 100}%`,
          avaliations: Object.values(i[1]).reduce((acc, curr) => acc + curr, 0),
          ...i[1],
        };
      })
    );
  }, [data]);

  const onSearch = (value: string) => {
    setInputValue(value);
  };

  const columns = [
    {
      title: 'NOME DA LOJA',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    { title: 'Satisfação', dataIndex: 'satisfaction', key: 'satisfaction' },
    { title: 'Avaliações', dataIndex: 'avaliations', key: 'avaliations' },
    { title: 'Excelente', dataIndex: 'Excelente', key: 'Excelente' },
    { title: 'Muito bom', dataIndex: 'Muitobom', key: 'Muitobom' },
    { title: 'Razoável', dataIndex: 'Razoável', key: 'Razoável' },
    { title: 'Ruim', dataIndex: 'Ruim', key: 'Ruim' },
    { title: 'Horrível', dataIndex: 'Horrível', key: 'Horrível' },
  ];

  return (
    <Div>
      <Search
        placeholder='Buscar loja'
        allowClear
        onSearch={onSearch}
        style={{ width: 200 }}
      />
      <Table columns={columns} dataSource={newData} />
    </Div>
  );
};

const Div = styled.div`
  width: 97%;
`;

export default StoresTable;
