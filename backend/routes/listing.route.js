import express from "express";
import upload from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js"
import { addListing, deleteListing, findListing, getListing, ratingListing, search, updateListing } from "../controllers/listing.controller.js";

let listingRouter = express.Router()

listingRouter.post("/add", isAuth, upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}

]),addListing
)

listingRouter.get("/get", getListing)
listingRouter.get("/findlistingbyid/:id",isAuth, findListing)
listingRouter.post("/update/:id", isAuth, upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}

]),updateListing
)
listingRouter.delete("/delete/:id",isAuth, deleteListing)
listingRouter.post("/ratings/:id",isAuth, ratingListing)
listingRouter.get("/search",search)

export default listingRouter