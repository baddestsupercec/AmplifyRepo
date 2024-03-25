import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { useTable } from 'react-table';
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
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';
import GaugeChart from 'react-gauge-chart'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import styled from 'styled-components';
import NavBar from './ui-components/NavBar';

var labels = [];
var chartPhData = [];
var chartTempData = [];
var user;
var tempPercent = 0;
var pHPercent = 0;
const client = generateClient();

const tableStyle =  {
  width: '1000px',
  borderWidth: '1px',
  borderColor: 'black',
  borderStyle: 'solid',
  borderRadius: '10px',
  borderSpacing: '0px',
}

const rowStyle =  {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'black',
}

const chartStyle = {
    height: '100%',
    width: '100%',
}

const chartTemperatureData = {
  labels: labels,
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
  labels: labels,
  datasets: [
    {
      label: "Plant Ph Data",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: chartPhData,
    },
  ],
};


const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchNotes();
  }, []);
  async function currentAuthenticatedUser() {
      const {username} = await getCurrentUser();
      user = username;
  }

  const DataRow = ({id,name,description,username,pH,temperature,createdAt}) => 
  <tr  style = {rowStyle} key={id}>
    <td style = {rowStyle}>{name}</td>
    <td style = {rowStyle}>{description}</td>
    <td style = {rowStyle}>{username}</td>
    <td style = {rowStyle}>{pH}</td>
    <td style = {rowStyle}>{temperature}</td>
    <td style = {rowStyle}>{new Date(createdAt).toLocaleString()}</td>
    <td style = {rowStyle}>{<Button variation="link" onClick={() => deleteNote({id,name})}>
              Delete Plant
            </Button>}</td>
  </tr>

const DataTable = () =>
<div>
  <table  style={tableStyle}>
    <thead>
      <tr style = {rowStyle}>
      <th >Plant Name</th>
      <th >Description</th>
      <th >Username</th>
      <th >pH</th>
      <th >Temperature</th>
      <th >Date</th>
      <th >Edit</th>
      </tr>
    </thead>
    <tbody>
    {console.log(notes)}
    {notes.slice(0).reverse().map(DataRow)}
    </tbody>
  </table>
</div>
  async function fetchNotes() {
    await currentAuthenticatedUser();
    //labels = [];
    //chartTempData = [];
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
    notesFromAPI = notesFromAPI.filter(note => note.username === user);


    notesFromAPI.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

   // console.log(notesFromAPI);
    
    var pHCount = 0;
    var pHSum = 0;
    var tempCount = 0;
    var tempSum = 0;
    var maxpH = 7.5
    var maxTemp = 75;
    //chartPHData = [];
    //chartTempData = [];
    //console.log("clear")
    //labels = [];
    //chartTempData = [];
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.pH !=undefined && note.pH !== null) {
          pHCount++;
          pHSum+=note.pH;
          chartPhData.push(parseFloat(note.pH));
        }
        if (note.temperature !== undefined && note.temperature !== null) {
          tempCount++;
          //console.log("TC: " + tempCount)
          tempSum+=note.temperature;
          labels.push(new Date(note.createdAt).toLocaleString());
          //console.log("TEST: " + note.temperature);
          //console.log("TEST2: " + parseFloat(note.temperature));
          chartTempData.push(parseFloat(note.temperature));
          tempCount++;
          //console.log("TC: " + tempCount)
          tempSum+=note.temperature;
        }
        return note;
      })
    );
    //console.log(chartTempData);
    pHPercent = ((pHSum/pHCount))/maxpH;
    tempPercent = ((tempSum/tempCount))/maxTemp;
    if(pHPercent>1){
      pHPercent=1;
    }
    if(tempPercent>1){
      tempPercent=1;
    }
    //console.log("TEMP: "+tempPercent);
    //console.log("pH: "+pHPercent);


    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    console.log("USER: " + user)
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      pH: form.get("pH"),
      temperature: form.get("Temperature"),
      image: image.name,
      username: user,
    };
    if (!!data.image) await uploadData({
      key: data.name,
      data: image
    });
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
  }

  const LineChart = (data) => {
    //console.log("MAKE CHART");
    return (
      <div>
        <Line data={data} 
        width={"30%"}
        options={{ maintainAspectRatio: false }}/>
      </div>
    );
  };

  return (
    <View className="App">
      <NavBar />
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
            name="pH"
            placeholder="pH"
            label="pH"
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
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
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
        <View style={{
            flexDirection: 'row',
            height: 300,
            paddingTop: 80,
            width: 300,
            marginLeft:50,
        }}>
        <Heading level={2} width={300}>pH</Heading>
        <GaugeChart 
            id="ph-chart1" 
            style={chartStyle} 
            percent={Number(pHPercent)}
            justifyContent='center'
            hideText='True'/>
        </View>
        <View style={{
            flexDirection: 'row',
            height: 300,
            paddingTop: 80,
            width: 300,
        }}>
        <Heading level={2} width={300}>Temperature</Heading>
        <GaugeChart id="temperature-chart1" style={chartStyle} hideText='True' direction="row" justifyContent="center" percent={Number(tempPercent)}/>
        </View>
      </Flex>
      <View margin="3rem 0">
      {LineChart(chartTemperatureData)}
      {LineChart(chartPHData)}
      <Flex direction="row" justifyContent="center">
      {DataTable()}
      </Flex>
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);