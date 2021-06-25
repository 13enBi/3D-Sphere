import { defineComponent, inject, ref, computed } from 'vue';
import { NAME } from './constants';
import { CONTEXT } from './Wordle';

const baseStyle = { position: 'absolute', top: '50%', left: '50%', transformOrigin: '50% 50%' } as const;

export default defineComponent({
	name: NAME,

	props: {
		index: {
			type: Number,
			required: true,
		},
	},

	setup(props, { slots }) {
		const ctx = inject(CONTEXT)!;
		const el = ref<HTMLElement | null>(null);

		const local = computed(() => {
			const { sum: l, radius: r } = ctx;

			const phi = Math.acos(-1 + (2 * props.index + 1) / l);
			const theta = Math.sqrt(Math.PI * l) * phi;

			const x = r * Math.cos(theta) * Math.sin(phi);
			const y = r * Math.sin(theta) * Math.sin(phi);
			const z = r * Math.cos(phi);

			return { x, y, z };
		});

		const style = computed(() => {
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
				opacity: `${Math.min(s * s - 0.25, 1)}`,
				zIndex: 10,
			};
		});

		return () => (
			<div ref={el} style={style.value}>
				{slots.default?.()}
			</div>
		);
	},
});
