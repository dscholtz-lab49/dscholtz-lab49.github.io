import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import mockData from "./mockData.json";
import AddTradeModal from "./AddTradeModal";

class Blotter extends Component {
    state = {
        rowData: mockData,
        columnDefs: [
            { field: "tradeId", filter: true },
            { field: "productName", filter: true },
            { field: "notional", filter: true },
            { field: "direction", filter: true },
            { field: "tradeDate", filter: true },
            {
                headerName: "",
                field: "checkbox",
                cellRenderer: "agGroupCellRenderer",
                cellRendererParams: { checkbox: true },
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
        ],
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            resizable: true,
        },
        rowSelection: "multiple",
        isAddTradeModalOpen: false,
    };

    toggleAddTradeModal = () => {
        this.setState((prevState) => ({
            isAddTradeModalOpen: !prevState.isAddTradeModalOpen,
        }));
    };

    addNewTrade = (trade) => {
        const tradeId = this.state.rowData.length + 1;
        const tradeDate = new Date().toISOString().slice(0, 10);
        const newTrade = {
            tradeId,
            tradeDate,
            ...trade,
            productName: trade.product,
        };
        this.setState((prevState) => ({
            rowData: [...prevState.rowData, newTrade],
        }));
    };

    handleSendAlert = () => {
        const selectedRows = this.gridApi.getSelectedRows();
        if (selectedRows.length > 0) {
            const selectedProducts = selectedRows.map((row) => row.productName).join(", ");
            window.alert(`You have new trades of ${selectedProducts}`);
        } else {
            window.alert("Please select at least one trade to send an alert");
        }
    };

    handleFileUpload = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === "image/jpeg") {
                console.log("File uploaded successfully");
                // Perform file upload operations here
            } else {
                window.alert("Please upload a JPG file");
            }
        }
    };


    onGridReady = (params) => {
        this.gridApi = params.api;
    };

    render() {
        return (
            <div className="blotter-container">
                <div
                    className="ag-theme-alpine-dark"
                    style={{ height: 400, width: "100%", margin: "0 auto" }}
                >
                    <div className="toolbar">
                        <button onClick={() => this.toggleAddTradeModal()}>Add Trade</button>
                        <button onClick={this.handleSendAlert}>Send Alert</button>
                        <input
                            type="file"
                            accept=".jpg"
                            onChange={this.handleFileUpload}
                            style={{ marginLeft: "10px" }}
                        />
                    </div>
                    <AgGridReact
                        rowData={this.state.rowData}
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowSelection={this.state.rowSelection}
                        onGridReady={this.onGridReady}
                    />
                </div>
                <AddTradeModal
                    visible={this.state.isAddTradeModalOpen}
                    onAddTrade={this.addNewTrade}
                    onCancel={this.toggleAddTradeModal}
                />
                <iframe width='100%' height='600' src='https://qualtrics.gcs-web.com/stock-chart-iframe' title="XM Chart"></iframe>
            </div>
        );
    }
}

export default Blotter;
