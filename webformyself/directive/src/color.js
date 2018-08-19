export default {
    bind(el, bindings, vnode) {
        // console.log('bind');
        // el.style.color = 'red';  lesson 1-3
        //el.style.color = bindings.value; lesson 4

        //lesson 5
        // const argument = bindings.arg; // получаем как раз слово после : background или color
        // el.style[argument] = bindings.value;

        const fontModifier = bindings.modifiers['font']; //так мы получаем модификаторы переданные в директиву, получает либо true либо false
        if(fontModifier){
            el.style.fontSize ='30px'
        }

        let delay =0;
        const delayModifier = bindings.modifiers['delay'];
        if(delayModifier){
            delay = 2000;
        }
        setTimeout(()=>{
            const argument = bindings.arg;
            el.style[argument] = bindings.value;
        }, delay)
    },


    //
    // inserted(el, bindings, vnode){
    //     console.log('inserted');
    // },
    //
    // update(el, bindings, vnode){
    //     console.log('update');
    // },
    //
    // componentUpdated(el, bindings, vnode, oldVnode){
    //     console.log('componentUpdated');
    // },
    //
    // unbind(el, bindings, vnode, oldVnode){
    //     console.log('unbind')
    // }
}