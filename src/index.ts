import _Wordle from './Wordle';
import WordleItem from './Item';

const Wordle = ((_Wordle.Item = WordleItem), _Wordle) as typeof _Wordle & { Item: typeof WordleItem };

export default Wordle;
export { Wordle, WordleItem };
