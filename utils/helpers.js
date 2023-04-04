
module.exports = {
  // Helper function to format date 
  format_date: date => {
    var newdate = new Date(date)
    return `${newdate.getMonth() + 1}/${newdate.getDate()}/${newdate.getFullYear()}`;
  }
  //add additional custom helpers here if needed
};
