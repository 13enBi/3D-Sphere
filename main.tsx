import { createApp, ref } from 'vue';
import { use3dSphere } from './src/use3dSphere';

createApp({
	setup() {
		const data = ref(new Array(60).fill(<img src="./1.gif" style="width:40px;height:40px;"></img>));

		const { render, pause, play } = use3dSphere(data, 200);

		const push = () => data.value.push(<img src="./1.gif" style="width:40px;height:40px;"></img>);

		return () => (
			<div style="padding:200px">
				<div style="margin-bottom:50px">
					<button onClick={pause}>pause</button>
					<button onClick={play}>play</button>
					<button onClick={push}>push</button>
				</div>

				{render()}
			</div>
		);
	},
}).mount('#app');
