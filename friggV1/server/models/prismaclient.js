const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { users, badges, ships, ranks, linkbadges, linkships, linkranks } = prisma;

module.exports = { users, badges, ships, ranks, linkbadges, linkships, linkranks }