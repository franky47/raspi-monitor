var monitor = require('os-monitor');
var request = require('request');
var moment  = require('moment');
var bytes   = require('bytes');

const url = 'https://dweet.io:443/dweet/for/fortyseveneffects-raspi-monitor';

// -----------------------------------------------------------------------------

monitor.on('monitor', function(event) {
    const startupTime = moment.unix(event.timestamp - event.uptime);
    const timestamp = moment.unix(event.timestamp);
    const data = {
        load:       event.loadavg,
        uptime:     startupTime.fromNow(true),
        freemem:    {
            amount: event.freemem / event.totalmem,
            pretty: bytes(event.freemem),
        },
        totalmem:   bytes(event.totalmem),
        date:       timestamp.format('DD/MM/YYYY'),
        time:       timestamp.format('HH:mm:ss'),
    };
    request.post({
        uri:    url,
        body:   data,
        json:   true,
    });
});

// -----------------------------------------------------------------------------

monitor.start({
    delay: 1000,
});

