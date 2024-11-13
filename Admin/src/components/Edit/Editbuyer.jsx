import axios from 'axios';
import React, { Fragment, useState } from 'react';
import "./editbuyer.css"
const APIURL = process.env.REACT_APP_API_URL;


const Edit = ({ data }) => {
    
    const [isSaving, setIsSaving] = useState(false); // To handle saving state
    const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages
    const [projectName, setProjectName] = useState(data.projectName );
    const [title, setTitle] = useState(data.title );
    const [saleType, setSaleType] = useState(data.saleType ); // dropdown or select option
    const [society, setSociety] = useState(data.society );
    
    // For checkboxes (DTCP, RERA)
    const [status, setStatus] = useState({
        dtcp: data.status.dtcp ,
        rera: data.status.rera ,
    });
    
    const [constructionStatus, setConstructionStatus] = useState(data.constructionStatus ); // dropdown or select option
    const [houseType, setHouseType] = useState(data.houseType );
    const [budget, setBudget] = useState(data.budget );
    const [buildUpArea, setBuildUpArea] = useState(data.buildUpArea );
    const [carpetArea, setCarpetArea] = useState(data.carpetArea );
    const [totalFloors, setTotalFloors] = useState(data.totalFloors );
    const [bedrooms, setBedrooms] = useState(data.bedrooms );
    const [bathrooms, setBathrooms] = useState(data.bathrooms );
    const [balcony, setBalcony] = useState(data.balcony );
    const [furnishing, setFurnishing] = useState(data.furnishing ); // dropdown or select option
    const [carParking, setCarParking] = useState(data.carParking );
    const [facing, setFacing] = useState(data.facing); // dropdown or select option
    const [description, setDescription] = useState(data.description );
    

    const updatenewhouse = {
        projectName,
        title,
        saleType,
        society,
        status,
        constructionStatus,
        houseType,
        budget,
        buildUpArea,
        carpetArea,
        totalFloors,
        bedrooms,
        bathrooms,
        balcony,
        furnishing,
        carParking,
        facing,
        description,
    };
    

    const saveChanges = () => {
        setIsSaving(true); // Set saving state to true
        axios.put(`${APIURL}editnewhouses/${data._id}`, updatenewhouse)
            .then(response => {
                console.log('Update successful:', response.data);
                setIsSaving(false); // Reset saving state after success
            })
            .catch(error => {
                console.error('There was an error updating the data!', error);
                setErrorMessage('Failed to update data'); // Set error message
                setIsSaving(false); // Reset saving state on error
            });
    };

    const resetChanges = () => {
        setProjectName(data.projectName);
        setTitle(data.title);
        setSaleType(data.saleType);
        setSociety(data.society);
    
        // Reset checkboxes for DTCP and RERA
        setStatus({
            dtcp: data.status.dtcp ,
            rera: data.status.rera ,
        });
    
        setConstructionStatus(data.constructionStatus);
        setHouseType(data.houseType);
        setBudget(data.budget);
        setBuildUpArea(data.buildUpArea);
        setCarpetArea(data.carpetArea);
        setTotalFloors(data.totalFloors);
        setBedrooms(data.bedrooms);
        setBathrooms(data.bathrooms);
        setBalcony(data.balcony);
        setFurnishing(data.furnishing);
        setCarParking(data.carParking);
        setFacing(data.facing);
        setDescription(data.description);
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
    <div className="modal-dialog modal-lg"> {/* modal-lg for a wider modal */}
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
                <div className="row">
                    <div className="col-md-6">
                        <label>Project Name:</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Project Name"
                        />

                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />

                        <label>Sale Type:</label>
                        <input
                            type="text"
                            value={saleType}
                            onChange={(e) => setSaleType(e.target.value)}
                            placeholder="Sale Type"
                        />

                        <label>Society:</label>
                        <input
                            type="text"
                            value={society}
                            onChange={(e) => setSociety(e.target.value)}
                            placeholder="Society"
                        />
                    </div>

                    <div className="col-md-6">
                        <label>Construction Status:</label>
                        <input
                            type="text"
                            value={constructionStatus}
                            onChange={(e) => setConstructionStatus(e.target.value)}
                            placeholder="Construction Status"
                        />

                        <label>House Type:</label>
                        <input
                            type="text"
                            value={houseType}
                            onChange={(e) => setHouseType(e.target.value)}
                            placeholder="House Type"
                        />

                        <label>Budget:</label>
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Budget"
                        />

                        <label>Build Up Area:</label>
                        <input
                            type="text"
                            value={buildUpArea}
                            onChange={(e) => setBuildUpArea(e.target.value)}
                            placeholder="Build Up Area"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <label>Carpet Area:</label>
                        <input
                            type="text"
                            value={carpetArea}
                            onChange={(e) => setCarpetArea(e.target.value)}
                            placeholder="Carpet Area"
                        />

                        <label>Total Floors:</label>
                        <input
                            type="text"
                            value={totalFloors}
                            onChange={(e) => setTotalFloors(e.target.value)}
                            placeholder="Total Floors"
                        />

                        <label>Bedrooms:</label>
                        <input
                            type="text"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            placeholder="Bedrooms"
                        />

                        <label>Bathrooms:</label>
                        <input
                            type="text"
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                            placeholder="Bathrooms"
                        />
                    </div>

                    <div className="col-md-6">
                        <label>Balcony:</label>
                        <input
                            type="text"
                            value={balcony}
                            onChange={(e) => setBalcony(e.target.value)}
                            placeholder="Balcony"
                        />

                        <label>Furnishing:</label>
                        <input
                            type="text"
                            value={furnishing}
                            onChange={(e) => setFurnishing(e.target.value)}
                            placeholder="Furnishing"
                        />

                        <label>Car Parking:</label>
                        <input
                            type="text"
                            value={carParking}
                            onChange={(e) => setCarParking(e.target.value)}
                            placeholder="Car Parking"
                        />

                        <label>Facing:</label>
                        <input
                            type="text"
                            value={facing}
                            onChange={(e) => setFacing(e.target.value)}
                            placeholder="Facing"
                        />
                    </div>
                </div>

                <label>Description:</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></textarea>

                <label>Approved Status:</label>
                <div className="checkbox-group">
                    <label>DTCP</label>
                    <input
                        type="checkbox"
                        checked={status.dtcp}
                        onChange={(e) =>
                            setStatus((prevState) => ({
                                ...prevState,
                                dtcp: e.target.checked,
                            }))
                        }
                    />
                </div>
                <div className="checkbox-group">
                    <label>RERA</label>
                    <input
                        type="checkbox"
                        checked={status.rera}
                        onChange={(e) =>
                            setStatus((prevState) => ({
                                ...prevState,
                                rera: e.target.checked,
                            }))
                        }
                    />
                </div>

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

export default Edit;
