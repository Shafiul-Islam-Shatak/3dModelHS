import { useGLTF} from '@react-three/drei'

function Model(props) {
  const urlOf3d = props?.url
  console.log(urlOf3d);
  
  if(urlOf3d){
    const { scene } = useGLTF(urlOf3d);
    return <primitive object={scene} {...props} />;
  }
  
}


export default Model;