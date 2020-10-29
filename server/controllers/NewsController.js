const axios = require('axios');

class NewsController {
  static findNews(req, res, next) {
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
        console.log(response)
        res.status(200).json(response.data.news);
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
}

module.exports = NewsController