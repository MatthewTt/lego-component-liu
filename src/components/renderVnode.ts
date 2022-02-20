import { defineComponent } from "vue";

const renderVnode = defineComponent({
    props: {
        vNode: {
            type: [String, Object],
            required: true
        }
    },
    render() {
        return this.vNode
    }
})

export default renderVnode
