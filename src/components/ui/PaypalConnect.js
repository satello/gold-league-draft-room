import React from 'react';

import '../../styles/ui/PaypalConnect.css';

const createNonce = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const PaypalConnect = (props) => {
    const nonce = createNonce();
    const endpointSandbox = 'https://www.sandbox.paypal.com/signin/authorize';
    const endpointProd = 'https://www.paypal.com/signin/authorize';
    const endpoint = process.env.REACT_APP_ENV === 'production' ? endpointProd : endpointSandbox;
    const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

    const redirectToCKApi = encodeURI(process.env.REACT_APP_API_ENDPOINT + '/payments/auth');

    const returnUrl = encodeURI(process.env.REACT_APP_BASE_URL + '/' + props.returnUrl);

    const link = endpoint + '?client_id=' + paypalClientId + '&response_type=code&scope=email&redirect_uri=' +
        redirectToCKApi +'&nonce=' + nonce + '&newUI=Y&state=' + returnUrl;

    if (props.paypalEmail) {
        return (
            <div className="PaypalConnect">
                <div>
                    <span>{props.paypalEmail}</span>
                    <a onClick={() => props.onChange(props.name, null)}>Unlink Account</a>
                </div>
            </div>
        );
    } else {
        return (
          <div className="PaypalConnect">
            <a href={link}>
                <img alt="login with paypal" src="https://www.paypalobjects.com/webstatic/en_US/developer/docs/lipp/loginwithpaypalbutton.png"/>
            </a>
          </div>
        );
    }
};

PaypalConnect.propTypes = {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    paypalEmail: React.PropTypes.string
};

export default PaypalConnect;
