// api.js
export async function fetchData() {
  var raw =
    '{\n    "route": "device-list-by-brand",\n    "brand_id": 48,\n    "brand_name": "apple",\n    "page": 1\n}';

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec",
    requestOptions
  );

  const jsonData = await response.json();
  if (jsonData.status === 200 && jsonData.data && jsonData.data.device_list) {
    const deviceList = jsonData.data.device_list;
    return deviceList.map((device) => ({
      brand: device.device_name,
      id: device.key,
      device_name: device.device_name,
      device_image: device.device_image,
    }));
  } else {
    console.log("Eroare în datele primite de la API sau structura incorectă.");
    return [];
  }
}

export async function fetchPhoneDetails(key) {
  var secondRaw = JSON.stringify({
    route: "device-detail",
    key: key,
  });

  var requestOptions = {
    method: "POST",
    body: secondRaw,
    redirect: "follow",
  };

  const detailsResponse = await fetch(
    "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec",
    requestOptions
  );

  const detailsData = await detailsResponse.json();

  if (detailsData && detailsData.data) {
    return {
      phoneDetails: detailsData,
      operatingSystem: detailsData.data.os_type,
      deviceImage: detailsData.data.device_image,
    };
  } else {
    console.log("Eroare în datele primite de la API sau structura incorectă.");
    return {
      phoneDetails: null,
      operatingSystem: "Fără sistem de operare!",
      deviceName: "N/A",
      deviceImage: "N/A",
    };
  }
}
