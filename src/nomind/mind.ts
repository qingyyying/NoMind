import { NetaGraph } from "neta-render/es";
import { MIND_BEHAVIOR } from "./behavior";
import { MIND_NODE, MIND_EDGE } from "./register";
import { MENU_OPTIONS } from "./config";

class Mind {
  public netaRender: NetaGraph;
  constructor(options: Record<string, any>) {
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
            menus: MENU_OPTIONS,
          },
        },
      ],
      register: {
        nodes: MIND_NODE,
        edges: MIND_EDGE,
        behaviors: MIND_BEHAVIOR,
      },
    });
    this.netaRender.on("contextmenu", this.contextmenuEvent);
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
    this.netaRender.off("contextmenu", this.contextmenuEvent);
    this.netaRender.destroy();
  }

  contextmenuEvent(params) {
    console.log("params: ", params);
  }
}

export default Mind;
