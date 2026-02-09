'use client'

import { useMemo } from 'react'
import { useConfiguratorStore } from '@/store/configurator-store'
import { ROOF_COLORS, SIDING_COLORS, TRIM_COLORS } from '@/lib/constants'
import { DoubleSide } from 'three'

function findColorHex(id: string, palette: { id: string; hex: string }[]): string {
  return palette.find((c) => c.id === id)?.hex || '#888888'
}

const PITCH_MAP: Record<string, number> = {
  '3/12': Math.atan(3 / 12),
  '4/12': Math.atan(4 / 12),
  '5/12': Math.atan(5 / 12),
  '6/12': Math.atan(6 / 12),
}

function WallPanel({
  position,
  size,
  color,
  wallType,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  wallType: string
}) {
  if (wallType === 'open') return null

  const opacity = wallType === 'side_gap_panel' ? 0.8 : 1
  const height = wallType === 'gable_end' ? size[1] * 0.6 : size[1]

  return (
    <mesh position={[position[0], position[1] + (height - size[1]) / 2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[size[0], height, size[2]]} />
      <meshStandardMaterial color={color} opacity={opacity} transparent={opacity < 1} />
    </mesh>
  )
}

function RoofPanel({
  position,
  rotation,
  size,
  color,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  color: string
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} side={DoubleSide} />
    </mesh>
  )
}

function LeanToModel({
  side,
  mainWidth,
  mainLegHeight,
  leanTo,
  sidingColor: sidingColorHex,
  roofColor: roofColorHex,
}: {
  side: 'left' | 'right'
  mainWidth: number
  mainLegHeight: number
  leanTo: { enabled: true; width: number; length: number; legHeight: number; walls: Record<string, { type: string }> }
  sidingColor: string
  roofColor: string
}) {
  const xOffset = side === 'left'
    ? -(mainWidth / 2 + leanTo.width / 2)
    : (mainWidth / 2 + leanTo.width / 2)

  const roofStartY = mainLegHeight
  const roofEndY = leanTo.legHeight
  const roofAngle = Math.atan2(roofStartY - roofEndY, leanTo.width)
  const roofLength = Math.sqrt(leanTo.width ** 2 + (roofStartY - roofEndY) ** 2)

  return (
    <group position={[xOffset, 0, 0]}>
      {/* Outer wall */}
      <WallPanel
        position={[side === 'left' ? -leanTo.width / 2 + 0.05 : leanTo.width / 2 - 0.05, roofEndY / 2, 0]}
        size={[0.1, roofEndY, leanTo.length]}
        color={sidingColorHex}
        wallType={leanTo.walls.outer?.type || 'open'}
      />
      {/* Front wall */}
      <WallPanel
        position={[0, roofEndY / 2, leanTo.length / 2 - 0.05]}
        size={[leanTo.width, roofEndY, 0.1]}
        color={sidingColorHex}
        wallType={leanTo.walls.front?.type || 'open'}
      />
      {/* Back wall */}
      <WallPanel
        position={[0, roofEndY / 2, -leanTo.length / 2 + 0.05]}
        size={[leanTo.width, roofEndY, 0.1]}
        color={sidingColorHex}
        wallType={leanTo.walls.back?.type || 'open'}
      />
      {/* Lean-to roof */}
      <RoofPanel
        position={[0, (roofStartY + roofEndY) / 2, 0]}
        rotation={[0, 0, side === 'left' ? roofAngle : -roofAngle]}
        size={[roofLength, leanTo.length]}
        color={roofColorHex}
      />
    </group>
  )
}

export function BuildingModel() {
  const dimensions = useConfiguratorStore((s) => s.config.dimensions)
  const roof = useConfiguratorStore((s) => s.config.roof)
  const colors = useConfiguratorStore((s) => s.config.colors)
  const walls = useConfiguratorStore((s) => s.config.walls)
  const doors = useConfiguratorStore((s) => s.config.doors)
  const leftLeanTo = useConfiguratorStore((s) => s.config.leftLeanTo)
  const rightLeanTo = useConfiguratorStore((s) => s.config.rightLeanTo)

  const { width, length, legHeight } = dimensions
  const roofColorHex = findColorHex(colors.roof, ROOF_COLORS)
  const sidingColorHex = findColorHex(colors.siding, SIDING_COLORS)
  const trimColorHex = findColorHex(colors.trim, TRIM_COLORS)

  // Roof pitch angle
  const pitchAngle = PITCH_MAP[roof.pitch] || Math.atan(4 / 12)
  const ridgeHeight = (width / 2) * Math.tan(pitchAngle)
  const roofHypotenuse = (width / 2) / Math.cos(pitchAngle)

  // Center the building at origin
  const wallThickness = 0.15

  // Steel frame posts
  const posts = useMemo(() => {
    const result: JSX.Element[] = []
    const postSpacing = 5
    const postCountZ = Math.max(2, Math.floor(length / postSpacing) + 1)

    for (let i = 0; i < postCountZ; i++) {
      const z = -length / 2 + i * (length / (postCountZ - 1))
      // Left and right posts
      for (const x of [-width / 2, width / 2]) {
        result.push(
          <mesh key={`post-${x}-${z}`} position={[x, legHeight / 2, z]}>
            <boxGeometry args={[0.3, legHeight, 0.3]} />
            <meshStandardMaterial color="#666" metalness={0.5} roughness={0.5} />
          </mesh>,
        )
      }
    }
    return result
  }, [width, length, legHeight])

  return (
    <group>
      {/* Main building walls */}
      {/* Front wall */}
      <WallPanel
        position={[0, legHeight / 2, length / 2]}
        size={[width, legHeight, wallThickness]}
        color={sidingColorHex}
        wallType={walls.front.type}
      />
      {/* Back wall */}
      <WallPanel
        position={[0, legHeight / 2, -length / 2]}
        size={[width, legHeight, wallThickness]}
        color={sidingColorHex}
        wallType={walls.back.type}
      />
      {/* Left wall */}
      <WallPanel
        position={[-width / 2, legHeight / 2, 0]}
        size={[wallThickness, legHeight, length]}
        color={sidingColorHex}
        wallType={walls.left.type}
      />
      {/* Right wall */}
      <WallPanel
        position={[width / 2, legHeight / 2, 0]}
        size={[wallThickness, legHeight, length]}
        color={sidingColorHex}
        wallType={walls.right.type}
      />

      {/* Roof — two panels meeting at ridge */}
      <RoofPanel
        position={[-width / 4, legHeight + ridgeHeight / 2, 0]}
        rotation={[0, 0, pitchAngle]}
        size={[roofHypotenuse, length]}
        color={roofColorHex}
      />
      <RoofPanel
        position={[width / 4, legHeight + ridgeHeight / 2, 0]}
        rotation={[0, 0, -pitchAngle]}
        size={[roofHypotenuse, length]}
        color={roofColorHex}
      />

      {/* Ridge trim line */}
      <mesh position={[0, legHeight + ridgeHeight, 0]}>
        <boxGeometry args={[0.2, 0.2, length + 0.5]} />
        <meshStandardMaterial color={trimColorHex} />
      </mesh>

      {/* Trim lines along bottom edges */}
      {[
        [0, 0.05, length / 2, width + 0.2, 0.1, 0.1],
        [0, 0.05, -length / 2, width + 0.2, 0.1, 0.1],
        [-width / 2, legHeight / 2, 0, 0.1, legHeight, 0.1],
        [width / 2, legHeight / 2, 0, 0.1, legHeight, 0.1],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={trimColorHex} />
        </mesh>
      ))}

      {/* Door indicators */}
      {doors.map((door) => {
        const wallPositions: Record<string, { pos: [number, number, number]; rotY: number }> = {
          front: { pos: [0, 0, length / 2 + 0.08], rotY: 0 },
          back: { pos: [0, 0, -length / 2 - 0.08], rotY: 0 },
          left: { pos: [-width / 2 - 0.08, 0, 0], rotY: Math.PI / 2 },
          right: { pos: [width / 2 + 0.08, 0, 0], rotY: Math.PI / 2 },
        }
        const wp = wallPositions[door.wall]
        if (!wp) return null
        return (
          <mesh
            key={door.id}
            position={[wp.pos[0], door.height / 2, wp.pos[2]]}
            rotation={[0, wp.rotY, 0]}
          >
            <boxGeometry args={[door.width, door.height, 0.15]} />
            <meshStandardMaterial color={door.type === 'garage' ? '#555' : '#8B4513'} />
          </mesh>
        )
      })}

      {/* Lean-tos */}
      {leftLeanTo.enabled && (
        <LeanToModel
          side="left"
          mainWidth={width}

          mainLegHeight={legHeight}
          leanTo={leftLeanTo}
          sidingColor={sidingColorHex}
          roofColor={roofColorHex}
        />
      )}
      {rightLeanTo.enabled && (
        <LeanToModel
          side="right"
          mainWidth={width}

          mainLegHeight={legHeight}
          leanTo={rightLeanTo}
          sidingColor={sidingColorHex}
          roofColor={roofColorHex}
        />
      )}

      {/* Steel frame posts */}
      {posts}
    </group>
  )
}
