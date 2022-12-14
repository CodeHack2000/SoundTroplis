const {format, createLogger, transports} = require('winston')
const {timestamp, combine, errors, json} = format

function buildProdLogger() {
    return createLogger({
        format: combine(
            timestamp(),
            errors({stack: false}),
            json(),
        ),
        defaultMeta: {service: 'artists-serice'},
        transports: [
            new transports.Console(),
            new transports.File({filename: 'application_artists.log'}),
        ],
    })
}

module.exports = buildProdLogger