import React, { Fragment } from 'react'
import image1 from "../Assets/3.jpg"
import "./about.css"

const About = () => {
  return (
    <Fragment>
         <center ><h1 className='heading'>About Us</h1></center> 
        <div className='aboutcontainer'>
        
        
        
        <div className='aboutbox'>
            <div className='left'>
                <img className='aboutimg' src={image1} alt="" />
            </div>
            <div className='right'>
                <h1>who we are</h1>
                <h2>Building Dreams, Delivering Excellence</h2>
                <h3>Our Story </h3>
                <p>DDT was founded in 2000 with a vision to transform the construction and real estate landscape. Our team of experienced professionals shares a passion for building exceptional spaces that exceed our clients' expectations. With a commitment to quality, integrity, and innovation, we've established ourselves as a leading construction and real estate company</p>
                <h3>Our Mission</h3>
                <p>To deliver exceptional construction and real estate solutions that enhance lifestyles, foster communities, and build lasting relationships.
                                            </p>
                <h3>Our Values
                </h3>
                <ul>
                  <li>Quality: Uncompromising commitment to excellence.</li>
                  <li>Integrity: Transparency, honesty, and fairness in all dealings.</li>
                  <li>Innovation: Embracing cutting-edge technology and sustainable practices.</li>
                  <li>Customer-Centric: Prioritizing client needs and satisfaction.</li>
                  <li>Teamwork: Collaborative spirit and mutual respect.</li>
                </ul>
                <h3>Our Expertise</h3>
              <ul>
                <li> Construction: Residential, commercial, industrial, and infrastructure projects.</li>
                <li> Real Estate: Development, sales, marketing, and property management.</li>
                <li> Design-Build: Integrated design and construction services.</li>
              </ul>
                <h3>Our Achievements</h3>
                
                <ul>
                  <li>220+ Construction completed</li>
                  <li>550+ Properties sold</li>
                </ul>
                





            </div>
        </div>
        </div>
    </Fragment>
  )
}

export default About