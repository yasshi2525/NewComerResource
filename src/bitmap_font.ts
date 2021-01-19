import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

const resolusion = 4;

export function createBitmapFont(
	opts: { name: string; chars: string; color: number; size: number }
): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number; glyph: Object }{
	const container = new PIXI.Container();
	const border = opts.size / 6;
	const padding = 1;
	const style = new PIXI.TextStyle({
		fontFamily: "mplus",
		fontSize: opts.size * resolusion,
	});
	const glyph: { map: {[index: number]: Object}; height: number } = { map: {}, height: 0 };
	opts.chars.split("").forEach((c, idx) => {
		const text = new PIXI.Text(c, style);
		text.style.fill = opts.color;
		const f0 = new OutlineFilter(1, opts.color, 1);
		f0.padding = 1;
		const f1 = new OutlineFilter(border, 0xffffff, 1);
		f1.padding = border;
		text.filters = [f0, f1];
		text.localTransform
			.scale(1 / resolusion, 1 / resolusion)
			.translate((opts.size - text.width / resolusion) / 2, 0)
			.translate(border / 2, 0)
			.translate(padding, padding * 2)
			.translate((opts.size + (border + padding) * 2) * idx, 0);
		container.addChild(text);
		glyph.map[c.charCodeAt(0)] = {
			x: Math.floor((opts.size + (border + padding) * 2) * idx),
			y: 0,
			width: Math.floor(opts.size + border * 2),
			height: Math.floor(container.height + border * 2),
		};
	});
	glyph.height = Math.floor(container.height + border * 2);
	return {
		name: opts.name,
		displayObject: container,
		width: opts.chars.length * (opts.size + (border + padding) * 2),
		height: container.height + border * 2,
		glyph,
	};
};

export default createBitmapFont;
