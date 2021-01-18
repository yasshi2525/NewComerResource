import "./app.css";
import * as PIXI from "pixi.js";
import { createText } from "./text";
import { createBordered } from "./border";

function creteDownloadDiv(app: PIXI.Application, name: string): HTMLDivElement {
	const div = document.createElement("div");
	const image = document.createElement("img");
	image.src = app.view.toDataURL();

	const a = document.createElement("a");
	a.append(image);
	a.href = app.view.toDataURL();
	a.download = `${name}.png`;
	div.appendChild(a);
	return div;
}

function createDownloadGlyph(glyph: Object, name: string): HTMLAnchorElement {
	const a = document.createElement("a");
	a.text = "glyph";
	a.download = `${name}_glyphs.json`;
	a.href =
      "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(glyph));
	return a;
}

function render(app: PIXI.Application, opts: {
	name: string;
	displayObject: PIXI.DisplayObject;
	width: number;
	height: number;
	glyph?: Object;
}): void {
	app.stage.addChild(opts.displayObject);
	app.renderer.resize(opts.width, opts.height);
	app.renderer.render(app.stage);
	document.body.appendChild(creteDownloadDiv(app, opts.name));
	if (opts.glyph) {
		document.body.appendChild(createDownloadGlyph(opts.glyph, opts.name));
	}
	app.stage.removeChildren();
}

const app = new PIXI.Application({
	// backgroundColor: 0xaaaaaa,
	transparent: true,
	preserveDrawingBuffer: true,
});

[
	"finger_touch",
	"cast",
	"customer",
	"customer_success",
	"customer_fail",
].forEach(key => app.loader.add(key, `img/${key}.png`));

app.loader.load((_, res) => {
	render(app, createBordered({
		name: "finger",
		border: 8,
		scale: 0.25,
		txt: res.finger_touch.texture
	}));
	render(app, createBordered({
		name: "cast",
		border: 4,
		scale: 0.25,
		txt: res.cast.texture
	}));
	render(app, createBordered({
		name: "customer",
		border: 4,
		scale: 0.25,
		txt: res.customer.texture
	}));
	render(app, createBordered({
		name: "customer_fail",
		border: 4,
		scale: 0.25,
		txt: res.customer_fail.texture
	}));
	render(app, createBordered({
		name: "customer_success",
		border: 4,
		scale: 0.25,
		txt: res.customer_success.texture
	}));
	render(app, createText({
		name: "title",
		text: "新規リスナーを囲え！",
		size: 60,
	}));
	render(app, createText({
		name: "title_inst1",
		text: "あなたは新参放送者",
		size: 30,
	}));
	render(app, createText({
		name: "title_inst2",
		text: "来場リスナーを「囲って」常連を増やそう",
		size: 30,
	}));
	render(app, createText({
		name: "title_inst3",
		text: "タップ / クリック でスタート",
		size: 30,
	}));
});
