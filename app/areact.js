(() => {
  let oldVDOM = null;
  function isElement(object) {
    return typeof object === "function" && object !== null;
  }

  function createElement(el, props, ...children) {
    if (isElement(el)) {
      if (el.__proto__.name === "Component") {
        let component = new el(props);
        return component.render();
      }
      return el(props);
    } else {
      return {
        domElement: null,
        nodeElement: el,
        attributes: props,
        children: children
      };
    }
  }

  function renderElement(vdomEl, parentElement) {
    let el =
      typeof vdomEl === "string"
        ? document.createTextNode(vdomEl)
        : document.createElement(vdomEl.nodeElement);
    let props = vdomEl.attributes;
    for (prop in props) {
      let value = props[prop];
      if (typeof value === "function") {
        el.onclick = value;
      } else {
        let att = document.createAttribute(prop);
        if (typeof value === "object") {
          value = "";
          for (style in props[prop]) {
            value += style + ":" + props[prop][style];
          }
        }
        att.value = value;
        el.setAttributeNode(att);
      }
    }
    return parentElement.appendChild(el);
  }

  function renderVDOM(newVDOM, oldVDOM, parentElement) {
    if (!oldVDOM) {
      newVDOM.domElement = renderElement(newVDOM, parentElement);
    } else if (newVDOM.nodeName === oldVDOM.nodeName) {
    }
    if (newVDOM.children == null) return;
    newVDOM.children.forEach(function(newChild, index) {
      oldChild = oldVDOM ? oldVDOM.children[index] : oldVDOM;
      renderVDOM(newChild, oldChild, newVDOM.domElement);
    });
  }

  function render(newVDOM, domEl) {
    renderVDOM(newVDOM, oldVDOM, domEl);
  }

  class Component {
    constructor(props) {
      this.status = props ? props : {};
    }

    set oldNode(oldNode) {
      this.oldNode = oldNode;
    }

    setStatus(obj) {
      for (let key in obj) {
        this.status[key] = obj[key];
      }
      this.updateDOM();
    }

    updateDOM() {
      let newNode = this.render();
    }
  }

  window.AReact = {
    createElement,
    Component
  };

  window.AReactDOM = {
    render
  };
})();
