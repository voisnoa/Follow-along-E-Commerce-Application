
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ product }) => {
    const cartStyle = {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    };

    const imgStyle = {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "5px",
        marginBottom: "10px",
    };

    const h3Style = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        margin: "10px 0",
    };

    const pStyle = {
        fontSize: "14px",
        color: "#555",
        marginBottom: "10px",
    };

    const priceStyle = {
        fontSize: "18px",
        color: "#e60000",
        fontWeight: "bold",
        marginBottom: "10px",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        marginTop: "15px",
    };

    const buttonStyle = {
        flex: "1",
        padding: "8px",
        fontSize: "14px",
        color: "#333",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "white",
        cursor: "pointer",
    };

    const navigate = useNavigate();

    // console.log('p',product)
    const handleEdit = () => {
        navigate(`/editproductForm/${product._id}`);
    };

    //Milestone 19 code

    useEffect(() => {
        fetch("https://localhost:5000/cart"),{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`,
            }
            .then((res) => {
                return res.json();
            }).then((res) => {
                console.log(res);
            })
        }
    }, []);

    //Milestone 19 code ends 

    return (
        <div className="cart" style={cartStyle}>
            <img src={product.imageUrl} alt={product.productName} style={imgStyle} />
            <h3 style={h3Style}>{product.productName}</h3>
            <p style={pStyle}>{product.productDescription}</p>
            <p style={priceStyle}>{product.productPrice}</p>
            <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={handleEdit}>Edit Product</button>
                <button style={buttonStyle}>Delete Product</button>
                <button style={buttonStyle}>Wishlist</button>
            </div>
        </div>
    );
};

Cart.propTypes = {
    product: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default Cart;