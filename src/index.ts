import merge from "deepmerge";
type element = string | HTMLElement;

interface propsOptionInterface {
  type?: "toggle" | "divide";
  button?: element;
  buttons?: {open: element, close: element};
  wrapper?: element;
  inner?: element;
}

interface defaultOptionInterface {
  type: "toggle" | "divide";
  button: element;
  buttons: {open: element, close: element};
  wrapper: element;
  inner: element;
}

const defaultOption: defaultOptionInterface = {
  type: "toggle",
  button: ".js-accordion-button",
  buttons: {
    open: ".js-accordion-button-open",
    close: ".js-accordion-button-close"
  },
  wrapper: ".js-accordion-wrap",
  inner: ".js-accordion-inner"
}

class Accordion {
  private readonly target: HTMLElement;
  private readonly option: defaultOptionInterface;
  private readonly button: Record<string, HTMLElement>
  private readonly wrap: HTMLElement;
  private readonly inner: HTMLElement;
  private openFunc: ()=>void;
  private closeFunc: ()=>void;
  private addEventFunc: ()=>void;
  private openFlag: boolean;
  constructor(target: element, option: propsOptionInterface) {
    this.target = typeof target !== "string"? target : document.querySelector(target) as HTMLElement;
    this.option = merge(defaultOption, option);
    switch (this.option.type) {
      case "divide":
        this.button = {
          open: typeof this.option.buttons.open === "string"? this.target.querySelector(this.option.buttons.open) as HTMLElement : this.option.buttons.open,
          close: typeof this.option.buttons.close === "string"? this.target.querySelector(this.option.buttons.close) as HTMLElement : this.option.buttons.close,
        };
        break;
      case "toggle":
        this.button = {
          toggle: typeof this.option.button === "string" ? this.target.querySelector(this.option.button) as HTMLElement : this.option.button
        }
        break;
    }
    this.wrap = typeof this.option.wrapper === "string" ? this.target.querySelector(this.option.wrapper) as HTMLElement : this.option.wrapper;
    this.inner = typeof this.option.inner === "string" ? this.target.querySelector(this.option.inner) as HTMLElement : this.option.inner;
    this.openFlag = false;
    this.openFunc = () => {};
    this.closeFunc = () => {};
    this.addEventFunc = () => {};
  }

  mount = () => {
    this.addEvents();
  }

  setOpenCallback = (cb: ()=>void) => {
    this.openFunc = cb;
  }

  setCloseCallback = (cb: ()=>void) => {
    this.closeFunc = cb;
  }

 clickToggleBtn = () => {
    if (this.openFlag) {
      this.resetHeight();
      this.closeFunc();
    } else {
      this.setHeight();
      this.openFunc();
    }
   this.openFlag = !this.openFlag;
 }

 clickOpenBtn = () => {
    this.openFlag = true;
    this.setHeight();
 }

 clickCloseBtn = () => {
    this.openFlag = false;
   this.resetHeight();
 }

 resizeEvent = () => {
    if (this.openFlag) {
      this.setHeight();
    }
 }

 setHeight = () => {
    this.wrap.style.height = `${this.inner.getBoundingClientRect().height}px`;
 }

 resetHeight = () => {
   this.wrap.style.height = "";
 }

 addEvents = () => {
    switch (this.option.type) {
      case "divide":
        this.button.open.addEventListener("click", this.clickOpenBtn);
        this.button.close.addEventListener("click", this.clickCloseBtn);
        break;
      case "toggle":
        this.button.toggle.addEventListener("click", this.clickToggleBtn);
    }
    window.addEventListener("resize", this.resizeEvent)
 }

 destroy = () => {
   switch (this.option.type) {
     case "divide":
       this.button.open.removeEventListener("click", this.clickOpenBtn);
       this.button.close.removeEventListener("click", this.clickCloseBtn);
       break;
     case "toggle":
       this.button.toggle.removeEventListener("click", this.clickToggleBtn);
   }
   window.removeEventListener("resize", this.resizeEvent)
 }
}

export default Accordion;