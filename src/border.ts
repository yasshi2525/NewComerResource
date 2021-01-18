import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

export function createBordered(opts: {
	name: string;
	txt: PIXI.Texture;
	scale: number;
	border: number;
}): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number } {
	const s = new PIXI.Sprite(opts.txt);
	s.localTransform
		.scale(opts.scale, opts.scale)
		.translate(opts.border, opts.border);

	const f = new OutlineFilter(opts.border, 0xffffff, 1);
	f.padding = opts.border;

	s.filters = [f];

	return {
		name: opts.name,
		displayObject: s,
		width: opts.txt.width * opts.scale + opts.border * 2,
		height: opts.txt.height * opts.scale + opts.border * 2,
	};
}
