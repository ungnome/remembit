/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("727e3vvnwlpily6")

  collection.updateRule = "@request.auth.id != \"\"\n&& owner = @request.auth.id "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("727e3vvnwlpily6")

  collection.updateRule = "@request.auth.id != \"\"\n&& owner = @request.auth.id \n&& @request.data.id:isset = false"

  return dao.saveCollection(collection)
})
