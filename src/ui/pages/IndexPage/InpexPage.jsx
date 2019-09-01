import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Label, Slider, InputGroup, Radio, RadioGroup, Button, ButtonGroup } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import NeuronsVisualize from './NeuronsVisualize';
import { connect } from 'react-redux';
import { filterChange } from '../../core/actions';
import ACTIVATION_FNS from '../../../core/activation';

const FilmSelect = Select.ofType();

const InpexPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const FormContainer = styled.div`
    display: flex;
`;

const DiagramContainer = styled.div`
    display: flex;
`;

const Header = styled(Text)`
    padding: 10px 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const FormItem = styled.div`
    display: flex;
    padding: 10px;
    min-width: 200px;
`;

const IndexPage = ({ epoch, onFilterChange, activation, learnData }) => {

  const [sliderValue, setSliderValue] = useState(3);

  const createSchema = (count) => [...new Array(count)].map(() => 3);

  const handleEpochChange = (e) => {
      let value = +e.target.value;
      if(value < 20){
          value = 20;
      }
      if(value > 1000000){
          value = 1000000;
      }

      onFilterChange('epoch', value);
  };

  const handleRadioChange = (value) => {
      onFilterChange('activation', value);
  };



  return(
    <InpexPageContainer>
        <Header>
            <Text>Configuration schema</Text>
            <ButtonGroup>
                <Button icon="database" intent="danger" disabled={!learnData}>Learning...</Button>
                <Button icon="function" intent="success">Calculate</Button>
            </ButtonGroup>
        </Header>
      <FormContainer>
        <FormItem>
          <Label>
              Hidden layers:
            <Slider max={8} min={1} onChange={setSliderValue} value={sliderValue} />
          </Label>
        </FormItem>
        <FormItem>
          <Label>
              <RadioGroup
                  label="Activation fn:"
                  name="group"
                  onChange={handleRadioChange}
                  selectedValue={activation}
              >
                  { Object.keys(ACTIVATION_FNS).map(fnName => <Radio  label={fnName} value={fnName} />)}
              </RadioGroup>
          </Label>
        </FormItem>
          <FormItem>
              <Label>
                  Epoch:
                  <InputGroup
                      leftIcon="filter"
                      onChange={handleEpochChange}
                      placeholder="Epoch count..."
                      value={epoch}
                      type="number"
                  />
              </Label>
          </FormItem>
      </FormContainer>
      <DiagramContainer>
        <NeuronsVisualize schema={createSchema(sliderValue)} count={8} />
      </DiagramContainer>
    </InpexPageContainer>
  )
};

const mapStateToProps = state => ({
    ...state.app,
});

const mapDispathToProps = {
    onFilterChange: filterChange
};

export default connect(mapStateToProps, mapDispathToProps)(IndexPage);
