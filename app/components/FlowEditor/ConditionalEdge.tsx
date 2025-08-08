import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  EdgeProps
} from '@xyflow/react';

interface ConditionalEdgeProps extends EdgeProps {
  data?: { sourceHandle?: string };
}

export const ConditionalEdge: React.FC<ConditionalEdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const sourceHandle = data?.sourceHandle;
  const isSuccess = sourceHandle === 'success';
  const isError = sourceHandle === 'error';

  const edgeColor = isSuccess 
    ? '#10b981' // green-500
    : isError 
    ? '#ef4444' // red-500
    : '#6b7280'; // gray-500

  const labelText = isSuccess ? 'Success' : isError ? 'Error' : '';
  const labelBgColor = isSuccess 
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
    : isError 
    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ 
          ...style, 
          stroke: edgeColor,
          strokeWidth: 2,
          strokeDasharray: isError ? '5,5' : undefined
        }} 
      />
      {labelText && (
        <EdgeLabelRenderer>
          <div
            className="absolute pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            <div className={`
              px-2 py-1 rounded-full text-xs font-medium border border-background shadow-sm
              ${labelBgColor}
            `}>
              {labelText}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};