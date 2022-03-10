import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>YASH VERMA ⓒ {year} </p>
    </footer>
  );
}

export default Footer;
