import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';

export default class UsersTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'First Name', field: 'fname' },
                { title: 'Last Name', field: 'lname' },
                { title: 'Device', field: 'availability', lookup: { 0: 'No Device', 1: '' } }
            ],
            data: [
                {
                    fname: 'F name',
                    lname: "l name",
                    availability: 0,
                },
                {
                    fname: 'F1 name',
                    lname: "l1 name",
                    availability: 1,
                },
            ],
        }
    }
    render() {
        const { columns, data } = this.state;
        let filteredData = null
        this.props.taken ? filteredData = data.filter(x => x.availability === 1) : filteredData = data.filter(x => x.availability === 0);
        return (
            <MaterialTable
                title={this.props.taken ? "Taken Users" : "Available Users"}
                columns={columns}
                data={filteredData}
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
