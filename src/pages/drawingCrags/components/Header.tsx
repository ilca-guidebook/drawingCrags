import React from 'react';

const Header = () => {
  return (
    <>
      <h2>Drawing Crags</h2>
      <div>
        <div>Welcome to the drawing crags app!</div>
        <div>
          To use the app:
          <ul>
            <li>Upload click on the upload crag image button to upload an image</li>
            <li>Give a name to a line and create a new line</li>
            <li>Start clicking on the image to draw the line points</li>
            <li>When done drawing a line, press "Escape" on keyboard to dismiss next point</li>
            <li>Export the result file using the Export Lines Data button</li>
          </ul>
        </div>
        <div style={{ fontSize: '90%', color: '#727272' }}>
          * You can also upload a previously generated file using the Import Lines Data button and
          edit Lines
          <br />
          Play around with the system a bit, we're sure you'll figure things out :)
        </div>
        <br />
      </div>
    </>
  );
};

export default Header;
