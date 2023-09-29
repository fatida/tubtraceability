"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrintCommand = exports.inkjetResetCommand = void 0;
exports.inkjetResetCommand = '1B021D00001B03';
function formatPrintCommand(printData) {
    return new Promise((resolve, reject) => {
        try {
            const date = printData.date;
            const formattedDate = (date.split(" ")[0]).replace(/\./g, '/');
            const formattedTime = (date.split(" ")[1]).substring(0, 5);
            let field1 = printData.datamatrix; // 9 Digit
            let field2 = `${printData.machine} ${printData.mouldDescription.replace(/[öÖ]/g, 'O')}`; //31 Digit
            let field3 = `${formattedDate} ${formattedTime}`; //14 Digit
            let field4 = `${printData.materialNumber} ${printData.datamatrix}`; //20 Digit
            // label Print Data
            const labelPrintCommand = (`^XA^FO400,80^BXN,9,300^FD${field1}^FS^FO520,80^A0N,30,23^FD${field2}^FS^FO520,120^A0N,30,23^FD${field3}^FS^FO520,160^A0N,30,23^FD${field4}^FS^XZ`);
            // Inkjet Print Data
            if (field2.length < 31) {
                const padding = '\x00'.repeat(31 - field2.length);
                field2 += padding;
            }
            const combinedData = `${field1}${field2}${field3}${field4}`;
            const hexPrintData = Buffer.from(combinedData, 'utf-8').toString('hex');
            const inkjetPrintCommand = `1B021D4A00${hexPrintData}1B03`;
            const printCommand = {
                inkjet: inkjetPrintCommand,
                label: labelPrintCommand
            };
            resolve(printCommand);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.formatPrintCommand = formatPrintCommand;
