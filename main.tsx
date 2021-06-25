import { createApp } from 'vue';
import Wordle from './src';

createApp({
	render() {
		return (
			<Wordle>
				{new Array(40).fill(1).map((_, i) => (
					<Wordle.Item index={i}>{i}</Wordle.Item>
				))}
			</Wordle>
		);
	},
}).mount('#app');
