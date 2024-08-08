import { NetaGraph } from "neta-render/es";
import { MIND_BEHAVIOR } from "./behavior";
import { MIND_NODE, MIND_EDGE } from "./register";

class Mind {
  private netaRender: NetaGraph;
  constructor(options: any) {
    const { el } = options;
    this.netaRender = new NetaGraph({
      rendererType: "canvas",
      el,
      backgroundColor: "#fff",
      layout: {
        type: "mind",
        config: {
          direction: "lr",
        },
      },
      behaviors: [
        "wheel-canvas-move",
        "render-dynamic-element",
        {
          key: "contextMenu",
          options: {
            menus: [
              {
                label: "自定义菜单1",
                key: "1",
              },
              {
                label: "自定义菜单244tttttt",
                key: "2",
              },
            ],
          },
        },
      ],
      register: {
        nodes: MIND_NODE,
        edges: MIND_EDGE,
        behaviors: MIND_BEHAVIOR,
      },
    });
  }

  render() {
    this.netaRender.read({
      nodes: [
        {
          id: "root",
          type: "headTitle",
          text: "nomind",
          width: 65,
          nodeState: [],
        },
      ],
      edges: [],
    });
    this.netaRender.render();

    this.netaRender.fitCenter();
  }

  destroy() {
    this.netaRender.destroy();
  }
}

export default Mind;
