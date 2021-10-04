# Internal Dashboard Kiosk

This project uses Vue.js with Express.js ✌️

## Client side project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Server setup
```
npm run start
```

---

## Floor plan

- Product department
- Auxiliary area
- Kitchen area
- Main area

## Technology

We can use the Raspberry Pi 3 Model B+ (one generation behind the current)

Why 3 B+ not the 4?
- It's the first generation to have onboard Bluetooth 4.2
- First to have the onboard, 5GHz WLAN (currently available at the office)
- Good enough processing power to run the dashboard in kiosk mode
- Price-wise, we can save a few bucks. On Amazon, the pi 3 B+ kit is $59.99 (compared to pi 4 B kit which is $62.99)

## Minimum Cost
The kit for all four areas: 59.99 * 4 = $239.96

Comes with a case, power supply, and cooling.
[Amazon link](https://www.amazon.com/Vilros-Raspberry-Clear-Power-Supply/dp/B07BDRD3LP/ref=sr_1_13?keywords=raspberry+pi+3+b%2B&qid=1578272387&sr=8-13)

hdmi cables: 5.99 * 4 = $23.96
3 feet in length.
[Amazon link](https://www.amazon.com/AmazonBasics-High-Speed-HDMI-Cable-1-Pack/dp/B014I8SSD0/ref=sr_1_1_sspa?keywords=hdmi+cable&qid=1578273615&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFWNE1aVUc5QzRQUEkmZW5jcnlwdGVkSWQ9QTA5NDA3MDMzVERWNFNZN0RFODA5JmVuY3J5cHRlZEFkSWQ9QTAzNjc2ODAzTkUxV0FUMjMzRjlRJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==)

microSD card: $9.69 * 4 = $38.76
Minimum required is 8GB and class 10, found a good deal on 16GB class 10.
[Amazon link](https://www.amazon.com/Micro-Center-Class-Memory-Adapter/dp/B07K835MNR/ref=sr_1_14?keywords=8gb+micro+sd+class+10&qid=1578272036&sr=8-14)

Total: $302.68

## Addition Upgrades

A variety of sensors are available for future enhancements

- Camera Module: $9.59
- Humidity Sensor: $9.99
- Infrared motion sensor: $9.39 (5pcs)
- Ultrasound distance sensor: $8.53
- 3 feet of leds: $9.99
- Servos: $17.99 (5pcs)