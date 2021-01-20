import * as PIXI from "pixi.js";
import { createBordered } from "./border";
import { createBlightText, createText } from "./text";

const outBorder = 5;

export function createPanel(opts: {
	name: string;
	icon: PIXI.Texture;
	iconScale: number;
	iconBorder: number;
	bgColor: number;
	label: string;
	labelSize: number;
	details: string;
	detailsSize: number;
	labelColor: number;
	width: number;
	height: number;
}): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number } {
	const parent = new PIXI.Container();

	const bg = new PIXI.Graphics();
	bg.lineStyle(outBorder, 0xffffff);
	bg.beginFill(opts.bgColor);
	bg.drawRoundedRect(
		0,
		0,
		opts.width,
		opts.height,
		20
	);
	bg.endFill();
	parent.addChild(bg);

	const icon = createBordered({
		name: opts.name,
		txt: opts.icon,
		scale: opts.iconScale,
		border: opts.iconBorder
	}).displayObject as PIXI.Sprite;
	icon.localTransform
		.translate(outBorder * 2, -icon.height * opts.iconScale / 2)
		.translate(0, bg.height / 2);
	parent.addChild(icon);

	const label = createText({
		name: opts.name,
		text: opts.label,
		size: opts.labelSize,
		color: opts.labelColor
	}).displayObject as PIXI.Sprite;

	label.localTransform
		.translate(outBorder * 4, bg.height / 4 - label.height / 1.5 / 2)
		.translate(icon.width * opts.iconScale, 0)
		.translate(0, 0);
	parent.addChild(label);

	const details = createBlightText({
		name: opts.name,
		text: opts.details,
		size: opts.detailsSize,
		color: opts.labelColor
	}).displayObject as PIXI.Sprite;

	details.localTransform
		.translate(outBorder * 4, bg.height * 3 / 4 - details.height / 3 / 2 - outBorder * 2)
	  .translate(icon.width * opts.iconScale, 0);

	parent.addChild(details);

	return {
		name: opts.name,
		displayObject: parent,
		width: opts.width,
		height: opts.height
	};
}
