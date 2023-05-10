'use strict';

const express = require('express');
const morgan = require('morgan');
var fs = require('fs');
var sys = require('sys');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
const PORT = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

// Funzione per visualizzare le raccomandazioni dei film nella pagina
// function displayMovieRecommendations(results) {
//     var output = "<h2>Raccomandazioni:</h2>";
//     output += "<ul>";
//     for (var i = 0; i < results.length; i++) {
//         output += "<li>" + results[i] + "</li>";
//     }
//     output += "</ul>";
//     $("#results").html(output);
// }

app.post('/api/chatgpt',
    async (req, res) => {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Say this is a test",
                temperature: 0,
                max_tokens: 50,
            });
            res.status(200).json(response);
        } catch(e) {
            // console.log(e);
            res.status(500).json(e);
        }
    });

// app.set("view options", {layout: false});
// app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/test.html');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));