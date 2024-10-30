import {
    createBuddyReport,
    retrieveBuddyDetails, 
    updateBuddyDetails
}
    from "../model/buddyModel.js"

export const insertBuddyReport = (req, res) => {
    createBuddyReport(req, res);
};
export const getBuddyDetails = (req, res) => {
    retrieveBuddyDetails(req, res);
};
export const setBuddyDetails = (req, res) => {
    updateBuddyDetails(req, res);
};
