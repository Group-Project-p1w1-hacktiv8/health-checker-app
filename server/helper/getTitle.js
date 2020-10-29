function getTitle(item) {
    let result = {
        title: item.title,
        description: item.snippet
    }
    return result
}

module.exports = {
    getTitle
}