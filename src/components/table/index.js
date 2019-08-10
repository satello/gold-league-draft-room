import React, { Component } from 'react';

import './table.scss';

import {
    Card,
    CardBlock
} from 'reactstrap';
import SearchTable from 'reactable-search';

/*
* @params
* {
*   tableHeadings: <array of objects> {id: <string>, displayName: <string>},
*   data: <object> data that corresponds with headers,
*   perPage: <int: optional> number of items per page of table,
*   defaultSort: <object: optional> {column: <string id name of col>, direction: <string> asc or desc}
* }
*/
class GoldLeagueTable extends Component {
  state = {
    position: 'ALL'
  }

  filterTableRow (position) {
    this.setState({
      position
    })
  }

  render () {
    if (!this.props.data) return null


    const _tableRows = this.state.position === 'ALL'
      ? this.props.data
      : this.props.data.filter(_entry => {
        return (_entry.cells.position === this.state.position)
      })

    console.log(_tableRows.length)

    return (
      <Card className="mb-4 players-wrapper">
        <CardBlock className="table-responsive">
            <div className="position-selector">
              Position:
              <select onChange={(e) => this.filterTableRow(e.target.value)}>
                <option>ALL</option>
                <option>QB</option>
                <option>RB</option>
                <option>WR</option>
                <option>TE</option>
              </select>
            </div>
            <SearchTable id={this.props.tableId ? this.props.tableId : "players-table"}
              rows={_tableRows}
              searchPrompt="Type to Search ..."
              sortable={true}
              onRender={this.props.onRender}
              sortDesc={true}
              sortBy={this.props.defaultSort ? this.props.defaultSort : {}}>
            </SearchTable>
        </CardBlock>
      </Card>
    )
  }
}

export default GoldLeagueTable;
