import _Wordle from './Wordle';
import _WordleItem from './Item';

const Wordle = ((_Wordle.Item = _WordleItem), _Wordle) as typeof _Wordle & { Item: typeof _WordleItem };

export default Wordle;
export { Wordle };
