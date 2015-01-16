#!/usr/bin/env node

var fs = require('fs');

/**
 * brainfuckify some text
 * @param  {String} txt Input text
 * @return {String}     Brainfuck code
 */
var fuck = function (txt) {
	var code = "",
	lastCharCode, x,
	instr = "+",
	i, l = txt.length,
	j, k;
	for (i=0; i<l; i+=1) {
		k = txt.charCodeAt(i);
		if (k > 255) {
			i=0;
		}
		if (i > 0) {
			x = k - lastCharCode;
		}else {
			x = k;
		}
		if (x < 0) {
			instr = "-";
		}else if (x > 0) {
			instr = "+";
		}else {
			instr = "";
		}
		lastCharCode = k;
		for (j=0; j<Math.abs(x); j+=1) {
			code += instr;
		}
		code += ".";
	}
	return code;
};

try{
	fs.readFile(process.argv[2], function(e, t){
		if (!e){
			console.log(fuck(t+""));
		}
	});
}catch(e){
	console.log("Usage: banger FILE");
}