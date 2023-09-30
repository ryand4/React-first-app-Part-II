// src/MyApp.js
import React from "react";
import Table from "./Table";

export default MyApp;

const characters = [
    {
      name: "Charlie",
      job: "Janitor",
    },
    {
      name: "Mac",
      job: "Bouncer",
    },
    {
      name: "Dee",
      job: "Aspring actress",
    },
    {
      name: "Dennis",
      job: "Bartender",
    },
  ];
  
  function MyApp() {
    return (
        <div className="container">
          <Table characterData={characters} />
        </div>
      );
  }