"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    application: {
        port: 3000
    },
    databus: {
        url: 'mqtt://172.26.192.1:1883',
        username: 'edge',
        password: 'edge',
        subscribe: 'ie/d/j/simatic/v1/s7c1/dp/r/plc/default',
        publish: 'ie/d/j/simatic/v1/s7c1/dp/w/plc'
    },
    opcuaserver: {
        url: 'mqtt://172.26.192.1:1883',
        username: 'edge',
        password: 'edge',
        subscribe: 'ie/d/j/simatic/v1/s7c1/dp/r/plc/default',
        publish: 'ie/d/j/simatic/v1/opcua1/dp/w',
        meta: 'ie/m/j/simatic/v1/opcua1/dp'
    },
    database: {
        host: '172.26.192.1',
        database: 'tubtraceability',
        user: 'bsh',
        password: 'Sunrise12345.'
    },
};
// export const config = {
//     application: {
//         port: 3000
//     },
//     databus: {
//         url: 'mqtt://ie-databus',
//         username: 'edge',
//         password: 'edge',
//         subscribe: 'ie/d/j/simatic/v1/s7c1/dp/r/plc/default',
//         publish: 'ie/d/j/simatic/v1/s7c1/dp/w/plc'
//     },
//     database: {
//         host: 'tubtraceability-database',
//         database: 'tubtraceability',
//         user: 'bsh',
//         password: 'Sunrise12345.'
//     },
// }
