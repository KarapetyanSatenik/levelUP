Ամեն execution context ունի phase` creation and execution:
Creation pase-ում function declaration and var-ով հայտարարված փոփոխականները hoist են լինում ու գտնվում են գլոբալ lexical environment-ում ու գլոբալ օբյելտի վրա են: Բայց սա միայն non use strict mood-ում, քանզի non use strict mood-ում մենք ունենք գլոբալ օբյեկտ:
Ու քանի որ մենք ջսում ունենք օպտիմիզացիաներ(garbage collection), որոնք կատարվում են creation phase-ում, իրենք undefined են վերագրում այն փոփոխականներին և ֆունկցիաներին, որոնք չեն օգտագործվելու ամբողջ կոդի ընթացքում, որպեսզի ավելորդ տեղ չզբաղեցնեն: Բայց այդ 
փոփոխականները և ֆունկցիաները գոյություն ունեն և տեսանելի են մեր գլոբալ սկոպում:

Եվ ի տարբերություն function execution context-ի, որը ստեղծվում և ջնջվում է, global execution context-ը չի կարող ջնջվել,հետևաբար կարող է միայն չօգտագործված փոփոխականներին undefined 
վերագրել:




```js
//non use strict
if(false){
    function foo(){
        return 3;
    }
}
console.log(foo)//undefined
```


Use strict mood-ում քանզի մենք գլոբալ օբյեկտ չունենք, ապա այդ փոփոխականները և ֆունկցիաները ոչ 
մի տեղ չեն պահվելու:

```js
"use strict"
if(false){
    function foo(){
        return 3;
    }
}
console.log(foo)// is not defined
```


Իսկ ֆունկցիայի մեջ հայտարարված փոփոխականները ու ֆունկցիաները ֆունկցիայի ավարտից հետո
ջնջվում են(ex closure), քանզի դրանք ստեղծվել  են ֆունկցիայի աշխատանքի ժմնկ(function execution context), և երբ ֆունկցիան ավարտում է իր աշխատանքը, ջնջվում է function execution 
context-ը և դրա հետ մեկտեղ նաև այն փոփոխականները ու ֆունցիաները, որոնք գտնվում էին 
տվյալ function execution context-ում:


