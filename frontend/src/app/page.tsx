import React from "react";
import UserInterface from "@/components/UserInterface";
import HomePage from "@/components/HomePage";

const Home: React.FC = () => {
  return (
      <div>
          {/*<UserInterface backendName={"flask"}/>*/}
          <HomePage></HomePage>
      </div>
  )
}

export default Home;