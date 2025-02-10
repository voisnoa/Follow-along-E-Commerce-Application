import { Link } from "react-router-dom";

const Nav = () => {
    const navbarStyle = {
        backgroundColor: "#007bff",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "center",  // Center the links
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const navLinksStyle = {
        listStyle: "none",
        display: "flex",
        gap: "30px", // Increased gap for better spacing
        margin: 0,
        padding: 0,
    };

    const linkStyle = {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        transition: "color 0.3s",
    };

    return (
        <nav style={navbarStyle}>
            <ul style={navLinksStyle}>
                <li><Link to="/" style={linkStyle}>Home</Link></li>
                <li><Link to="/my-products" style={linkStyle}>My Products</Link></li>
                <li><Link to="/productForm" style={linkStyle}>Add Product</Link></li>
                <li><Link to="/cart" style={linkStyle}>Cart</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
