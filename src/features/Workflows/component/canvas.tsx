import { useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  type Edge,
  type Connection,
  type Node,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { useTheme } from '@/components/theme-provider'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Process' },
    position: { x: 0, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'End' },
    position: { x: 0, y: 200 },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
]

export function Canvas() {
  const { theme } = useTheme()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      colorMode={theme}
      connectionLineType={ConnectionLineType.SmoothStep}
      connectionLineStyle={{ stroke:"var(--border)"}}
      defaultEdgeOptions={{
        type: "smoothstep",
        style: {
          stroke:"var(--border)"
        }
      }}
       style={
           {
             "--xy-background-color": "var(--background)",
             "--xy-edge-stroke-width": 2,
             "--xy-connectionline-stroke-width": 2,
           } as React.CSSProperties
         }
         maxZoom={1}
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}
