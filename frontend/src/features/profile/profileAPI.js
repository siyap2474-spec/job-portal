import api from '../../services/api';

//GET PROFILE
export const getMyProfile = () => {
    return api.get("/profile/me");
};

//create profile
export const createProfile = (data) => {
    return api.post("/profile", data);
};

//update profile
export const updateProfile = (data) => {
    return api.put("/profile", data);
};

//upload resume
export const uploadResume = (formData) => {
    return api.post("/profile/upload-resume", formData, {
        headers: {
            "Content-Type" : "multipart/form-data",
        },
    } );
};