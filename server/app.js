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

// aimlInterpreter.findAnswerInLoadedAIMLFiles('!setname', callback);
// aimlInterpreter.findAnswerInLoadedAIMLFiles('Remember me?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('My name is Karina', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('I am 50 years old.', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('What do you do for a living?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('I am a student.', callback);

// aimlInterpreter.findAnswerInLoadedAIMLFiles('My name is Karina', callback);




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