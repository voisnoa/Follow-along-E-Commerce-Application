
import { useState } from "react";
import { useEffect }from 'react';

function Profile() {

    let [profile, setProfile] = useState([])

    useEffect(() => {
        fetch("http://localhost:5173/user/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json())
        .then((res) => {
            console.log(res)
            setProfile(res)
        })
    }), []

    return (
        <>
        <section>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
            <h2>{profile.name}</h2>
            <h3>{profile.email}</h3> 
        </section>

        <section>
            <p>Address</p>
            <button>Add address</button>
        </section>
        
        </>
    )

    
}


export default Profile