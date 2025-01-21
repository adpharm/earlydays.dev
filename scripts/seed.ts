import "dotenv/config";
import { db } from "@/db";
import { usersTable } from "@/schema";
import * as bcrypt from "bcrypt";
import { InsertUser } from "@/schema";
import { eq } from "drizzle-orm";

const developers: InsertUser[] = [
  {
    name: "Ben Honda",
    email: "ben@theadpharm.com",
    password: "WelcomeAll1!",
    gitUrl: "https://github.com/benhonda",
    profileSrc: "https://avatars.githubusercontent.com/u/31232390?v=4",
  },
  {
    name: "Benjamin Tejas",
    email: "btejas@theadpharm.com",
    password: "WelcomeAll1!",
    gitUrl: "https://github.com/bentejas",
    profileSrc: "https://avatars.githubusercontent.com/u/57376142?v=4",
  },
  {
    name: "Albert Zarifa",
    email: "albert@theadpharm.com",
    password: "WelcomeAll1!",
    gitUrl: "https://github.com/albertzarifa",
    profileSrc: "https://avatars.githubusercontent.com/u/47013913?v=4",
  },
];

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

const seed = async () => {
  try {
    for (const dev of developers) {
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, dev.email));

      if (existingUser.length > 0) {
        console.log(`User with email ${dev.email} already exists. Skipping...`);
        continue;
      }

      const hashedPassword = await hashPassword(dev.password);

      await db.insert(usersTable).values({
        name: dev.name,
        gitUrl: dev.gitUrl,
        profileSrc: dev.profileSrc,
        email: dev.email,
        password: hashedPassword,
      });

      console.log(`Inserted user with email ${dev.email}.`);
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seed();
