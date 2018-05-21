<template>
  <f-container>
    <f-wing-blank>
      <f-button icon="ellipsis"  type="ghost">
        按钮
      </f-button>
    </f-wing-blank>

    <f-white-space></f-white-space>

    <f-textarea v-model="text" autoHeight />

    {{ text }}

  </f-container>
</template>

<script>
export default {
  data: () => ({
    text: `fffkg

    fff



    ff`
  })
}
</script>
