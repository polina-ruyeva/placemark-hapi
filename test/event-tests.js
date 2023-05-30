import { assert } from "chai";
import { db } from "../src/models/db.js";
import { wellnessRetreat, testEvents, testCategories } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Event Model tests", () => {
  setup(async () => {
    await db.init("mongo");

    await db.eventStore.deleteAll();
    for (let i = 0; i < testEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testEvents[i] = await db.eventStore.addEvent(testEvents[i]);
    }
  });

  test("create an event", async () => {
    const newEvent = await db.eventStore.addEvent(wellnessRetreat);
    assertSubset(wellnessRetreat, newEvent);
  });

  test("delete all events", async () => {
    let returnedEvents = await db.eventStore.getAllEvents();
    assert.equal(returnedEvents.length, testEvents.length);
    await db.eventStore.deleteAll();
    returnedEvents = await db.eventStore.getAllEvents();
    assert.equal(returnedEvents.length, 0);
  });

  test("get an event - success", async () => {
    const event = await db.eventStore.addEvent(wellnessRetreat);
    const returnedEvent = await db.eventStore.getEventById(event._id);
    assert.deepEqual(event, returnedEvent);
  });

  test("delete One Event - success", async () => {
    await db.eventStore.deleteEventById(testEvents[0]._id);
    const returnedEvents = await db.eventStore.getAllEvents();
    assert.equal(returnedEvents.length, testEvents.length - 1);
    const deletedEvent = await db.eventStore.getEventById(testEvents[0]._id);
    assert.isNull(deletedEvent);
  });

  test("get an event - bad params", async () => {
    assert.isNull(await db.eventStore.getEventById(""));
    assert.isNull(await db.eventStore.getEventById());
  });

  test("delete One Event - fail", async () => {
    await db.eventStore.deleteEventById("bad-id");
    const allEvents = await db.eventStore.getAllEvents();
    assert.equal(testEvents.length, allEvents.length);
  });
});
