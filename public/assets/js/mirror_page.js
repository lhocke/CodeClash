var myCodeMirror = CodeMirror(document.getElementById("code-box"), {
    lineNumbers: true,
    theme: "3024-night",
    value: "function (x,y) {\n    x + y \n}"
});

myCodeMirror.setSize(800,auto)

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

// $('#next-btn').on('click', )