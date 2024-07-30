import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { earlyAccessTable } from '@/server/db/schema';

export const earlyAccessRouter = createTRPCRouter({
  joinEarlyAccess: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, { message: 'Name is too short' }),
        email: z.string().email({ message: 'Invalid email address' }).min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email } = input;
      const { db } = ctx;

      const existingUser = await db.query.earlyAccessTable.findFirst({
        where: eq(earlyAccessTable.email, email),
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You are already in the early access list.',
        });
      }

      await db
        .insert(earlyAccessTable)
        .values({
          name,
          email,
        })
        .catch((err: unknown) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            cause: err,
            message:
              'An error occurred while adding you to the early access list. Please try again later.',
          });
        });
    }),
});
