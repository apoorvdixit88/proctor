import React from "react";

export const AllUsers = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3001/api/getAll`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setUserData(data));
  }, []);
  return <div>{data}</div>;
};
