var successQ = []

var getQuestion = function(question) {
    $('.modal').modal('hide')
    $('#code-box').empty();
    $('#question-box').empty();
    $('#fail-body').empty();

    var questionId = question || "";
    if (questionId) {
        questionId = "/?questionId" + questionId;
    }
    
    $.get("/api/questions", function(allData) {
        
        min = Math.ceil(1);
        max = Math.floor(allData.length + 1);

        questionId = Math.floor(Math.random() * (max - min)) + 1;

        var currentQMirror;
        var qIndex = questionId - 1;
        questionId = "/?questionId" + questionId
        
        $.get("/api/questions" + questionId, function(data) {
            data = data[qIndex];
            currentQMirror = {
                lineNumbers: true,
                theme: "3024-night",
                value: data.question_func1 + "\n" + data.question_func2 + "\n" + data.question_func3
            };

            $('#question-box').append('<h4>' + data.question_text + '</h4>');

            var myCodeMirror =  CodeMirror(document.getElementById("code-box"), currentQMirror)

            $('#test').on("click", function(){
                var code = myCodeMirror.getValue();
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
    console.log("passed: " + passed)

    for (var i = 0; i < data.exp_val.length; i++){
        var argAg = [];
        var indArg = data.valid_args[i].split(',');
        for (var x = 0; x < indArg.length; x++) {
            var arg = parseInt(indArg[x]);
            console.log(indArg[x])
            argAg.push(arg)
        }
        console.log(typeof(argAg))
        argAg = argAg.toString()
        console.log(typeof(argAg))
        console.log(argAg)
        if (func(argAg) == data.exp_val[i]) {
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
};    

$(document).ready(getQuestion());
