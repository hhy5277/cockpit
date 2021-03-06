/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2019 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'patternfly-react';

import cockpit from 'cockpit';
import { Listing } from 'cockpit-components-listing.jsx';
import { Network } from './network.jsx';
import { networkId } from '../../helpers.js';

const _ = cockpit.gettext;

export class NetworkList extends React.Component {
    render() {
        const { dispatch, networks, resourceHasError, onAddErrorNotification } = this.props;
        const sortFunction = (networkA, networkB) => networkA.name.localeCompare(networkB.name);

        return (
            <React.Fragment>
                <Breadcrumb className='machines-listing-breadcrumb' title>
                    <Breadcrumb.Item onClick={() => this.props.changeActiveList(1)}>
                        {_("Virtual Machines")}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {_("Networks")}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div id='networks-listing' className='container-fluid'>
                    <Listing title={_("Networks")}
                        columnTitles={[_("Name"), _("Device"), _("Connection"), _("Forwarding mode"), _("State")]}
                        emptyCaption={_("No network is defined on this host")}>
                        {networks
                                .sort(sortFunction)
                                .map(network => {
                                    return (
                                        <Network key={`${networkId(network.name, network.connectionName)}`}
                                            dispatch={dispatch} network={network}
                                            resourceHasError={resourceHasError}
                                            onAddErrorNotification={onAddErrorNotification} />
                                    );
                                })
                        }
                    </Listing>
                </div>
            </React.Fragment>
        );
    }
}
NetworkList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    networks: PropTypes.array.isRequired,
    changeActiveList: PropTypes.func.isRequired,
    onAddErrorNotification: PropTypes.func.isRequired,
    resourceHasError: PropTypes.object.isRequired,
};
