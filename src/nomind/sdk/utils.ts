export function findTargetNodesAndEdges(graph, startNode) {
  const visitedNodes = new Set();
  const visitedEdges = new Set();

  function dfs(node) {
    if (!visitedNodes.has(node)) {
      visitedNodes.add(node);
      const outgoingEdges = graph.edges.filter(edge => edge.source === node);
      outgoingEdges.forEach(edge => {
        visitedEdges.add(edge.id);
        dfs(edge.target);
      });
    }
  }

  dfs(startNode);

  return {
    targetNodes: visitedNodes,
    targetEdges: visitedEdges
  };
}
