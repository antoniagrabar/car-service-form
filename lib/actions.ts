"use server";

export async function getManufacturers() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/manufacturers`, {
      headers: { "x-authentication-token": "borealis-fe-interview-token" },
    });

    const body = await res.json();

    return body;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getServices() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/services`, {
      headers: { "x-authentication-token": "borealis-fe-interview-token" },
    });

    const body = await res.json();

    return body;
  } catch (err) {
    console.log(err);
    return null;
  }
}
