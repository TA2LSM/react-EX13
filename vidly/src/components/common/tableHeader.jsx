import React, { Component } from 'react';

// GEREKENLER
// columns: array / sortColumn: object / onSort: function

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (path === sortColumn.path) sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  };

  checkColumnSortEvent = column => {
    if (column.label !== 'Like' && column.label !== 'Modify') return this.raiseSort(column.path);
  };

  checkColumnSortStyle = column => {
    if (column.sortable !== 'true') return;

    const { sortColumn } = this.props;

    if (column.path === sortColumn.path) {
      return sortColumn.order === 'asc' ? 'fa fa-fw fa-sort-up' : 'fa fa-fw fa-sort-down';
    } else return 'fa fa-fw fa-sort';
  };

  checkColumnStyle = column => {
    let style = {};

    if (column.sortable === 'true') style.cursor = 'pointer';

    switch (column.label) {
      case 'Title':
        style.width = '50%';
        break;
      case 'Genre':
        style.width = '15%';
        break;
      case 'Stock':
        style.width = '10%';
        break;
      case 'Rate':
        style.width = '10%';
        break;
      case 'Like':
        style.width = '5%';
        break;
      case 'Modify':
        style.width = '10%';
        break;
      default:
        return;
    }

    return style;
  };

  // font awesome için v5.15.4 ikonlarını seçiniz
  render() {
    return (
      <thead>
        <tr
          className='align-middle'
          style={{ height: '45px' }}
        >
          {this.props.columns.map(column => (
            <th
              // key={column.label || column.key }
              // kursta path kullanıldı. Yukarıdaki ifadede ise label ya da
              // key varsa kullanılacak. ilk true sonuç veren kullanılır
              key={column.label}
              style={this.checkColumnStyle(column)}
              onClick={() => this.checkColumnSortEvent(column)}
            >
              {column.label}
              <i className={this.checkColumnSortStyle(column)} />
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
