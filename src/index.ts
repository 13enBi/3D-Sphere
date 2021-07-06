import _Sphere from './Sphere';
import SphereItem from './Item';

const Sphere = ((_Sphere.Item = SphereItem), _Sphere) as typeof _Sphere & { Item: typeof SphereItem };

export default Sphere;
export { Sphere, SphereItem };
