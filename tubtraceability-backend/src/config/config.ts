export const config = {
    application: {
        port: 3000
    },
    databus: {
        url: 'mqtt://192.168.42.1:1883',
        username: 'edge',
        password: 'edge',
        client: 'S7Connector',
        subscribe: 'ie/d/j/simatic/v1/s7c1/dp/r/plc/default',
        publish: 'ie/d/j/simatic/v1/s7c1/dp/w/plc'
    },
    opcuaserver:{
        url: 'mqtt://192.168.42.1:1883',
        username: 'edge',
        password: 'edge',
        client: 'OPCUAServer',
        subscribe: 'ie/d/j/simatic/v1/opcua1/dp/r/opcua/default',
        publish: 'ie/d/j/simatic/v1/opcua1/dp/w',
        meta: 'ie/m/j/simatic/v1/opcua1/dp'
    },
    database: {
        host: '192.168.42.1',
        database: 'tubtraceability',
        user: 'bsh',
        password: 'Sunrise12345.'
    },
}


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
//     opcuaserver:{
//         url: 'mqtt://ie-databus',
//         username: 'edge',
//         password: 'edge',
//         subscribe: 'ie/d/j/simatic/v1/opcua1/dp/r/opcua/default',
//         publish: 'ie/d/j/simatic/v1/opcua1/dp/w',
//         meta: 'ie/m/j/simatic/v1/opcua1/dp'
//     },
//     database: {
//         host: 'tubtraceability-database',
//         database: 'tubtraceability',
//         user: 'bsh',
//         password: 'Sunrise12345.'
//     },
// }