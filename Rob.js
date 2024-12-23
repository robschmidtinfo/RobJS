export class Rob {
    constructor(tagId) {
      this.tagId = tagId
      this.state = {};
      this.oldState = {};
      this.components = [];
    }

    init(app){ window[app] = this }

    defineStateVar(key, initialValue) { this.state[key] = initialValue }

    defineFunction(name, fn) { this[name] ? console.error(`Function "${name}" is already defined.`) : this[name] = fn }

    defineComponent(viewFunction, className, usedStateKeys) { this.components.push({viewFunction, className, usedStateKeys}) }

    render(viewFunction) { document.getElementById(this.tagId).innerHTML = viewFunction() }
    
    updateState(key, newValue) {
      this.oldState = this.state;
      this.state = { ...this.state, [key]: newValue };
      this.components
          .filter(comp => comp.usedStateKeys.includes(key))
          .forEach(comp =>
              document.querySelectorAll(`.${comp.className}`)
                  .forEach(el => el.innerHTML = comp.viewFunction())
          );
    }
}
