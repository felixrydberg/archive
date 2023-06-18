const { PrismaClient } = require('@prisma/client');

const { users, badges, ships, ranks, linkbadges, linkships, linkranks } =
  new PrismaClient();

module.exports = {
  users,
  badges,
  ships,
  ranks,
  linkbadges,
  linkships,
  linkranks,
};
