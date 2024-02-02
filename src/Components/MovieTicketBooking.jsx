import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const CustomerDetailsForm = () => {

    const { id: urlId, name } = useParams()

    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const [movieInfo, setMovieInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.tvmaze.com/search/shows?q=all`
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data);

                const filteredData = data.filter(item => item.show.id === Number(urlId));
                console.log(filteredData);
                setMovieInfo(filteredData)

            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        };

        fetchData();
    }, []);


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission (e.g., send data to server)
        console.log('Customer Details:', customerDetails);
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });
    };

    return (
        <>

            {
                movieInfo.map((curVal) => {
                    return (
                        <div className="container mt-5" key={curVal.show.id}>
                            <div className="text-center mb-4">
                                
                                {curVal.show.image && curVal.show.image.original && (
                                    <img src={curVal.show.image.original} className="rounded-circle" alt={curVal.show.name}  style={{ width: "200px" }}/>
                                )}
                                <h3 className="mt-1">{curVal.show.name}</h3>
                            </div>

                            {/* Customer Details Form */}
                            <form onSubmit={handleSubmit}>
                                <h2 className="mt-5">Book Your Ticket</h2>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={customerDetails.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={customerDetails.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Enter your phone number"
                                        value={customerDetails.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary mt-3">Book Now</button>
                                </div>
                            </form>
                        </div>


                    )
                })
            }
        </>
    );
};

export default CustomerDetailsForm;
