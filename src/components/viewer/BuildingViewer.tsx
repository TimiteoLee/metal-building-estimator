'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import { BuildingModel } from './BuildingModel'

export function BuildingViewer() {
  return (
    <Canvas
      camera={{ position: [30, 20, 30], fov: 45 }}
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
          scale={80}
          blur={2}
          far={20}
        />
        <Environment preset="city" />
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={10}
          maxDistance={100}
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
