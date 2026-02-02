import React, { useEffect } from "react";
import HospitalHerosections from "./components/HospitalHerosections";

function Hospital() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HospitalHerosections />
    </>
  );
}

export default Hospital;
