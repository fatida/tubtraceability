import "./processTable.scss";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

type Props = {
  columns: GridColDef[];
  rows: object[];
  title: string;
  newRowIndex: number | null; 
};

const ProcessTable = (props: Props) => {
  return (
    <div className="processTable">
      <h3 className="title">{props.title}</h3>
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: false,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        getRowClassName={(params) => {
          return params.row.id === props.newRowIndex ? (params.row.barcode === params.row.id ? 'green-bg' : 'red-bg') : '';
        }}
      />
    </div>
  );
};

export default ProcessTable;
