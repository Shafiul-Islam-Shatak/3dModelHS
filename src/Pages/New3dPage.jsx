import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, PresentationControls, Loader } from '@react-three/drei'
import Model from '../Componants/Model'
import { useParams } from 'react-router-dom';
import axios from 'axios';



export default function New3dPage() {
const [modelURL , setModelURL] = useState('')

    const { modelId } = useParams();
    useEffect(() => {
        const fetchModel = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/models/${modelId}`);
            setModelURL(res?.data.url)            
          } catch (error) {
            console.error("Error fetching model:", error);
          }
        };
      
        fetchModel();
      }, []);
    
console.log(modelURL)
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
                <color attach="background" args={['#101010']} />
                <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                    <Stage environment="city">
                        <Model scale={0.01} url={modelURL} />
                    </Stage>
                </PresentationControls>
            </Canvas>
            
            <Loader/>
        </div>
    )
}
