import { Resend } from "resend";
import type { Route } from "./+types/welcome-page";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { data, error } = await client.emails.send({
        from: "Glenn <glenn@wemake.ink>",
        to: "jyo2145709@gmail.com",
        subject: "Welcome to wemake!",
        html: "<h1>Welcome to wemake!</h1>",
    });
    return Response.json({ data, error });
};