// const { PrismaClient } = require('@prisma/client');

import { PrismaClient } from '@prisma/client';

const { users, badges, ships, ranks, linkbadges, linkships, linkranks } =
  new PrismaClient();

export { users, badges, ships, ranks, linkbadges, linkships, linkranks };
