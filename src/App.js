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
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
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
import cross from './cross.png'
import check from './check.png'

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
  width: "1000px",
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
  const [filteredDisplayNotes, setFilteredNotes] = useState([]);
  //const [filteredPlant, setFilter] = useState('All Plants');
  var filteredPlant = "All Plants";
  const [options, setOptions] = useState([
    { value: "All Plants", label: "All Plants" },
  ]);
  useEffect(() => {
    fetchNotes();
  }, []);

  async function currentAuthenticatedUser() {
    const {username, userId, signInDetails} = await getCurrentUser();
    user = username;
  }

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

  const DataTable = () => (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr style={rowStyle}>
            <th>Plant Name</th>
            <th>Description</th>
            <th>Username</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Smell</th>
            <th>Moisture</th>
            <th>Light</th>
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

  const selectFilter = (event) => {
    console.log("FILTER: " + event.target.value);
    filteredPlant = event.target.value;
    fetchNotes();
  };


  async function fetchNotes() {
    await currentAuthenticatedUser();
    console.log("START FETCH");
    //labels = [];
    chartTempData = [];
    chartPhData = [];
    HumidityData = [];
    LightData = [];
    MoistureData = [];
    SmellData = []
    const apiData = await client.graphql({ query: listNotes });
    var notesFromAPI = apiData.data.listNotes.items;
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

    notesFromAPI.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    var filteredNotes = notesFromAPI;
    if (filteredPlant != "All Plants") {
      filteredNotes = notesFromAPI.filter((note) => note.name == filteredPlant);
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
    if(filteredPlant=="All Plants"){
    usedNames.map((name) => {
      plantData[name] = { pH: 0, temperature: 0, humidity: 0, smell: 0, moisture: 0, light: 0, count: 0 ,countPh: 0,countTemp: 0,countHumidity: 0,countSmell: 0,countMoisture: 0,countLight: 0};
    });
  }
  else{
      plantData[filteredPlant] = { pH: 0, temperature: 0, humidity: 0, smell: 0, moisture: 0, light: 0, count: 0 ,countPh: 0,countTemp: 0,countHumidity: 0,countSmell: 0,countMoisture: 0,countLight: 0};
  }
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
          tempCount++;
          tempSum += note.temperature;
          chartTempData.push(parseFloat(note.temperature));
          console.log("ADD TEMP:"+note.temperature);
          tempCount++;
          tempSum += note.temperature;
          plantData[note.name].temperature += note.temperature;
          plantData[note.name].countTemp++;
          labelsTemp.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.humidity != undefined && note.humidity !== null) {
          humidityCount++;
          humiditySum += note.humidity;
          HumidityData.push(parseFloat(note.humidity));
          plantData[note.name].humidity += note.humidity;
          plantData[note.name].countHumidity++;
          labelsHumidity.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.smell != undefined && note.smell !== null) {
          smellCount++;
          smellSum += note.smell;
          SmellData.push(parseFloat(note.smell));
          plantData[note.name].smell += note.smell;
          plantData[note.name].countSmell++;
          labelsSmell.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.moisture != undefined && note.moisture !== null) {
          moistureCount++;
          moistureSum += note.moisture;
          MoistureData.push(parseFloat(note.moisture));
          plantData[note.name].moisture += note.moisture;
          plantData[note.name].countMoisture++;
          labelsMoisture.push(new Date(note.createdAt).toLocaleString());
        }
        if (note.light != undefined && note.light !== null) {
          lightCount++;
          lightSum += note.light;
          LightData.push(parseFloat(note.light));
          plantData[note.name].light += note.light;
          plantData[note.name].countLight++;
          labelsLight.push(new Date(note.createdAt).toLocaleString());
        }
        plantData[note.name].count++;
        return note;
      })
    );
    if(pHCount!=0){
    pHPercent = pHSum / pHCount;
    pHPercent = 0.3 + ((pHPercent - minpH) / (maxpH - minpH)) * 0.4;
    }
    else{
      pHPercent = 0;
    }
    if(tempCount!=0){
    tempPercent = tempSum / tempCount;
    tempPercent = 0.3 + ((tempPercent - minTemp) / (maxTemp - minTemp)) * 0.4;
    }
    else{
      tempPercent = 0;
    }
    if(humidityCount!=0){
    humidityPercent = humiditySum / humidityCount;
    humidityPercent = 0.3 + ((humidityPercent - minHumidity) / (maxHumidity - minHumidity)) * 0.4;
    }
    else{
      humidityPercent = 0;
    }
    if(smellCount!=0){
    smellPercent = smellSum / smellCount;
    smellPercent = 0.3 + ((smellPercent - minSmell) / (maxSmell - minSmell)) * 0.4;
    }
    else{
      smellPercent = 0;
    }
    if(moistureCount!=0){
    moisturePercent = moistureSum / moistureCount;
    moisturePercent = 0.3 + ((moisturePercent - minMoisture) / (maxMoisture - minMoisture)) * 0.4;
    }
    else{
      moisturePercent = 0;
    }
    if(lightCount!=0){
    lightPercent = lightSum / lightCount;
    lightPercent = 0.3 + ((lightPercent - minLight) / (maxLight - minLight)) * 0.4;
    }
    else{
      lightPercent = 0;
    }
    if (pHPercent > 1) {
      pHPercent = 1;
    }
    if (tempPercent > 1) {
      tempPercent = 1;
    }
    if (humidityPercent > 1) {
      humidityPercent = 1;
    }
    if (smellPercent > 1) {
      humidityPercent = 1;
    }
    if (moisturePercent > 1) {
      smellPercent = 1;
    }
    if (lightPercent > 1) {
      moisturePercent = 1;
    }

    Object.keys(plantData).forEach((key) => {
      var plant = plantData[key];
      console.log("PLANT: " + key)
      var localpHPercent = 0;
      var localTempPercent = 0;
      var localHumidityPercent = 0;
      var localSmellPercent = 0;
      var localMoisturePercent = 0;
      var localLightPercent = 0;

      if(plant.countPh=0){
      localpHPercent = plant.pH / plant.countPh;
      localpHPercent = 0.3 + ((localpHPercent - minpH) / (maxpH - minpH)) * 0.4;
      }
      if(plant.countTemp!=0){
      localTempPercent = plant.temperature / plant.countTemp;
      localTempPercent =
        0.3 + ((localTempPercent - minTemp) / (maxTemp - minTemp)) * 0.4;
      }
      if(plant.countHumidity!=0){
      localHumidityPercent = plant.humidity / plant.countHumidity;
      localHumidityPercent = 0.3 + ((localHumidityPercent - minHumidity) / (maxHumidity - minHumidity)) * 0.4;
      }
      if(plant.countSmell!=0){
      localSmellPercent = plant.smell / plant.countSmell;
      localSmellPercent = 0.3 + ((localSmellPercent - minSmell) / (maxSmell - minSmell)) * 0.4;
      }
      if(plant.countMoisture!=0){
      localMoisturePercent = plant.moisture / plant.countMoisture;
      localMoisturePercent = 0.3 + ((localMoisturePercent - minMoisture) / (maxMoisture - minMoisture)) * 0.4;
      }
      if(plant.countLight!=0){
      localLightPercent = plant.light / plant.countLight;
      localLightPercent = 0.3 + ((localLightPercent - minLight) / (maxLight - minLight)) * 0.4;
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
        console.log(key + " " + localTempPercent + " " + localHumidityPercent + " " + localSmellPercent + " " + localMoisturePercent + " " + localLightPercent)
        sickPlants.push(key);
      }
    });


    if(sickPlants.length >0){
      resultImage = cross;
    }
    else{
      resultImage = check;
    }


    setOptions(temporaryOptions);
    setFilteredNotes(filteredNotes);
    setNotes(notesFromAPI);
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

  const LineChart = (data) => {
    //data.labels = labels;

    return (
      <div>
        <Line
          data={data}
          width={"30%"}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  };

  return (
    <BrowserRouter>
      <View className="App">
        <NavBar signOut={signOut} />
        <label>
          {" "}
          Filter Plants
          <select default="All Plants" onChange={selectFilter}>
            {options.map((option, index) => (
              <option key={index} value={option.value} label={options.label}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
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
              />
            }
          />
          <Route path="/history" element={<History signOut={signOut} 
                createNote={createNote}
                LineChart={LineChart}
                DataTable={DataTable}
                chartPHData={chartPHData}
                chartTemperatureData={chartTemperatureData}
                chartHumidityData={chartHumidityData}
                chartSmellData={chartSmellData}
                chartMoistureData={chartMoistureData}
                chartLightData={chartLightData}
                />} />
          <Route path="/settings" element={<Settings signOut={signOut} />} />
        </Routes>
      </View>
    </BrowserRouter>
  );
};

const History = ({ signOut,createNote,
  LineChart,
  DataTable,
  chartPHData,
  chartTemperatureData,
  chartHumidityData,
  chartSmellData,
  chartMoistureData,
  chartLightData,}) => (
  <Fragment>
    <Heading level={1}>History</Heading>
    <View margin="3rem 0">
      {LineChart(chartTemperatureData)}
      {LineChart(chartHumidityData)}
      {LineChart(chartSmellData)}
      {LineChart(chartMoistureData)}
      {LineChart(chartLightData)}
      <Flex direction="row" justifyContent="center">
        {DataTable()}
      </Flex>
    </View>
  </Fragment>
);

const Settings = ({ signOut }) => (
  <Fragment>
    <Heading level={1}>Settings</Heading>
    <Text>Coming soon...</Text>
  </Fragment>
);

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
}) => (
  <Fragment>
    <View as="form" margin="3rem 0" onSubmit={createNote}>
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
    <Flex direction="row" justifyContent="center">
      <Heading level={2}>Plant Data</Heading>
    </Flex>
    <Flex direction="row" justifyContent="center">
    <img src={resultImage} width={400} height={300}/>
    </Flex>
    <Flex direction="row" justifyContent="center">
      <div>
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
              <td style={{ backgroundColor: "grey" }}>List of Sick Plants:</td>
            </tr>
          </thead>
          <tbody>
            {sickPlants.map((plant) => (
              <tr key={plant}>
                <td style={rowStyle}>{plant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Flex>
    <Flex direction="row" justifyContent="center">
      <View
        style={{
          flexDirection: "row",
          height: 300,
          paddingTop: 80,
          width: 300,
          marginLeft: 50,
        }}
      >
        <Heading level={2} width={300}>
          Temperature
        </Heading>
        <GaugeChart
          id="temperature-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          percent={Number(tempPercent)}
        />
        </View>
        <View
        style={{
          flexDirection: "row",
          height: 300,
          paddingTop: 80,
          width: 300,
        }}
      >
        <Heading level={2} width={300}>
          Humidity
        </Heading>
        <GaugeChart
          id="humidity-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          percent={Number(humidityPercent)}
        />
        </View>
        <View
        style={{
          flexDirection: "row",
          height: 300,
          paddingTop: 80,
          width: 300,
        }}
      >
        <Heading level={2} width={300}>
          Smell
        </Heading>
        <GaugeChart
          id="smell-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          percent={Number(smellPercent)}
        />
        </View>
        <View
        style={{
          flexDirection: "row",
          height: 300,
          paddingTop: 80,
          width: 300,
        }}
      >
        <Heading level={2} width={300}>
          Moisture
        </Heading>
        <GaugeChart
          id="moisture-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          percent={Number(moisturePercent)}
        />
        </View>
        <View
        style={{
          flexDirection: "row",
          height: 300,
          paddingTop: 80,
          width: 300,
        }}
      >
        <Heading level={2} width={300}>
          Light
        </Heading>
        <GaugeChart
          id="light-chart1"
          style={chartStyle}
          hideText="True"
          direction="row"
          justifyContent="center"
          percent={Number(lightPercent)}
        />
        </View>
    </Flex>
  </Fragment>
);

export default withAuthenticator(App);
