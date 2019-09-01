import React from 'react';
import styled from 'styled-components';
import Checker from './Checker';
import {Slider} from "@blueprintjs/core";

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
    <div>
        { schema.map((item) => <Slider max={8} min={1} value={item} vertical/> )}
    </div>
  )
}

export default NeuronsVisualize;
