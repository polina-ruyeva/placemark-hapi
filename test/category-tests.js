import { assert } from "chai";
import { db } from "../src/models/db.js";
import { healthAndWellness, testCategories } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Category Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAll();
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCategories[i] = await db.categoryStore.addCategory(testCategories[i]);
    }
  });

  test("create a category", async () => {
    const newCategory = await db.categoryStore.addCategory(healthAndWellness);
    assertSubset(healthAndWellness, newCategory);
  });

  test("delete all categories", async () => {
    let returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, testCategories.length);
    await db.categoryStore.deleteAll();
    returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("get a category - success", async () => {
    const category = await db.categoryStore.addCategory(healthAndWellness);
    const returnedCategory1 = await db.categoryStore.getCategoryById(category._id);
    assert.deepEqual(category, returnedCategory1);
  });

  test("delete One Category - success", async () => {
    await db.categoryStore.deleteCategoryById(testCategories[0]._id);
    const returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, testCategories.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(testCategories[0]._id);
    assert.isNull(deletedCategory);
  });

  test("get a category - bad params", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
  });

  test("delete One Category - fail", async () => {
    await db.categoryStore.deleteCategoryById("bad-id");
    const allCategories = await db.categoryStore.getAllCategories();
    assert.equal(testCategories.length, allCategories.length);
  });
});
