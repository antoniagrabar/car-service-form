import * as z from "zod";

const serviceFormSchema = z.object({
  manufacturerId: z.string().min(1, { message: "Proizvođač je obavezan." }),
  serviceIds: z
    .array(z.string().min(1))
    .min(1, { message: "Molimo odaberite barem jednu uslugu." }),
  email: z.string().email({
    message: "Molimo unesite valjan email.",
  }),
  fullName: z
    .string()
    .min(1, { message: "Ime i prezime su obavezni." })
    .min(2, {
      message: "Ime i prezime moraju imati minimalnu duljinu od 2 znaka.",
    })
    .max(40, {
      message: "Ime i prezime ne smiju prelaziti duljinu od 40 znakova.",
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Ime i prezime mogu sadržavati samo slova i razmake.",
    }),
  phoneNumber: z
    .string()
    .min(1, { message: "Broj telefona je obavezan." })
    .min(8, { message: "Broj telefona mora imati minimalno 8 znakova." })
    .max(15, {
      message: "Broj telefona ne smije prelaziti duljinu od 15 znakova.",
    })
    .regex(/^\+?[0-9]*$/, {
      message:
        "Broj telefona može sadržavati samo brojeve i jedan + na početku.",
    }),
  note: z.string().max(1000, {
    message: "Napomena ne smije prelaziti duljinu od 1000 znakova.",
  }),
});

export default serviceFormSchema;
