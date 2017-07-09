import React from 'react';

import './table.scss';

import {
    Card,
    CardBlock
} from 'reactstrap';
import {Table, Th, Thead} from 'reactable';

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
  const tableHeadings = [];

  for (var i=0; i < props.tableHeadings.length; i++) {
    tableHeadings.push(
      <Th column={props.tableHeadings[i].id}><span>{props.tableHeadings[i].displayName}</span></Th>
    )
  }

  return (
    <Card className="mb-4 players-wrapper">
      <CardBlock className="table-responsive">
          <Table id={props.tableId ? props.tableId : "commodities-table"}
            className="table"
            data={tableRows}
            sortable={true}
            defaultSort={props.defaultSort ? props.defaultSort : {}}
            itemsPerPage={props.perPage ? props.perPage : 10}>
              <Thead>
                {tableHeadings}
              </Thead>
          </Table>
      </CardBlock>
    </Card>
  )
}

export default GoldLeagueTable;
