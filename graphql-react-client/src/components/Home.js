
import React, { Component }  from 'react';

//Write a homepage function to talk abut ambulance service system

function Home(props)
{


    return (
<div style={{ textAlign: "center", height: "700px"  }}>
    <img src='logo.png'></img>
    <h2> Crosscare Ambulance Service System</h2>
    <h4>Welcome to our website</h4>
    <p> This is a system that will help you to manage your ambulance service system. </p>
    <p> You can add, edit, delete and view your ambulance service system. </p>
    <p>Done by</p>
    <p>
        <ol style={{ listStyleType: 'upper-roman' }}>
            <li>Daivik Shetty</li>
            <li>Mithul Koshy</li>
            <li>Teena Abraham</li>
            <li>Vimal Mathew</li>
            <li>Vinny Vinnu</li>
        </ol>   
    </p>
</div>




    );

}

export default Home;