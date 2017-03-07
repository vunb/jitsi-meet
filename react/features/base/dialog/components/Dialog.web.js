import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../i18n';

import ModalDialog from '@atlaskit/modal-dialog';
import AKButtonGroup from '@atlaskit/button-group';
import AKButton from '@atlaskit/button';

import { hideDialog } from '../actions';

/**
 * Web dialog that uses atlaskit modal-dialog to display dialogs.
 */
class Dialog extends Component {

    /**
     * Dialog component's property types.
     *
     * @static
     */
    static propTypes = {
        cancelDisabled: React.PropTypes.bool,
        cancelTitleKey: React.PropTypes.string,
        children: React.PropTypes.node,
        dispatch: React.PropTypes.func,
        isModal: React.PropTypes.bool,
        onCancel: React.PropTypes.func,
        onSubmit: React.PropTypes.func,
        show: React.PropTypes.bool,
        submitDisabled: React.PropTypes.bool,
        submitTitleKey: React.PropTypes.string,
        t: React.PropTypes.func,
        titleKey: React.PropTypes.string,
        width: React.PropTypes.string
    }

    /**
     * Initializes a new Dialog instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props) {
        super(props);

        this._onCancel = this._onCancel.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <ModalDialog
                footer = { this._renderFooter() }
                header = { this._renderHeader() }
                isOpen = { this.props.show }
                onDialogDismissed = { this._onCancel }
                width = { this.props.width
                    ? this.props.width : 'medium' }>
                <div>
                    <form
                        id = 'modal-dialog-form'
                        onSubmit = { this._onSubmit }>
                        { this.props.children }
                    </form>
                </div>
            </ModalDialog>);
    }

    /**
     * Render component in dialog header.
     *
     * @returns {ReactElement}
     * @private
     */
    _renderHeader() {
        const { t } = this.props;

        return (
            <header>
                <h2>
                    { t(this.props.titleKey) }
                </h2>
            </header>
        );
    }

    /**
     * Render component in dialog footer.
     *
     * @returns {ReactElement}
     * @private
     */
    _renderFooter() {
        return (
            <footer>
                <AKButtonGroup>
                    { this._renderCancelButton() }
                    { this._renderSubmitButton() }
                </AKButtonGroup>
            </footer>
        );
    }

    /**
     * Render cancel button.
     *
     * @returns {*} The cancel button if enabled and dialog is not modal.
     * @private
     */
    _renderCancelButton() {
        if (this.props.cancelDisabled || this.props.isModal) {
            return null;
        }

        return (
            <AKButton
                appearance = 'subtle'
                id = 'modal-dialog-cancel-button'
                onClick = { this._onCancel }>
                { this.props.t(this.props.cancelTitleKey
                    ? this.props.cancelTitleKey : 'dialog.Cancel') }
            </AKButton>
        );
    }

    /**
     * Render submit button.
     *
     * @returns {*} The submit button if enabled.
     * @private
     */
    _renderSubmitButton() {
        if (this.props.submitDisabled) {
            return null;
        }

        return (
            <AKButton
                appearance = 'primary'
                form = 'modal-dialog-form'
                id = 'modal-dialog-submit-button'
                onClick = { this._onSubmit }>
                { this.props.t(this.props.submitTitleKey
                    ? this.props.submitTitleKey : 'dialog.Ok') }
            </AKButton>
        );
    }

    /**
     * Dispatches action to hide the dialog.
     *
     * @returns {void}
     */
    _onCancel() {
        if (this.props.isModal) {
            return;
        }

        let hide = true;

        if (this.props.onCancel) {
            hide = this.props.onCancel();
        }

        if (hide) {
            this.props.dispatch(hideDialog());
        }
    }

    /**
     * Dispatches the action when submitting the dialog.
     *
     * @private
     * @returns {void}
     */
    _onSubmit() {
        let hide = true;

        if (this.props.onSubmit) {
            hide = this.props.onSubmit();
        }

        if (hide) {
            this.props.dispatch(hideDialog());
        }
    }
}

/**
 * Maps (parts of) the Redux state to the associated Dialog's props.
 *
 * @param {Object} state - Redux state.
 * @protected
 * @returns {{
 *     show: bool
 * }}
 */
function _mapStateToProps(state) {
    const dialog = state['features/base/dialog'];

    return {
        show: dialog.show
    };
}

export default translate(connect(_mapStateToProps)(Dialog));
