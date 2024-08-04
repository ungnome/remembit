/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("727e3vvnwlpily6")

  collection.listRule = "@request.auth.id != \"\" \n&& owner = @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" \n&& owner = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\" \n&& @request.auth.id = @request.data.owner \n&& @request.data.id:isset = false"
  collection.updateRule = "@request.auth.id != \"\"\n&& owner = @request.auth.id \n&& @request.data.id:isset = false"
  collection.deleteRule = "@request.auth.id != \"\" \n&& owner = @request.auth.id \n&& @request.data.id:isset = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("727e3vvnwlpily6")

  collection.listRule = "@request.auth.id != \"\" && owner = @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && owner = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id != \"\" && owner = @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" && owner = @request.auth.id"

  return dao.saveCollection(collection)
})
