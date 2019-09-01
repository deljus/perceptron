import React from 'react';
import styled from 'styled-components';
import Checker from './Checker';

const Th = styled.th`
    text-align: center !important;
`;

const Td = styled.td`
    text-align: center !important;
    padding: 5px !important;
`;

const NeuronsVisualize = ({ schema, count }) => {

  const rows = [...new Array(count)];

  const renderTh = (_, i) => (<Th>Layer {i+1}</Th>);

  const renderTd = () => ( <Td><Checker /></Td>);

  const renderRows = () => (<tr>{ schema.map(renderTd) }</tr>);

  return(
    <table style={{ width: '100%' }} className="bp3-html-table .modifier">
      <thead>
        <tr>
          { schema.map(renderTh) }
        </tr>
      </thead>
      <tbody>
        { rows.map(renderRows) }
      </tbody>
    </table>
  )
}

export default NeuronsVisualize;
