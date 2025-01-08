import data from "./watch-history.json" with { type: "json" };
let dates = {}; //list of dates videos were watched
let timeDay = {}; //list of times videos were watched
let channels = {}; //list of channels videos have been from
let a = []; //dates
let b = []; //number on date
let c = []; //channels
let d = []; //number per channel
let e = []; //times
let f = []; //number at time
let g = [
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursay",
     "Friday",
     "Saturday",
     "Sunday",
]; //week days
let h = []; //number on weekday
let days = { a0: 0, a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, a6: 0 };
function isoDateWithoutTimeZone(date) {
     if (date == null) return date;
     var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
     var correctDate = new Date(timestamp);

     return correctDate.toISOString();
}
for (let i = 0; i < data.length; i++) {
     data[i].time = new Date(data[i].time);
     days["a" + data[i].time.getDay().toString()] += 1;

     data[i].time = isoDateWithoutTimeZone(data[i].time);

     if (data[i].time.substr(0, 10) in dates) {
          //if date in list add to watched count else add date
          dates[data[i].time.substr(0, 10)] += 1;
     } else {
          dates[data[i].time.substr(0, 10)] = 1;
     }
     if (data[i].time.substr(11, 5) in timeDay) {
          //if time in list add to watched at time else add time
          timeDay[data[i].time.substr(11, 5)] += 1;
     } else {
          timeDay[data[i].time.substr(11, 5)] = 1;
     }
     if (data[i].subtitles) {
          if (data[i].subtitles[0].name in channels) {
               //if channel in channel list add to video count else add channel
               channels[data[i].subtitles[0].name] += 1;
          } else {
               channels[data[i].subtitles[0].name] = 1;
          }
     }
}
document.getElementById("stats").innerText = `${
     data.length
} Videos watched from ${Object.keys(channels).length} unique channels `;
//day counters
for (const key in days) {
     if (days[key]) {
          //g.unshift(key);
          h.unshift(days[key]);
     }
}
//sort channels by most watched
let sortable = [];
for (var vehicle in channels) {
     if (channels[vehicle]) {
          sortable.push([vehicle, channels[vehicle]]);
     }
}
sortable.sort(function (a, b) {
     return a[1] - b[1];
});
//---------------------
//dates and times watched
for (const key in dates) {
     if (dates[key] > 2) {
          a.unshift(key);
          b.unshift(dates[key]);
     }
}
//sort time of day
let sortable2 = [];
for (var vehicle in timeDay) {
     if (timeDay[vehicle]) {
          sortable2.push([
               parseInt(vehicle.replace(":", "")), //puts in just number for sorting
               timeDay[vehicle],
          ]);
     }
}
sortable2.sort(function (a, b) {
     return a[0] - b[0];
});
//---------------
for (const i in sortable2) {
     if (sortable2[i]) {
          //formats into correct time format
          if (sortable2[i][0].toString().length < 4) {
               if (sortable2[i][0].toString().length == 2) {
                    sortable2[i][0] = "00:" + sortable2[i][0].toString();
               } else if (sortable2[i][0].toString().length == 3) {
                    sortable2[i][0] =
                         "0" +
                         sortable2[i][0].toString().substr(0, 1) +
                         ":" +
                         sortable2[i][0].toString().substr(1, 2);
               } else if (sortable2[i][0].toString().length == 1) {
                    sortable2[i][0] = "00:0" + sortable2[i][0].toString();
               }
          } else {
               sortable2[i][0] =
                    sortable2[i][0].toString().substr(0, 2) +
                    ":" +
                    sortable2[i][0].toString().substr(2, 2);
          }
          e.push(sortable2[i][0]); //times
          f.push(sortable2[i][1]); //watched per time
     }
}
for (const i in sortable) {
     if (sortable[i][1] > 10) {
          c.unshift(sortable[i][0]); //channels
          d.unshift(sortable[i][1]); //watched per channel
     }
}
new Chart("myTime", {
     type: "bar",
     data: {
          labels: e,
          datasets: [
               {
                    backgroundColor: "#ff0000",
                    data: f,
               },
          ],
     },
     options: {
          legend: { display: false },
     },
});
new Chart("week", {
     type: "bar",
     data: {
          labels: g,
          datasets: [
               {
                    backgroundColor: "#ff0000",
                    data: h,
               },
          ],
     },
     options: {
          legend: { display: false },
     },
});
new Chart("myDates", {
     type: "bar",
     data: {
          labels: a,
          datasets: [
               {
                    backgroundColor: "#ff0000",
                    data: b,
               },
          ],
     },
     options: {
          legend: { display: false },
     },
});
new Chart("myChannels", {
     type: "bar",
     data: {
          labels: c,
          datasets: [
               {
                    backgroundColor: "#ff0000",
                    data: d,
               },
          ],
     },
     options: {
          legend: { display: true, title: { text: "Hello" } },
     },
});
