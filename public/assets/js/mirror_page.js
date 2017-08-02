// var currentQ = "";
// var currentQMirror;
var successQ = []
var getQuestion = function(question) {
    $('#code-box').empty();
    $('#question-box').empty();
    var currentQ;
    var questionId = question || "";
    if (questionId) {
        questionId = "/?questionId" + questionId;
    }
    
    $.get("/api/questions", function(allData) {
        
        min = Math.ceil(1);
        console.log(min)
        max = Math.floor(allData.length + 1);
        console.log(max)
            for (var i = 0; i < successQ; i++) {
            if (questionId === successQ[i]) {
                questionId = Math.floor(Math.random() * (allData.length - 1)) + 1;
            }
        }
        questionId = Math.floor(Math.random() * (max - min)) + 1;
        // for (var i = 1; i < successQ.length; i++){
        //     if (questionId === successQ[i]) {
        //         questionId = Math.floor(Math.random() * (max - min)) + 1;
        //     }
        // }
        var currentQMirror;
        var qIndex = questionId - 1;
        currentQ = questionId;
        questionId = "/?questionId" + questionId
        console.log(questionId)
        
        console.log(questionId)
        $.get("/api/questions" + questionId, function(data) {
            console.log(data[qIndex])
            currentQMirror = {
                lineNumbers: true,
                theme: "3024-night",
                value: data[qIndex].question_func
            };
            $('#question-box').append('<h4>' + data[qIndex].question_text + '</h4>');
            console.log(currentQMirror)
            var myCodeMirror =  CodeMirror(document.getElementById("code-box"), currentQMirror)
            $('#test').on("click", function(){

                // pulls code from editor
                var code = myCodeMirror.getValue();

                // converts editor code to values for new function
                var funcBody = code.split('{');
                funcBody = funcBody[1];
                funcBody = funcBody.split('}')[0];

                var funcArg = code.split(')')[0].split('(')[1];
                funcArg = [funcArg];

                // creates new function for validation
                var func = new Function(funcArg, funcBody);
                var funCheck = function() {
                    if (func(2,3) === 5 && func(3,8) === 11) {
                        // return true
                        // alert("congrats!");
                        successQ.push(currentQ);
                        $('#success-modal').modal('toggle');
                        $('#next-btn').on('click', getQuestion())
                    } else {
                        // alert('fail');
                        $('#fail-modal').modal('toggle');
                    };
                };
                funCheck()
            })
        });
    })
    //     for (var i = 0; i < successQ; i++) {
    //         if (questionId === successQ[i]) {
    //             questionId = Math.floor(Math.random() * (allData.length - 1)) + 1;
    //         }
    //     }
};
    

$(document).ready(getQuestion());
