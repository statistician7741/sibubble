const edge = require('edge-js');

var getVerify = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 16);
      return (int) ((long) (uint64 >> 20) & 31L);
  }
*/});

var getYear = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 16);
      return (int) ((long) uint64 & (long) sbyte.MaxValue) + 2000;
  }
*/});

var getMonth = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 16);
      return (int) ((long) (uint64 >> 7) & 15L);
  }
*/});

var getDay = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 16);
      return (int) ((long) (uint64 >> 11) & 31L);
  }
*/});

var getHour = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 16);
      return (int) ((long) (uint64 >> 47) & 31L);
  }
*/});

var getMin = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 16);
      return (int) ((long) (uint64 >> 52) & 63L);
  }
*/});

var getSec = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 16);
      return (int) ((long) (uint64 >> 58) & 63L);
  }
*/});

var getUserID = edge.func(function () {/*
  async (msg) => {
      byte[] buffer = (byte[]) msg;
      ulong uint64 = BitConverter.ToUInt64(buffer, 8);
      return uint64.ToString();
  }
*/});

const setVal = (msg, func, cb) => {
  func(msg, function(e, r){
    if (e) throw error;
    cb(e,r)
  })
}

module.exports = { setVal, getUserID, getYear, getMonth, getDay, getHour, getMin, getSec }