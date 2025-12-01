import React, { useContext } from "react";
import { ListingDataContext } from "../src/Context/ListingContext";
import Nav from "../src/assets/component/Nav";
import Card from "../src/assets/component/Card";
import Footer from "../src/assets/component/Footer";

function Home() {
    let {newListingData} = useContext(ListingDataContext)
    return (
        <div>
            <Nav />
            <div className="w-[100vw] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]">
                {newListingData.map((list)=> (
                    <Card title={list.title} landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} ratings={list.ratings} isBooked={list.isBooked} host={list.host}/>
                ))}
            </div>
            <Footer />
        </div>

    )
}

export default Home
