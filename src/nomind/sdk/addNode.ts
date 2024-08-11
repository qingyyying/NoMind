function addNode(props) {
  const { instance, target } = props;

  // 清除全部状态
  instance.model.nodes.forEach((node) => {
    // 清除select
    const selectIndex = node.nodeState?.indexOf("select");
    if (typeof selectIndex == "number" && selectIndex > -1) {
      node.nodeState.splice(selectIndex, 1);
    }
    // 清除input
    const inputIndex = node.nodeState?.indexOf("input");
    if (typeof inputIndex == "number" && inputIndex > -1) {
      node.nodeState.splice(inputIndex, 1);
    }
  });

  const newNodeId = new Date().getTime();
  // 增加新节点
  instance.model.nodes.push({
    id: `node-${newNodeId}`,
    type: "content",
    width: 65,
    nodeState: [],
  });
  // 增加父级连线
  instance.model.edges.push({
    id: `edge-${newNodeId}`,
    source: target.parent.id,
    target: `node-${newNodeId}`,
    type: "mind-line",
    sourceAnchor: 4,
    targetAnchor: 3,
    style: {
      lineWidth: 4,
      stroke: "#eca069",
    },
  });
  // 更新
  instance.refresh();
}

export default addNode;
