import { createApp } from 'vue';
import Wordle from './src';

createApp({
	render() {
		return (
			<div style="padding:200px">
				<Wordle sum={30} radius={200}>
					{new Array(30).fill(1).map((_, i) => (
						<Wordle.Item index={i}>
							<img src={`./${i + 1}.jpg`} style="width:40px;height:40px;border-radius:50%" />
						</Wordle.Item>
					))}
				</Wordle>
			</div>
		);
	},
}).mount('#app');
