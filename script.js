// creating a dummy array of objects
const rawData = [
  {
    name: "Juliana Chiene",
    phone: "380 270 8871",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-02-24",
    startTime: "10:43 AM",
    endTime: "11:59 AM",
    eventDate: "2021-10-05",
    longitud: 28.5355,
    latitud: 77.391,
    eventName: "Erinn Sedgebeer",
  },
  {
    name: "Valencia Taber",
    phone: "346 454 7391",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-06-25",
    startTime: "3:15 AM",
    endTime: "11:59 AM",
    eventDate: "2021-10-30",
    longitud: 15.222154,
    latitud: 43.4353312,
    eventName: "Gayler Philson",
  },
  {
    name: "Catha Gilfether",
    phone: "854 894 3296",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-01-24",
    startTime: "1:19 AM",
    endTime: "11:59 AM",
    eventDate: "2021-09-20",
    longitud: 16.222154,
    latitud: 46.4353312,
    eventName: "Erinn Sedgebeer",
  },
  {
    name: "Rudolfo Aspling",
    phone: "473 329 9294",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2020-10-08",
    startTime: "10:25 AM",
    endTime: "11:59 AM",
    eventDate: "2022-04-14",
    longitud: 17.222154,
    latitud: 47.4353312,
    eventName: "Benedict Arpe",
  },
  {
    name: "Valencia Taber",
    phone: "185 233 7482",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-01-23",
    startTime: "1:43 AM",
    endTime: "11:59 AM",
    eventDate: "2022-02-03",
    longitud: 18.222154,
    latitud: 48.4353312,
    eventName: "Bobbee Yosselevitch",
  },
  {
    name: "Troy George",
    phone: "105 847 8344",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-05-28",
    startTime: "8:13 AM",
    endTime: "11:59 AM",
    eventDate: "2021-12-11",
    longitud: 19.222154,
    latitud: 49.4353312,
    eventName: "Wally Shenfisch",
  },
  {
    name: "Noelyn Fever",
    phone: "885 502 0483",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-05-25",
    startTime: "8:21 AM",
    endTime: "11:59 AM",
    eventDate: "2022-04-28",
    longitud: 24.222154,
    latitud: 43.4353312,
    eventName: "Elia Wenderoth",
  },
  {
    name: "Bruis Ashworth",
    phone: "119 469 5842",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2020-12-24",
    startTime: "10:24 AM",
    endTime: "11:59 AM",
    eventDate: "2022-04-15",
    longitud: 34.222154,
    latitud: 42.4353312,
    eventName: "Erinn Sedgebeer",
  },
  {
    name: "Valencia Taber",
    phone: "539 559 9950",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-07-22",
    startTime: "7:57 AM",
    endTime: "11:59 AM",
    eventDate: "2022-06-03",
    longitud: 44.222154,
    latitud: 42.4353312,
    eventName: "Phaidra Burfitt",
  },
  {
    name: "Jaymie Grube",
    phone: "126 147 8659",
    state: "AB",
    city: "Abruzzi",
    bookingDate: "2021-01-15",
    startTime: "8:23 AM",
    endTime: "11:59 AM",
    eventDate: "2021-09-11",
    longitud: 54.222154,
    latitud: 42.4353312,
    eventName: "Micaela Wheway",
  },
];
// globle variable
var FILTERDATA = false;
var UpdatedREFOFOBJECT = [];
function filtersDataValue(value) {
    FILTERDATA = true;
    UpdatedREFOFOBJECT = value;
}

// on page ready
$(document).ready(() => {
  tableDataShow(rawData);
  // handle sort date event
  $(".sortOrder").on("click", function () {
    if (this.id == "bookingDes") tableDataShow(dateSort("D", "bookingDate"));
    if (this.id == "bookingAse") tableDataShow(dateSort("ASED", "bookingDate"));
    if (this.id == "eventDes") tableDataShow(dateSort("D", "eventDate"));
    if (this.id == "eventAse") tableDataShow(dateSort("ASED", "eventDate"));
  });
  // input event handeling
  $("#nameAndEvent").on("keyup", filterData)
});

// map initiating
function initMap(...arg) {
  console.log(arg.length);
  const myLatLng = { lat: 54.222154, lng: 42.4353312 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });
  let input = document.getElementById("searchTextField");
  new google.maps.places.Autocomplete(input);
  let latLng = [];
  if (arg.length < 1) {
    latLng = lanLan(rawData);
  } else {
    latLng = lanLan(...arg);
  }
  for (let i = 0; i < latLng.length; i++) {
    new google.maps.Marker({
      position: latLng[i],
      map,
      title: "hello",
    });
  }
}

// date sorting
function dateSort(order, property) {
    if(FILTERDATA)
        data = UpdatedREFOFOBJECT;
    else
        data = rawData
  const sortArray = data.sort((a, b) => {
    if (order == "ASED") return new Date(a[property]) - new Date(b[property]);
    else return new Date(b[property]) - new Date(a[property]);
  });
  return sortArray;
}



// filter data by name and event name
function filterData() {
  const inputFiter = $("#nameAndEvent").val();
  // if (inputFiter === "" || inputFiter === null)
  //   return $("#nameAndEvent").focus();
  let filterDatas = rawData.filter(
    (data) => data.name.startsWith(inputFiter) || data.eventName.startsWith(inputFiter)
  );
  if(inputFiter.length < 1) {
    filterDatas = rawData;
  }
    
  filtersDataValue(filterDatas)
  tableDataShow(filterDatas);
  initMap(filterDatas);
}

// // filter reset
// function filterReset() {
//     FILTERDATA = false;
//     initMap();
//   tableDataShow(rawData);
// }

// filter lanLng
function lanLan(data) {
  return data.map((item) => {
    return {
      lat: item.latitud,
      lng: item.longitud,
    };
  });
}

// function for desplay data
function tableDataShow(data) {
  $("#productTable td").remove();
  str = "";
  data.forEach((item) => {
    str += `<tr>
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.state}</td>
        <td>${item.city}</td>
        <td>${item.bookingDate}</td>
        <td>${item.startTime}</td>
        <td>${item.endTime}</td>
        <td>${item.eventName}</td>
        <td>${item.eventDate}</td>
        <td>${item.latitud}</td>
        <td>${item.longitud}</td>
    </tr>`;
  });
  $("#productTable").append(str);
}
