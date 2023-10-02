

export interface IPrintData {
    datamatrix: string;
    machine: string;
    mouldDescription: string;
    date: string;
    materialNumber: string;
}

export const inkjetResetCommand = '1B021D00001B03'

export function formatPrintCommand(printData: IPrintData): Promise<{ inkjet: string, label: string }> {
    return new Promise((resolve, reject) => {
        try {
            const originalDateString = printData.date;;
            const parts = originalDateString.split(/[. :]/);

            // Parse the date components
            const day = parts[0].toString().padStart(2, '0');
            const month = parts[1].toString().padStart(2, '0');
            const year = parts[2].slice(-2);

            const formattedDate = `${day}/${month}/${year}`;

            // Parse the time components
            const hours = parts[3].toString().padStart(2, '0');
            const minutes = parts[4].toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            let field1 = printData.datamatrix; // 9 Digit
            let field2 = `${printData.machine} ${printData.mouldDescription.replace(/[öÖ]/g, 'O')}`; //31 Digit
            let field3 = `${formattedDate} ${formattedTime}`; //14 Digit
            let field4 = `${printData.materialNumber === 'NoPlan' ? '0000000000' : printData.materialNumber} ${printData.datamatrix}`; //20 Digit

            // label Print Data
            const labelPrintCommand = (`^XA^FO400,80^BXN,9,300^FD${field1}^FS^FO520,80^A0N,30,23^FD${field2}^FS^FO520,120^A0N,30,23^FD${field3}^FS^FO520,160^A0N,30,23^FD${field4}^FS^XZ`);

            // Inkjet Print Data
            if (field1.length > 9) {
                field1 = field1.substring(0, 9)
            } else {
                const padding = '\x00'.repeat(9 - field1.length);
                field1 += padding;
            }

            if (field2.length > 31) {
                field2 = field2.substring(0, 31)
            } else {
                const padding = '\x00'.repeat(31 - field2.length);
                field2 += padding;
            }

            if (field3.length > 14) {
                field3 = field3.substring(0, 14)
            } else {
                const padding = '\x00'.repeat(14 - field3.length);
                field3 += padding;
            }

            if (field4.length > 20) {
                field4 = field4.substring(0, 20)
            } else {
                const padding = '\x00'.repeat(20 - field4.length);
                field4 += padding;
            }

            const combinedData = `${field1}${field2}${field3}${field4}`;
            const hexPrintData = Buffer.from(combinedData, 'utf-8').toString('hex');
            const inkjetPrintCommand = `1B021D4A00${hexPrintData}1B03`;

            const printCommand = {
                inkjet: inkjetPrintCommand,
                label: labelPrintCommand
            }

            resolve(printCommand);
        } catch (error) {
            reject(error);
        }
    });
}