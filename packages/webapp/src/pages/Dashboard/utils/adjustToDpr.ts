/* eslint-disable no-param-reassign */
export default function adjustToDpr(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
	const dpr = window.devicePixelRatio;
	canvas.width = canvas.clientWidth * dpr;
	canvas.height = canvas.clientHeight * dpr;
	ctx.scale(dpr, dpr);
}
