import * as PIXI from "pixi.js";
import { createBordered } from "./border";
import { createBlightText, createText } from "./text";

export function createGuide(opts: {
	name: string;
	background: PIXI.Texture;
	txt: string;
}): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number } {
	const parent = new PIXI.Container();

	const bg = createBordered({
		name: opts.name,
		border: 4,
		scale: 1,
		txt: opts.background
	}).displayObject as PIXI.Sprite;
	bg.anchor.set(1, 0);
	bg.localTransform
		.scale(-0.75, 0.45)
		.translate(7, 0)
		.translate(0, -9);

	parent.addChild(bg);

	const txt = createBlightText({
		name: opts.name,
		size: 18,
		text: opts.txt,
	}).displayObject;

	txt.localTransform
		.translate(10, 17);

	parent.addChild(txt);

	return {
		name: opts.name,
		displayObject: parent,
		width: 200,
		height: 100
	};
}
