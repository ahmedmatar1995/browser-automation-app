import type { Edge, NodeTypes } from '@xyflow/react';
import {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  Panel
} from '@xyflow/react';

import { AvatarStack } from "@liveblocks/react-ui"

import '@liveblocks/react-flow/styles.css';
import '@liveblocks/react-ui/styles.css';
import '@xyflow/react/dist/style.css';

import { useTheme } from '@/components/theme-provider';

import { Cursors, useLiveblocksFlow } from '@liveblocks/react-flow';
import type { StepNodeType } from '../nodes/node-registry';
import { StepNode } from '../nodes/step-node';

const nodeTypes: NodeTypes = {
  step: StepNode,
};

const initialNodes: StepNodeType[] = [
  {
    id: 'start',
    type: 'step',
    position: { x: 0, y: 0 },
    data: { type: 'start', kind: 'trigger', title: 'Start', values: {} },
  },
];

const initialEdges: Edge[] = [];

export function Canvas() {
  const { theme } = useTheme();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      suspense: true,
      nodes: { initial: initialNodes },
      edges: { initial: initialEdges },
    });

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDelete={onDelete}
      fitView
      colorMode={theme}
      connectionLineType={ConnectionLineType.SmoothStep}
      connectionLineStyle={{ stroke: 'var(--border)' }}
      defaultEdgeOptions={{
        type: 'smoothstep',
        style: {
          stroke: 'var(--border)',
        },
      }}
      style={
        {
          '--xy-background-color': 'var(--background)',
          '--xy-edge-stroke-width': 2,
          '--xy-connectionline-stroke-width': 2,
        } as React.CSSProperties
      }
      maxZoom={1}
    >
      <Background />
      <Controls />
      <MiniMap />
      <Cursors />
      <Panel position='top-right'>
         <AvatarStack />
      </Panel>
    </ReactFlow>
  );
}
