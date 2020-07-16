function timeDate(te) {
  if (te == "" || te == null) {
    return "";
  } else if (te.length == 10) {
    let time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let y = time.getFullYear();
    let m =
      time.getMonth() < 9 ?
      "0" + (time.getMonth() + 1) :
      time.getMonth() + 1;
    let d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    let h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    let mm =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    let s =
      time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    let timedate = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
    return timedate;
  } else {
    let time = new Date(te);
    let y = time.getFullYear();
    let m =
      time.getMonth() < 9 ?
      "0" + (time.getMonth() + 1) :
      time.getMonth() + 1;
    let d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    let h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    let mm =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    let s =
      time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    let timedate = {
      time: "",
      date: "",
      dateTime: ""
    };
    timedate.date = y + "-" + m + "-" + d;
    timedate.time = h + ":" + mm + ":" + s;
    timedate.dateTime =
      y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
    return timedate;
  }
}
export { //很关键
  timeDate
}