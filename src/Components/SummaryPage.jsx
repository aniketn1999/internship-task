import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const SummaryPage = () => {
    const { id: urlId } = useParams()
    console.log(urlId);
    const [dataInfo, setDataInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.tvmaze.com/search/shows?q=all`
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data);

                const filteredData = data.filter(item => item.show.id === Number(urlId));
                console.log(filteredData);
                setDataInfo(filteredData)

            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>

            {dataInfo.map((item) => {
                return (
                    <div className="container mt-4" key={item.show.id}>
                        <div className="row">
                            <div className="col-md-6">
                                {item.show.image && item.show.image.original && (
                                    <img src={item.show.image.original} className="img-fluid rounded" alt={item.show.name} style={{ width: "250px" }} />
                                )}
                            </div>
                            <div className="col-md-6">
                                <h1>{item.show.name}</h1>
                                <p>
                                    <strong>Language:</strong> {item.show.language}
                                </p>
                                <p>
                                    <strong>Genres:</strong> {item.show.genres.join(", ")}
                                </p>
                                <p>
                                    <strong>Runtime:</strong> {item.show.runtime + " " + "min"}
                                </p>
                                <p>
                                    <strong>Rating:</strong>{item.show.rating.average}
                                </p>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <h2>Summary</h2>
                                <p>{item.show.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                            </div>
                        </div>
                        <NavLink to={`/summarypage/${item.show.id}/${item.show.name}}`} className="btn mt-3 btn-primary">Book Ticket</NavLink>
                    </div>
                )
            })}

        </>
    )
}

export default SummaryPage
