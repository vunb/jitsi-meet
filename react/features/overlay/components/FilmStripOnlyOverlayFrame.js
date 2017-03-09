/* global */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Avatar,
    getAvatarURL,
    getLocalParticipant
} from '../../base/participants';

import OverlayFrame from './OverlayFrame';

/**
 * Implements an abstract React Component for overlay - the components which
 * are displayed on top of the application covering the whole screen.
 *
 * @abstract
 */
class FilmStripOnlyOverlayFrame extends Component {
    /**
     * FilmStripOnlyOverlayFrame component's property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * The source (e.g. URI, URL) of the avatar image of the local
         * participant.
         *
         * @private
         */
        _avatar: React.PropTypes.string,

        /**
         * The browser which is used currently.
         *
         * @public
         * @type {string}
         */
        children: React.PropTypes.node.isRequired,

        /**
         * The css class name for the icon that will be displayed over the
         * avatar.
         *
         * @type {string}
         */
        icon: React.PropTypes.string,

        /**
         * Indicates the css style of the overlay. If true, then lighter;
         * darker, otherwise.
         *
         * @type {boolean}
         */
        isLightOverlay: React.PropTypes.bool
    }

    /**
     * Renders content related to the icon.
     *
     * @returns {ReactElement|null}
     * @private
     */
    _renderIcon() {
        if (!this.props.icon) {
            return null;
        }

        const iconClass = `inlay-filmstrip-only__icon ${this.props.icon}`;
        const iconBGClass = 'inlay-filmstrip-only__icon-background';

        return (
            <div>
                <div className = { iconBGClass } />
                <div className = 'inlay-filmstrip-only__icon-container'>
                    <span className = { iconClass } />
                </div>
            </div>
        );
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement|null}
     */
    render() {
        return (
            <OverlayFrame isLightOverlay = { this.props.isLightOverlay }>
                <div className = 'inlay-filmstrip-only'>
                    <div className = 'inlay-filmstrip-only__content'>
                        {
                            this.props.children
                        }
                    </div>
                    <div className = 'inlay-filmstrip-only__avatar-container'>
                        <Avatar uri = { this.props._avatar } />
                        {
                            this._renderIcon()
                        }
                    </div>
                </div>
            </OverlayFrame>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated FilmStripOnlyOverlayFrame
 * props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _avatar: string
 * }}
 */
function _mapStateToProps(state) {
    const participant
        = getLocalParticipant(
            state['features/base/participants']);
    const { avatarId, avatarUrl, email } = participant || {};

    return {
        _avatar: getAvatarURL({
            avatarId,
            avatarUrl,
            email,
            participantId: participant.id
        })
    };
}

export default connect(_mapStateToProps)(FilmStripOnlyOverlayFrame);
