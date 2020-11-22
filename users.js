const { getConnection } = require("./src/utils/db/mongo")
const fetchUsersData = async ({ productId, viewedDate }) => {
  try { 
    const db = await getConnection("test")
    return db.collection("userView").distinct("UserId", {
      "ViewDate": {
          "$gte": new Date(viewedDate)
      },
      "ProductId": productId
    })
  } catch(e) {
    throw e
  }
}

module.exports = {
  fetchUsersData,
}
