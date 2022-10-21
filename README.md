# accordion  
  
## install
```shell
$ npm i @itkyk/accordion
```

## How to use @itkyk/accordion
```html
<div class="js-accordion">
  <div class="js-accordion-wrap">
    <div class="js-accordion-inner">
      <!--- Your Markup Contents --->
    </div>
  </div>
</div>
```

```typescript
import Accordion from "@itkyk/accordion";

// Initialize
const option = {};
const accordion = new Accordion(".js-accordion", option)
/* OR
const accordion = new Accordion(document.querySelector(".js-accordion"), option)
*/
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
| initialHeight | null | `null` or `number` or `className` or `Element` | when be closing accordion, set height value. if setting null, `.style.height = "";`. |

## methods
| key | description |
|------|-----------|
| mount | set accordion logics | 
| destroy | remove addEventListeners | 
| setOpenCallback | added function of when opening the accordion |
| setCloseCallback | added function of when closing the accordion | 
| getOpenFlag | Getting open status. Return Value is `true` or `false` |

## vars
| key | description |
|------|-----------|
| target | when initialize, set target DOM | 
| button | when initialize, set button DOM or button DOMs | 
| wrap | when initialize, set wrapper DOM |
| inner | when initialize, set inner DOM | 


## Sample code
[https://itkyk-mymodules.netlify.app/itkyk/accrodion/](https://itkyk-mymodules.netlify.app/itkyk/accrodion/)
