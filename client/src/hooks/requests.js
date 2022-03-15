import axios from "axios";

async function httpGetPlanets() {
  const response = await axios.get("/v1/planets");
  if (response.status === 200) {
    const { data } = response;
    return data;
  }
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await axios.get("/v1/launches");
  if (response.status === 200) {
    const { data } = response;
    return data.sort((a, b) => a.flightNumber - b.flightNumber);
  }
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
    const response = await axios({
      method: "POST",
      url: "/v1/launches",
      data: launch,
    });
    return response;
  } catch (error) {
    return error.response;
  }
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/v1/launches/${id}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
