import { ref, Ref, unref, VNodeChild } from 'vue';
import { MaybeRef } from './helper';
import Sphere from './Sphere';
import Item from './Item';

export const use3dSphere = (data: MaybeRef<VNodeChild[]>, radius: MaybeRef<number> = 100) => {
	const isPaused = ref(false);

	const render = () => {
		const list = unref(data);

		return (
			<Sphere sum={list.length} isPaused={isPaused.value} radius={unref(radius)}>
				{list.map((item, index) => (
					<Item index={index}>{item}</Item>
				))}
			</Sphere>
		);
	};

	const pause = () => void (isPaused.value = true);

	const play = () => void (isPaused.value = false);

	return {
		render,
		pause,
		play,
	};
};
