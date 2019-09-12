import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';

export default class DeviceTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        }
    }
    render() {
        const {columns, data} = this.state;
        debugger
        return (
            <MaterialTable
                title="Devices"
                columns={columns}
                data={data}
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToAdd = this.state.data;
                                dataToAdd.push(newData);
                                this.setState({ data, dataToAdd });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToEdit = this.state.data;                                
                                dataToEdit[dataToEdit.indexOf(oldData)] = newData;
                                this.setState({ data, dataToEdit });
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToDelete = this.state.data;
                                dataToDelete.splice(dataToDelete.indexOf(oldData), 1);
                                this.setState({ data, dataToDelete });                                
                            }, 600);
                        }),
                }}
            />
        );
    }
}
