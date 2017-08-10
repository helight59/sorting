import sortBy from 'lodash/sortBy';

export default function sortArray(array, field) {
    return sortBy(array, [function(o) { return o[field]; }]);
}