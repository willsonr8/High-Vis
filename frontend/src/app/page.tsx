import React from "react";
import UserInterface from "@/components/UserInterface";
import NavBar from "@/components/NavBar";
import HomePage from "@/components/HomePage";

const Home: React.FC = () => {
  return (
      <div className={"all-container"}>
          {/*<UserInterface backendName={"flask"}/>*/}
          <NavBar/>
          <HomePage/>
      </div>
  )
}

export default Home;