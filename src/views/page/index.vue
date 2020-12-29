<template>
  <div class="index">
    <cards />
    <charts />
  </div>
</template>

<script>
import cards from '@/components/cards'
import charts from '@/components/charts'
export default {
  components: {
    cards,
    charts
  }
}
</script>