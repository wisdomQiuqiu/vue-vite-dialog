import type { SetupContext } from 'vue'
import { defineComponent, ref, h } from 'vue'
//使用defineComponent获得传递给 setup() 参数的类型推断
export default defineComponent({
  name: 'demo',
  setup(props, ctx: SetupContext) {
    const count = ref(0)
    const addCount = () => {
      count.value++
    }
    return {
      count,
      addCount
    }
  },
  render() {
    return h('div', {
      class: 'demo'
    }, [
      h('span', {
        onClick: this.addCount
      }, this.count)
    ])
  }
})