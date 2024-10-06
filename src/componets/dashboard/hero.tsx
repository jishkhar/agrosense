import React from "react";

const Hero: React.FC = () => {
  return (
    <> 
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        {/* Country Dropdown */}
        <div>
          <select 
            defaultValue="" 
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#006400",  // background
              color: "white",             //  text
              borderRadius: "5px",       // Rounded corners
              border: "1px solid #ccc",  // Light border
              width: "150px",            // Width to make it look better
              cursor: "pointer"          // Pointer cursor on hover
            }}
          >
            <option value="" disabled>Country</option>  {/* Placeholder */}
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>

        {/* State Dropdown */}
        <div>
          <select 
            defaultValue="" 
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#006400",  // background
              color: "white", 
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "150px",
              cursor: "pointer"
            }}
          >
            <option value="" disabled>State</option>
            <option value="KA">Karnataka</option>
            <option value="NY">New York</option>
            <option value="ON">Ontario</option>
          </select>
        </div>

        {/* City Dropdown */}
        <div>
          <select 
            defaultValue="" 
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#006400",  // background
              color: "white", 
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "150px",
              cursor: "pointer"
            }}
          >
            <option value="" disabled>City  </option>
            <option value="Bangalore">Bangalore</option>
            <option value="NewYorkCity">New York City</option>
            <option value="Toronto">Toronto</option>
          </select>
        </div>

        {/* Village Dropdown */}
        <div>
          <select 
            defaultValue="" 
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#006400",  // background
              color: "white", 
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "150px",
              cursor: "pointer"
            }}
          >
            <option value="" disabled>Village </option>
            <option value="Bangalore">any village</option>
            <option value="NewYorkCity">New York City</option>
            <option value="Toronto">Toronto</option>
          </select>
        </div>

        {/* submit button  */}
    <div >
      <button 
        type="submit" 
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",  // Green background
          color: "white",               // White text
          border: "none",               // No border
          borderRadius: "5px",          // Rounded corners
          cursor: "pointer",            // Pointer on hover
          outline: "none"               // No outline when focused
        }}
      >
        Submit
      </button>
    </div>
      </div>
    </>
  );
};

export default Hero;
