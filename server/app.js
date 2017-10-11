var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var AIMLInterpreter = require('aimlinterpreter');

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var bot = {
    name: 'Real Human Person',
    age: '42',
}

var aimlInterpreter = new AIMLInterpreter(bot);
aimlInterpreter.loadAIMLFilesIntoArray(['./data.aiml']);


var reset = function () {

    aimlInterpreter.findAnswerInLoadedAIMLFiles('!noname', function () {});
    aimlInterpreter.findAnswerInLoadedAIMLFiles('!noage', function () {});
    aimlInterpreter.findAnswerInLoadedAIMLFiles('!nojob', function () {});

}

app.use(cors())
app.use(bodyParser.json())

app.post('/', function (req, res) {

    var data = req.body.data;

    aimlInterpreter.findAnswerInLoadedAIMLFiles(data, function (answer, wildcards, input) {

        if (input.toLowerCase() === 'bye' || input.toLowerCase() === 'goodbye') {

            reset();

        }

        setTimeout( function () {

            res.json(
                {
                    "data": answer
                }
            );

        }, randomIntFromInterval(400, 2000));

    });
})

reset();

app.listen(3000, function () {
    console.log('Server started on port 3000!')
})

var callback = function (a, w, i) {
    console.log('\n');
    console.log('Answer: ' + a);
    console.log('Wildcards: ' + w);
    console.log('Input: ' + i);
    console.log('\n');
}

//AIML TESTS
// aimlInterpreter.findAnswerInLoadedAIMLFiles('My name is Gigi', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Remember me ?', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('I am a miner', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your name', callback);
