import React from 'react';

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
const GoldLeagueTable = (props) => {
  const tableRows = props.data;

  return (
    <Card className="mb-4 players-wrapper">
      <CardBlock className="table-responsive">
          <SearchTable id={props.tableId ? props.tableId : "players-table"}
            rows={tableRows}
            searchPrompt="Type to Search ..."
            sortable={true}
            onRender={props.onRender}
            sortDesc={true}
            sortBy={props.defaultSort ? props.defaultSort : {}}>
          </SearchTable>
      </CardBlock>
    </Card>
  )
}

export default GoldLeagueTable;
