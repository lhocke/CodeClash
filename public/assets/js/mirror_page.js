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
    // checks if user has already answered a question this session
    // for (var i = 0; i < successQ.length; i++){
    //     if (successQ.length === 100) {
    //         alert("No More Question, Check Back Later")
    //     } else if (questionId = successQ[i] + 1) {
    //         getQuestion()
    //     }
    // }
    // gets individual question data
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
                viewportMargin: Infinity,
                theme: "3024-night",
                value: data.question_func1 + "\n" + data.question_func2 + "\n" + data.question_func3    
            };
            // places instructions on the page and creates instance of CodeMirror editor
            $('#question-box').append('<h4>' + data.question_text + '</h4>');
            var remove = data.question_func1
            var myCodeMirror =  CodeMirror(document.getElementById("code-box"), currentQMirror);
            myCodeMirror.setSize(null, 400);
            
            // grabs code from the editor and passes it to the check function
            $('#test').on("click", function(){
                var code = myCodeMirror.getValue();
                var funcBody = code.replace(remove, '');
                funcBody = funcBody.slice(0,-1);
                var funcArg = code.split(')')[0].split('(')[1];
                funcArg = [funcArg];
                // creates new function to be checked
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
    // Checks for each expected value
    for (var i = 0; i < data.exp_val.length; i++){

        var a ="";
        var b = '';
        var c = '';
        var d = '';
        var e = '';
        var f = '';
        var indArg = data.valid_args[i].split(',');
        // defines variables for arguments based on expected number
        for (var x = 0; x < indArg.length; x++) {
            if (typeof(parseInt(indArg[x])) === NaN){
                if (!a){
                    a = indArg[x]
                } else if (a && !b) {
                    b = indArg[x]
                } else if (b && !c) {
                    c = indArg[x]
                } else if (c && !d) {
                    d = indArg[x]
                } else if (d && !e) {
                    e = indArg[x]
                } else if (e && !f) {
                    f = indArg[x]
                }
            }else {
                if (!a){
                    a = parseInt(indArg[x])
                } else if (a && !b) {
                    b = parseInt(indArg[x])
                } else if (b && !c) {
                    c = parseInt(indArg[x])
                } else if (c && !d) {
                    d = parseInt(indArg[x])
                } else if (d && !e) {
                    e = parseInt(indArg[x])
                } else if (e && !f) {
                    f = parseInt(indArg[x])
                }
            }
        }

        // checks that function returns the expected value
        if (a && !b) {
            var finFunc = func(a)
            if (finFunc == data.exp_val[i]) {
            passed++
            } else {
                failed++                            
            };
        } else if (a && b && !c) {
            var finFunc = func(a,b)
            if (finFunc == data.exp_val[i]) {
            passed++
            } else {
                failed++                            
            }       
        } else if (a && b && c && !d) {
            var finFunc = func(a,b,c)
            if (finFunc == data.exp_val[i]) {
            passed++
            } else {
                failed++                            
            }
            // finArg = a,b,c
        } else if (a && b && c && d && !e) {
            var finFunc = func(a,b,c,d)
            if (finFunc == data.exp_val[i]) {
            passed++
            } else {
                failed++                            
            }
        } else if (a && b && c && d && e && !f) {
            var finFunc = func(a,b,c,d,e)
            if (finFunc == data.exp_val[i]) {
            passed++
            } else {
                failed++                            
            }
        } else if (a,b,c,d,e,f) {
            var finFunc = func(a,b,c,d,e,f)
            if (finFunc == data.exp_val[i]) {
            passed++
            } else {
                failed++                            
            }
        }
    }
    // checks that function has passed all tests
    if (passed === data.exp_val.length) {
        successQ.push(currentQ);
        $('#success-modal').modal('toggle'); 
    } else {
        $('#fail-body').empty()
        $('#fail-body').append("<h4>Sorry, Try Again!\nFailed " + failed + " tests</h4>")
        $('#fail-modal').modal('toggle');
    }
    // gets a new problem
    $('#next-btn').on('click', function() {
        $(this).prop('disabled', true)
        $(this).on('click', getQuestion())
    })
};    

$(document).ready(getQuestion());
