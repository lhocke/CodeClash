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
                funcBody = funcBody.slice(0,-1);

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
    
    

    for (var i = 0; i < data.exp_val.length; i++){
        console.log("passed: " + passed)

        var a ="";
        var b = '';
        var c = '';
        var d = '';
        var e = '';
        var f = '';
        var finArg = 0;
        console.log(finArg)
        console.log(data.valid_args[i])
        var argAg = [];
        var indArg = data.valid_args[i].split(',');
        // var c  = 0;

        for (var x = 0; x < indArg.length; x++) {
            if (typeof(parseInt(indArg[x])) === NaN){
                if (!a){
                    a = indArg[x]
                    console.log(a)
                } else if (a && !b) {
                    b = indArg[x]
                    console.log(b)
                } else if (a && b && !c) {
                    c = indArg[x]
                    console.log(c)
                } else if (a && b && c && !d) {
                    d = indArg[x]
                    console.log(d)
                } else if (a && b && c && d && !e) {
                    e = indArg[x]
                    console.log(e)
                } else if (a && b && c && d && e && !f) {
                    f = indArg[x]
                    console.log(f)
                }
            }else {
                if (!a){
                    a = parseInt(indArg[x])
                    console.log(a)
                } else if (a && !b) {
                    b = parseInt(indArg[x])
                    console.log(b)
                } else if (a && b && !c) {
                    c = parseInt(indArg[x])
                    console.log(c)
                } else if (a && b && c && !d) {
                    d = parseInt(indArg[x])
                    console.log(d)
                } else if (a && b && c && d && !e) {
                    e = parseInt(indArg[x])
                    console.log(e)
                } else if (a && b && c && d && e && !f) {
                    f = parseInt(indArg[x])
                    console.log(f)
                }
            }

            // var arg = parseInt(indArg[x]);
            // console.log(indArg[x])

        }
        // var finFunc = ""
        // checks that function returns the expected value
        if (a && !b) {
            var finFunc = func(a)
            console.log("one")
            if (finFunc == data.exp_val[i]) {
            passed++
            console.log("passed")
            } else {
                failed++ 
                console.log("failed")                           
            };
        } else if (a && b && !c) {
            var finFunc = func(a,b)
            console.log("two")
            console.log(finFunc)
            if (finFunc == data.exp_val[i]) {
            passed++
            console.log("passed")
            } else {
                console.log("failed")
                failed++                            
            }       
        } else if (a && b && c && !d) {
            var finFunc = func(a,b,c)
            console.log("three")
            if (finFunc == data.exp_val[i]) {
            passed++
            console.log("passed")
            } else {
                console.log("failed")
                failed++                            
            }
            // finArg = a,b,c
        } else if (a && b && c && d && !e) {
            var finFunc = func(a,b,c,d)
            console.log("four")
            if (finFunc == data.exp_val[i]) {
            passed++
            console.log("passed")
            } else {
                console.log("failed")
                failed++                            
            }
        } else if (a && b && c && d && e && !f) {
            var finFunc = func(a,b,c,d,e)
            console.log("five")
            if (finFunc == data.exp_val[i]) {
            passed++
            console.log("passed")
            } else {
                console.log("failed")
                failed++                            
            }
        } else if (a,b,c,d,e,f) {
            var finFunc = func(a,b,c,d,e,f)
            console.log("six")
            if (finFunc == data.exp_val[i]) {
            passed++
            console.log("passed")
            } else {
                console.log("failed")
                failed++                            
            }
        }
        console.log(data.exp_val[i])
    }

    if (passed === data.exp_val.length) {
        successQ.push(currentQ);
        $('#success-modal').modal('toggle');
        // 
    } else {
        $('#fail-body').empty()
        $('#fail-body').append("<h4>Sorry, Try Again!\nFailed " + failed + " tests</h4>")
        $('#fail-modal').modal('toggle');
    }
    
    $('#next-btn').on('click', function() {
        $(this).prop('disabled', true)
        $(this).on('click', getQuestion())
    })
};    

$(document).ready(getQuestion());
