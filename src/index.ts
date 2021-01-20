import "./app.css";
import * as PIXI from "pixi.js";
import { createText, createBlightText } from "./text";
import { createBordered } from "./border";
import createBitmapFont from "./bitmap_font";
import { createPanel } from "./panel";

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
	antialias: true,
});

[
	"finger_touch",
	"cast",
	"collabo_cast_tier1",
	"collabo_cast_tier2",
	"collabo_cast_tier3",
	"customer",
	"customer_success",
	"customer_fail",
	"advertise_icon"
].forEach(key => app.loader.add(key, `img/${key}.png`));

app.loader.load((_, res) => {
	[
		{ suffix: "enabled", bgColor: 0x98fb98, txtColor: 0x000000 },
		{ suffix: "disabled", bgColor: 0x808080, txtColor: 0x808080 }
	].forEach(obj => {
		render(app, createPanel({
			name: `advertise_${obj.suffix}`,
			label: "広告",
			labelSize: 30,
			details: "来場者数が\n増加します",
			detailsSize: 15,
			bgColor: obj.bgColor,
			width: 200,
			height: 100,
			icon: res.advertise_icon.texture,
			iconBorder: 2,
			iconScale: 0.25,
			labelColor: obj.txtColor
		}));
	});

	[
		{ tier: 1, label: "友人とコラボ", details: "効果: 薄口", bgColor: 0x66cdaa },
		{ tier: 2, label: "中堅とコラボ", details: "効果: 普通", bgColor: 0x3cb371 },
		{ tier: 3, label: "大物とコラボ", details: "効果: 濃口", bgColor: 0x2e8b57 }
	].forEach((info) => {
		[
			{ suffix: "enabled", txtColor: 0x000000 },
			{ suffix: "disabled", bgColor: 0x808080, txtColor: 0x808080 }
		].forEach(typ => {
			render(app, createPanel({
				name: `collabo_tier${info.tier}_${typ.suffix}`,
				label: info.label,
				labelSize: 20,
				details: info.details,
				detailsSize: 17,
				bgColor: typ.bgColor ?? info.bgColor,
				width: 200,
				height: 100,
				icon: res[`collabo_cast_tier${info.tier}`].texture,
				iconBorder: 2,
				iconScale: 0.175,
				labelColor: typ.txtColor
			}));
		});
	});
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
	["1", "2", "3"].forEach((i) => {
		render(app, createBordered({
			name: `collabo_cast_tier${i}`,
			border: 4,
			scale: 0.25,
			txt: res[`collabo_cast_tier${i}`].texture
		}));
	});
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
	render(app, createText({
		name: "inst1",
		text: "あなたの周りにいるリスナーを「囲って」常連客にしよう",
		size: 20
	}));
	render(app, createText({
		name: "inst2",
		text: "（広範囲に囲うと成功率が落ちます）",
		size: 20
	}));
	render(app, createBitmapFont({
		name: "score",
		chars: "残り常連: 0123456789人秒",
		color: 0x000000,
		size: 30
	}));
	render(app, createText({
		name: "fence_success",
		text: "成功!",
		color: 0x228b22,
		size: 25
	}));
	render(app, createText({
		name: "fence_fail",
		text: "失敗!",
		color: 0xff7f50,
		size: 25
	}));
});
