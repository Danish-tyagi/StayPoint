
// export default ListingContext
import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ListingDataContext = createContext();

function ListingContext({ children }) {
  let navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  let [listingData, setListingData] = useState([]);
  let [category, setCategory] = useState("");
  let [adding, setAdding] = useState(false);
  let [updating, setUpdating] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [newListingData, setNewListingData] = useState([]);
  let [cardDetails, setCardDetails]= useState(null);
  let [searchData, setSearchData]=useState([])

  let { serverUrl } = useContext(authDataContext);

  // ADD LISTING
  const handleAddListing = async () => {
    setAdding(true);

    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      let result = await axios.post(
        serverUrl + "/api/listing/add",
        formData,
        { withCredentials: true }
      );

      setAdding(false);
      navigate("/");
      toast.success("AddListing successfully")
      setTitle("");
      setDescription("");
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandmark("");
      setCategory("");

    } catch (error) {
      setAdding(false);
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const handleViewCard = async(id) => {
    try{
      let result = await axios.get(serverUrl + `/api/listing/findlistingbyid/${id}`,{withCredentials:true})
      console.log(result.data)
      setCardDetails(result.data)
      navigate("/viewcard")
    } catch (error){
      console.log(error)
    }

  }

  const handleSearch = async() => {
    try {
      let result = await axios.get(serverUrl + `/api/listing/search?query=${data}`)
      setSearchData(result.data)
    } catch (error) {
      setSearchData(null)
      console.log(error)
      
    }
  }

  // GET LISTINGS
  const getListing = async () => {
    setLoading(true);

    try {
      let result = await axios.get(
        serverUrl + "/api/listing/get",
        { withCredentials: true }
      );
      setNewListingData(result.data);
      setListingData(result.data);
      setError(null);

    } catch (err) {
      console.error("Error fetching listing:", err);
      setError(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListing();
  }, [adding,updating,deleting]);

  let value = {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,

    listingData, setListingData,
    handleAddListing,
    adding, setAdding,

    getListing,
    loading, setLoading,
    error, setError,
    newListingData, setNewListingData,
    handleViewCard,
    cardDetails, setCardDetails,
    updating, setUpdating,
    deleting, setDeleting,
     handleSearch
  };

  return (
    <ListingDataContext.Provider value={value}>
      {children}
    </ListingDataContext.Provider>
  );
}

export default ListingContext;
