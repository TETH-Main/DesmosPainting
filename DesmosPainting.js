/*
 *made by @TETH_Main
 *
 *JohnDoesStuffさんが書いたDesmoslockを参考にDesmosPaintingを作ってみました。
 *YouTube : https://www.youtube.com/watch?v=3Yda5CoTSJA
 *
 * Latest v1.2 https://www.desmos.com/calculator/a83pgvuelb
 *
 * v1.0 https://www.desmos.com/calculator/okpewnykir
 * v1.1 https://www.desmos.com/calculator/86of36rsz9
 * v1.2 https://www.desmos.com/calculator/a83pgvuelb
 * v1.3 https://www.desmos.com/calculator/elgmkopbkv
 */

if (window.location.href.includes("desmos.com/calculator")) {
	if (typeof Calc != "undefined") {
		var DesmosPaint = {};

		DesmosPaint.rgb = function(H, S, V) {
			// https://qiita.com/akebi_mh/items/3377666c26071a4284ee
			// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

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

		DesmosPaint.hex = function (c) {
			if (c < 16) {
				return "0" + c.toString(16);
			} else {
				return c.toString(16);
			}
		}

		DesmosPaint.set = function() {

			var id = DesmosPaint.getId("l_{ock}");
			var idItem = DesmosPaint.getId("i_{tem}");
			var idPen = DesmosPaint.getId("p_{en}");

			var lock = Calc.expressionAnalysis[id];
			var item = Calc.expressionAnalysis[idItem];
			var pen = Calc.expressionAnalysis[idPen];

			var values = lock.evaluation.value;
			var valuesItem = item.evaluation.value;
			var valuePen = pen.evaluation.value;

			var vars = DesmosPaint.getExpression(id).latex.split("[")[1].split("\\right]")[0].split(",");
			var expr = DesmosPaint.getExpression(DesmosPaint.getId("\\left(t+2^{1023},0\\right)"));

			switch (valuePen) {
				case 0:
					expr.latex = '\\left(x_{0}t^{2}+2x_{1}t\\left(1-t\\right)+x_{2}\\left(1-t\\right)^{2},y_{0}t^{2}+2y_{1}t\\left(1-t\\right)+y_{2}\\left(1-t\\right)^{2}\\right)';
					break;
				case 1:
					expr.latex = '\\left(x_{0}t+x_{2}\\left(1-t\\right),y_{0}t+y_{2}\\left(1-t\\right)\\right)';
					break;
				case 2:
					expr.latex = '\\left(\\frac{x_{0}-x_{2}}{2}\\cos\\left(\\theta_{0}\\right)\\cos\\left(\\tau t\\right)-\\frac{y_{0}-y_{2}}{2}\\sin\\left(\\theta_{0}\\right)\\sin\\left(\\tau t\\right)+\\frac{x_{0}+x_{2}}{2},\\frac{x_{0}-x_{2}}{2}\\sin\\left(\\theta_{0}\\right)\\cos\\left(\\tau t\\right)+\\frac{y_{0}-y_{2}}{2}\\cos\\left(\\theta_{0}\\right)\\sin\\left(\\tau t\\right)+\\frac{y_{0}+y_{2}}{2}\\right)';
					break;
				case 3:
					expr.latex = '\\left(2\\left(x_{2}-x_{0}\\right)\\left(\\left|t\\right|-\\left|t-.25\\right|-\\left|t-.5\\right|+\\left|t-.75\\right|\\right)+x_{0},2\\left(y_{2}-y_{0}\\right)\\left(\\left|t-.25\\right|-\\left|t-.5\\right|-\\left|t-.75\\right|+\\left|t-1\\right|\\right)+y_{0}\\right)';
					break;
				case 4:
					expr.latex = '\\left(2\\left(x_{2}-x_{0}\\right)\\cos\\left(\\theta_{0}\\right)\\left(\\left|t\\right|-\\left|t-.25\\right|-\\left|t-.5\\right|+\\left|t-.75\\right|\\right)-2\\left(y_{2}-y_{0}\\right)\\sin\\left(\\theta_{0}\\right)\\left(\\left|t-.25\\right|-\\left|t-.5\\right|-\\left|t-.75\\right|+\\left|t-1\\right|\\right)+x_{0},2\\left(x_{2}-x_{0}\\right)\\sin\\left(\\theta_{0}\\right)\\left(\\left|t\\right|-\\left|t-.25\\right|-\\left|t-.5\\right|+\\left|t-.75\\right|\\right)+2\\left(y_{2}-y_{0}\\right)\\cos\\left(\\theta_{0}\\right)\\left(\\left|t-.25\\right|-\\left|t-.5\\right|-\\left|t-.75\\right|+\\left|t-1\\right|\\right)+y_{0}\\right)';
					break;
				case 5:
					expr.latex = '\\operatorname{polygon}\\left(\\left[x_{0},x_{1},x_{2}\\right],\\left[y_{0},y_{1},y_{2}\\right]\\right)';
					break;
				case 6:
					expr.latex = '\\left(x_{0}t+\\left(1-t\\right)x_{3},y_{0}\\right)';
					break;
				case 7:
					expr.latex = '\\left(x_{0},y_{0}t+\\left(1-t\\right)y_{3}\\right)';
					break;
				case 8:
					expr.latex = '\\left(\\left(x_{2}-x_{0}\\right)\\left(.55\\sin\\left(\\tau t\\right)\\right),\\left(y_{2}-y_{0}\\right)\\left(.5\\cos\\left(\\tau t\\right)+.3\\sqrt{\\left|\\sin\\left(\\tau t\\right)\\right|}\\right)\\right)+\\frac{\\left(x_{0}+x_{2},y_{0}+y_{2}\\right)}{2}';
					break;
				case 9:
					expr.latex = '\\left(\\left(x_{2}-x_{0}\\right)\\left(.55\\cos\\left(\\theta_{0}\\right)\\sin\\left(\\tau t\\right)-\\sin\\left(\\theta_{0}\\right)\\left(.5\\cos\\left(\\tau t\\right)+.3\\sqrt{\\left|\\sin\\left(\\tau t\\right)\\right|}\\right)\\right),\\left(y_{2}-y_{0}\\right)\\left(.55\\sin\\left(\\theta_{0}\\right)\\sin\\left(\\tau t\\right)+\\cos\\left(\\theta_{0}\\right)\\left(.5\\cos\\left(\\tau t\\right)+.3\\sqrt{\\left|\\sin\\left(\\tau t\\right)\\right|}\\right)\\right)\\right)+\\frac{\\left(x_{0}+x_{2},y_{0}+y_{2}\\right)}{2}';
					break;
				case 10:
					expr.latex = '\\left(t^{3}x_{0}+3t^{2}\\left(1-t\\right)x_{1}+3t\\left(1-t\\right)^{2}x_{2}+\\left(1-t\\right)^{3}x_{3},t^{3}y_{0}+3t^{2}\\left(1-t\\right)y_{1}+3t\\left(1-t\\right)^{2}y_{2}+\\left(1-t\\right)^{3}y_{3}\\right)';
					break;
				default:
					expr.latex = '0';
			}
			var currentLatex = expr.latex;
			for (var i = 0; i < vars.length; i++) {
				currentLatex = currentLatex.split(vars[i]).join("\\left(" + values[i] + "\\right)");
			}

			expr.latex = currentLatex;
			expr.lineWidth = valuesItem[0];
			expr.lineOpacity = valuesItem[1];
			expr.fillOpacity = valuesItem[2];

			var Rgb = DesmosPaint.rgb(valuesItem[3], valuesItem[4], valuesItem[5]);

			var hexRed = DesmosPaint.hex(Rgb[0]);
			var hexBlue = DesmosPaint.hex(Rgb[1]);
			var hexGreen = DesmosPaint.hex(Rgb[2]);

			expr.color = "#" + hexRed + hexBlue + hexGreen;

			expr.id = "desmospaint" + (new Date()).getTime();
			Calc.setExpression(expr);
		}
		DesmosPaint.getExpression = function(id) {
			var expressions = Calc.getState().expressions.list;
			for (var i = 0; i < expressions.length; i++) {
				if (expressions[i].id === id) return expressions[i]; 
			}
		}
		DesmosPaint.getId = function(e) {
			var expressions = Calc.getState().expressions.list;
			for (var i = 0; i < expressions.length; i++) {
				if (expressions[i].latex) if (expressions[i].latex.startsWith(e)) return expressions[i].id;
			}
		}
		DesmosPaint.handler = function(e) {
			if (e.altKey && ((e.code == "KeyL") || (e.key == "l"))) {
				DesmosPaint.set();
			}
		}
		document.addEventListener('keyup', DesmosPaint.handler);
	} else {
		window.alert("uh oh, something went wrong")
	}
} else {
	window.alert("this only works on desmos.com/calculator :v")
}
