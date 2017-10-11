var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var AIMLInterpreter = require('aimlinterpreter');

var bot = {
    name: 'Real Human Person',
    age: '42',
}

var aimlInterpreter = undefined;

var aimlInterpreter = new AIMLInterpreter({name:'Gigi', age:'402'});

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

    aimlInterpreter.findAnswerInLoadedAIMLFiles(data, function (answer) {

        res.json(
            {
                "data": answer
            }
        );

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
aimlInterpreter.findAnswerInLoadedAIMLFiles('Remember me ?', callback);
