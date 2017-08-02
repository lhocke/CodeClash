var currentQ;
// var currentQMirror;
var successQ = []
var getQuestion = function(question) {
    questionId = question || "";
    if (questionId) {
        questionId = "/?questionId" + questionId;
    }
    // min = Math.ceil(1);
    // max = Math.floor(question.length);
    // $.get("/api/questions", function(allData) {
    //     questionId = Math.floor(Math.random() * (allData.length - 1)) + 1;
    //     for (var i = 0; i < successQ; i++) {
    //         if (questionId === successQ[i]) {
    //             questionId = Math.floor(Math.random() * (allData.length - 1)) + 1;
    //         }
    //     }
    // })
    var currentQMirror;
    // currentQ = questionId;
    // console.log(questionId)
    $.get("/api/questions" + questionId, function(data) {
        // console.log(data[0].question_func)
        currentQMirror = {
            lineNumbers: true,
            theme: "3024-night",
            value: data[0].question_func
        };
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
                    $('#success-modal').modal('toggle');
                } else {
                    // alert('fail');
                    $('#fail-modal').modal('toggle');
                };
            };
            funCheck()
        })
    });
};

$(document).ready(getQuestion());
// $('#next-btn').on('click', getQuestion())