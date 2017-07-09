import React, {Component} from 'react';

import SiteHead from './containers/header';

import './app.scss';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {navMini: false};
    }

    render() {
        const hasFetch = !!self.fetch;
        const noobStatus = (
          <div>
            <h1>Jabronis Can't Use This App</h1>
            <p> Seriously though upgrade your browser </p>
          </div>
        );

        return (
            <div className="app-wrapper">
                <div className={`content-container`}>
                    {/* dropshadow for mobile nav triggering */}
                    <SiteHead toggleNav={this.toggleNav}/>
                    {hasFetch && this.props.children}
                    {!hasFetch && noobStatus}
                </div>
            </div>
        )
    }
}


export default App;
