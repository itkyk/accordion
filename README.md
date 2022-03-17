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
| key | default  | value |
|------|-----------|---------|
| type | "toggle" | "toggle" | "divide" |
| button | |".js-accordion-button" | if type is `toggle`,  open or close torigger className of dom |

## methods
