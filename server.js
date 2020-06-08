//error handling
process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(400, ' Start Error Message: ', err)
  // send email

});

//SIPEDE Server
const express = require('express')
const http = require('http')
const next = require('next')
const socketServer = require('socket.io')

let runServer = () => {
  const port = 88
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  const handle = app.getRequestHandler()

  app.prepare()
    .then(() => {
      const server = express()
      const cookieParser = require("cookie-parser");
      const bodyParser = require("body-parser");
      var session = require('express-session')({
        resave: true,
        saveUninitialized: true,
        secret: "ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg=="
      });
      var sharedsession = require("express-socket.io-session");
      server.use(session);
      server.use(cookieParser("ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg=="));
      server.use(bodyParser.urlencoded({ extended: true }));
      server.use(bodyParser.json())

      //socket.io
      const serve = http.createServer(server);

      // server.use('/api/login', require("./api/login.api"));

      //Kompresi gzip
      const compression = require('compression');
      server.use(compression());

      server.get('*', (req, res) => {
        return handle(req, res)
      })
      serve.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })

      const io = socketServer(serve);
      io.use(sharedsession(session, cookieParser("ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg==")));
      io.on('connection', function (client) {
        console.log("Hey, someone connected");
        require('./api/organik.socket.api')(client)
        client.on('disconnect', () => {
          console.log("Hey, someone disconnected");
        })
      })

      //udp server
      const dgram = require('dgram');
      const udpServer = dgram.createSocket('udp4');
      const PORT = 9999;
      const f = require('./app');
      const async = require('async');
      const moment = require('moment');
      udpServer.on('listening', function () {
        const address = udpServer.address();
        console.log('UDP udpServer listening on ' + address.address + ':' + address.port);
      });
      udpServer.bind(PORT);
      udpServer.on('message', (data, remote) => {
        let year, month, day, hour, min, sec, UserID;
        async.auto({
          id_fingerprint: (cb_1) => {
            f.setVal(data, f.getUserID, cb_1);
          },
          year: (cb_1) => {
            f.setVal(data, f.getYear, cb_1);
          },
          month: (cb_1) => {
            f.setVal(data, f.getMonth, cb_1);
          },
          day: (cb_1) => {
            f.setVal(data, f.getDay, cb_1);
          },
          hour: (cb_1) => {
            f.setVal(data, f.getHour, cb_1);
          },
          min: (cb_1) => {
            f.setVal(data, f.getMin, cb_1);
          },
          sec: (cb_1) => {
            f.setVal(data, f.getSec, cb_1);
          }
        }, (err, log) => {
          let checkInDate = moment(`${log.year}/${log.month}/${log.day} ${log.hour}:${log.min}:${log.sec}`, 'YYYY/M/D HH:mm:ss')
          io.sockets.emit('last_fingerprint_online', moment().format('YYYY/MM/DD HH:mm:ss'));
          if (!checkInDate.isBefore(moment().subtract(5, 'm')) && log.id_fingerprint && log.sec) {
            io.sockets.emit('checkin', {
              id_fingerprint: log.id_fingerprint, new_handkey_time: checkInDate.format('YYYY/MM/DD HH:mm:ss')
            });
            const presensi_id = moment().format('YYYY_MM_DD')
            Organik.findOne({
              'id_fingerprint': log.id_fingerprint, "presensi._id": presensi_id
            }, (e, r) => {
              if (e) {
                console.log(e);
              } else {
                if (r) {
                  if (r.presensi[r.presensi.length - 1]._id === moment().format('YYYY_MM_DD')) {
                    r.presensi[r.presensi.length - 1].handkey_time.push(checkInDate.format('YYYY/MM/DD HH:mm:ss'))
                    r.save()
                  }
                } else {
                  Mitra.findOne({
                    'id_fingerprint': log.id_fingerprint, "presensi._id": presensi_id
                  }, (e, m) => {
                    if (e) {
                      console.log(e);
                    } else {
                      if (m) {
                        if (m.presensi[m.presensi.length - 1]._id === moment().format('YYYY_MM_DD')) {
                          m.presensi[m.presensi.length - 1].handkey_time.push(checkInDate.format('YYYY/MM/DD HH:mm:ss'))
                          m.save()
                          // console.log(log.id_fingerprint, checkInDate.format('YYYY/MM/DD HH:mm:ss'));
                        }
                      }
                    }
                  })
                }
              }
            })
          }
        })
      });
    })
}

//modul mongodb utk koneksi mongo db database
const config = require('./config/env.config')
var url = `mongodb://${config.db_server}:${config.port_server}/${config.db_name}`;
var mongoose = require('mongoose');
const { exec } = require('child_process');
//Model
const Organik = require('./models/organik.model')
const Mitra = require('./models/mitra.model')

let start = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      exec(`powershell -Command "Start-Process cmd -Verb RunAs -ArgumentList '/c net start MongoDB'"`, (err, stdout, stderr) => {
        console.log('Trying to start MongoDB service...');
        setTimeout(start, 15000)
      })
    } else {
      runServer();
    }
  });
}

start();