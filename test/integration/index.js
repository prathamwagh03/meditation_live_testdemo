const { fetchUsersData } = require("../../src/utils/users")
const expect = require("chai").expect
const { MongoClient } = require("mongodb")

describe("checks fetchUsersData()", () => {
  before(async () => {
    const testTableName = "userView_test"
    let db = await MongoClient.connect(`mongodb://localhost:27017`)
    db = db.db("test")
    await db.collection(testTableName).deleteMany()
    await db.collection(testTableName).insertMany([
      {
        "UserId" : 1,
        "ProductId" : "b_123",
        "ViewDate" : new Date("2016-05-18T16:00:00.000Z")
      }
      ,
      {
        "UserId" : 2,
        "ProductId" : "b_456",
        "ViewDate" : new Date("2020-01-18T00:00:00.000Z")
      }
      ,
      {
        "UserId" : 2,
        "ProductId" : "b_123",
        "ViewDate" : new Date("2019-08-20T16:00:00.000Z")
      }
      ,
      {
        "UserId" : 3,
        "ProductId" : "b_123",
        "ViewDate" : new Date("2018-10-17T16:00:00.000Z")
      }
      ,
      {
        "UserId" : 4,
        "ProductId" : "b_678",
        "ViewDate" : new Date("2018-10-17T16:00:00.000Z")
      }
      ,
      {
        "UserId" : 1,
        "ProductId" : "b_123",
        "ViewDate" : new Date("2019-05-18T16:00:00.000Z")
      }])
    return
  })

  it("should return an array of unique user ids w.r.t ProductId and ViewDate in function params", async () => {
    const result = await fetchUsersData({ productId: "b_123", viewedDate: "2016-04-17T16:00:00.000Z"})
    expect(Array.isArray(result)).to.equal(true)
    expect(result.length).to.equal(3)
  })
})