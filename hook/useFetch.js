import { useState, useEffect } from 'react';
import axios from 'axios';


const url = "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2023-2024?output=json";

// const useFetch = () => {
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const options = {
//         method: "GET",
//         url: url,
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             'Access-Control-Allow-Origin': '*',
//         }
//     };

//     const fetchData = () => {
//         setIsLoading(true);

//         console.log("TEST 1");

//         try {
//             axios.get(url).then(res => setData(res.data));

//             console.log("RESPONSE : ", response);

//             setData(response.data);
//             setIsLoading(false);

//         } catch(error) {
//             setError(error);
//             console.log("ERROR : ", error);

//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const refetch = () => {
//         setIsLoading(true);
//         fetchData();
//     };

//     return { data, isLoading, error, refetch };
// };

// export default useFetch;
