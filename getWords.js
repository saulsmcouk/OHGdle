// run me to get the list of words from wiktionary
async function downloadWords(words, continueData = "none") {
    let queryURL = "https://en.wiktionary.org/w/api.php?origin=*&action=query&generator=categorymembers&gcmtitle=Category:Old_High_German_lemmas&format=json"
    if (continueData != "none") queryURL = queryURL + continueData
    const response = await fetch(queryURL, {
        method: 'GET',
        mode: 'cors'
    })
    data = await response.json()
    for (const page in data.query.pages) {
        words.push(data.query.pages[page].title)
    }
    if ("continue" in data) {
        cString = "&continue=" + data.continue.continue+"\"&gcmcontinue=\"" + data.continue.gcmcontinue + "\""
        if (words[words.length - 1] == "zisimus") {
            return words
        }
        downloadWords(words, cString)
        window.wordList = words
    }
    return words
}
