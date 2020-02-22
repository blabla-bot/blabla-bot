var express = require('express');
var router = express.Router();
var blabot = require("blabot-core");
var fs = require("fs")

function getDict(name){
    const dictionaryFilePath = "./../dictionaries/" + name + ".json";

    if (!fs.existsSync(dictionaryFilePath))
        throw new Error('Can’t find file \'' + dictionaryFilePath + '\'\n');

    const dictionaryJSON = fs.readFileSync(dictionaryFilePath, 'utf-8');
    return JSON.parse(dictionaryJSON);
}

function pluralizer(closure, dictionary, options){
    return closure(dictionary, options.count ? options.count : 1)
}

/* GET users listing. */
router.get('/generate/:action', function(req, res, next) {
    options = req.query

    const dictionary = getDict(options.dictionary ? options.dictionary : "cs"); 


    switch(req.params.action){
        case "words":
            response = pluralizer(blabot.getWords, dictionary, options);
            break;
        case "sentences":
            response = pluralizer(blabot.getSentences, dictionary, options);
            break;
        case "paragraphs":
            response = pluralizer(blabot.getParagraphs, dictionary, options);
            break;
        default:
            throw new Error("This action does not exist")
    }
    res.json(response);
});

module.exports = router;