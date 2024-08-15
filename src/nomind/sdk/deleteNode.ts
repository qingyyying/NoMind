import { findTargetNodesAndEdges } from "./utils";

export default function deleteNode(props) {
  const { instance, target } = props;
  console.log('target: ', target);
  console.log('instance: ', instance);
  const delNodeId = target.parent.id
  const result = findTargetNodesAndEdges(instance.model, delNodeId)
  console.log('result:++++ ', result);

  const nodes = instance.model.nodes?.filter(node => {
    if(result.targetNodes.has(node.id)) {
      return false
    }
    return true
  })

  const edges = instance.model.edges?.filter(edge => {
    if(result.targetEdges.has(edge.id)) {
      return false
    }
    return true
  })
  const newModel = {
    nodes,
    edges
  }
  console.log('newModel: ', newModel);


  instance.read(newModel)
}