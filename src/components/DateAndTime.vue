<template>
  <div class="dateandtime__container">
    <p>DATE AND TIME</p>
  </div>
</template>

<script>
import moment from 'moment';

// Template:
// -----------------------
// | SUNDAY   | 12:01 am |
// | Jan 19th |          |
// -----------------------

console.log('DAY:', moment().format('dddd')); // Sunday
console.log('DATE:', moment().format('MMM Do')); // Jan 19th
console.log('TIME:', moment().format('h:mm a')); // 12:01 am

export default {
  name: 'DateAndTime',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.dateandtime__container {
    position: absolute;
    color: white;
}
</style>
