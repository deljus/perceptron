import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Label, Slider, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import NeuronsVisualize from './NeuronsVisualize';
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

const TextHeader = styled(Text)`
    padding: 10px 0;
    display: flex;
    width: 100%;
    text-align: center;
`;

const FormItem = styled.div`
    display: flex;
    padding: 10px;
    min-width: 200px;
`;

const IndexPage = () => {

  const [sliderValue, setSliderValue] = useState(3);

    const elementSelectItems = [
        { id: 1, title: 'term(s)' },
        { id: 2, title: 'range' },
    ];

    const renderFilm = (film, { handleClick, modifiers }) => {
        console.log(film)
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                key={film.title}
                onClick={handleClick}
                text={film.title}
            />
        );
    };

    const filterFilm = (query, film) => {
        return film.title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };

  const createSchema = (count) => [...new Array(count)].map(() => 3);

  return(
    <InpexPageContainer>
      <TextHeader>Generate schema:</TextHeader>
      <FormContainer>
        <FormItem>
          <Label>
              Hidden layers:
            <Slider max={8} min={1} onChange={setSliderValue} value={sliderValue} />
          </Label>
        </FormItem>
        <FormItem>
          <Label>
              Activation fn:
              <FilmSelect
                  items={elementSelectItems}
                  itemRenderer={renderFilm}
                  itemPredicate={filterFilm}
                  onItemSelect={()=> {}}
              />
          </Label>
        </FormItem>
      </FormContainer>

      <DiagramContainer>
        <NeuronsVisualize schema={createSchema(sliderValue)} count={8} />
      </DiagramContainer>
    </InpexPageContainer>
  )
}

export default IndexPage;
