'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import { BuildingModel } from './BuildingModel'

export function BuildingViewer() {
  return (
    <Canvas
      camera={{ position: [12, 8, 12], fov: 50 }}
      shadows
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      frameloop="demand"
      style={{ background: 'linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 50%, #ecfdf5 100%)' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[20, 30, 10]} intensity={1} castShadow shadow-mapSize={1024} />
        <BuildingModel />
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.3}
          scale={30}
          blur={2}
          far={10}
        />
        <Environment preset="city" />
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          target={[0, 2, 0]}
          minDistance={5}
          maxDistance={40}
          maxPolarAngle={Math.PI / 2.1}
        />
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#4ade80" opacity={0.3} transparent />
        </mesh>
      </Suspense>
    </Canvas>
  )
}
