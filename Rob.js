export class RobJSApp {
    constructor(tagId) {
      this.tagId = tagId
      this.state = {}
      this.oldState = {}
      this.components = []
    }

    init(app){ window[app] = this }

    defineStateVar(key, initialValue) { 
      this.state[key] = initialValue 
      this.oldState[key] = initialValue 
    }

    registerComponent(viewFunction, id, usedStateKeys, ...args) { this.components.push({viewFunction, id, usedStateKeys, args}) }

    initialRender(viewFunction, id=undefined) { 
      document.getElementById(this.tagId).innerHTML = viewFunction(id)
      this.components.forEach(component => this.updateComponent(component))
    }

    updateComponent(component){
      const el = document.getElementById(component.id)
      const tempDiv = document.createElement("div")
      const stateArgs = component.usedStateKeys.map(key => this.state[key])
      tempDiv.innerHTML = component.viewFunction(component.id, ...component.args, ...stateArgs)
      const newElement = tempDiv.firstElementChild
      el.replaceWith(newElement)
    }
    
    updateState(key, newValue) {
      this.oldState = this.state
      this.state = { ...this.state, [key]: newValue }
      this.components
        .filter(component => component.usedStateKeys.includes(key))
        .forEach(component => {
          this.updateComponent(component)
        });
    }
}
