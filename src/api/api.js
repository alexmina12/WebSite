const API_URL =
  "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec";

export async function fetchData() {
  try {
    const raw = JSON.stringify({
      route: "device-list-by-brand",
      brand_id: 48,
      brand_name: "apple",
      page: 1,
    });

    const requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(API_URL, requestOptions);
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
      throw new Error(
        "Eroare în datele primite de la API sau structura incorectă."
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchPhoneDetails(key) {
  try {
    const secondRaw = JSON.stringify({
      route: "device-detail",
      key: key,
    });

    const requestOptions = {
      method: "POST",
      body: secondRaw,
      redirect: "follow",
    };

    const detailsResponse = await fetch(API_URL, requestOptions);
    const detailsData = await detailsResponse.json();

    if (detailsData && detailsData.data) {
      const display = detailsData.data.more_specification.find(
        (item) => item.title === "Display"
      );

      const displaytType =
        display.data.find((item) => item.title === "Type")?.data[0] || "N/A";

      const displaySize =
        display.data.find((item) => item.title === "Size")?.data[0] || "N/A";

      const displayResolution =
        display.data.find((item) => item.title === "Resolution")?.data[0] ||
        "N/A";

      return {
        phoneDetails: detailsData,
        release: detailsData.data.release_date,
        operatingSystem: detailsData.data.os_type,
        deviceImage: detailsData.data.device_image,
        cpu: detailsData.data.chipset,
        display_size: displaySize,
        display_res: displayResolution,
        display_type: displaytType,
      };
    } else {
      throw new Error(
        "Eroare în datele primite de la API sau structura incorectă."
      );
    }
  } catch (error) {
    throw error;
  }
}
