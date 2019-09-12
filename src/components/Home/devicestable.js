import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';

export default function DeviceTable() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Warranty', field: 'warranty' },
            { title: 'Expiry', field: 'expiry' },
            { title: 'Cost', field: 'cost' },
            { title: 'Image', field: 'image' },
        ],
        data: [
            {
                name: 'Mobile',
                warranty: "1 Year",
                expiry: '10 sep 2020',
                cost: '100',
                image: ""
            }
        ],
    });

    return (
        <MaterialTable
            title="Devices"
            columns={state.columns}
            data={state.data}
            components={{
                Container: props => <Paper {...props} elevation={0} />
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.push(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}
