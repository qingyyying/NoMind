export function findTargetNodesAndEdges(graph, startNode) {
  const visitedNodes = new Set();
  const visitedEdges = new Set();

  function dfs(node) {
    if (!visitedNodes.has(node)) {
      visitedNodes.add(node);
      const outgoingEdges = graph.edges.filter((edge) => edge.source === node);
      outgoingEdges.forEach((edge) => {
        visitedEdges.add(edge.id);
        dfs(edge.target);
      });
    }
  }

  // 指向startNode 的线也需要删除
  const _targetEdges = graph.edges.filter((edge) => edge.target === startNode);
  _targetEdges.forEach((edge) => {
    visitedEdges.add(edge.id);
  });

  // 通过source -》 target -》 source 查下去
  dfs(startNode);

  return {
    targetNodes: visitedNodes,
    targetEdges: visitedEdges,
  };
}
