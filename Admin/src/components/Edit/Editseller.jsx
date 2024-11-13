import axios from 'axios';
import React, { Fragment, useState } from 'react';
const APIURL = process.env.REACT_APP_API_URL;

const Editseller = ({ data }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [state, setState] = useState(data.state);
    const [district, setDistrict] = useState(data.district);
    const [propertytype, setPropertyType] = useState(data.propertytype);
    const [propertyId, setPropertyId] = useState(data.propertyId);
    const [companyName, setCompanyName] = useState(data.companyName);
    const [aboutCompany, setAboutCompany] = useState(data.aboutCompany);
    const [propertyName, setPropertyName] = useState(data.propertyName);
    const [propertyDetails, setPropertyDetails] = useState(data.propertyDetails);
    const [features, setFeatures] = useState(data.features);
    const [amenities, setAmenities] = useState(data.amenities);
    const [noOfPlots, setNoOfPlots] = useState(data.noOfPlots);
    const [plotSizeMin, setPlotSizeMin] = useState(data.plotSizeMin);
    const [plotSizeMax, setPlotSizeMax] = useState(data.plotSizeMax);
    const [location, setLocation] = useState(data.location);
    const [nearbySpots, setNearbySpots] = useState(data.nearbySpots);
    const [legalities, setLegalities] = useState(data.legalities);
    const [address, setAddress] = useState(data.address);
    const [place, setPlace] = useState(data.place);
    const [googleMap, setGoogleMap] = useState(data.googleMap);
    const [launchDate, setLaunchDate] = useState(data.launchDate);
    const [plotPrice, setPlotPrice] = useState(data.plotPrice);
    const [plot, setPlot] = useState({
        one: data.plot.one,
        two: data.plot.two,
        three: data.plot.three,
        four: data.plot.four,
        five: data.plot.five,
        six: data.plot.six,
        seven: data.plot.seven,
        eight: data.plot.eight,
        nine: data.plot.nine,
        ten: data.plot.ten
    });

const updateproperty = {
    state,
    district,
    propertytype,
    propertyId,
    companyName,
    aboutCompany,
    propertyName,
    propertyDetails,
    features,
    amenities,
    noOfPlots,
    plotSizeMin,
    plotSizeMax,
    location,
    nearbySpots,
    legalities,
    address,
    place,
    googleMap,
    launchDate,
    plotPrice,
    plot
}

    const saveChanges = () => {
        setIsSaving(true);
        axios.put(`${APIURL}editproperty/${data._id}`,updateproperty )
            .then(response => {
                console.log('Update successful:', response.data);
                setIsSaving(false);
            })
            .catch(error => {
                console.error('There was an error updating the data!', error);
                setErrorMessage('Failed to update data');
                setIsSaving(false);
            });
    };

    const resetChanges = () => {
        setState(data.state);
        setDistrict(data.district);
        setPropertyType(data.propertytype);
        setPropertyId(data.propertyId);
        setCompanyName(data.companyName);
        setAboutCompany(data.aboutCompany);
        setPropertyName(data.propertyName);
        setPropertyDetails(data.propertyDetails);
        setFeatures(data.features);
        setAmenities(data.amenities);
        setNoOfPlots(data.noOfPlots);
        setPlotSizeMin(data.plotSizeMin);
        setPlotSizeMax(data.plotSizeMax);
        setLocation(data.location);
        setNearbySpots(data.nearbySpots);
        setLegalities(data.legalities);
        setAddress(data.address);
        setPlace(data.place);
        setGoogleMap(data.googleMap);
        setLaunchDate(data.launchDate);
        setPlotPrice(data.plotPrice);
        setPlot({
            one: data.plot.one,
            two: data.plot.two,
            three: data.plot.three,
            four: data.plot.four,
            five: data.plot.five,
            six: data.plot.six,
            seven: data.plot.seven,
            eight: data.plot.eight,
            nine: data.plot.nine,
            ten: data.plot.ten
        });
        setErrorMessage('');
    };
    

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#id${data._id}`}
            >
                Edit
            </button>

            <div className="modal fade" id={`id${data._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User Data</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetChanges}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District" />
                            <input type="text" value={propertytype} onChange={(e) => setPropertyType(e.target.value)} placeholder="Property Type" />
                            <input type="text" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} placeholder="Property ID" />
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
                            <input type="text" value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} placeholder="About Company" />
                            <input type="text" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} placeholder="Property Name" />
                            <input type="text" value={propertyDetails} onChange={(e) => setPropertyDetails(e.target.value)} placeholder="Property Details" />
                            <input type="text" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Features" />
                            <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="Amenities" />
                            <input type="number" value={noOfPlots} onChange={(e) => setNoOfPlots(e.target.value)} placeholder="Number of Plots" />
                            <input type="number" value={plotSizeMin} onChange={(e) => setPlotSizeMin(e.target.value)} placeholder="Plot Size Min" />
                            <input type="number" value={plotSizeMax} onChange={(e) => setPlotSizeMax(e.target.value)} placeholder="Plot Size Max" />
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                            <input type="text" value={nearbySpots} onChange={(e) => setNearbySpots(e.target.value)} placeholder="Nearby Spots" />
                            <input type="text" value={legalities} onChange={(e) => setLegalities(e.target.value)} placeholder="Legalities" />
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Place" />
                            <input type="text" value={googleMap} onChange={(e) => setGoogleMap(e.target.value)} placeholder="Google Map Link" />
                            <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} placeholder="Launch Date" />
                            <input type="number" value={plotPrice} onChange={(e) => setPlotPrice(e.target.value)} placeholder="Plot Price" />
                            {/* Here, you can create a field for each plot if necessary */}
                            <input 
                                type="checkbox" 
                                checked={plot.one} 
                                onChange={(e) => setPlot({ ...plot, one: e.target.checked })} 
                                placeholder="Plot One" 
                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.two} 
                                                onChange={(e) => setPlot({ ...plot, two: e.target.checked })} 
                                                placeholder="Plot Two" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.three} 
                                                onChange={(e) => setPlot({ ...plot, three: e.target.checked })} 
                                                placeholder="Plot Three" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.four} 
                                                onChange={(e) => setPlot({ ...plot, four: e.target.checked })} 
                                                placeholder="Plot Four" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.five} 
                                                onChange={(e) => setPlot({ ...plot, five: e.target.checked })} 
                                                placeholder="Plot Five" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.six} 
                                                onChange={(e) => setPlot({ ...plot, six: e.target.checked })} 
                                                placeholder="Plot Six" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.seven} 
                                                onChange={(e) => setPlot({ ...plot, seven: e.target.checked })} 
                                                placeholder="Plot Seven" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.eight} 
                                                onChange={(e) => setPlot({ ...plot, eight: e.target.checked })} 
                                                placeholder="Plot Eight" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.nine} 
                                                onChange={(e) => setPlot({ ...plot, nine: e.target.checked })} 
                                                placeholder="Plot Nine" 
                                            />
                                            <input 
                                                type="checkbox" 
                                                checked={plot.ten} 
                                                onChange={(e) => setPlot({ ...plot, ten: e.target.checked })} 
                                                placeholder="Plot Ten" 
                                            />

                            
                            {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={resetChanges}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={saveChanges}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Editseller