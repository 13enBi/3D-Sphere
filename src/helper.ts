import { Ref, unref, onUnmounted, InjectionKey, onMounted } from 'vue';

export interface Ctx {
	sum: number;
	radius: number;
	rotate: number[];
}

export const CONTEXT = Symbol() as InjectionKey<Ctx>;

type El = Element | Ref<Element | undefined | null> | Window;

export const useEvent = (target: El, name: string, callback: (ev: any) => void) => {
	const el = unref(target);

	onMounted(() => {
		if (!el) return;

		el.addEventListener(name, callback);

		onUnmounted(() => el.removeEventListener(name, callback));
	});
};

export const getRect = (target: Element) => target.getBoundingClientRect();

export const { acos, sqrt, sin, cos, min, max, PI } = Math;
export const RAD = PI / 180;
