import merge from "deepmerge";
type element = string | HTMLElement;

interface propsOptionInterface {
  type?: "toggle" | "divide";
  button?: element;
  buttons?: {open: element, close: element};
  wrapper?: element;
  inner?: element;
  initialHeight?: number | element | null;
}

interface defaultOptionInterface {
  type: "toggle" | "divide";
  button: element;
  buttons: {open: element, close: element};
  wrapper: element;
  inner: element;
  initialHeight: number | element | null;
}

const defaultOption: defaultOptionInterface = {
  type: "toggle",
  button: ".js-accordion-button",
  buttons: {
    open: ".js-accordion-button-open",
    close: ".js-accordion-button-close"
  },
  wrapper: ".js-accordion-wrap",
  inner: ".js-accordion-inner",
  initialHeight: null
}

class Accordion {
  public readonly target: HTMLElement;
  private readonly option: defaultOptionInterface;
  public readonly button: Record<string, HTMLElement>
  public readonly wrap: HTMLElement;
  public readonly inner: HTMLElement;
  private openFunc: ()=>void;
  private closeFunc: ()=>void;
  private addEventFunc: ()=>void;
  private openFlag: boolean;
  private closingHeight: number | null;
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
    if (typeof this.option.initialHeight === "string") {
      this.closingHeight = this.target.querySelector(this.option.initialHeight)!.getBoundingClientRect().height;
    } else if (typeof this.option.initialHeight === "number") {
      this.closingHeight = this.option.initialHeight;
    } else if (this.option.initialHeight === null) {
      this.closingHeight = this.option.initialHeight;
    } else {
      this.closingHeight = this.option.initialHeight.getBoundingClientRect().height;
    }
    this.wrap.style.height = this.closingHeight ? `${this.closingHeight}px` : ""
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

 private clickToggleBtn = () => {
    if (this.openFlag) {
      this.resetHeight();
      this.closeFunc();
    } else {
      this.setHeight();
      this.openFunc();
    }
   this.openFlag = !this.openFlag;
 }

 private clickOpenBtn = () => {
    this.openFlag = true;
    this.setHeight();
 }

 private clickCloseBtn = () => {
    this.openFlag = false;
   this.resetHeight();
 }

 private resizeEvent = () => {
   if (typeof this.option.initialHeight === "string") {
     this.closingHeight = this.target.querySelector(this.option.initialHeight)!.getBoundingClientRect().height;
   }else if (this.option.initialHeight !== null && typeof this.option.initialHeight !== "number") {
     this.closingHeight = this.option.initialHeight.getBoundingClientRect().height;
   }
    if (this.openFlag) {
      this.setHeight();
    } else {
      this.resetHeight()
    }
 }

 private setHeight = () => {
    this.wrap.style.height = `${this.inner.getBoundingClientRect().height}px`;
 }

 private resetHeight = () => {
   this.wrap.style.height = this.closingHeight ? `${this.closingHeight}px`:""
 }

 private addEvents = () => {
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

 getOpenFlag = (): Boolean => {
    return this.openFlag;
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