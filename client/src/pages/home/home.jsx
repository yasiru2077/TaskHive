import React, { useEffect, useState } from "react";

function Home({ isAuthenticated }) {
  console.log("jfosjofjos", isAuthenticated);

  const [x, setx] = useState("");

  useEffect(() => {
    if (isAuthenticated === true) {
      setx("gshgshgks");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div>Home</div>
      <ol>
        <li>{x}</li>
      </ol>
    </div>
  );
}

export default Home;
