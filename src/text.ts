import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

export function createText(opts: {
	name: string;
	text: string;
	size: number;
	color?: number;
}): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number } {
	const resolustion = opts.size > 30 ? 1 : 2;
	const border = opts.size / 8;
	const style = new PIXI.TextStyle({
		fontFamily: "mplusP",
		fontSize: opts.size * resolustion,
	});
	const txt = new PIXI.Text(opts.text, style);
	txt.style.fill = opts.color ?? 0x000000;
	txt.localTransform
		.scale(1 / resolustion, 1 / resolustion)
		.translate(border, border);
	const f = new OutlineFilter(border, 0xffffff, 1);
	f.padding = border;
	txt.filters = [f];

	return {
		name: opts.name,
		displayObject: txt,
		width: txt.width / resolustion + border * 2,
		height: txt.height / resolustion + border * 2,
	};
}
