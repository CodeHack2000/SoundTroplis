const {format, createLogger, transports} = require('winston')
const {timestamp, combine, errors, json} = format

function buildProdLogger() {
    return createLogger({
        format: combine(
            timestamp(),
            errors({stack: false}),
            json(),
        ),
        defaultMeta: {service: 'reviews-serice'},
        transports: [
            new transports.Console(),
            new transports.File({filename: 'application_reviews.log'}),
        ],
    })
}

module.exports = buildProdLogger