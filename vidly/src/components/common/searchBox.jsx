import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className='form-control mb-2'
      placeholder='Search...'
      value={value}
      type='text'
      name='query'
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
