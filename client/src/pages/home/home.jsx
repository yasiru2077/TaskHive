import React, { useEffect, useState } from "react";
import AddingButton from "../../component/adding-button/adding-button";
import NotesContainer from "../../component/notes-container/notes-container";

function Home() {
  //maxwidth,marginauto

  return (
    <main>
      <section>Home</section>
      <section>
       <NotesContainer/>
      </section>
      <section className="">
       <AddingButton/>
      </section>
    </main>
  );
}

export default Home;
