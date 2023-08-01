import axios from "axios";

const baseurl = `http://localhost:5000`


// Officers
export const getOfficers = async () => {
    const response = await axios.get(`${baseurl}/officers`);

    // console.log(response.data);
    return response.data;
}

export const getOfficerbyKey = async (key) => {
    const response = await axios.get(`${baseurl}/officers/${key}`)

    return response.data;
}

// Students
export const getStudents = async () => {
    const response = await axios.get(`${baseurl}/students`);

    return response.data;
}

export const getStudentbyKey = async (key) => {
    const response = await axios.get(`${baseurl}/students/${key}`)

    return response.data;
}

// Student Class
export const getClassrooms = async () => {
    const response = await axios.get(`${baseurl}/studentclass`);

    return response.data;
}

export const getClassroombyKey = async (key) => {
    const response = await axios.get(`${baseurl}/studentclass/${key}`)

    return response.data;
}

// Spp
export const getSpp = async () => {
    const response = await axios.get(`${baseurl}/spp`);

    return response.data;
}

export const getSppbyKey = async (key) => {
    const response = await axios.get(`${baseurl}/spp/${key}`)

    return response.data;
}

// Get History Payments
export const getPayments = async () => {
    const response = await axios.get(`${baseurl}/payments`);

    return response.data;
}