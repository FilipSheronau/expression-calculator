function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(express) { 
	// write your solution here
	let str = express.replace(/\s/g,'');
	let op = str.match(/\(/g) || [];
  let cl = str.match(/\)/g) || [];  
  if (op.length == cl.length) {	
		if (str.search(/\*|\/|\+|(?<=\d)\-/) != -1) {
			while(str.search(/\(/) != -1) {
				let res1 = str.lastIndexOf('(');
				let res2 = str.indexOf(')',res1);
				let res3 = str.slice(res1+1,res2);
				let numb = calc(res3)
				str = str.slice(0,res1)+String(numb)+str.slice(res2+1);
			}		
			return calc(str);
		}
		else {
			return calc(str);
		}

		function calc(x) {
			let arg = x;
			while (arg.search(/[\/\*]/) != -1) {
				let znak = arg.charAt(arg.search(/[\/\*]/));
				if (znak == '*') {
					let a = arg.match(/(?<!\d)\-?\d+\.?\d{0,}(?=\*)/);        
					let b = arg.match(/(?<=\*)\-?\d+\.?\d{0,}/);        
					let c = Number(a[0])*Number(b[0]);
					arg = arg.replace(/(?<!\d)\-?\d+\.?\d{0,}\*\-?\d+\.?\d{0,}/,c.toFixed(20))					
				}
				else {
					let a = arg.match(/(?<!\d)\-?\d+\.?\d{0,}(?=\/)/);        
					let b = arg.match(/(?<=\/)\-?\d+\.?\d{0,}/);
					if (Number(b[0]) == 0) {
            throw new SyntaxError("TypeError: Division by zero.");
          }        
					let c = Number(a[0])/Number(b[0]);
					arg = arg.replace(/(?<!\d)\-?\d+\.?\d{0,}\/\-?\d+\.?\d{0,}/,c.toFixed(20));					
				}
			}
			while (arg.search(/\+|(?<=\d)\-/) != -1) {
				let znak = arg.charAt(arg.search(/\+|(?<=\d)\-/));
				if (znak == '+') {
					let a = arg.match(/(?<!\d)\-?\d+\.?\d{0,}(?=\+)/);        
					let b = arg.match(/(?<=\+)\-?\d+\.?\d{0,}/);        
					let c = Number(a[0])+Number(b[0]);
					arg = arg.replace(/(?<!\d)\-?\d+\.?\d{0,}\+\-?\d+\.?\d{0,}/,c.toFixed(20));					
				}
				else {
					let a = arg.match(/(?<![\de])\-?\d+\.?\d{0,}(?=\-)/);        
					let b = arg.match(/(?<=(?<=\d)\-)\-?\d+\.?\d{0,}/);        
					let c = Number(a[0])-Number(b[0]);
					arg = arg.replace(/(?<!\d)\-?\d+\.?\d{0,}\-\-?\d+\.?\d{0,}/,c.toFixed(20));					
				}
			}
			return Number(arg);
		}
	}
	else {
		throw new SyntaxError("ExpressionError: Brackets must be paired");
	}	
}

module.exports = {
    expressionCalculator
}

//let express = "8 - 2 * 3";
