import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

export function createText(opts: {
	name: string;
	text: string;
	size: number;
	color?: number;
	borderColor?: number;
}): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number } {
	const resolution = 1.5;
	const border = opts.size / 8;

	const style = new PIXI.TextStyle({
		fontFamily:"mplusP",
		fontSize: opts.size * resolution,
	});
	const txt = new PIXI.Text(opts.text, style);
	txt.style.fill = opts.color ?? 0x000000;
	txt.localTransform
		.scale(1 / resolution, 1 / resolution)
		.translate(border, border);
	const f = new OutlineFilter(border, opts.borderColor ?? 0xffffff, 1);
	f.padding = border;
	txt.filters = [f];

	return {
		name: opts.name,
		displayObject: txt,
		width: txt.width / resolution + border * 2,
		height: txt.height / resolution + border * 2,
	};
}

export function createBlightText(opts: {
	name: string;
	text: string;
	size: number;
	color?: number;
}): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number } {
	const resolution = 3;
	const border = 2;

	const style = new PIXI.TextStyle({
		fontFamily: "mplusP-bold",
		fontSize: opts.size * resolution,
	});
	const txt = new PIXI.Text(opts.text, style);
	txt.style.fill = opts.color ?? 0x000000;
	txt.localTransform
		.scale(1 / resolution, 1 / resolution)
		.translate(border, border);
	const f = new OutlineFilter(border, 0xffffff, 1);
	f.padding = border;
	txt.filters = [f];

	return {
		name: opts.name,
		displayObject: txt,
		width: txt.width / resolution + border * 2,
		height: txt.height / resolution + border * 2,
	};
}
