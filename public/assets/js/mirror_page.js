// var currentQ = "";
// var currentQMirror;
var successQ = []
var getQuestion = function(question) {
    $('.modal').modal('hide')
    $('#code-box').empty();
    $('#question-box').empty();
    $('#fail-body').empty();
    // var currentQ;
    var questionId = question || "";
    if (questionId) {
        questionId = "/?questionId" + questionId;
    }
    
    $.get("/api/questions", function(allData) {
        
        min = Math.ceil(1);
        // console.log(min)
        max = Math.floor(allData.length + 1);
        // console.log(max)
        //     for (var i = 0; i < successQ; i++) {
        //     if (questionId === successQ[i]) {
        //         questionId = Math.floor(Math.random() * (allData.length - 1)) + 1;
        //     }
        // }
        questionId = Math.floor(Math.random() * (max - min)) + 1;
        // for (var i = 1; i < successQ.length; i++){
        //     if (questionId === successQ[i]) {
        //         questionId = Math.floor(Math.random() * (max - min)) + 1;
        //     }
        // }
        var currentQMirror;
        var qIndex = questionId - 1;
        // currentQ = questionId;
        questionId = "/?questionId" + questionId
        // console.log(questionId)
        
        // console.log(questionId)
        $.get("/api/questions" + questionId, function(data) {
            // console.log(data[qIndex])
            data = data[qIndex];
            // console.log(typeof(data.valid_args[0].slice(1,-1).split(',')))
            // console.log(data.exp_val)

            // console.log(typeof(data.valid_args[0]))
            currentQMirror = {
                lineNumbers: true,
                theme: "3024-night",
                value: data.question_func1 + "\n" + data.question_func2 + "\n" + data.question_func3
                // value: "function (x,y) {\n    x + y \n}"
            };
            $('#question-box').append('<h4>' + data.question_text + '</h4>');
            // console.log(currentQMirror)
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

                var func = new Function(funcArg, funcBody);
                funCheck(data, func)
            })
        });
    })
}
var funCheck = function(data, func) {
    var currentQ = data.id
    var passed = 0;
    var failed = 0;
    // var argArr = [];
    console.log("passed: " + passed)
    for (var i = 0; i < data.valid_args.length; i++){
        var argAg;
        var indArg = data.valid_args[i].slice(1,-1).split(',');
        for (var x = 0; x < indArg.length; x++) {
            var arg + x = parseInt(indArg[x]);
        }
        if (func() == data.exp_val[i]) {
            passed++
            console.log("passed")
        } else {
            failed++                            
        };
    }
    if (passed === data.exp_val.length) {
        successQ.push(currentQ);
        $('#success-modal').modal('toggle');
        // 
    } else {
        $('#fail-body').append("<h4>Sorry, Try Again!\nFailed " + failed + " tests</h4>")
        $('#fail-modal').modal('toggle');
    }
    $('#next-btn').on('click', function() {
        $(this).prop('disabled', true)
        $(this).on('click', getQuestion())
    })
    // getQuestion())
};    

$(document).ready(getQuestion());
