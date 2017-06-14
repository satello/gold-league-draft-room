import React from 'react';

import '../../styles/ui/CommodityTable.css';

const CommodityTableRow = (props) => {
  return (
    <div className="row commodity">
        <div className="col-sm-2 col-md-2">
          <p>{props.commodity.name}</p>
        </div>
        <div className="col-sm-6 col-md-6">
          <p>{props.commodity.description}</p>
        </div>
        <div className="col-sm-1 col-md-1">
          <p>${props.commodity.price}</p>
        </div>
        <div className="col-sm-3 col-md-3">
          <p>{props.commodity.commodity_type.name}</p>
        </div>
    </div>
  );
}

const CommodityTable = (props) => {
  const commodityRows = [];

  for (var i=0; i < props.commodities.length; i++) {
    commodityRows.push(
      <CommodityTableRow commodity={props.commodities[i]} key={i} />
    )
  }

  return (
    <div>
      <div className="row headers">
          <div className="col-sm-2 col-md-2">
            <h4>Name</h4>
          </div>
          <div className="col-sm-6 col-md-6">
            <h4>Description</h4>
          </div>
          <div className="col-sm-1 col-md-1">
            <h4>Price</h4>
          </div>
          <div className="col-sm-3 col-md-3">
            <h4>Type</h4>
          </div>
      </div>
      {commodityRows}
    </div>
  );
};


export default CommodityTable;
