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
  type NodeTypes
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { useTheme } from '@/components/theme-provider'

import { StepNode } from '../nodes/step-node'
import type { StepNodeType } from '../nodes/node-registry'

import "@xyflow/react/dist/style.css"

const nodeTypes: NodeTypes = {
  step: StepNode,
}

const initialNodes: StepNodeType[] = [{
  id: "start",
  type: "step",
  position: { x: 0, y: 0 },
  data: { type: "start", kind: "trigger", title: "Start", values: {} },
},]

const initialEdges: Edge[] = []


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
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      colorMode={theme}
      connectionLineType={ConnectionLineType.SmoothStep}
      connectionLineStyle={{ stroke: "var(--border)" }}
      defaultEdgeOptions={{
        type: "smoothstep",
        style: {
          stroke: "var(--border)"
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
