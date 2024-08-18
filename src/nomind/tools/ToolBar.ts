import { outline, focus } from "../img";
export default class ToolBar {
  private el;

  constructor(el) {
    this.el = el;
    this.render();
  }

  render() {
    const icons = [
      {
        key: "outline",
        img: outline,
      },
      {
        key: "focus",
        img: focus,
      },
    ];

    const toolbar = document.createElement("div");
    toolbar.className = "nomind-toolbar";
    toolbar.style.display = "flex";
    toolbar.style.position = "absolute";
    toolbar.style.top = "16px";
    toolbar.style.left = "50%";
    toolbar.style.transform = "translate(-50%, 0);";
    toolbar.style.padding = "4px";
    toolbar.style.backgroundColor = "#fff";
    toolbar.style.borderRadius = "6px";
    toolbar.style.boxShadow =
      "0px 0px .9310142993927002px 0px rgba(0, 0, 0, .17), 0px 0px 3.1270833015441895px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05)";
    // 动态生成工具栏中的图标
    icons.forEach((iconItem) => {
      const iconDiv = document.createElement("div");

      iconDiv.className = "nomind-tool-icon";
      iconDiv.style.width = "36px";
      iconDiv.style.height = "36px";
      iconDiv.style.display = "flex";
      iconDiv.style.justifyContent = "center";
      iconDiv.style.alignItems = "center";
      iconDiv.style.borderRadius = "6px";

      const img = document.createElement("img");
      img.src = iconItem.img;

      iconDiv.appendChild(img);

      iconDiv.addEventListener("mouseover", () => {
        iconDiv.style.backgroundColor = "#e0dfff";
      });

      // 添加鼠标移出事件
      iconDiv.addEventListener("mouseout", () => {
        iconDiv.style.backgroundColor = "#fff";
      });

      iconDiv.addEventListener("click", () => {
        console.log(iconItem, "iconItem");
        if (iconItem.key == "outline") {
          const drawer = document.createElement("div");
          drawer.style.width = "250px";
          drawer.style.height = "100vh";
          drawer.style.backgroundColor = "#333";
          drawer.style.color = "#fff";
          drawer.style.position = "fixed";
          drawer.style.top = "0";
          drawer.style.left = "-250px"; // 初始位置在屏幕外
          drawer.style.transition = "left 0.3s ease";
          drawer.style.padding = "20px";
          drawer.textContent = "This is a drawer";
          document.body.appendChild(drawer);
        }
      });

      toolbar.appendChild(iconDiv);
    });
    this.el.appendChild(toolbar);
  }

  destroy() {
    // 清除toolbar
    const removeToolBar = document.querySelector(".nomind-toolbar");
    removeToolBar.remove();
  }
}
