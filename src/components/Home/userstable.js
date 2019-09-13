import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';

export default class UsersTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { columns, data } = this.props.state;
        let filteredData = null
        console.log("s",data)
        this.props.taken ? filteredData = data.filter(x => x.availability && x.availability !== "0" ) : filteredData = data.filter(x => !x.availability || x.availability === "0");
        return (
            <MaterialTable
                title={this.props.taken ? "Taken Users" : "Available Users"}
                columns={columns}
                data={filteredData}
                options={{
                    search: false
                }}
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => this.props.refreshData(),
                    }
                ]}
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                if (Object.keys(newData).length !== 0) {
                                    data.push(newData);
                                    this.props.handleUpdate(data, data);
                                    this.props.addData()
                                }
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToEdit = data;
                                dataToEdit[dataToEdit.indexOf(oldData)] = newData;
                                this.props.handleUpdate(data, dataToEdit);
                                this.props.addData()
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToDelete = data;
                                dataToDelete.splice(dataToDelete.indexOf(oldData), 1);
                                this.props.handleUpdate(data, dataToDelete);
                                this.props.addData()
                            }, 600);
                        }),
                }}
            />
        );
    }
}
