import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';

export default function SaleTable() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Project Name', field: 'name' },
            { title: 'Accont', field: 'account' },
            { title: 'Phone', field: 'phone' },
            {
                title: 'Status',
                field: 'status',
                lookup: { 0: 'Lead', 1: 'Client', 2: 'Dormant' },
            },
        ],
        data: [
            {
                name: 'Toyota',
                account: 'Ali',
                phone: '03001234567',
                status: 0
            },
            {
                name: 'Bata',
                account: 'hassan',
                phone: '03001234567',
                status: 1,
            },
            {
                name: 'Outfitter',
                account: 'Usman',
                phone: '03001234567',
                status: 2,
            },
        ],
    });

    return (
        <MaterialTable
            title="Payments"
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
