<template>
  <div class="cureatrdailyreport">
    <div><strong>Today's Stats</strong></div>
    <ul class="cureatrdailyreport__report">
      <li>
        <div class="report__title">Active Users:</div>
        <div>{{ snippet.active_users }}</div>
      </li>
      <li>
        <div class="report__title">New Users:</div>
        <div>{{ snippet.new_users }}</div>
      </li>
      <li>
        <div class="report__title">Total Messages:</div>
        <div>{{ snippet.messages_total }}</div>
      </li>
      <li>
        <div class="report__title">Urgent Messages:</div>
        <div>{{ snippet.messages_urgent }}</div>
      </li>
      <li>
        <div class="report__title">Pager Messages:</div>
        <div>{{ snippet.messages_pager }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CureatrDailyReport',
  props: {
    snippet: Object,
  },
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
}

.cureatrdailyreport {
  font-size: 1.5rem;
  position: fixed;
  right: 0;
  width: 300px;
  margin: 1.2rem;
  padding: 1.2rem;
  background: #fff;
  border-radius: 10px;
  text-align: left;
}

.cureatrdailyreport__report {
  margin-top: 1rem;
}
</style>
