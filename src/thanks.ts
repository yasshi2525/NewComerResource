import * as PIXI from "pixi.js";
import { createBordered } from "./border";
import { createText } from "./text";

export function createThanks(opts: {
	name: string;
	customer: PIXI.Texture;
	cast: PIXI.Texture;
}): { name: string; displayObject: PIXI.DisplayObject; width: number; height: number } {
	const parent = new PIXI.Container();
	for (let i = 0; i < 360; i += 20) {
		const customer = createBordered({
			name: opts.name,
			border: 2,
			scale: 0.25,
			txt: opts.customer
		}).displayObject;
		customer.localTransform
			.translate(
				-opts.customer.width * 0.25 / 2,
				-opts.customer.height * 0.25 / 2)
			.translate(
				300 + 250 * Math.cos(i / 180 * Math.PI),
				300 + 250 * Math.sin(i / 180 * Math.PI)
			);
		parent.addChild(customer);
	}
	const cast = createBordered({
		name: opts.name,
		border: 2,
		scale: 0.5,
		txt: opts.cast
	}).displayObject;
	cast.localTransform.translate(
		-opts.cast.width * 0.5 / 2,
		-opts.cast.height * 0.5 / 2)
		.translate(300, 300);
	parent.addChild(cast);

	const title = createText({
		name: opts.name,
		size: 50,
		text: "Thanks!"
	}).displayObject;
	title.localTransform
		.translate(200, 125);
	parent.addChild(title);

	const details = createText({
		name: opts.name,
		size: 30,
		text: "囲ってくれてありがとう！"
	}).displayObject;
	details.localTransform
		.translate(125, 400);
	parent.addChild(details);
	return {
		name: opts.name,
		displayObject: parent,
		width: 600,
		height: 600
	};
}
