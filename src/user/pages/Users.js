import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Maya Koma",
      image:
        "https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
