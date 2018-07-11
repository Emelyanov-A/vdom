(() => {
  var oldVDOM = {};
  function isElement(object) {
    return typeof object === "function" && object !== null;
  }

  function createElement(el, props, ...children) {
    if (isElement(el)) {
      if (el.__proto__.name === "Component") {
        let component = new el(props);
        componentVDOM = component.render();
        componentVDOM["type"] = component;
        return componentVDOM;
      }
      return el(props);
    } else {
      return {
        type: "element",
        parentElement: null,
        domElement: null,
        nodeElement: el,
        attributes: props,
        children: children
      };
    }
  }

  function createDOMElement(vdomEl) {
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
    return el;
  }

  function compareNodeElement(oldEl, newEl) {
    if (typeof oldEl === "string") return oldEl === newEl;
    if (oldEl.nodeElement === newEl.nodeElement) {
      return (
        JSON.stringify(oldEl.attributes) === JSON.stringify(newEl.attributes)
      );
    }
    return false;
  }

  function renderElement(newElement, oldElement, parent) {
    if (!parent.domElement) {
      parent = { domElement: parent };
    }
    isOldVDOMEmpty = Object.keys(oldElement).length === 0;
    if (isOldVDOMEmpty) {
      let el = createDOMElement(newElement);
      newDomEl = parent.domElement.appendChild(el);
      if (typeof newElement === "string") {
        parent.textEl = newDomEl;
      } else {
        newElement.domElement = newDomEl;
        newElement.parentElement = parent.domElement;
      }
    } else if (parent.wasRendered) {
      let el = createDOMElement(newElement);
      newDomEl = parent.domElement.appendChild(el);
      if (typeof newElement === "string") {
        parent.textEl = newDomEl;
      } else {
        newElement.domElement = newDomEl;
        newElement.parentElement = parent.domElement;
        oldElement.domElement = el;
        oldElement.wasRendered = true;
      }
    } else if (!compareNodeElement(oldElement, newElement)) {
      let el = createDOMElement(newElement);
      if (typeof newElement === "string") {
        oldEl = parent.textEl;
        parent.domElement.replaceChild(el, oldEl);
        parent.textEl = el;
      } else {
        oldEl = oldElement.domElement;
        parent.domElement.replaceChild(el, oldEl);
        newElement.domElement = el;
        newElement.parentElement = parent.domElement;
        oldElement.domElement = el;
        oldElement.wasRendered = true;
      }
    } else {
      newElement.domElement = oldElement.domElement;
      newElement.parentElement = oldElement.parentElement;
      newElement.textEl = oldElement.textEl;
    }
  }

  function renderVDOM(newElVDOM, oldElVDOM, parentElement) {
    renderElement(newElVDOM, oldElVDOM, parentElement);
    if (newElVDOM.children == null) return;
    newElVDOM.children.forEach(function(newChild, index) {
      oldChild = isOldVDOMEmpty ? oldElVDOM : oldElVDOM.children[index];
      childParentEl = isOldVDOMEmpty ? newElVDOM : oldElVDOM;
      renderVDOM(newChild, oldChild, childParentEl);
      if (typeof newChild === "string") {
        newElVDOM.textEl = childParentEl.textEl;
      }
    });
  }

  function findComponentInVDOM(component, vdomEl) {
    if (vdomEl.children == null) return;
    if (vdomEl["type"] === component) {
      return vdomEl;
    }
    vdomEl.children.forEach(function(elChild) {
      findComponentInVDOM(component, elChild);
    });
  }

  function updateComponentInVDOM(component, oldVDOM, newVDOM) {
    if (oldVDOM.children == null) return;
    let index = oldVDOM.children.find(function(obj, index) {
      return obj.type === component ? index : null;
    });
    if (index !== null) {
      oldVDOM.children[index] = newVDOM;
    }
    oldVDOM.children.forEach(function(elChild) {
      findComponentInVDOM(component, elChild);
    });
  }

  function updateComponent(component, componentNewVDOM) {
    let componentOldVDOM = findComponentInVDOM(component, oldVDOM);
    renderVDOM(
      componentNewVDOM,
      componentOldVDOM,
      componentOldVDOM["parentElement"]
    );
    if (oldVDOM.type === component) {
      oldVDOM = componentNewVDOM;
    } else {
      updateComponentInVDOM(component, oldVDOM, componentNewVDOM);
    }
  }

  function render(newVDOM, domEl) {
    renderVDOM(newVDOM, oldVDOM, domEl);
    oldVDOM = newVDOM;
  }

  class Component {
    constructor(props) {
      this.status = props ? props : {};
    }

    setStatus(obj) {
      for (let key in obj) {
        this.status[key] = obj[key];
      }
      let componentNewVDOM = this.render();
      componentNewVDOM.type = this;
      updateComponent(this, componentNewVDOM);
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
