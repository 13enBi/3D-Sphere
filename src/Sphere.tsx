import { defineComponent, provide, ref, Ref, reactive, computed, toRefs } from 'vue';
import { CONTEXT, cos, getRect, max, min, RAD, sin, useEvent } from './helper';

interface Props {
	sum: number;
	radius: number;
	isPaused: boolean;
}

const useCalculateRotate = (props: Props, container: Ref<HTMLElement | undefined>) => {
	const rotate = ref<number[]>(new Array(4).fill(0));

	let mouseX = 0,
		mouseY = 0;

	const calRad = (n: number) => {
		const r = props.radius;
		const d = 2 * r;

		return min(max(-n, -d), d) / r;
	};

	const calculate = () => {
		const r1 = calRad(mouseX);
		const r2 = -calRad(mouseY);

		rotate.value = [sin(r2 * RAD), cos(r2 * RAD), sin(r1 * RAD), cos(r1 * RAD)];

		next();
	};

	const next = () => requestAnimationFrame(calculate);

	useEvent(window, 'mousemove', ({ clientX, clientY }: MouseEvent) => {
		if (props.isPaused) return;

		const { left, top, width, height } = getRect(container.value!);

		mouseX = clientX - (left + width / 2);
		mouseY = clientY - (top + height / 2);
	});

	next();

	return rotate;
};

export default defineComponent({
	props: {
		sum: {
			type: Number,
			required: true,
		},
		radius: {
			type: Number,
			default: 100,
		},
		isPaused: {
			type: Boolean,
			default: false,
		},
	},

	setup(props, { slots }) {
		const container = ref<HTMLElement>();
		const rotate = useCalculateRotate(props, container);

		provide(CONTEXT, reactive({ rotate, ...toRefs(props) }));

		const style = computed(() => {
			const size = props.radius * 2 + 'px';

			return {
				width: size,
				height: size,
				position: 'relative' as const,
			};
		});

		return () => (
			<div class="sphere-container" style={style.value} ref={container}>
				{slots.default?.()}
			</div>
		);
	},
});
