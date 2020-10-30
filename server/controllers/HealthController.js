const axios = require('axios');
// const CryptoJS = require('crypto-js');
const { User, Symptom } = require('../models');
const baseURL = 'https://sandbox-healthservice.priaid.ch';

class HealthController {

  static findSymptoms(req, res, next){
    // const computedHash = CryptoJS.HmacMD5("c6QRo4q2FKa5e8T3B", "https://sandbox-authservice.priaid.ch/login");
    // const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
    // // console.log(computedHashString);
    // const auth = `Bearer gerrysimangunsong@gmail.com:${computedHashString}`
    // console.log(auth)
    // console.log(computedHashString);
    axios({
      url: baseURL + '/symptoms',
      method: "get",
      params: {
        token: process.env.HEALTHTOKEN,
        language: 'en-gb'
      }
      // headers: {
      //   // 'content-Type': 'application/json',
      //   // 'Cache-Control': 'no-store',
      //   'Authorization': auth
      // }
          
    //   // params: {
    //   //   token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkaS5hdGh1bmtAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI4MDU0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIwLTEwLTI5IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2MDM5NzE2OTgsIm5iZiI6MTYwMzk2NDQ5OH0.w5rADfmRMVmfrd6qkH_IPNJ9_U0Blq9k-GVVOV2R01M",
    //   //   language: "en-gb"
    //   // }
    })
      .then(response => {
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

  static diagnosis(req, res, next) {
    const userId = +req.user.id;
    User.findByPk(userId, {
      include: Symptom
    })
      .then(data => {
        if(data.Symptoms.length > 0) {
          const symptoms = data.Symptoms.map(symptom => symptom.api_id);
          return axios({
            url: baseURL + `/diagnosis`,
            method: 'get',
            params: {
              token: process.env.HEALTHTOKEN,
              language: 'en-gb',
              symptoms,
              gender: data.gender,
              year_of_birth: data.birth_year
            }
          })
        } else {
          throw {
            name: 'NotFound'
          }
        }
      })
        .then(result => {
          
          result = result.filter(el => {
            if(el.Issue.Accuracy > 50) {
              return true
            }
          });

          result = result.map(el => {
            return {
              ID: el.Issue.ID,
              Name: el.Issue.Name
            }
          });
          res.status(200).json(result)
        })
        .catch(err => {
          next(err);
        })
  }

  static findTreatment(req, res, next) {
    const { issueId } = req.body;
    axios({
      url: baseURL + `/issues/${+issueId}/info`,
      method: 'get',
      params: {
        token: process.env.HEALTHTOKEN,
        language: 'en-gb'
      }
    })
      .then(response => {
        res.status(200).json(response.data.TreatmentDescription);
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }
}

module.exports = HealthController;