import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { useTable } from "react-table";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  Image,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes, listHealthParameters } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
  createHealthParameters as createHealthParametersMutation,
  deleteHealthParameters as deleteHealthParametersMutation,
  createHealthParameters,
} from "./graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl, remove } from "aws-amplify/storage";
import { getCurrentUser } from "aws-amplify/auth";
import GaugeChart from "react-gauge-chart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import NavBar from "./ui-components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Select from "react-select";
import cross from "./cross.png";
import check from "./check.png";

var labelsPH = [];
var labelsTemp = [];
var labelsHumidity = [];
var labelsSmell = [];
var labelsMoisture = [];
var labelsLight = [];
var chartPhData = [];
var HumidityData = [];
var SmellData = [];
var MoistureData = [];
var LightData = [];
var chartTempData = [];
var user;
var tempPercent = 0;
var pHPercent = 0;
var moisturePercent = 0;
var humidityPercent = 0;
var smellPercent = 0;
var lightPercent = 0;
var plantData = [];
var sickPlants = [];
var resultImage = check;
const client = generateClient();

const tableStyle = {
  width: "1100px",
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
  borderRadius: "10px",
  borderSpacing: "0px",
};

const rowStyle = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "black",
};

const chartStyle = {
  height: "100%",
  width: "100%",
};

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [healthParameters, setHealthParameters] = useState([]);
  const [filteredDisplayNotes, setFilteredNotes] = useState([]);
  //const [filteredPlant, setFilter] = useState('All Plants');
  var filteredPlant = "All Plants";
  const [options, setOptions] = useState([
    { value: "All Plants", label: "All Plants" },
  ]);
  useEffect(() => {
    fetchNotes();
  }, []);

  /**
 * Gets information about the current user by using a pre defined API call to the Cognito service handling user authentification.
 * Sets the global user variable to the retrieved username.
 * @function DataTable
 * @async
 */
  async function currentAuthenticatedUser() {
    const { username, userId, signInDetails } = await getCurrentUser();
    user = username;
  }

  /**
 * Called by map function in DataTable to create each row.
 * Applies the defined royStyle and outputs the reading of each characteristic in each row.
 * @param {string}  id - ID of entry in database
 * @param {string}  name - Name of entry in database
 * @param {string}  description - Description of entry in database
 * @param {string}  username -  Owner of the entry in database
 * @param {float}  temperature - Temperature of plant entry in database
 * @param {float}  humidity - Humidity of plant entry in database
 * @param {float}  smell - Smell of plant entry in database
 * @param {float}  moisture - Moisture of plant entry in database
 * @param {float}  light - Light of plant entry in database
 * @param {string}  createdAt - Data that plant entry was added to database
 * @function DataRow
 */
  const DataRow = ({
    id,
    name,
    description,
    username,
    temperature,
    humidity,
    smell,
    moisture,
    light,
    createdAt,
  }) => (
    <tr style={rowStyle} key={id}>
      <td style={rowStyle}>{name}</td>
      <td style={rowStyle}>{description}</td>
      <td style={rowStyle}>{username}</td>
      <td style={rowStyle}>{temperature}</td>
      <td style={rowStyle}>{humidity}</td>
      <td style={rowStyle}>{smell}</td>
      <td style={rowStyle}>{moisture}</td>
      <td style={rowStyle}>{light}</td>
      <td style={rowStyle}>{new Date(createdAt).toLocaleString()}</td>
      <td style={rowStyle}>
        {
          <Button variation="link" onClick={() => deleteNote({ id, name })}>
            Delete Plant
          </Button>
        }
      </td>
    </tr>
  );

  /**
 * Constructs the data table used to display the main data on the history page.
 * Maps each reading onto the DataRow function to construct each row in the body of the table.
 * @function DataTable
 */
  const DataTable = () => (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr style={rowStyle}>
            <th>Plant Name</th>
            <th>Description</th>
            <th>Username</th>
            <th>Temperature(F)</th>
            <th>Humidity(%)</th>
            <th>Smell</th>
            <th>Moisture(%)</th>
            <th>Light(lm)</th>
            <th>Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{filteredDisplayNotes.slice(0).reverse().map(DataRow)}</tbody>
      </table>
    </div>
  );

  useEffect(() => {
    DataTable();
  }, [filteredDisplayNotes]);

  /**
 * Sets the current filtered plant from the dropdown.
 * Called during the onSubmit event for that dropdown
 * @function selectFilter
 */
  const selectFilter = (event) => {
    console.log("FILTER: " + event.target.value);
    filteredPlant = event.target.value;
    fetchNotes();
  };

  /**
 * Main function that generates the majority of the content on the page.
 * Starts by retrieving data from our main data table as well as our healthParameters table.
 * Filters this data to select one specific plant if it has been selected from the dropdown, and also only selects plants from the current user.
 * Creates a dictionary named PlantData to store all of the retrieved data for each plant.
 * Loops through the retrieved data and adds them to the dictionary.
 * Determines if plants are healthy by applying a linear interpolation formula to see if each characteristic lies between 30% to 70% between their defined min and max values.
 * The parameters used to determine health of each plant are taken from their corresponding entry in the health parameters table. If none exists for that plant, default values are used.
 * Uses this data to store list of sick plants in the SickPlants list so they can be output to a table.
 * If all plants are being filtered, the resulting gauges show the average health of all plants, and if one plant is filtered they show the health of just that one.
 * Updates the value of the global variables used to construct the visual elements such as charts/tables/gauges.
 * @async
 * @function fetchNotes
 * @returns {Promise<void>} A promise
 */
  async function fetchNotes() {
    await currentAuthenticatedUser();
    console.log("START FETCH");
    //labels = [];
    chartTempData = [];
    chartPhData = [];
    HumidityData = [];
    LightData = [];
    MoistureData = [];
    SmellData = [];
    const apiData = await client.graphql({ query: listNotes });
    var notesFromAPI = apiData.data.listNotes.items;
    const healthData = await client.graphql({ query: listHealthParameters });
    var HealthDataFromAPI = healthData.data.listHealthParameters.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await getUrl({ key: note.name });
          note.image = url.url;
        }
        return note;
      })
    );
    notesFromAPI = notesFromAPI.filter((note) => note.username === user);
    HealthDataFromAPI = HealthDataFromAPI.filter(
      (note) => note.username === user
    );

    notesFromAPI.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    var filteredNotes = notesFromAPI;
    if (filteredPlant != "All Plants") {
      filteredNotes = notesFromAPI.filter((note) => note.name == filteredPlant);
      HealthDataFromAPI = HealthDataFromAPI.filter(
        (note) => note.name == filteredPlant
      );
    }

    var pHCount = 0;
    var pHSum = 0;
    var tempCount = 0;
    var tempSum = 0;
    var humidityCount = 0;
    var humiditySum = 0;
    var smellCount = 0;
    var smellSum = 0;
    var moistureCount = 0;
    var moistureSum = 0;
    var lightCount = 0;
    var lightSum = 0;
    var maxpH = 2;
    var minpH = 0;
    var minTemp = 20;
    var maxTemp = 75;
    var minHumidity = 2000;
    var maxHumidity = 7000;
    var minSmell = 0;
    var maxSmell = 100;
    var minMoisture = 0;
    var maxMoisture = 200;
    var minLight = 10;
    var maxLight = 100;

    labelsPH = [];
    labelsTemp = [];
    labelsHumidity = [];
    labelsSmell = [];
    labelsMoisture = [];
    labelsLight = [];
    //chartTempData = [];
    sickPlants = [];
    var temporaryOptions = [{ value: "All Plants", label: "All Plants" }];
    var usedNames = [];
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (!usedNames.includes(note.name)) {
          temporaryOptions.push({ value: note.name, label: note.name });
          usedNames.push(note.name);
        }
        return note;
      })
    );
    plantData = [];
    if (filteredPlant == "All Plants") {
      usedNames.map((name) => {
        plantData[name] = {
        pH: 0,
        temperature: 0,
        humidity: 0,
        smell: 0,
        moisture: 0,
        light: 0,
        count: 0,
        countPh: 0,
        countTemp: 0,
        countHumidity: 0,
        countSmell: 0,
        countMoisture: 0,
        countLight: 0,
        minTemp: 40,
        maxTemp: 80,
        minHumidity: 20,
        maxHumidity: 60,
        minSmell: 75,
        maxSmell: 150,
        minMoisture: 25,
        maxMoisture: 70,
        minLight: 400,
        maxLight: 1000,
        };
      });
    } else {
      plantData[filteredPlant] = {
        pH: 0,
        temperature: 0,
        humidity: 0,
        smell: 0,
        moisture: 0,
        light: 0,
        count: 0,
        countPh: 0,
        countTemp: 0,
        countHumidity: 0,
        countSmell: 0,
        countMoisture: 0,
        countLight: 0,
        minTemp: 40,
        maxTemp: 80,
        minHumidity: 20,
        maxHumidity: 60,
        minSmell: 75,
        maxSmell: 150,
        minMoisture: 25,
        maxMoisture: 70,
        minLight: 400,
        maxLight: 1000,
      };
    }
    await Promise.all(
      HealthDataFromAPI.map(async (note) => {
        console.log("NOTE: " + note);
        console.log("SET HEALTH: " + note.name + " " + note.temperatureLow);
        plantData[note.name].minTemp = note.temperatureLow;
        plantData[note.name].maxTemp = note.temperatureHigh;
        plantData[note.name].minHumidity = note.humidityLow;
        plantData[note.name].maxHumidity = note.humidityHigh;
        plantData[note.name].minSmell = note.smellLow;
        plantData[note.name].maxSmell = note.smellHigh;
        plantData[note.name].minMoisture = note.moistureLow;
        plantData[note.name].maxMoisture = note.moistureHigh;
        plantData[note.name].minLight = note.lightLow;
        plantData[note.name].maxLight = note.lightHigh;
        return note;
      })
    );
    console.log("FILTERED PLANTS: " + filteredNotes);
    await Promise.all(
      filteredNotes.map(async (note) => {
        if (note.pH != undefined && note.pH !== null) {
          pHCount++;
          pHSum += note.pH;
          chartPhData.push(parseFloat(note.pH));
          plantData[note.name].pH += note.pH;
          plantData[note.name].countPh++;
          labelsPH.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.temperature !== undefined && note.temperature !== null) {
          console.log("ONTEMP: " + note.name);
          chartTempData.push(parseFloat(note.temperature));
          plantData[note.name].temperature += note.temperature;
          plantData[note.name].countTemp++;
          labelsTemp.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.humidity != undefined && note.humidity !== null) {
          HumidityData.push(parseFloat(note.humidity));
          plantData[note.name].humidity += note.humidity;
          plantData[note.name].countHumidity++;
          labelsHumidity.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.smell != undefined && note.smell !== null) {
          SmellData.push(parseFloat(note.smell));
          plantData[note.name].smell += note.smell;
          plantData[note.name].countSmell++;
          labelsSmell.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.moisture != undefined && note.moisture !== null) {
          MoistureData.push(parseFloat(note.moisture));
          plantData[note.name].moisture += note.moisture;
          plantData[note.name].countMoisture++;
          labelsMoisture.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.light != undefined && note.light !== null) {
          LightData.push(parseFloat(note.light));
          plantData[note.name].light += note.light;
          plantData[note.name].countLight++;
          labelsLight.push(new Date(note.createdAt).toLocaleString());
        }
        plantData[note.name].count++;
        return note;
      })
    );
    console.log("DATA: " + plantData);
    Object.keys(plantData).forEach((key) => {
      var plant = plantData[key];
      console.log(
        "PLANT: " + key + " " + plant.temperature + " " + plant.minTemp
      );
      var localpHPercent = 0;
      var localTempPercent = 0;
      var localHumidityPercent = 0;
      var localSmellPercent = 0;
      var localMoisturePercent = 0;
      var localLightPercent = 0;
      minTemp = plant.minTemp;
      maxTemp = plant.maxTemp;
      minHumidity = plant.minHumidity;
      maxHumidity = plant.maxHumidity;
      minSmell = plant.minSmell;
      maxSmell = plant.maxSmell;
      minMoisture = plant.minMoisture;
      maxMoisture = plant.maxMoisture;
      minLight = plant.minLight;
      maxLight = plant.maxLight;
      console.log("MIN: " + key + " " + minTemp);

      if (plant.countPh != 0) {
        localpHPercent = plant.pH / plant.countPh;
        localpHPercent =
          0.3 + ((localpHPercent - minpH) / (maxpH - minpH)) * 0.4;
      }
      if (plant.countTemp != 0) {
        tempCount += 1;
        localTempPercent = plant.temperature / plant.countTemp;
        localTempPercent =
          0.3 + ((localTempPercent - minTemp) / (maxTemp - minTemp)) * 0.4;
      }
      if (plant.countHumidity != 0) {
        humidityCount += 1;
        localHumidityPercent = plant.humidity / plant.countHumidity;
        localHumidityPercent =
          0.3 +
          ((localHumidityPercent - minHumidity) / (maxHumidity - minHumidity)) *
            0.4;
      }
      if (plant.countSmell != 0) {
        smellCount += 1;
        localSmellPercent = plant.smell / plant.countSmell;
        localSmellPercent =
          0.3 + ((localSmellPercent - minSmell) / (maxSmell - minSmell)) * 0.4;
      }
      if (plant.countMoisture != 0) {
        moistureCount += 1;
        localMoisturePercent = plant.moisture / plant.countMoisture;
        localMoisturePercent =
          0.3 +
          ((localMoisturePercent - minMoisture) / (maxMoisture - minMoisture)) *
            0.4;
      }
      if (plant.countLight != 0) {
        lightCount += 1;
        localLightPercent = plant.light / plant.countLight;
        localLightPercent =
          0.3 + ((localLightPercent - minLight) / (maxLight - minLight)) * 0.4;
      }

      if (localTempPercent > 1) {
        localTempPercent = 1;
      } else if (localTempPercent < 0) {
        localTempPercent = 0;
      }
      if (localHumidityPercent > 1) {
        localHumidityPercent = 1;
      } else if (localHumidityPercent < 0) {
        localHumidityPercent = 0;
      }
      if (localSmellPercent > 1) {
        localSmellPercent = 1;
      } else if (localSmellPercent < 0) {
        localSmellPercent = 0;
      }
      if (localMoisturePercent > 1) {
        localMoisturePercent = 1;
      } else if (localMoisturePercent < 0) {
        localMoisturePercent = 0;
      }
      if (localLightPercent > 1) {
        localLightPercent = 1;
      } else if (localLightPercent < 0) {
        localLightPercent = 0;
      }

      tempSum += localTempPercent;
      console.log("TEMP SUM: " + tempSum + " " + localTempPercent);
      humiditySum += localHumidityPercent;
      smellSum += localSmellPercent;
      moistureSum += localMoisturePercent;
      lightSum += localLightPercent;

      if (filteredPlant != "All Plants") {
        tempPercent = localTempPercent;
        humidityPercent = localHumidityPercent;
        smellPercent = localSmellPercent;
        moisturePercent = localMoisturePercent;
        lightPercent = localLightPercent;
      }

      if (
        localTempPercent < 0.3 ||
        localTempPercent > 0.7 ||
        localHumidityPercent < 0.3 ||
        localHumidityPercent > 0.7 ||
        localSmellPercent < 0.3 ||
        localSmellPercent > 0.7 ||
        localMoisturePercent < 0.3 ||
        localMoisturePercent > 0.7 ||
        localLightPercent < 0.3 ||
        localLightPercent > 0.7
      ) {
        var temperatureText = "";
        var humidityText = "";
        var smellText = "";
        var moistureText = "";
        var lightText = "";

        if (localTempPercent < 0.3) {
          temperatureText = "Low";
        } else if (localTempPercent > 0.7) {
          temperatureText = "High";
        } else {
          temperatureText = "Normal";
        }

        if (localLightPercent < 0.3) {
          lightText = "Low";
        } else if (localLightPercent > 0.7) {
          lightText = "High";
        } else {
          lightText = "Normal";
        }

        if (localHumidityPercent < 0.3) {
          humidityText = "Low";
        } else if (localHumidityPercent > 0.7) {
          humidityText = "High";
        } else {
          humidityText = "Normal";
        }

        if (localSmellPercent < 0.3) {
          smellText = "Low";
        } else if (localSmellPercent > 0.7) {
          smellText = "High";
        } else {
          smellText = "Normal";
        }

        if (localMoisturePercent < 0.3) {
          moistureText = "Low";
        } else if (localMoisturePercent > 0.7) {
          moistureText = "High";
        } else {
          moistureText = "Normal";
        }
        console.log("SICK: " + key);
        sickPlants.push([
          key,
          temperatureText,
          humidityText,
          smellText,
          moistureText,
          lightText,
        ]);
      }
    });

    if (filteredPlant == "All Plants") {
      if (tempCount != 0) tempPercent = tempSum / tempCount;
      if (humidityCount != 0) humidityPercent = humiditySum / humidityCount;
      if (smellCount != 0) smellPercent = smellSum / smellCount;
      if (moistureCount != 0) moisturePercent = moistureSum / moistureCount;
      if (lightCount != 0) lightPercent = lightSum / lightCount;
    }
    if (tempPercent > 1) {
      tempPercent = 1;
    } else if (tempPercent < 0) {
      tempPercent = 0;
    }
    if (humidityPercent > 1) {
      humidityPercent = 1;
    } else if (humidityPercent < 0) {
      humidityPercent = 0;
    }
    if (smellPercent > 1) {
      smellPercent = 1;
    } else if (smellPercent < 0) {
      smellPercent = 0;
    }
    if (moisturePercent > 1) {
      moisturePercent = 1;
    } else if (moisturePercent < 0) {
      moisturePercent = 0;
    }
    if (lightPercent > 1) {
      lightPercent = 1;
    } else if (lightPercent < 0) {
      lightPercent = 0;
    }

    if (sickPlants.length > 0) {
      resultImage = cross;
    } else {
      resultImage = check;
    }

    setOptions(temporaryOptions);
    setFilteredNotes(filteredNotes);
    setNotes(notesFromAPI);
    setHealthParameters(HealthDataFromAPI);
  }

  const chartTemperatureData = {
    labels: labelsTemp,
    datasets: [
      {
        label: "Plant Temperature Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: chartTempData,
      },
    ],
  };

  const chartPHData = {
    labels: labelsPH,
    datasets: [
      {
        label: "Plant Ph Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: chartPhData,
      },
    ],
  };
  const chartHumidityData = {
    labels: labelsHumidity,
    datasets: [
      {
        label: "Plant Humidity Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: HumidityData,
      },
    ],
  };
  const chartSmellData = {
    labels: labelsSmell,
    datasets: [
      {
        label: "Plant Smell Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: SmellData,
      },
    ],
  };
  const chartMoistureData = {
    labels: labelsMoisture,
    datasets: [
      {
        label: "Plant Moisture Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: MoistureData,
      },
    ],
  };
  const chartLightData = {
    labels: labelsLight,
    datasets: [
      {
        label: "Plant Light Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: LightData,
      },
    ],
  };

  /**
 * Called by the data form to add a plant entry to the database, which we used for testing the site and front end connection.
 * Stores the retrieved data in a object and calls the predefined mutation to upload it to the table.
 * Calls fetchNotes to update the visual elements.
 * @param {object} event - Event submitted by form holds form data which can be parsed to retrieve plant data
 * @function createNote
 * @async
 */
  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    //const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      temperature: form.get("Temperature"),
      //image: image.name,
      username: user,
      humidity: form.get("humidity"),
      smell: form.get("smell"),
      moisture: form.get("moisture"),
      light: form.get("light"),
    };
    //if (!!data.image)
    //await uploadData({
    //key: data.name,
    //data: image,
    //});
    await client.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  /**
 * Called by the data form to add a plant health parameters to the corresponding table.
 * Stores the retrieved data in a object and calls the predefined mutation to upload it to the table.
 * Calls fetchNotes to update the visual elements.
 * @param {object} event - Event submitted by form holds form data which can be parsed to retrieve plant parameter data.
 * @function createHealthParameters
 * @async
 */
  async function createHealthParameters(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    //const image = form.get("image");
    const data = {
      name: form.get("name"),
      temperatureLow: form.get("Low Temperature"),
      temperatureHigh: form.get("High Temperature"),
      username: user,
      humidityLow: form.get("Low Humidity"),
      humidityHigh: form.get("High Humidity"),
      smellLow: form.get("Low Smell"),
      smellHigh: form.get("High Smell"),
      moistureLow: form.get("Low Moisture"),
      moistureHigh: form.get("High Moisture"),
      lightLow: form.get("Low Light"),
      lightHigh: form.get("High Light"),
    };
    await client.graphql({
      query: createHealthParametersMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  /**
 * Deletes a entry from the main data table. Filters the global variable containing the data to remove entries matching the given id.
 * Calls the deleteNoteMutation that was defined by Amplify to remove the entry from the table
 * @param {string} id - Id of the plant to be deleted.
 * @param {string} name - Name of the plant to be deleted.
 * @function deleteNote
 * @async
 */
  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await remove({ key: name });
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
    fetchNotes();
  }

  /**
 * Deletes a entry from the parameters table. Filters the global variable containing the data to remove entries matching the given id.
 * Calls the deletehealthParametersMutation that was defined by Amplify to remove the entry from the table
 * @param {string} id - Id of the parameter entry to be deleted.
 * @param {string} name - Name of the plant parameter entry to be deleted.
 * @function deleteHealthParameters
 * @async
 */
  async function deleteHealthParameters(id, name) {
    const newNotes = healthParameters.filter((note) => note.id !== id);
    setHealthParameters(newNotes);
    console.log("DELETE " + id);
    await client.graphql({
      query: deleteHealthParametersMutation,
      variables: { input: { id } },
    });
    fetchNotes();
  }

  /**
 * Deletes a entry from the main data table. Filters the global variable containing the data to remove entries matching the given id.
 * Calls the deleteNoteMutation that was defined by Amplify to remove the entry from the table
 * @param {Array} data - Array of floats that contains the numbers used in the line chart.
 * @param {string} title - The title of the chart which corresponds to the characteristic it is displaying
 * @function LineChart
 */
  const LineChart = (data, title) => {
    //data.labels = labels;

    return (
      <div>
        <Heading level={2}>{title}</Heading>
        <div className="history-chart">
          <Line
            data={data}
            width={"30%"}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <NavBar signOut={signOut} />
      <View className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                createNote={createNote}
                LineChart={LineChart}
                DataTable={DataTable}
                chartPHData={chartPHData}
                chartTemperatureData={chartTemperatureData}
                chartHumidityData={chartHumidityData}
                chartSmellData={chartSmellData}
                chartMoistureData={chartMoistureData}
                chartLightData={chartLightData}
                selectFilter={selectFilter}
                options={options}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                signOut={signOut}
                createNote={createNote}
                LineChart={LineChart}
                DataTable={DataTable}
                chartPHData={chartPHData}
                chartTemperatureData={chartTemperatureData}
                chartHumidityData={chartHumidityData}
                chartSmellData={chartSmellData}
                chartMoistureData={chartMoistureData}
                chartLightData={chartLightData}
                selectFilter={selectFilter}
                options={options}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                signOut={signOut}
                createHealthParameters={createHealthParameters}
                deleteHealthParameters={deleteHealthParameters}
                healthParameters={healthParameters}
              />
            }
          />
        </Routes>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    </BrowserRouter>
  );
};

/**
 * Defines the History component which is rendered on the History page.
 * This contains the line charts for each characteristic, as well as the table which shows all the data collected.
 * @function History
 */
const History = ({
  signOut,
  createNote,
  LineChart,
  DataTable,
  chartPHData,
  chartTemperatureData,
  chartHumidityData,
  chartSmellData,
  chartMoistureData,
  chartLightData,
  selectFilter,
  options,
}) => (
  <Fragment>
    <div className="plantFilter">
      <label>
        Filter Plants{" "}
        <select default="All Plants" onChange={selectFilter}>
          {options.map((option, index) => (
            <option key={index} value={option.value} label={options.label}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
    <View>
      {LineChart(chartTemperatureData, "Temperature")}
      {LineChart(chartHumidityData, "Humidity")}
      {LineChart(chartSmellData, "Smell")}
      {LineChart(chartMoistureData, "Moisture")}
      {LineChart(chartLightData, "Light")}
      <div className="history-table">
        <Flex direction="row" justifyContent="center">
          {DataTable()}
        </Flex>
      </div>
    </View>
  </Fragment>
);

/**
 * Defines the Settings component which is rendered on the Settings page.
 * This displays the current parameters the user has uploaded for each plant, and also allows them to delete these parameters
 * There is also a form the user can fill out to upload new parameter data.
 * @function Settings
 */
const Settings = ({
  signOut,
  createHealthParameters,
  deleteHealthParameters,
  healthParameters,
}) => (
  <Fragment>
    <Heading level={1}>Settings</Heading>
    <View
      as="form"
      margin="3rem 0"
      onSubmit={createHealthParameters}
      className="plantEntry"
    >
      <Flex direction="row" justifyContent="center">
        <TextField
          name="name"
          placeholder="Plant Name"
          label="Plant Name"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="Low Temperature"
          placeholder="Low Temperature"
          label="Low Temperature"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="High Temperature"
          placeholder="High Temperature"
          label="High Temperature"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="Low Humidity"
          placeholder="Low Humidity"
          label="Low Humidity"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="High Humidity"
          placeholder="High Humidity"
          label="High Humidity"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="Low Smell"
          placeholder="Low Smell"
          label="Low Smell"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="High Smell"
          placeholder="High Smell"
          label="High Smell"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="Low Moisture"
          placeholder="Low Moisture"
          label="Low Moisture"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="High Moisture"
          placeholder="High Moisture"
          label="High Moisture"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="Low Light"
          placeholder="Low Light"
          label="Low Light"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="High Light"
          placeholder="High Light"
          label="High Light"
          labelHidden
          variation="quiet"
          required
        />
        <Button type="submit" variation="primary">
          Upload Plant Parameters
        </Button>
      </Flex>
    </View>
    <div className="history-table">
      <Flex direction="row" justifyContent="center">
        <div>
          <table
            style={{
              width: "1100px",
              borderWidth: "1px",
              borderColor: "black",
              borderRadius: "10px",
              borderSpacing: "0px",
            }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "grey" }}>Plant</th>
                <th style={{ backgroundColor: "grey" }}>Min Temperature(F)</th>
                <th style={{ backgroundColor: "grey" }}>Max Temperature(F)</th>
                <th style={{ backgroundColor: "grey" }}>Min Humidity(%)</th>
                <th style={{ backgroundColor: "grey" }}>Max Humidity(%)</th>
                <th style={{ backgroundColor: "grey" }}>Min Smell</th>
                <th style={{ backgroundColor: "grey" }}>Max Smell</th>
                <th style={{ backgroundColor: "grey" }}>Min Moisture(%)</th>
                <th style={{ backgroundColor: "grey" }}>Max Moisture(%)</th>
                <th style={{ backgroundColor: "grey" }}>Min Light(lm)</th>
                <th style={{ backgroundColor: "grey" }}>Max Light(lm)</th>
                <th style={{ backgroundColor: "grey" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {healthParameters.map((plant) => (
                <tr key={plant.name}>
                  <td style={rowStyle}>{plant.name}</td>
                  <td style={rowStyle}>{plant.temperatureLow}</td>
                  <td style={rowStyle}>{plant.temperatureHigh}</td>
                  <td style={rowStyle}>{plant.humidityLow}</td>
                  <td style={rowStyle}>{plant.humidityHigh}</td>
                  <td style={rowStyle}>{plant.smellLow}</td>
                  <td style={rowStyle}>{plant.smellHigh}</td>
                  <td style={rowStyle}>{plant.moistureLow}</td>
                  <td style={rowStyle}>{plant.moistureHigh}</td>
                  <td style={rowStyle}>{plant.lightLow}</td>
                  <td style={rowStyle}>{plant.lightHigh}</td>
                  <td style={rowStyle}>
                    {
                      <Button
                        variation="link"
                        onClick={() =>
                          deleteHealthParameters(plant.id, plant.name)
                        }
                      >
                        Delete Plant Parameters
                      </Button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Flex>
    </div>
  </Fragment>
);

/**
 * Defines the Home component which is rendered on the Home page.
 * This contains the gauges used to show if each characteristic is too high or low.
 * It renders one of two images depending on whether the user has any sick plants, and displays these sick plants in a table.
 * @function Home
 */
const Home = ({
  createNote,
  LineChart,
  DataTable,
  chartPHData,
  chartTemperatureData,
  chartHumidityData,
  chartSmellData,
  chartMoistureData,
  chartLightData,
  selectFilter,
  options,
}) => (
  <Fragment>
    <div className="plantFilter">
      <label>
        <Text>Filter Plants</Text>
        <select default="All Plants" onChange={selectFilter}>
          {options.map((option, index) => (
            <option key={index} value={option.value} label={options.label}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>

    {/* <Flex direction="row" justifyContent="center">
      <Heading level={2}>Plant Data</Heading>
    </Flex> */}
    <div>
      <Flex direction="row" justifyContent="center">
        <img src={resultImage} width={400} height={200} />
        <div className="sickPlant">
          <table
            style={{
              width: "1000px",
              borderWidth: "1px",
              borderColor: "black",
              borderRadius: "10px",
              borderSpacing: "0px",
            }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "grey" }}>List of Sick Plants</th>
                <th style={{ backgroundColor: "grey" }}>Temperature(F)</th>
                <th style={{ backgroundColor: "grey" }}>Humidity(%)</th>
                <th style={{ backgroundColor: "grey" }}>Smell</th>
                <th style={{ backgroundColor: "grey" }}>Moisture(%)</th>
                <th style={{ backgroundColor: "grey" }}>Light(lm)</th>
              </tr>
            </thead>
            <tbody>
              {sickPlants.map((plant) => (
                <tr key={plant[0]}>
                  <td style={rowStyle}>{plant[0]}</td>
                  <td style={rowStyle}>{plant[1]}</td>
                  <td style={rowStyle}>{plant[2]}</td>
                  <td style={rowStyle}>{plant[3]}</td>
                  <td style={rowStyle}>{plant[4]}</td>
                  <td style={rowStyle}>{plant[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Flex>
    </div>

    <Gauges
      tempPercent={tempPercent}
      humidityPercent={humidityPercent}
      smellPercent={smellPercent}
      lightPercent={lightPercent}
      moisturePercent={moisturePercent}
    ></Gauges>
    <Flex direction="row" justifyContent="center"></Flex>
    <View as="form" onSubmit={createNote} className="plantEntry">
      <Flex direction="row" justifyContent="center">
        <TextField
          name="name"
          placeholder="Plant Name"
          label="Plant Name"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="description"
          placeholder="Plant Description"
          label="Plant Description"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="Temperature"
          placeholder="Temperature"
          label="Temperature"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="humidity"
          placeholder="humidity"
          label="humidity"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="smell"
          placeholder="smell"
          label="smell"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="moisture"
          placeholder="moisture"
          label="moisture"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="light"
          placeholder="light"
          label="light"
          labelHidden
          variation="quiet"
          required
        />
        <Button type="submit" variation="primary">
          Upload Plant
        </Button>
      </Flex>
    </View>
  </Fragment>
);

/**
 * Defines each of the five gauges used to display the state of the health characteristics.
 * @function Gauges
 */
const Gauges = ({
  tempPercent,
  humidityPercent,
  smellPercent,
  moisturePercent,
  lightPercent,
}) => {
  return (
    <div className="gauges">
      <View className="gauge">
        <Heading level={2} className="gauge-title">
          Temperature
        </Heading>
        <GaugeChart
          id="temperature-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          colors={["#0000FF", "#00FF00", "#FF0000"]}
          percent={Number(tempPercent)}
        />
      </View>
      <View className="gauge">
        <Heading level={2} className="gauge-title">
          Humidity
        </Heading>
        <GaugeChart
          id="humidity-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          colors={["#0000FF", "#00FF00", "#FF0000"]}
          percent={Number(humidityPercent)}
        />
      </View>
      <View className="gauge">
        <Heading level={2} className="gauge-title">
          Smell
        </Heading>
        <GaugeChart
          id="smell-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          colors={["#0000FF", "#00FF00", "#FF0000"]}
          percent={Number(smellPercent)}
        />
      </View>
      <View className="gauge">
        <Heading level={2} className="gauge-title">
          Moisture
        </Heading>
        <GaugeChart
          id="moisture-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          colors={["#0000FF", "#00FF00", "#FF0000"]}
          percent={Number(moisturePercent)}
        />
      </View>
      <View className="gauge">
        <Heading level={2} className="gauge-title">
          Light
        </Heading>
        <GaugeChart
          id="light-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          colors={["#0000FF", "#00FF00", "#FF0000"]}
          percent={Number(lightPercent)}
        />
      </View>
    </div>
  );
};

export default withAuthenticator(App);