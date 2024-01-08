import { useState, useEffect } from 'react';
import axios from 'axios';

const url = "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2023-2024?output=json";

function useFetch() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(url);
            setData(response.data);
            setIsLoading(false);
        } catch(err) {
            setError(error);
            console.log("fetchData() Error!", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };
        
    return { data, isLoading, error, refetch };
};

export default useFetch();

// const useFetch = () => {
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const options = {
//         method: "GET",
//         url: "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2023-2024?output=json",
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             'Access-Control-Allow-Origin': '*',
//         }
//     };

//     const fetchData = async () => {
//         setIsLoading(true);

//         // console.log("Dit is een test");

//         try {
//             const response = await axios.request(options);

//             setData(response.data);
//             setIsLoading(false);

//         } catch(error) {
//             setError(error);
//             console.log("DIT IS EEN ERROR!", error);

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