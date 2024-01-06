import axios from "axios";
const fetchComments2 = async ({ queryKey }) => {
  // Extracting query parameters
  const [, id, token, data] = queryKey;

  // Making an HTTP request with a body
  const response = await axios.get(
    `https://tata-backend.onrender.com/api/commentExists1/${data.user_id}/${data.toUser_id}/${data.campaign_id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export default fetchComments2;
