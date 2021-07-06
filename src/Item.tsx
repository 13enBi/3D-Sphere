import { defineComponent, inject, ref, computed, watch, Ref, watchEffect } from 'vue';
import { acos, CONTEXT, cos, Ctx, min, PI, sin, sqrt } from './helper';

const baseStyle = { position: 'absolute', top: '50%', left: '50%', transformOrigin: '50% 50%' } as const;

const calInitLocal = (ctx: Ctx, index: number) => {
	const { sum: l, radius: r } = ctx;

	const phi = acos(-1 + (2 * index + 1) / l);
	const theta = sqrt(PI * l) * phi;

	const x = r * cos(theta) * sin(phi);
	const y = r * sin(theta) * sin(phi);
	const z = r * cos(phi);

	return { x, y, z };
};

const useLocal = (ctx: Ctx, index: number) => {
	const local = ref(calInitLocal(ctx, index));

	watch(
		() => ctx.rotate,

		([r0, r1, r2, r3]) => {
			if (ctx.isPaused) return;

			const { x: rx1, y: y1, z: z1 } = local.value;

			const ry = y1 * r1 + z1 * -r0;
			const rz = y1 * r0 + z1 * r1;

			const x = rx1 * r3 + rz * r2;
			const z = rz * r3 - rx1 * r2;

			Object.assign(local.value, { x, y: ry, z });
		}
	);

	watch(
		//总数变了重新计算坐标
		() => ctx.sum,
		() => (local.value = calInitLocal(ctx, index))
	);

	return local;
};

const useLocalStyle = (ctx: Ctx, el: Ref<HTMLElement | null>, index: number) => {
	const local = useLocal(ctx, index);

	return computed(() => {
		if (!el.value) return baseStyle;

		const { offsetHeight: h, offsetWidth: w } = el.value;
		const { x, y, z } = local.value;
		const r = ctx.radius * 4;

		const x1 = x - w / 2;
		const y1 = y - h / 2;
		const s = r / (r + z);

		return {
			...baseStyle,
			transform: `translate3d(${x1}px, ${y1}px, 0) scale(${s})`,
			opacity: `${min(s * s - 0.25, 1)}`,
			zIndex: index,
		};
	});
};

export default defineComponent({
	props: {
		index: {
			type: Number,
			required: true,
		},
	},

	setup(props, { slots }) {
		const ctx = inject(CONTEXT)!;
		const el = ref<HTMLElement | null>(null);
		const style = useLocalStyle(ctx, el, props.index);

		return () => (
			<div ref={el} style={style.value}>
				{slots.default?.()}
			</div>
		);
	},
});
