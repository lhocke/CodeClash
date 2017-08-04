INSERT INTO Questions(question_text, question_func1, question_func2, valid_args, exp_val) 
VALUES('Fix This Function', 'function(a,b) {', '    a + b', '2,3;5,6', '5;11');

INSERT INTO Questions(question_text, question_func1, valid_args, exp_val) 
VALUES('Write a function for which mutiples of 3 return Fizz, multiples of 5 return Buzz, and multiples of 15 return FizzBuzz', 'function(n) {', '//Your Code Here', '6;20;12;40;45;60', 'Fizz;Buzz;Fizz;Buzz;FizzBuzz;FizzBuzz');

INSERT INTO Questions(question_text, question_func1, valid_args, exp_val) 
VALUES('Create a function that that takes a string and returns the midle letters.\nIf there are an odd number of letters return only the middle letter (i.e. James should return "m"). If there are an even number of letters it should return the two midddle letters ("letter" should return "tt").\nGood Luck!', 'function(n) {', 'letter;John;Roper;Saumya;David;apple;Jeff;Jack;','tt;oh;p;um;v;p;ef;ac');

INSERT INTO Questions(question_text, question_func1, valid_args, exp_val) 
VALUES('Create a function that takes 5 numbers as arguments and returns them as an array sorted from highest to lowest (i.e. 5, 19, 30, 2, 75 should return [75,30,19,5,2]', 'function(a,b,c,d,e) {', '1,3,57,200,47;37,2,99,27,57', '[200,57,47,3,1];[99,57,37,27,2]');

-- INSERT INTO Questions(question_text, question_func1, valid_args, exp_val) 
-- VALUES()