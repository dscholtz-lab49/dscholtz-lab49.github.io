import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Blotter.css";
import mockData from "./mockData.json";

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
    };

    render() {
        return (
            <div className="blotter-container">
                <div
                    className="ag-theme-alpine-dark"
                    style={{ height: 400, width: "100%", margin: "0 auto" }}
                >
                    <AgGridReact
                        rowData={this.state.rowData}
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowSelection={this.state.rowSelection}
                    />
                </div>
            </div>
        );
    }
}

export default Blotter;
