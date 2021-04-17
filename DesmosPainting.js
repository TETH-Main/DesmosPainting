/*
 *YouTube : https://www.youtube.com/watch?v=3Yda5CoTSJA
 *
 *JohnDoesStuffさんが書いたDesmoslockです
 *https://github.com/johndoesstuff/desmoslock/blob/master/dlock.js
 *
 */
//Desmosでお絵描きツールを作成するためだけに作りました。
//change by @TETH_Main

if (window.location.href.includes("desmos.com/calculator")) {
	if (typeof Calc != "undefined") { //thanks u/SlimRunner
		var DLock = {};
		DLock.getLock = function() { //gets the array of all lockable variables
			var expressions = Calc.getState().expressions.list;
			for (var i = 0; i < expressions.length; i++) {
				if (expressions[i].latex) if (expressions[i].latex.startsWith("l_{ock}")) return expressions[i].id;
			}
		}

		DLock.getItem = function() {
			var expressions = Calc.getState().expressions.list;
			for (var i = 0; i < expressions.length; i++) {
				if (expressions[i].latex) if (expressions[i].latex.startsWith("i_{tem}")) return expressions[i].id;
			}
		}

		DLock.rgb = function(H, S, V) {
			//https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

			var C = V * S;
			var Hp = H / 60;
			var X = C * (1 - Math.abs(Hp % 2 - 1));

			var R, G, B;
			if (0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
			if (1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
			if (2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
			if (3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
			if (4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
			if (5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

			var m = V - C;
			[R, G, B] = [R+m, G+m, B+m];

			R = Math.floor(R * 255);
			G = Math.floor(G * 255);
			B = Math.floor(B * 255);

			return [R ,G, B];
		}

		DLock.hex = function (c) {
			if (c < 16) {
				return "0" + c.toString(16);
			} else {
				return c.toString(16);
			}
		}

		DLock.lastSelectedExpression = false;
		DLock.set = function() {
			if (Calc.isAnyExpressionSelected) DLock.lastSelectedExpression = Calc.selectedExpressionId;
			var selected = DLock.lastSelectedExpression;
			if (selected === false) {
				window.alert("Please select an expression");
				return
			}
			var id = DLock.getLock();
			var idItem = DLock.getItem();

			var lock = Calc.expressionAnalysis[id];
			var item = Calc.expressionAnalysis[idItem];

			var values = lock.evaluation.value;
			var valuesItem = item.evaluation.value;

			var vars = DLock.getExpression(id).latex.split("[")[1].split("\\right]")[0].split(",");
			var expr = DLock.getExpression(selected);
			var currentLatex = expr.latex;
			for (var i = 0; i < vars.length; i++) {
				currentLatex = currentLatex.split(vars[i]).join("\\left(" + values[i] + "\\right)");
			}

			expr.latex = currentLatex;
			expr.lineWidth = valuesItem[0];
			expr.lineOpacity = valuesItem[1];
			expr.fillOpacity = valuesItem[2];
	
			var Rgb = DLock.rgb(valuesItem[3], valuesItem[4], valuesItem[5]);

			var hexRed = DLock.hex(Rgb[0]);
			var hexBlue = DLock.hex(Rgb[1]);
			var hexGreen = DLock.hex(Rgb[2]);

			expr.color = "#" + hexRed + hexBlue + hexGreen;

			expr.id = "dlock" + (new Date()).getTime();
			Calc.setExpression(expr);
		}
		DLock.getExpression = function(id) {
			var expressions = Calc.getState().expressions.list;
			for (var i = 0; i < expressions.length; i++) {
				if (expressions[i].id === id) return expressions[i]; 
			}
		}
		DLock.handler = function(e) {
			if (e.altKey && ((e.code == "KeyL") || (e.key == "l"))) {
				DLock.set();
			}
		}
		document.addEventListener('keyup', DLock.handler);
	} else {
		window.alert("uh oh, something went wrong")
	}
} else {
	window.alert("this only works on desmos.com/calculator :v")
}