const axios = require('axios');

class NewsController {
  static findNews(req, res) {
    axios({
      url: "https://api.currentsapi.services/v1/search",
      method: "get",
      params: {
        country: "id",
        category: "health",
        apiKey: "APrIH4OzxpQqGWZ2U2ySa5UBNFBA53jddfRACVbgMXE4ej1a"
      }
      
    })
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
}

module.exports = NewsController