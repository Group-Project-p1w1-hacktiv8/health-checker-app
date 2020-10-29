const axios = require('axios');
const CryptoJS = require('crypto-js');

class HealthController {

  static findHealth(req, res, next){
    const computedHash = CryptoJS.HmacMD5("https://sandbox-authservice.priaid.ch/login", "k6H7Zbw3G5YaDx9r4");
    const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
    axios({
      url: "https://sandbox-authservice.priaid.ch/login",
      method: "post",
      headers: {
        Authorization: `Bearer adi.athunk@gmail.com:${computedHashString}`
      },

      // params: {
      //   token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkaS5hdGh1bmtAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI4MDU0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIwLTEwLTI5IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2MDM5NzE2OTgsIm5iZiI6MTYwMzk2NDQ5OH0.w5rADfmRMVmfrd6qkH_IPNJ9_U0Blq9k-GVVOV2R01M",
      //   language: "en-gb"
      // }
    })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = HealthController;