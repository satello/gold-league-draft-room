import React from 'react';
import Modal from 'react-modal';

const EmbedCodeModal = (props) =>
    <Modal
        overlayClassName="ModalOverlay"
        portalClassName="Modal"
        className="ModalBody"
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="Modal"
    >
        <h1 className="text-center">Embed Your Calendar</h1>
        <a onClick={props.onRequestClose} className="close-modal">
            <i className="fa fa-close" />
        </a>
        <div className="embed-code">
            <pre>
                {'<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>'}<br />
                {'<script type="text/javascript" src="//cdn.consultationkit.com/widget.min.js"></script>'}<br />
                {'<script type="text/javascript">'}<br />
                {'var widget = new ConsultationKit();'}<br />
                {'widget.init({'}<br />
                {'     targetEl:"#ck-widget",'}<br />
                {'     calendar:"' + props.calendar + '"'}<br />
                {'});'}<br />
                {'</script>'}<br />
                {'<div id="ck-widget"></div>'}
            </pre>
        </div>
    </Modal>;

export default EmbedCodeModal;