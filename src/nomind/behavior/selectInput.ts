import { SDKKeys, SDKLoader } from "../sdk";

const mindSelectNode = {
  name: "mind-select-node",
  render: {
    currentShape: null,
    currentNode: null,
    hoverShape: null,
    init() {},
    destroy() {},
    getEvents() {
      return {
        "graphics:contextmenu": "onGraphicsContextMenu",
        "graphics:pointerdown": "onPointerDown",
        "graphics:mouseenter": "onMouseEnter",
        "graphics:mouseout": "onMouseOut",
        "canvas:pointerdown": "onCanvasDown",
        "canvas:pointermove": "onCanvasMove",
        "canvas:pointerup": "onCanvasUp",
        keydown: "onKeyDown",
      };
    },
    onPointerDown(evt) {
      // 右键就结束
      if (evt.button === 2) return;
      const originThis = evt.originThis;

      const target = evt.target;
      const shape = target._geometry?.graphicsData?.shape ?? null;

      /**
       * 点击选中
       */
      if (
        shape?.name !== "expand-circle" &&
        ["headTitle", "content"].includes(target.parent._data?.type)
      ) {
        const node = getTargetNode(this.instance.model.nodes, target.parent.id);

        const selectIndex = node.nodeState.indexOf("select");
        const inputIndex = node.nodeState.indexOf("input");

        this.instance.model.nodes.forEach((node) => {
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

        // 如果没有select 和 input 则进入select 状态 否则进入input
        if (selectIndex == -1 && inputIndex == -1) {
          node.nodeState.push("select");
        } else if (selectIndex > -1 && shape.name === "drag-pointer") {
          node.nodeState.push("select");
        } else if (inputIndex == -1) {
          node.nodeState.push("input");
        }

        this.instance.refresh();
      }

      /**
       * 新增节点
       */

      if (shape.name === "expand-circle") {
        SDKLoader[SDKKeys.ADD_CHILD_NODE].load({
          instance: this.instance,
          target,
        });
      }

      originThis.currentShape = shape;
      originThis.currentNode = target;
    },
    onMouseEnter(evt) {
      const originThis = evt.originThis;
      let parent = null;
      if (evt.target.whole) {
        parent = evt.target;
      } else {
        parent = evt.target.parent;
      }

      // hover进入后展示新增的bar
      if (["headTitle", "content"].includes(parent._data?.type)) {
        originThis.hoverShape = parent;
        const node = getTargetNode(this.instance.model.nodes, parent.id);
        const nodeState = node.nodeState;
        const hoverIndex = nodeState.indexOf("hover");
        if (hoverIndex == -1) {
          node.nodeState.push("hover");
          this.instance.refresh();
        }
      }
    },
    onMouseOut(evt) {
      const originThis = evt.originThis;

      const node = getTargetNode(
        this.instance.model.nodes,
        originThis.hoverShape?.id
      );

      // hover移出 去除bar
      if (originThis.hoverShape && node) {
        const hoverIndex = node.nodeState?.indexOf("hover");
        if (typeof hoverIndex == "number" && hoverIndex > -1) {
          node.nodeState.splice(hoverIndex, 1);
          setTimeout(() => {
            this.instance.refresh();
          }, 300);
        }
      }
    },
    onCanvasDown() {
      let refreshTag = false;
      this.instance.model.nodes.forEach((node) => {
        // 清除select
        const selectIndex = node.nodeState?.indexOf("select");
        if (typeof selectIndex == "number" && selectIndex > -1) {
          node.nodeState.splice(selectIndex, 1);
          refreshTag = true;
        }
        // 清除input
        const inputIndex = node.nodeState?.indexOf("input");
        if (typeof inputIndex == "number" && inputIndex > -1) {
          node.nodeState.splice(inputIndex, 1);
          refreshTag = true;
        }
      });

      if (refreshTag) {
        this.instance.refresh();
      }
    },
    onCanvasMove(evt) {
      const originThis = evt.originThis;

      // 拖拽变换节点长度
      if (originThis?.currentShape?.name !== "drag-pointer") return;
      const endPoint = {
        x: evt.offsetX,
        y: evt.offsetY,
      };

      const tPoint = this.instance.renderer.getTransformByPoint(
        endPoint.x,
        endPoint.y
      );

      const targetNode = this.instance.model.nodes.find(
        (n) => n.id == originThis.currentNode.parent.id
      );

      if (targetNode) {
        let offsetX = tPoint.x - originThis.currentNode.x;
        if (offsetX < 80) {
          offsetX = 80;
        }
        const node = getTargetNode(this.instance.model.nodes, targetNode.id);
        node.width = offsetX / 4;
        // 单个节点最小宽度
        if(node.width <= 60) {
          node.width = 60
        }
        // 单个节点最大宽度
        if(node.width >= 160) {
          node.width = 160
        }
        this.instance.refresh();
      }
    },
    onCanvasUp(evt) {
      const originThis = evt.originThis;
      originThis.currentShape = null;
      originThis.currentNode = null;
    },
    onKeyDown(evt) {
      const originThis = evt.originThis;

      // 删除节点
      if (evt.key === "Backspace" && evt.code === "Backspace") {
        const targetNodes = this.instance.model.nodes.filter((node) =>
          node.nodeState?.includes("select")
        );
        if (targetNodes.length > 1) {
          console.error("DELETE ERROR: 删除的目标节点出现多个");
          return;
        }
        const targetNode = targetNodes[0];
  
        SDKLoader[SDKKeys.DELETE_NODE].load({
          instance: this.instance,
          targetModel: targetNode
        });

        originThis.currentShape = null;
        originThis.currentNode = null;
        originThis.hoverShape = null;
      }
    },
    onGraphicsContextMenu(evt) {},
  },
};

export default mindSelectNode;

function getTargetNode(nodes = [], id) {
  return nodes.find((node) => node.id === id);
}

function seekTreeNodesEdges(model, node, delNodes = [], delEdges = []) {
  const { nodes, edges } = model;
  const relationEdges = edges.filter((edge) => edge.source === node.id);

  delNodes.push(node);

  for (const edge of relationEdges) {
    delEdges.push(edge);
    const targetNodeId = edge.target;
    const targetNode = nodes.find((n) => n.id === targetNodeId);
    seekTreeNodesEdges(model, targetNode, delNodes, delEdges);
  }

  return [delNodes, delEdges];
}
