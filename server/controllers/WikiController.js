const axios = require('axios')
const { getTitle } = require('../helper/getTitle')

class WikiController{
    static findSymptoms(req, res) {
        axios({
        method: 'get',
        url: process.env.WIKI_API,
        params: {
            action: "query",
            format: "json",
            list: "search",
            srsearch: req.query.symptoms
        }
        })
        .then( response => {
            let data = response.data.query.search
            let newData = data.map(getTitle)
            res.status(200).json(newData)
        })
        .catch(error => {
            res.status(500).json(error)
        })
    }
    
}

module.exports = WikiController