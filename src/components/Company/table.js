import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';

export default function CompanyTable() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Key Person', field: 'keyperson' },
            { title: 'Phone', field: 'phone' },
            {
                title: 'Status',
                field: 'status',
                lookup: { 0: 'Lead', 1: 'Client', 2: 'Dormant' },
            },
        ],
        data: [
            { name: 'Toyota', keyperson: 'Ali', phone: '03001234567', status: 0 },
            {
                name: 'Bata',
                keyperson: 'hassan',
                phone: '03001234567',
                status: 1,
            },
            {
                name: 'Outfitter',
                keyperson: 'Usman',
                phone: '03001234567',
                status: 2,
            },
        ],
    });

    return (
        <MaterialTable
            title="Companies"
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
