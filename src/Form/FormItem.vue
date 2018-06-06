<template>
  <ListItem :feedback="false">
    <div styleName="item">
      <component :is="tag" :for="id" styleName="guide" v-if="icon || $slots.icon || label || $slots.label">
        <div styleName="icon" v-if="icon || $slots.icon">
          <slot name="icon">
            <Icon :name="icon" />
          </slot>
        </div>
        <div styleName="label" :style="{ width: localLabelWidth }" v-if="label || $slots.label">
          <slot name="label">
            {{ label }}
          </slot>
          <div styleName="desc" v-if="desc || $slots.desc">
            <slot name="desc">
              {{ desc }}
            </slot>
          </div>
        </div>
      </component>
      <div styleName="content">
        <Content />
      </div>
      <div styleName="extra" v-if="extra || $slots.extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
    </div>
  </ListItem>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { get, set } from 'lodash'
import ListItem from '../List/ListItem.vue'
import Icon from '../Icon/Icon.vue'

let id = 0

export default {
  name: 'FFormItem',

  inheritAttrs: false,

  inject: {
    FormStyles: {
      default: () => ({})
    },
    FForm: {
      default: null
    }
  },

  mixins: [
    CSSModules('FormStyles')
  ],

  props: {
    icon: String,
    label: null,
    desc: null,
    extra: null,
    labeled: Boolean,
    labelWidth: String
  },

  data: () => ({
    id: `__form_item__${id++}`
  }),

  computed: {
    tag() {
      return this.labeled ? 'label' : 'div'
    },
    localLabelWidth() {
      return this.labelWidth || (this.FForm && this.FForm.labelWidth)
    }
  },

  components: {
    ListItem,
    Icon,
    Content: {
      functional: true,
      render(_, { parent: { $props, $data, $slots } }) {
        const content = $slots.default
        if ($props.labeled && content && content.length > 0) {
          const idPath = ['data', 'attrs', 'id']
          const id = get(content[0], idPath)
          if (id) {
            $data.id = id
          } else {
            set(content[0], idPath, $data.id)
          }
        }
        return content
      }
    }
  }
}
</script>
