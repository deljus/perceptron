import { FILTER_CHANGE } from './constants';

export const filterChange = (name, value) => ({
    type: FILTER_CHANGE,
    name,
    value,
});
