<template>
  <div class="dateandtime__container">
    <!-- TODO: structure -->
    <p>{{ day }}</p>
    <p>{{ monthAndDate }}</p>
    <p>{{ time }}</p>
  </div>
</template>

// Template:
// -----------------------
// |  SUNDAY  |          |
// |----------| 12:01 am |
// | Jan 19th |          |
// -----------------------

<script>
import moment from 'moment';

export default {
  name: 'DateAndTime',
  data() {
    return {
      day: moment().format('dddd'),
      monthAndDate: moment().format('MMM Do'),
      time: moment().format('h:mm a'),
    };
  },
  methods: {
    updateTime() {
      // TODO:
      // Refresh every minute?
    },
  },
};
</script>

<style scoped>
.dateandtime__container {
    position: absolute;
    color: white;
}
</style>
