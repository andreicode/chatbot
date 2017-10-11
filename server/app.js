var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var AIMLInterpreter = require('aimlinterpreter');



var aimlInterpreter = new AIMLInterpreter({name:'Gigi', age:'402'});



aimlInterpreter.loadAIMLFilesIntoArray(['./data.aiml']);



var callback = function(answer, wildCardArray, input){


    console.log(answer + ' | ' + wildCardArray + ' | ' + input);
};

aimlInterpreter.findAnswerInLoadedAIMLFiles('Hi', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Hello', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your name', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('How old are you', callback);



var user = {
    name: undefined,
    age: undefined,
    occupation: undefined,
}






app.use(cors())
app.use(bodyParser.json())

app.post('/', function (req, res) {

    //Culegere intrebare
    var data = req.body.data;

    //Procesare raspuns
    var answer = data;





    //Trimitere raspuns
    res.json(
        {
            "data": answer
        }
    );
})

app.listen(3000, function () {
    console.log('Server started on port 3000!')
})