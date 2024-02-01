import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


const ShowCard = () => {

    const [showInfo, setShowInfo] = useState([])

    useEffect(() => {
        const catchData = async () => {
            try {
                const url = `https://api.tvmaze.com/search/shows?q=all`
                const res = await fetch(url)
                const data = await res.json()
                console.log(data);
                setShowInfo(data)

                
            } catch (error) {
                console.log(error);
            }
        }

        catchData()
    }, [])


    return (
        <>
            <div className="container my-5" >
                <div className="row">
                    {
                        showInfo.map((item) => {

                            return (
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 mt-4" key={item.show.id}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        {item.show.image && item.show.image.original && (
                                            <img src={item.show.image.original} className="card-img-top" alt={item.show.name} />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{item.show.name}</h5>
                                            <p className="card-text">{item.show.genres.join(', ')}</p>
                                            <p className="card-text">{item.show.language}</p>
                                            <NavLink to={`/summarypage/${item.show.id}`} className="btn btn-primary" >View</NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ShowCard
