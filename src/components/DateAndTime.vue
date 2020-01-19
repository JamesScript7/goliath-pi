<template>
  <div class="dateandtime">
    <div class="flex-container">
      <section class="dateandtime__left flex-column">
        <div class="dateandtime__day">{{ day }}</div>
        <div class="dateandtime__monthanddate">{{ monthAndDate }}</div>
      </section>
      <section class="dateandtime__right flex-column">
        <div class="dateandtime__innerwrap">
          <div class="dateandtime__time">{{ time }}</div>
          <div class="dateandtime__amPm">{{ amPm }}</div>
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
import moment from 'moment';

export default {
  name: 'DateAndTime',
  data() {
    return {
      day: moment().format('dddd'),
      monthAndDate: moment().format('MMM Do'),
      time: moment().format('h:mm'),
      amPm: moment().format('a'),
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
.dateandtime {
  position: absolute;
  height: 100%;
  left: 40%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  font-variant: petite-caps;
  color: white;
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
    height: 150px;
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
