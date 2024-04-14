import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

function Item({ id, productName, description, price, quantity, imageUrl, id_category, audio, created }) {

  return (
    <Card sx={{ maxWidth: 345, marginBottom: "1rem"}}>
      <CardActionArea component={Link} to={`/home/${id}`}>
      <CardMedia
          component="img"
          height="250"
          image={imageUrl}
          alt={productName}
          style={{ width: "100%", objectFit: "cover", margin: 0, padding: 0, borderRadius: "10px 10px 0 0" }}
        />

        <CardContent style={{ flex: 1, justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h4" textTransform="capitalize" component="div" color="#3db06d">
            {productName}
          </Typography>
          <Typography variant="h5" color="info" gutterBottom>
            {price} FCFA
          </Typography>
          <Typography variant="h6" color="secondary" gutterBottom>
                {quantity === "0" ? <span style={{ color: 'crimson' }}>Stock épuisée</span> : `${quantity} en stock`}
          </Typography>
          <div style={{ float: "right", fontSize: "1px" }}>
            <Typography variant="body2" color="secondary" gutterBottom>
                {created}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}

// Prop types validation
Item.propTypes = {
  id: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id_category: PropTypes.string.isRequired,
};

export default Item;
