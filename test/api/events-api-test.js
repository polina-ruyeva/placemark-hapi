import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, healthAndWellness, maggieCredentials, testCategories, testEvents, wellnessRetreat } from "../fixtures.js";

suite("Event API tests", () => {
  let user = null;
  let testCategory = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllEvents();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    healthAndWellness.userid = user._id;
    testCategory = await placemarkService.createCategory(healthAndWellness);
  });

  teardown(async () => {});

  test("create event", async () => {
    const returnedEvent = await placemarkService.createEvent(testCategory._id, wellnessRetreat);
    assertSubset(wellnessRetreat, returnedEvent);
  });

  test("create Multiple events", async () => {
    for (let i = 0; i < testEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createEvent(testCategory._id, testEvents[i]);
    }
    const returnedEvents = await placemarkService.getAllEvents();
    assert.equal(returnedEvents.length, testEvents.length);
    for (let i = 0; i < returnedEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const event = await placemarkService.getEvent(returnedEvents[i]._id);
      assertSubset(event, returnedEvents[i]);
    }
  });

  test("Delete EventApi", async () => {
    for (let i = 0; i < testEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createEvent(testCategory._id, testEvents[i]);
    }
    let returnedEvents = await placemarkService.getAllEvents();
    assert.equal(returnedEvents.length, testEvents.length);
    for (let i = 0; i < returnedEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const event = await placemarkService.deleteEvent(returnedEvents[i]._id);
    }
    returnedEvents = await placemarkService.getAllEvents();
    assert.equal(returnedEvents.length, 0);
  });

  test("denormalised category", async () => {
    for (let i = 0; i < testEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createEvent(testCategory._id, testEvents[i]);
    }
    const returnedCategory = await placemarkService.getCategory(testCategory._id);
    assert.equal(returnedCategory.events.length, testEvents.length);
    for (let i = 0; i < testEvents.length; i += 1) {
      assertSubset(testEvents[i], returnedCategory.events[i]);
    }
  });
});
