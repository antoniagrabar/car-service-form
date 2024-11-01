import { z } from "zod";

const serviceIdsSchema = z
  .string({ required_error: "Molimo odaberite barem jednu uslugu." })
  .array()
  .min(1, { message: "Molimo odaberite barem jednu uslugu." });

export default serviceIdsSchema;
