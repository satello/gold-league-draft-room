import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/CommoditiesPage.css';

import * as commodityActions from '../reducers/commodities/actions';
import CommodityTable from './ui/CommodityTable';

class CommoditiesPage extends Component {
    componentWillMount() {
      this.props.loadCommodities();
    }

    componentWillReceiveProps(nextProps) {

    }
    render() {
        let commodityList = [];
        if (this.props.commodities.hasLoaded) {
          commodityList = this.props.commodities.commodityList;
        }

        return (
            <div className="inner-page container-fluid HomePage">
              <div className="module">
                <div className="row">
                  <div className="col-md-offset-1 col-md-2">
                    <div className="btn">New</div>
                  </div>
                  <div className="col-md-2">
                    <div className="inactive btn">Edit</div>
                  </div>
                  <div className="col-md-2">
                    <div className="inactive btn">Delete</div>
                  </div>
                </div>
                <div className="row">
                  <div className="commodity-table col-md-offset-1 col-md-10">
                    <CommodityTable commodities={commodityList} />
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCommodities: () => {
            dispatch(commodityActions.loadCommodities());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        commodities: state.commodities,
        loggedInUser: state.appState.loggedInUser,
        jwt: state.appState.jwt
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommoditiesPage);
