const { fetchUsersData } = require("../../src/utils/users")
const expect = require("chai").expect
const sinon = require("sinon")
const { MongoClient } = require("mongodb")

describe("checks fetchUsersData()", () => {
  afterEach(() => sinon.restore())

  it("should check for errors if DB connection is not established", async () => {
    const errorMessage = "Database connection not established"
    sinon.stub(MongoClient, "connect").throws(new Error(errorMessage))

    try {
      const result = await fetchUsersData({})
    } catch(e) {
      expect(e.message).to.equal(errorMessage)
    }
  })

  it("should return array of user ids", async () => {
    sinon.stub(MongoClient, "connect").resolves({
      db: () => ({
        collection: () => ({
          distinct: () => {
            return [1, 2]
          }
        })
      })
    })

    const result = await fetchUsersData({ productId: "b_123", viewedDate: "2016-04-17T16:00:00.000Z"})

    expect(Array.isArray(result)).to.equal(true)
    expect(result.length).to.equal(2)
  })
})
