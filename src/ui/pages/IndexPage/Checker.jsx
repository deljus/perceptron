import React, { useState } from 'react';
import styled from "styled-components";
import { Icon } from '@blueprintjs/core';

const SelectedItem = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid red;
    color: red;
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const DefaultItem = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid gray;
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
`;

const Checker = ({ check, onChange, layer }) => {
    
  const [ checkState, setState ] = useState(check);

  const handleChange = () => {
    onChange(!checkState, layer);
    setState(!checkState)
  };

  return checkState ?
    <SelectedItem onClick={handleChange}>
      <Icon icon="flow-review-branch"/>
    </SelectedItem>
    : <DefaultItem onClick={handleChange} />;
};

Checker.defaultProps = {
  onChange: () => null,
};

export default Checker;
