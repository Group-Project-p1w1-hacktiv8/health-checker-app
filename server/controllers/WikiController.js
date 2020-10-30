const axios = require('axios')
const { getTitle } = require('../helper/getTitle')
const wikiUrl = 'https://en.wikipedia.org/w/api.php'
class WikiController{
    static findSymptoms(req, res, next) {
        // console.log(req.body)
        axios({
        method: 'get',
        url: wikiUrl,
        params: {
            action: "query",
            format: "json",
            list: "search",
            srsearch: req.body.symptoms
        }
        })
        .then( response => {
            let data = response.data.query.search
            let newData = data.map(getTitle)
            res.status(200).json(newData)
        })
        .catch(error => {
            next(error)
        })
    }
    
}

module.exports = WikiController