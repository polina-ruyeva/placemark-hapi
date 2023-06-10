import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, healthAndWellness, maggieCredentials, testCategories, testEvents, evento } from "../fixtures.js";

suite("Event API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllEvents();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    mozart.userid = user._id;
    beethovenSonatas = await placemarkService.createCategory(mozart);
  });

  teardown(async () => {});

  test("create event", async () => {
    const returnedEvent = await placemarkService.createEvent(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedEvent);
  });

  test("create Multiple events", async () => {
    for (let i = 0; i < testEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createEvent(beethovenSonatas._id, testEvents[i]);
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
      await placemarkService.createEvent(beethovenSonatas._id, testEvents[i]);
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
      await placemarkService.createEvent(beethovenSonatas._id, testEvents[i]);
    }
    const returnedCategory = await placemarkService.getCategory(beethovenSonatas._id);
    assert.equal(returnedCategory.events.length, testEvents.length);
    for (let i = 0; i < testEvents.length; i += 1) {
      assertSubset(testEvents[i], returnedCategory.events[i]);
    }
  });
});
