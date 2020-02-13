<template>
  <div class="dateandtime">
    <div class="flex-container">
      <section class="dateandtime__left flex-column">
        <div class="dateandtime__day">{{ moment.day }}</div>
        <div class="dateandtime__monthanddate">{{ moment.monthAndDate }}</div>
      </section>
      <section class="dateandtime__right flex-column">
        <div class="dateandtime__innerwrap">
          <div class="dateandtime__time">{{ moment.time }}</div>
          <div class="dateandtime__amPm">{{ moment.amPm }}</div>
        </div>
      </section>
    </div>
  </div>
</template>

// Template:
// -----------------------
// |  SUNDAY  |          |
// |----------| 12:01 am |
// | Jan 19th |          |
// -----------------------

<script>
export default {
  name: 'DateAndTime',
  props: {
    moment: Object,
  },
};
</script>

<style scoped>
.dateandtime {
  position: absolute;
  height: 100%;
  left: 30%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  text-transform: uppercase;
  color: #fff;
}

.flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.flex-column {
    display: flex;
    flex: 1;
    height: 200px;
    padding: 0 20px 0;
    background-color:rgba(8,8,8, 0.95);
}

.dateandtime__left {
  flex-direction: column;
  justify-content: center;
}

.dateandtime__right {
  flex-direction: row;
  align-items: center;
}

/* DAY */
.dateandtime__day {
  font-size: 2em;
}

/* MONTH AND DATE */
.dateandtime__monthanddate {
  white-space: nowrap;
}

/* TIME */
.dateandtime__innerwrap {
  display: flex;
  align-items: baseline;
}

.dateandtime__time {
  font-size: 4em;
}

.dateandtime__amPm {
  font-size: 1em;
}
</style>
