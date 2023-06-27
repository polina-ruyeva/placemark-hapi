import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const EventSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Surfing"),
    categoryid: IdSpec,
    description: Joi.string().required().example("Surfing in Strandhill"),
    views: Joi.number().allow("").optional().example(12),
    date: Joi.date().allow("").optional().example("31-12-2023"),
    lon: Joi.number().allow("").optional().example(12),
    lat: Joi.number().allow("").optional().example(12),
    image: Joi.string().optional(),
  })
  .label("Event");

export const EventSpecPlus = EventSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("EventPlus");

export const EventArraySpec = Joi.array().items(EventSpecPlus).label("EventArray");

export const CategorySpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Sports"),
    userid: IdSpec,
    events: EventArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
