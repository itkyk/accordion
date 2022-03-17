# accordion  
  
## install
```shell
$ npm i @itkyk/accordion
```

## How to use @itkyk/accordion

```typescript
import Accordion from "@itkyk/accordion";

// Initialize
const option = {};
const accordion = new Accordion("target selector or HTMLElement", oprion)

// add callbacks
accordion.setOpenCallback(() => {
  // add function
  console.log("open");
})

accordion.setCloseCallback(()=>{
  // add function
  console.log("close");
})

// start acrodion
accordion.mount();

// desctoy event listener
accordion.destroy();
```

## Option
| key | default  | value |description |
|------|-----------|---------|---------------|
| type | "toggle" | "toggle" | "divide" | select button type. |
| button |".js-accordion-button" | `string or HTMLElement` | if type is `toggle`,  open or close torigger className of dom |
| buttons |{open: ".js-accordion-button-open", close: ".js-accordion-button-close"} | {open: `string or HTMLElement`, close: `string or HTMLElement`} | if type is ``,  open or close torigger of html elements className of each dom.  |
| wrapper | ".js-accordion-wrap" | `string of HTMLElement` | accordion wrapper hrml element or className of dom |
| inner | ".js-accordion-inner" | `string of HTMLElement` |  accordion inner html element or className of dom |

## methods
| key | description |
|------|-----------|
| mount | set accordion logics | 
| destroy | remove addEventListeners | 
| setOpenCallback | added function of when opening the accordion |
| setCloseCallback | added function of when closing the accordion | 

## Sample code
[https://itkyk-mymodules.netlify.app/itkyk/accrodion/](https://itkyk-mymodules.netlify.app/itkyk/accrodion/)
