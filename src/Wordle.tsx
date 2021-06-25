import { VNode, Fragment, defineComponent, PropType, computed, provide, InjectionKey, reactive } from 'vue';
import { NAME } from './constants';

interface Config {
	radius: number;
}

interface Ctx {
	sum: number;
	radius: number;
}

export const CONTEXT = Symbol() as InjectionKey<Ctx>;

const getItemLength = (vnode: VNode[]): number => {
	let l = 0;

	for (const { type, children } of vnode) {
		if (type === Fragment) l += getItemLength(children as VNode[]);
		if ((type as any).name === NAME) l++;
	}

	return l;
};

export default defineComponent({
	props: {
		config: { type: Object as PropType<Config>, default: () => ({ radius: 100 }) },
	},

	setup(props, { slots }) {
		const ctx = reactive({ sum: 0, radius: computed(() => props.config.radius) });
		provide(CONTEXT, ctx);

		return () => {
			const children = slots.default?.();

			if (!children) return null;

			ctx.sum = getItemLength(children);

			return children;
		};
	},
});
