import { ISdkProps } from "./type";
import { findTargetNodesAndEdges } from "./utils";

export default function deleteNode(props: ISdkProps) {
  const { instance, target, targetModel } = props;

  const delNodeId = targetModel?.id ?? target?.parent?.id;

  // 如果删除的是root节点，清除root的所有子节点
  if (delNodeId === "root") {
    instance.read({
      nodes: instance.model.nodes?.filter((node) => node.id === "root"),
      edges: [],
    });
    return;
  }

  // 搜索删除的节点和线
  const result = findTargetNodesAndEdges(instance.model, delNodeId);

  const nodes = instance.model.nodes?.filter((node) => {
    if (result.targetNodes.has(node.id)) {
      return false;
    }
    return true;
  });

  const edges = instance.model.edges?.filter((edge) => {
    if (result.targetEdges.has(edge.id)) {
      return false;
    }
    return true;
  });
  const newModel = {
    nodes,
    edges,
  };

  instance.read(newModel);
}
