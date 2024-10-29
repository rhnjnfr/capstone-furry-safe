import {
    createBuddyReport,
    retrieveBuddyDetails
}
    from "../model/buddyModel.js"

export const insertBuddyReport = (req, res) => {
    createBuddyReport(req, res);
};
export const getBuddyDetails = (req, res) => {
    retrieveBuddyDetails(req, res);
};
