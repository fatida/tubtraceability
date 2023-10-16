import statusService from '../api/statusService'
import { GridColDef } from "@mui/x-data-grid"
import PrimaryImmPill from '../../components/primaryImmPill/PrimaryImmPill'

interface Status {
    id: number
    machine: string
    status: number
    createdAt: string
    updatedAt: string
}

interface machineStatus {
    id: number
    machinestatus: number
    inkjetstatus: number
    labelstatus: number
}

export async function fetchStatusData(): Promise<{ machineStatus: machineStatus[] }> {
    const statusData: Status[] = await statusService.getMachineStatus()
    const machineStatus: machineStatus[] = []

    for (let i = 2; i <= 10; i++) {
        const machinestatus = statusData.find(obj => obj.machine === `IMM${i}`)?.status || 0
        const inkjetstatus = statusData.find(obj => obj.machine === `INKJET${i}`)?.status || 0
        const labelstatus = statusData.find(obj => obj.machine === `LABEL${i}`)?.status || 0

        machineStatus.push({
            id: i,
            machinestatus,
            inkjetstatus,
            labelstatus,
        })
    }

    return { machineStatus }
}


const immBgColor = {
    "IMM2": "#333353",
    "IMM3": "#66667E",
    "IMM4": "#9999A9",
    "IMM5": "#CCCCD4",
    "IMM6": "#E5E5E9",
    "IMM7": "#333353",
    "IMM8": "#66667E",
    "IMM9": "#9999A9",
    "IMM10": "#CCCCD4"
}


export const processTableColumnDefinition: GridColDef[] = [
    {
        field: "id",
        headerName: "Barcode",
        flex: 1,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "imm",
        type: "string",
        headerName: "IMM",
        flex: 1,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            const imm = params.row.imm as keyof typeof immBgColor; // Asserting that imm is a valid key
            if (immBgColor.hasOwnProperty(imm)) {
                return <PrimaryImmPill text={params.row.imm} backgroundColor={immBgColor[imm]} />
            } else {
                return <PrimaryImmPill text={params.row.imm} backgroundColor="#000000" /> // Provide a default color or handle the case where imm is not a valid key
            }
        },
    },
    {
        field: "mouldid",
        type: "string",
        headerName: "Mould ID",
        flex: 1,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "moulddescription",
        type: "string",
        headerName: "Mould Description",
        flex: 1,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "materialnumber",
        type: "string",
        headerName: "Material Number",
        flex: 1,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "materialdescription",
        type: "string",
        headerName: "Material Description",
        flex: 1.5,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "barcode",
        type: "string",
        headerName: "Barcode Read",
        flex: 1,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return params.row.id === params.row.barcode ? params.row.id : 'Read Error'
        },
    },
    {
        field: "date",
        type: "string",
        headerName: "Production Date",
        flex: 1,
        minWidth: 50,
        headerAlign: 'center',
        align: 'center',
    },

]