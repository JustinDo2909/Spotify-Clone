import axios from "axios";

const clientId = process.env.NEXT_PUBLIC_CLIENTID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENTSECRET;

const api = axios.create({
  baseURL: 'https://accounts.spotify.com/',
});

export const getAccessToken = async () => {
  try {
    const authHeader = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');

    const response = await api.post('api/token', 
      new URLSearchParams({ grant_type: 'client_credentials' }), 
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

export const getNewReleases = async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; // return the data for new releases
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw error;
  }
};
export const getSeveralAlbums = async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; // return the data for new releases
  } catch (error) {
    console.error("Error fetching Several Albums:", error);
    throw error;
  }
};
export const getAudiobook= async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; // return the data for new releases
  } catch (error) {
    console.error("Error fetching Audio book:", error);
    throw error;
  }
};
