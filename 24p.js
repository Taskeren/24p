
// Generate all the Operation Orders could happen
var _actions = [];
for(let _a=0; _a < 4; _a++) {
	for(let _b=0; _b < 4; _b++) {
		for(let _c=0; _c < 4; _c++) {
			_actions[_actions.length] = [_a, _b, _c];
		}
	}
}

// Generate all the Values Orders could happen
var _val_order = [];
for(let _a=0; _a < 4; _a++) {
	for(let _b=0; _b < 4; _b++) {
		for(let _c=0; _c < 4; _c++) {
			for(let _d=0; _d < 4; _d++) {
				if(_a == _b || _a == _c || _a == _d || _b == _c || _b == _d || _c == _d)
					continue;
				_val_order[_val_order.length] = [_a, _b, _c, _d];
			}
		}
	}
}

/**
 * 计算所有可能的24点
 * @param {Object} a the 1st val
 * @param {Object} b the 2nd val
 * @param {Object} c the 3rd val
 * @param {Object} d the 4th val
 */
function point24(a, b, c, d) {
	let values = [a, b, c, d];
	let result = [];
	
	for(let k=0; k < _val_order.length; k++) {
		let val_order = _val_order[k];
		result = result.concat(
			point24_once(values[val_order[0]], values[val_order[1]], values[val_order[2]], values[val_order[3]])
		);
	}
	
	return result;
}

/**
 * 计算数值一定的所有可能
 * @param {Object} a
 * @param {Object} b
 * @param {Object} c
 * @param {Object} d
 */
function point24_once(a, b, c, d) {
	let res_24 = [];
	for(let j=0; j<_actions.length; j++) {
		let action = _actions[j];
		let execut = executeToString(action[0])+executeToString(action[1])+executeToString(action[2]);
		let result = calc(a, b, c, d, action);
		
//		console.log(execut);
//		console.log(result);
		
		if(result == 24) {
			res_24[res_24.length] = ""+a+executeToString(action[0])+b+executeToString(action[1])+c+executeToString(action[2])+d;
		}
	}
	
	if(res_24.length != 0) {
        console.log(res_24);
    }
    
	return res_24;
}

/**
 * 计算
 */
function calc(a, b, c, d, actions) {
	return _calc(_calc(_calc(a, b, actions[0]), c, actions[1]), d, actions[2]);
}

function _calc(_a, _b, action) {
    let a = parseFloat(_a);
    let b = parseFloat(_b);
	if(action == 0) { // Add
		return a + b;
	} else if(action == 1) { // Minus
		return a - b;
	} else if(action == 2) { // Multiply
		return a * b;
	} else { // Divide
		return a / b;
	}
	
}

function executeToString(i) {
	return i==0?"+":i==1?"-":i==2?"x":i==3?"÷":"u";
}
