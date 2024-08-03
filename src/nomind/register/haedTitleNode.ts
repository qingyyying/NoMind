import { generateDynamicElement, MindNode } from "./nodeUtils";

const headTitleNode = {
  name: "headTitle",
  render: {
    draw(action) {
      const mindNode = new MindNode(action, "headTitle");
      const currentShape = mindNode.draw();
      return currentShape;
    },
    dynamicElement: generateDynamicElement,
  },
};

export default headTitleNode;
