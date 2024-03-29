const fetchAlss = async ({ queryKey }) => {
    const token = queryKey[1];
  
    const apiRes = await fetch(
      `https://tata-backend.onrender.com/api/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your actual bearer token
        },
      }
    );
    if (!apiRes.ok) {
      window.alert("Error occured while fetching data");
    }
    return apiRes.json();
  };
  
  export default fetchAlss;
  