import React from 'react';

//components
import TableHeader from './tableHeader';
import TableBody from './tableBody';

// const Table = props => {
//   const { columns, sortColumn, onSort, data } = props;
// Yukarıdaki yöntem yerine aşağıdaki şekilde yazılabiliyor. (Argument Destructuring)

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className='table'>
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />

      <TableBody
        data={data}
        columns={columns}
      />
    </table>
  );
};

export default Table;
