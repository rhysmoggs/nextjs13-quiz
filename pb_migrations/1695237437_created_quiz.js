/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ricr90ar5rmz1i0",
    "created": "2023-09-20 19:17:17.300Z",
    "updated": "2023-09-20 19:17:17.300Z",
    "name": "quiz",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jqzznbfm",
        "name": "username",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ocz2dzws",
        "name": "score",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ricr90ar5rmz1i0");

  return dao.deleteCollection(collection);
})
